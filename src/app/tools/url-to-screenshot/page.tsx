'use client';

import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import Image from 'next/image';
import Form from 'next/form';
import { generateScreenshot } from './actions';
import { 
    FaSpinner, 
    FaDownload, 
    FaCopy, 
    FaInfoCircle 
} from 'react-icons/fa';

export default function UrlToScreenshot() {
    const [screenshotUrl, setScreenshotUrl] = useState<string | null>(null);
    const [imageFormat, setImageFormat] = useState<'screenshot' | 'pageshot'>('screenshot');
    const [error, setError] = useState<string | null>(null);

    const validateUrl = (url: string) => {
        try {
            new URL(url);
            return true;
        } catch {
            return false;
        }
    };

    const screenshotMutation = useMutation({
        mutationFn: (data: { url: string; format: 'screenshot' | 'pageshot' }) => 
            generateScreenshot(data.url, data.format),
        onSuccess: (blob) => {
            const imageUrl = URL.createObjectURL(blob);
            setScreenshotUrl(imageUrl);
            setError(null);
        },
        onError: (error) => {
            console.error('Screenshot generation error:', error);
            setError(error instanceof Error ? error.message : 'An unexpected error occurred');
        }
    });

    const handleSubmit = async (formData: FormData) => {
        const url = formData.get('url') as string;
        
        // Clear previous errors
        setError(null);

        // Validate URL
        if (!validateUrl(url)) {
            setError('Please enter a valid URL');
            return;
        }

        // Reset error before mutation
        screenshotMutation.mutate({ url, format: imageFormat });
    };

    const handleDownload = () => {
        if (screenshotUrl) {
            const link = document.createElement('a');
            link.href = screenshotUrl;
            link.download = `url-image-${new Date().toISOString()}.png`;
            link.click();
        }
    };

    const handleCopyUrl = () => {
        if (screenshotUrl) {
            navigator.clipboard.writeText(screenshotUrl);
            // Optional: Add a toast notification
        }
    };

    return (
        <div className="max-w-xl mx-auto p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
            <h1 className="text-2xl font-bold text-center mb-6 text-gray-800 dark:text-gray-200">
                URL to Image
            </h1>
            
            {error && (
                <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                    {error}
                </div>
            )}
            
            {screenshotMutation.isError && (
                <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                    {screenshotMutation.error instanceof Error 
                        ? screenshotMutation.error.message 
                        : 'An unexpected error occurred'}
                </div>
            )}
            
            <Form action={handleSubmit} className="mb-6">
                <div className="flex flex-col space-y-2">
                    <input 
                        type="text" 
                        name="url" 
                        id="url-input"
                        placeholder="Enter URL to screenshot" 
                        required 
                        aria-label="URL to generate image"
                        aria-describedby="url-format-description"
                        className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-200"
                    />
                    <p 
                        id="url-format-description" 
                        className="text-sm text-gray-600 dark:text-gray-400 mt-1"
                    >
                        Enter a full URL including https:// or http://
                    </p>
                    
                    <div className="flex items-center space-x-2">
                        <label htmlFor="image-format" className="text-gray-600 dark:text-gray-400">
                            Image Format
                        </label>
                        <select
                            name="imageFormat"
                            value={imageFormat}
                            onChange={(e) => setImageFormat(e.target.value as 'screenshot' | 'pageshot')}
                            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-200"
                        >
                            <option value="screenshot">Screenshot</option>
                            <option value="pageshot">Pageshot</option>
                        </select>
                    </div>
                    
                    <button 
                        type="submit"
                        disabled={screenshotMutation.isPending}
                        className={`
                            px-4 py-2 rounded-md text-white transition-colors duration-300 
                            ${screenshotMutation.isPending 
                                ? 'bg-gray-400 cursor-not-allowed' 
                                : 'bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'}
                        `}
                    >
                        {screenshotMutation.isPending ? (
                            <div className="flex items-center justify-center">
                                <FaSpinner 
                                    className="animate-spin h-5 w-5 mr-2" 
                                />
                                Generating...
                            </div>
                        ) : (
                            'Generate Image'
                        )}
                    </button>
                </div>
            </Form>

            {screenshotUrl && (
                <div className="mt-4">
                    <Image 
                        src={screenshotUrl} 
                        alt="Generated URL Screenshot" 
                        width={500} 
                        height={300} 
                        className="w-full rounded-lg shadow-md"
                    />
                    
                    <div className="mt-4 flex space-x-2">
                        <button 
                            onClick={handleDownload}
                            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                        >
                            <FaDownload className="mr-2" />
                            Download
                        </button>
                        <button 
                            onClick={handleCopyUrl}
                            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                        >
                            <FaCopy className="mr-2" />
                            Copy URL
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
