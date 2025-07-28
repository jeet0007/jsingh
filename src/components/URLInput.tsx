'use client';

import { useState, useCallback, useRef, useEffect } from 'react';
import { FaPlay, FaSpinner, FaCopy, FaTimes, FaCheckCircle } from 'react-icons/fa';
import classNames from 'classnames';
import { URLValidationResult, EpisodeInfo } from '../types';

interface URLInputProps {
  onSubmit: (url: string, episodeInfo?: EpisodeInfo) => void;
  onValidationChange?: (result: URLValidationResult) => void;
  initialUrl?: string;
  isLoading?: boolean;
  disabled?: boolean;
  className?: string;
  placeholder?: string;
}

// HLS URL validation regex
const HLS_URL_PATTERNS = [
  /\.m3u8($|\?)/i, // Standard HLS manifest with or without query params
  /\/playlist\.m3u8($|\?)/i, // Common playlist naming
  /\/index\.m3u8($|\?)/i, // Common index naming
  /master\.txt($|\?)/i, // Master playlist as .txt
  /cf-master\.txt($|\?)/i, // CloudFlare master playlist
  /index\.txt($|\?)/i, // Index playlist as .txt
  /playlist\.txt($|\?)/i, // Playlist as .txt
  /\.ts($|\?)/i, // Direct TS segment (also valid)
];

// Episode detection patterns
const EPISODE_PATTERNS = [
  /\/(\w+)\/(\d+)\//i, // /series/episode/
  /\/episode[_-]?(\d+)/i, // /episode-1/ or /episode_1/
  /\/ep[_-]?(\d+)/i, // /ep-1/ or /ep_1/
  /[_-](\d+)[_-]/i, // series_1_ or series-1-
  /(\d+)\/\d+p?\/index\.m3u8/i, // 98/720/index.m3u8
];

const validateHLSUrl = (url: string): URLValidationResult => {
  // Basic URL validation
  try {
    new URL(url);
  } catch {
    return {
      isValid: false,
      isHLS: false,
      error: 'Invalid URL format',
    };
  }

  // Check if it's an HLS URL
  const isHLS = HLS_URL_PATTERNS.some(pattern => pattern.test(url));
  
  if (!isHLS) {
    return {
      isValid: false,
      isHLS: false,
      error: 'URL must be an HLS stream (.m3u8, .txt, or .ts)',
    };
  }

  // Try to detect episode information
  let detectedEpisode: EpisodeInfo | undefined;
  
  for (const pattern of EPISODE_PATTERNS) {
    const match = url.match(pattern);
    if (match) {
      const episodeNumber = parseInt(match[1] || match[2], 10);
      if (!isNaN(episodeNumber)) {
        // Extract series name from URL path
        const urlPath = new URL(url).pathname;
        const pathParts = urlPath.split('/').filter(Boolean);
        const seriesName = pathParts[0] || 'Unknown Series';
        
        detectedEpisode = {
          series: seriesName,
          episode: episodeNumber,
          baseUrl: url.substring(0, url.lastIndexOf('/') + 1),
          urlPattern: url.replace(episodeNumber.toString(), '{episode}'),
        };
        break;
      }
    }
  }

  return {
    isValid: true,
    isHLS: true,
    detectedEpisode,
  };
};

const URLInput: React.FC<URLInputProps> = ({
  onSubmit,
  onValidationChange,
  initialUrl = '',
  isLoading = false,
  disabled = false,
  className = '',
  placeholder = 'Enter HLS URL (e.g., https://example.com/stream/master.m3u8 or master.txt)',
}) => {
  const [url, setUrl] = useState(initialUrl);
  const [validation, setValidation] = useState<URLValidationResult>({ isValid: false, isHLS: false });
  const [showValidation, setShowValidation] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Validate URL when it changes
  const validateUrl = useCallback((urlToValidate: string) => {
    if (!urlToValidate.trim()) {
      const result = { isValid: false, isHLS: false };
      setValidation(result);
      setShowValidation(false);
      onValidationChange?.(result);
      return;
    }

    const result = validateHLSUrl(urlToValidate);
    setValidation(result);
    setShowValidation(true);
    onValidationChange?.(result);
  }, [onValidationChange]);

  // Update URL when initialUrl prop changes (for episode navigation)
  useEffect(() => {
    setUrl(initialUrl);
    // Also validate the new URL to update episode detection
    if (initialUrl) {
      validateUrl(initialUrl);
    }
  }, [initialUrl, validateUrl]);

  // Handle URL input change
  const handleUrlChange = (newUrl: string) => {
    setUrl(newUrl);
    validateUrl(newUrl);
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validation.isValid && !disabled && !isLoading) {
      onSubmit(url, validation.detectedEpisode);
    }
  };

  // Handle copy button click
  const handleCopy = async () => {
    try {
      if (url) {
        await navigator.clipboard.writeText(url);
        // Could add a toast notification here
      }
    } catch (error) {
      console.warn('Clipboard write failed:', error);
    }
  };

  // Handle clear button click
  const handleClear = () => {
    handleUrlChange('');
    inputRef.current?.focus();
  };

  // Set client flag to avoid hydration mismatch
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Auto-focus input on mount
  useEffect(() => {
    if (inputRef.current && !initialUrl) {
      inputRef.current.focus();
    }
  }, [initialUrl]);

  return (
    <div className={classNames('w-full', className)}>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* URL Input Field */}
        <div className="relative">
          <div className="relative">
            <input
              ref={inputRef}
              type="url"
              value={url}
              onChange={(e) => handleUrlChange(e.target.value)}
              placeholder={placeholder}
              disabled={disabled || isLoading}
              className={classNames(
                'w-full px-4 py-3 pr-24 rounded-lg font-mono text-sm',
                'shadow-neumorphismInput focus:shadow-neumorphismInputActive',
                'bg-background border-none outline-none',
                'text-gray-800 dark:text-gray-200',
                'placeholder:text-gray-500 dark:placeholder:text-gray-400',
                'transition-shadow duration-200',
                disabled || isLoading ? 'opacity-50 cursor-not-allowed' : '',
                validation.isValid ? 'text-green-700 dark:text-green-400' : '',
                showValidation && !validation.isValid && url ? 'text-red-700 dark:text-red-400' : ''
              )}
            />
            
            {/* Action Buttons */}
            {isClient && (
              <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex space-x-1">
                {/* Copy Button */}
                {navigator.clipboard && url && (
                  <button
                    type="button"
                    onClick={handleCopy}
                    disabled={disabled || isLoading}
                    className={classNames(
                      'p-2 rounded',
                      'shadow-neumorphism active:shadow-neumorphismActive',
                      'text-gray-600 dark:text-gray-400',
                      'hover:text-gray-800 dark:hover:text-gray-200',
                      'transition-all duration-200',
                      disabled || isLoading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
                    )}
                    title="Copy URL to clipboard"
                  >
                    <FaCopy className="w-3 h-3" />
                  </button>
                )}
                
                {/* Clear Button */}
                {url && (
                  <button
                    type="button"
                    onClick={handleClear}
                    disabled={disabled || isLoading}
                    className={classNames(
                      'p-2 rounded',
                      'shadow-neumorphism active:shadow-neumorphismActive',
                      'text-gray-600 dark:text-gray-400',
                      'hover:text-red-600 dark:hover:text-red-400',
                      'transition-all duration-200',
                      disabled || isLoading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
                    )}
                    title="Clear URL"
                  >
                    <FaTimes className="w-3 h-3" />
                  </button>
                )}
              </div>
            )}
          </div>

          {/* Validation Status */}
          {isClient && showValidation && (
            <div className="absolute right-2 top-1/2 transform -translate-y-1/2 mr-20">
              {validation.isValid ? (
                <FaCheckCircle className="w-4 h-4 text-green-500" />
              ) : (
                <FaTimes className="w-4 h-4 text-red-500" />
              )}
            </div>
          )}
        </div>

        {/* Validation Messages */}
        {isClient && showValidation && (
          <div className="space-y-2">
            {/* Error Message */}
            {!validation.isValid && validation.error && (
              <div className="flex items-center space-x-2 text-sm text-red-600 dark:text-red-400">
                <FaTimes className="w-3 h-3" />
                <span>{validation.error}</span>
              </div>
            )}

            {/* Success Message */}
            {validation.isValid && (
              <div className="flex items-center space-x-2 text-sm text-green-600 dark:text-green-400">
                <FaCheckCircle className="w-3 h-3" />
                <span>Valid HLS stream detected</span>
              </div>
            )}

            {/* Episode Detection */}
            {validation.detectedEpisode && (
              <div className="p-3 rounded-lg bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800">
                <div className="text-sm text-blue-800 dark:text-blue-200">
                  <div className="font-medium">Episode Detected:</div>
                  <div className="mt-1 space-y-1">
                    <div>Series: <span className="font-mono">{validation.detectedEpisode.series}</span></div>
                    <div>Episode: <span className="font-mono">#{validation.detectedEpisode.episode}</span></div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Play Button */}
        <button
          type="submit"
          disabled={!validation.isValid || disabled || isLoading}
          className={classNames(
            'w-full py-3 px-6 rounded-lg font-medium',
            'shadow-neumorphism active:shadow-neumorphismActive',
            'bg-background',
            'transition-all duration-200',
            validation.isValid && !disabled && !isLoading
              ? 'text-green-700 dark:text-green-400 hover:shadow-neumorphismHover cursor-pointer'
              : 'text-gray-500 dark:text-gray-500 opacity-50 cursor-not-allowed',
            'flex items-center justify-center space-x-2'
          )}
        >
          {isLoading ? (
            <>
              <FaSpinner className="w-4 h-4 animate-spin" />
              <span>Loading...</span>
            </>
          ) : (
            <>
              <FaPlay className="w-4 h-4" />
              <span>Play Stream</span>
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default URLInput;