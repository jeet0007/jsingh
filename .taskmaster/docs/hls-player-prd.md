# HLS Player Tool - Feature PRD

## Overview

A comprehensive HLS (HTTP Live Streaming) video player tool that allows users to input HLS URLs and enjoy a full-featured video playback experience with history tracking and episode management.

## Core Features

### 1. HLS URL Input & Playback
- **URL Input Field**: Clean, prominent input field for HLS URLs (e.g., `https://hlsx3cdn.echovideo.to/toriko/98/720/index.m3u8`)
- **URL Validation**: Validate HLS URLs before attempting playback
- **Auto-play Support**: Option to auto-play when URL is entered
- **Format Support**: Support for various HLS formats (.m3u8, adaptive bitrate)
- **Error Handling**: Clear error messages for invalid URLs or playback failures

### 2. Video Player Controls
- **Play/Pause**: Standard play/pause functionality
- **Seek Bar**: Interactive progress bar with thumbnail previews
- **Volume Control**: Volume slider with mute/unmute button
- **Fullscreen**: Toggle fullscreen mode
- **Playback Speed**: Speed control (0.5x, 1x, 1.25x, 1.5x, 2x)
- **Quality Selection**: Manual quality/resolution selection when available

### 3. Keyboard Shortcuts
- **Space**: Play/pause toggle
- **K**: Play/pause toggle (YouTube-style)
- **F**: Toggle fullscreen
- **M**: Mute/unmute
- **Arrow Left/Right**: Seek backward/forward (10 seconds)
- **J/L**: Seek backward/forward (10 seconds)
- **Up/Down Arrows**: Volume up/down
- **0-9**: Jump to 0%-90% of video
- **Escape**: Exit fullscreen

### 4. Playback History & Resume
- **Local Storage**: Save playback history in browser's localStorage
- **Resume Playback**: Resume from last watched position
- **History List**: Display recently watched videos with thumbnails
- **Bookmark System**: Allow users to bookmark specific timestamps
- **Watch Progress**: Track and display watch progress percentage
- **Clear History**: Option to clear playback history

### 5. Episode Detection & Auto-Next
- **URL Pattern Recognition**: Detect episode numbers from URL patterns
- **Manual Episode Selection**: Allow users to manually input episode number
- **Auto-Next Episode**: Automatically play next episode when current ends
- **Episode List**: Display available episodes if detectable
- **Series Navigation**: Previous/next episode buttons
- **Episode Bookmark**: Save progress per episode

## Technical Requirements

### Frontend Framework
- **React/Next.js**: Modern React-based implementation
- **TypeScript**: Type-safe development
- **Tailwind CSS**: Responsive, utility-first styling
- **Video.js or React Player**: Robust HLS player library

### Storage & State Management
- **localStorage**: Client-side data persistence
- **Context API/Zustand**: State management for player controls
- **IndexedDB**: For larger data storage if needed

### Video Player Library
- **HLS.js**: Core HLS streaming support
- **Video.js**: Comprehensive video player with plugins
- **Custom Controls**: Overlay controls for better UX

## User Interface Design

### Main Player Interface
```
┌─────────────────────────────────────────────────────┐
│ HLS Player Tool                                     │
├─────────────────────────────────────────────────────┤
│ [Enter HLS URL...                    ] [Play Button]│
├─────────────────────────────────────────────────────┤
│                                                     │
│              Video Player Area                      │
│                                                     │
│  ┌─────────────────────────────────────────────┐   │
│  │                                             │   │
│  │           Video Content                     │   │
│  │                                             │   │
│  │  ┌─────────────────────────────────────┐   │   │
│  │  │ [▶] ████████████░░░░░░░░ 45:32/1:23:15│   │   │
│  │  │ [🔊] ████░░░░░░ [⚙] [⛶]              │   │   │
│  │  └─────────────────────────────────────┘   │   │
│  └─────────────────────────────────────────────┘   │
├─────────────────────────────────────────────────────┤
│ Episode: [Current Episode] [◀ Prev] [Next ▶]       │
├─────────────────────────────────────────────────────┤
│ Recent History:                                     │
│ • Video 1 (Episode 15) - 67% watched              │
│ • Video 2 (Episode 8) - 23% watched               │
│ • Video 3 (Episode 22) - 100% watched             │
└─────────────────────────────────────────────────────┘
```

### Episode Management Panel
```
┌─────────────────────────────────────┐
│ Episode Detection                   │
├─────────────────────────────────────┤
│ Auto-detected: Episode 98           │
│ Series: Toriko                      │
│                                     │
│ Manual Override:                    │
│ Episode Number: [98    ]            │
│ Series Name: [Toriko   ]            │
│                                     │
│ □ Auto-play next episode            │
│ □ Show episode list                 │
└─────────────────────────────────────┘
```

## Data Models

### PlaybackHistory
```typescript
interface PlaybackHistory {
  id: string;
  url: string;
  title?: string;
  series?: string;
  episode?: number;
  currentTime: number;
  duration: number;
  watchProgress: number; // 0-100%
  lastWatched: Date;
  thumbnail?: string;
}
```

### EpisodeInfo
```typescript
interface EpisodeInfo {
  series: string;
  episode: number;
  title?: string;
  baseUrl: string;
  urlPattern: string;
  totalEpisodes?: number;
}
```

### PlayerSettings
```typescript
interface PlayerSettings {
  autoPlay: boolean;
  defaultVolume: number;
  preferredQuality: string;
  keyboardShortcuts: boolean;
  autoNext: boolean;
  resumePlayback: boolean;
}
```

## Implementation Phases

### Phase 1: Core Player (MVP)
- Basic HLS URL input and playback
- Essential video controls (play, pause, seek, volume)
- Keyboard shortcuts implementation
- Basic localStorage for history

### Phase 2: Enhanced Features
- Advanced player controls (speed, quality)
- Comprehensive keyboard shortcuts
- Resume playback functionality
- History management interface

### Phase 3: Episode Management
- URL pattern recognition for episodes
- Auto-next episode functionality
- Episode list and navigation
- Series tracking and bookmarking

### Phase 4: Polish & Optimization
- Responsive design optimization
- Performance improvements
- Error handling and edge cases
- User experience enhancements

## Technical Considerations

### HLS Compatibility
- Cross-browser HLS support via HLS.js
- Fallback for browsers without native HLS support
- Adaptive bitrate streaming support
- DRM consideration for protected content

### URL Pattern Recognition
- Regex patterns for common episode numbering schemes
- Support for various URL structures
- Fallback to manual episode input
- Pattern learning from user corrections

### Performance Optimization
- Efficient localStorage usage
- Video preloading strategies
- Thumbnail generation for history
- Memory management for long sessions

### Security & Privacy
- URL validation to prevent XSS
- Client-side only data storage
- No server-side data collection
- Secure iframe embedding if needed

## Success Metrics

### User Engagement
- Average session duration
- Resume rate (users resuming previous videos)
- Episode completion rate
- Feature usage (keyboard shortcuts, auto-next)

### Technical Performance
- Page load time
- Video startup time
- Error rate for URL playback
- Cross-browser compatibility

## Future Enhancements

### Advanced Features
- Playlist management
- Video download for offline viewing
- Social sharing capabilities
- Comment system integration

### Integration Features
- API integration for metadata
- Subtitle support (.srt, .vtt)
- Multiple audio track support
- Chromecast/AirPlay support

### Analytics & Insights
- Watch time analytics
- Popular episode tracking
- User behavior insights
- Performance monitoring

## Acceptance Criteria

### Core Functionality
- [ ] Users can input HLS URLs and play videos successfully
- [ ] All keyboard shortcuts work as specified
- [ ] Playback history is saved and accessible
- [ ] Resume functionality works correctly
- [ ] Episode detection works for common URL patterns

### User Experience
- [ ] Interface is intuitive and responsive
- [ ] Loading states are clear and informative
- [ ] Error messages are helpful and actionable
- [ ] Player controls are accessible and keyboard-friendly

### Technical Requirements
- [ ] Works across major browsers (Chrome, Firefox, Safari, Edge)
- [ ] Handles various HLS formats correctly
- [ ] Data persists correctly in localStorage
- [ ] No memory leaks during extended use
- [ ] Graceful handling of network interruptions

This HLS Player tool will provide users with a comprehensive, feature-rich video streaming experience while maintaining simplicity and ease of use.