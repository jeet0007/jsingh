'use client';

import { useState, useEffect } from 'react';
import { FaPlay, FaTrash, FaClock, FaSearch, FaTimes } from 'react-icons/fa';
import classNames from 'classnames';
import { PlaybackHistory as PlaybackHistoryType, HistoryListProps } from '../types';
import { getPlaybackHistory, removePlaybackHistoryItem, clearPlaybackHistory } from '../services/localStorage';

const PlaybackHistory: React.FC<Omit<HistoryListProps, 'history'>> = ({
  onSelect,
  onDelete,
  onClear,
}) => {
  const [history, setHistory] = useState<PlaybackHistoryType[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showConfirmClear, setShowConfirmClear] = useState(false);

  // Load history on mount
  useEffect(() => {
    const loadHistory = () => {
      const savedHistory = getPlaybackHistory();
      setHistory(savedHistory);
    };

    loadHistory();
    
    // Refresh history every 30 seconds
    const interval = setInterval(loadHistory, 30000);
    return () => clearInterval(interval);
  }, []);

  // Filter history based on search term
  const filteredHistory = history.filter(item => 
    item.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.series?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.url.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle delete item
  const handleDelete = (id: string) => {
    if (removePlaybackHistoryItem(id)) {
      setHistory(prev => prev.filter(item => item.id !== id));
      onDelete(id);
    }
  };

  // Handle clear all
  const handleClearAll = () => {
    if (clearPlaybackHistory()) {
      setHistory([]);
      onClear();
      setShowConfirmClear(false);
    }
  };

  // Format watch progress
  const formatProgress = (currentTime: number, duration: number) => {
    if (duration === 0) return '0%';
    const percentage = Math.round((currentTime / duration) * 100);
    return `${percentage}%`;
  };

  // Format time for display
  const formatTime = (timeInSeconds: number) => {
    const hours = Math.floor(timeInSeconds / 3600);
    const minutes = Math.floor((timeInSeconds % 3600) / 60);
    const seconds = Math.floor(timeInSeconds % 60);

    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  // Format relative time
  const formatRelativeTime = (date: Date) => {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / (1000 * 60));
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    return date.toLocaleDateString();
  };

  if (history.length === 0) {
    return (
      <div className={classNames(
        'w-full p-8 rounded-lg text-center',
        'shadow-neumorphism bg-background'
      )}>
        <div className="text-gray-500 dark:text-gray-400">
          <FaClock className="w-12 h-12 mx-auto mb-4 opacity-50" />
          <h3 className="text-lg font-medium mb-2">No History Yet</h3>
          <p className="text-sm">Your recently watched videos will appear here</p>
        </div>
      </div>
    );
  }

  return (
    <div className={classNames(
      'w-full rounded-lg',
      'shadow-neumorphism bg-background'
    )}>
      {/* Header */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200">
            Recent History ({history.length})
          </h3>
          <button
            onClick={() => setShowConfirmClear(true)}
            className={classNames(
              'px-3 py-1 text-sm rounded',
              'shadow-neumorphism active:shadow-neumorphismActive',
              'text-red-600 dark:text-red-400',
              'hover:bg-red-50 dark:hover:bg-red-900/20',
              'transition-colors duration-200'
            )}
          >
            Clear All
          </button>
        </div>

        {/* Search */}
        <div className="relative">
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search history..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={classNames(
              'w-full pl-10 pr-4 py-2 rounded-lg',
              'shadow-neumorphismInput focus:shadow-neumorphismInputActive',
              'bg-background border-none outline-none',
              'text-gray-800 dark:text-gray-200',
              'placeholder:text-gray-500 dark:placeholder:text-gray-400'
            )}
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <FaTimes className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* History List */}
      <div className="max-h-96 overflow-y-auto">
        {filteredHistory.length === 0 ? (
          <div className="p-8 text-center text-gray-500 dark:text-gray-400">
            No matches found for &quot;{searchTerm}&quot;
          </div>
        ) : (
          <div className="space-y-2 p-4">
            {filteredHistory.map((item) => (
              <div
                key={item.id}
                className={classNames(
                  'p-4 rounded-lg',
                  'shadow-neumorphismInput hover:shadow-neumorphismInputActive',
                  'bg-background',
                  'transition-shadow duration-200',
                  'group cursor-pointer'
                )}
                onClick={() => onSelect(item)}
              >
                <div className="flex items-start space-x-4">
                  {/* Thumbnail placeholder */}
                  <div className={classNames(
                    'w-20 h-12 rounded bg-gray-200 dark:bg-gray-700',
                    'flex items-center justify-center',
                    'shadow-neumorphismInput'
                  )}>
                    <FaPlay className="w-4 h-4 text-gray-400" />
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between">
                      <div className="flex-1 min-w-0">
                        {/* Title */}
                        <h4 className={classNames(
                          'font-medium text-gray-800 dark:text-gray-200',
                          'truncate group-hover:text-blue-600 dark:group-hover:text-blue-400'
                        )}>
                          {item.title || 'Untitled Video'}
                        </h4>

                        {/* Series and Episode */}
                        {item.series && (
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {item.series}
                            {item.episode && ` • Episode ${item.episode}`}
                          </p>
                        )}

                        {/* URL */}
                        <p className="text-xs text-gray-500 dark:text-gray-500 truncate mt-1 font-mono">
                          {item.url}
                        </p>
                      </div>

                      {/* Actions */}
                      <div className="flex items-center space-x-2 ml-4">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDelete(item.id);
                          }}
                          className={classNames(
                            'p-2 rounded opacity-0 group-hover:opacity-100',
                            'shadow-neumorphism active:shadow-neumorphismActive',
                            'text-red-500 hover:text-red-600',
                            'transition-all duration-200'
                          )}
                          title="Delete from history"
                        >
                          <FaTrash className="w-3 h-3" />
                        </button>
                      </div>
                    </div>

                    {/* Progress and Time Info */}
                    <div className="flex items-center justify-between mt-3 text-xs text-gray-500 dark:text-gray-500">
                      <div className="flex items-center space-x-4">
                        <span>Progress: {formatProgress(item.currentTime, item.duration)}</span>
                        <span>{formatTime(item.currentTime)} / {formatTime(item.duration)}</span>
                      </div>
                      <span>{formatRelativeTime(item.lastWatched)}</span>
                    </div>

                    {/* Progress Bar */}
                    <div className="mt-2 w-full h-1 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-blue-500 transition-all duration-300"
                        style={{
                          width: `${item.duration > 0 ? (item.currentTime / item.duration) * 100 : 0}%`
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Clear Confirmation Modal */}
      {showConfirmClear && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className={classNames(
            'bg-background rounded-lg p-6 max-w-sm mx-4',
            'shadow-neumorphism'
          )}>
            <h4 className="text-lg font-medium text-gray-800 dark:text-gray-200 mb-4">
              Clear All History?
            </h4>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
              This action cannot be undone. All your playback history will be permanently deleted.
            </p>
            <div className="flex space-x-3">
              <button
                onClick={() => setShowConfirmClear(false)}
                className={classNames(
                  'flex-1 py-2 px-4 rounded',
                  'shadow-neumorphism active:shadow-neumorphismActive',
                  'text-gray-700 dark:text-gray-300'
                )}
              >
                Cancel
              </button>
              <button
                onClick={handleClearAll}
                className={classNames(
                  'flex-1 py-2 px-4 rounded',
                  'shadow-neumorphism active:shadow-neumorphismActive',
                  'text-red-600 dark:text-red-400',
                  'hover:bg-red-50 dark:hover:bg-red-900/20'
                )}
              >
                Clear All
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PlaybackHistory;