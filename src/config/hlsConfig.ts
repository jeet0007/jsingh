/**
 * Optimized HLS.js configuration for smooth playback and better segment loading
 * 
 * This configuration is specifically tuned for good network conditions and provides:
 * - Multi-threaded/concurrent segment loading
 * - Aggressive buffering for smooth playback
 * - Optimized network timeouts and retry policies
 * - Better memory management
 */

export const optimizedHLSConfig = {
  // Buffer Management - More aggressive buffering for smooth playback
  maxBufferLength: 60, // Increase from default 30s to 60s
  backBufferLength: 30, // Keep 30s of back buffer (prevents memory issues)
  maxBufferSize: 120 * 1000 * 1000, // 120MB buffer for high quality streams
  frontBufferFlushThreshold: 600, // Flush buffer beyond 10 minutes
  
  // Network & Loading Optimization
  autoStartLoad: true, // Start loading immediately
  startFragPrefetch: true, // Enable fragment prefetching for smoother transitions
  testBandwidth: true, // Enable bandwidth testing for better quality selection
  maxLoadingDelay: 2, // Reduce from default 4s to 2s for faster loading
  
  // Concurrent Loading Optimization - Key for multi-threaded requests
  fragLoadPolicy: {
    default: {
      maxTimeToFirstByteMs: 10000, // 10s timeout for first byte
      maxLoadTimeMs: 60000, // 60s total timeout
      timeoutRetry: {
        maxNumRetry: 4,
        retryDelayMs: 0, // No delay for immediate retry (enables concurrency)
        maxRetryDelayMs: 0
      },
      errorRetry: {
        maxNumRetry: 6,
        retryDelayMs: 500,
        maxRetryDelayMs: 8000
      }
    }
  },
  
  // Manifest Loading Optimization
  manifestLoadPolicy: {
    default: {
      maxTimeToFirstByteMs: 10000,
      maxLoadTimeMs: 20000,
      timeoutRetry: {
        maxNumRetry: 4,
        retryDelayMs: 0, // Immediate retry
        maxRetryDelayMs: 0
      },
      errorRetry: {
        maxNumRetry: 4,
        retryDelayMs: 500,
        maxRetryDelayMs: 8000
      }
    }
  },

  // Performance Optimizations
  nudgeOffset: 0.1, // Small nudge for smoother playback
  maxStarvationDelay: 2, // Reduce from default 4s
  enableWorker: true, // Use web workers for better performance
  enableSoftwareAES: true, // Enable software AES for encrypted streams
  
  // Additional optimizations for good networks
  xhrSetup: (xhr: XMLHttpRequest, url: string) => {
    // Add headers to bypass 403 errors - server requires same-domain referer
    xhr.setRequestHeader('User-Agent', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36');
    xhr.setRequestHeader('Accept', '*/*');
    xhr.setRequestHeader('Accept-Language', 'en-US,en;q=0.9');
    
    // Extract domain from URL and use as referer - this bypasses 403 protection
    try {
      const urlObj = new URL(url);
      const domainReferer = `${urlObj.protocol}//${urlObj.hostname}/`;
      xhr.setRequestHeader('Referer', domainReferer);
    } catch (e) {
      // Fallback if URL parsing fails
      console.warn('Could not parse URL for referer:', url);
    }
  }
} as const;

/**
 * Alternative configuration for live streams
 * Use this for live content that requires lower latency
 */
export const liveStreamHLSConfig = {
  ...optimizedHLSConfig,
  lowLatencyMode: true, // Enable for live streams
  maxBufferLength: 20, // Reduce buffer for live streams
  backBufferLength: 10, // Minimal back buffer for live
  liveSyncDurationCount: 2, // Closer to live edge (default is 3)
  liveMaxLatencyDurationCount: 10, // Maximum acceptable latency
  enableDateRangeMetadataCues: true, // For live metadata
} as const;

/**
 * Configuration for slower network connections
 * Use this when bandwidth is limited
 */
export const conservativeHLSConfig = {
  ...optimizedHLSConfig,
  maxBufferLength: 30, // Smaller buffer for limited bandwidth
  maxBufferSize: 60 * 1000 * 1000, // 60MB buffer
  maxLoadingDelay: 4, // More patient loading
  fragLoadPolicy: {
    default: {
      ...optimizedHLSConfig.fragLoadPolicy.default,
      maxTimeToFirstByteMs: 15000, // Longer timeout for slower connections
      timeoutRetry: {
        maxNumRetry: 2,
        retryDelayMs: 1000, // Add delay for slower connections
        maxRetryDelayMs: 3000
      }
    }
  }
} as const;