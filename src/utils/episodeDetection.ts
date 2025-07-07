import { EpisodeInfo } from '../types';

// Episode detection patterns
export const EPISODE_PATTERNS = [
  { name: 'Slash Format', pattern: /\/(\w+)\/(\d+)\//i, seriesIndex: 1, episodeIndex: 2 },
  { name: 'Episode Prefix', pattern: /\/episode[_-]?(\d+)/i, episodeIndex: 1 },
  { name: 'EP Prefix', pattern: /\/ep[_-]?(\d+)/i, episodeIndex: 1 },
  { name: 'Underscore Format', pattern: /[_-](\d+)[_-]/i, episodeIndex: 1 },
  { name: 'Quality Format', pattern: /(\d+)\/\d+p?\/index\.m3u8/i, episodeIndex: 1 },
  { name: 'Simple Number', pattern: /\/(\d+)\/[^\/]*\.m3u8/i, episodeIndex: 1 },
];

export const detectEpisodeFromURL = (url: string): EpisodeInfo | null => {
  try {
    const urlObj = new URL(url);
    const pathname = urlObj.pathname;

    for (const pattern of EPISODE_PATTERNS) {
      const match = pathname.match(pattern.pattern);
      if (match) {
        const episodeNumber = parseInt(match[pattern.episodeIndex], 10);
        if (!isNaN(episodeNumber)) {
          // Extract series name
          let seriesName = 'Unknown Series';
          
          if (pattern.seriesIndex && match[pattern.seriesIndex]) {
            seriesName = match[pattern.seriesIndex];
          } else {
            // Try to extract from path
            const pathParts = pathname.split('/').filter(Boolean);
            if (pathParts.length > 0) {
              seriesName = pathParts[0].replace(/[_-]/g, ' ');
            }
          }

          // Generate URL pattern for auto-next using the matched section
          const matchedEpisodeStr = match[pattern.episodeIndex];
          const urlPattern = url.replace(matchedEpisodeStr, '{episode}');

          return {
            series: seriesName,
            episode: episodeNumber,
            baseUrl: url.substring(0, url.lastIndexOf('/') + 1),
            urlPattern,
          };
        }
      }
    }
  } catch (error) {
    // Silently handle error
  }

  return null;
};

export const generateEpisodeURL = (episodeInfo: EpisodeInfo, newEpisode: number): string => {
  return episodeInfo.urlPattern.replace('{episode}', newEpisode.toString());
};