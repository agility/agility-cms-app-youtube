# YouTube Field Component

This component creates a YouTube video field for Agility CMS that allows users to:

1. **Input YouTube URLs** - Paste any YouTube video URL
2. **Fetch Video Details** - Automatically retrieve video metadata via YouTube's oEmbed API
3. **Preview Videos** - Display the video using the standard YouTube embed
4. **Store Video Data** - Save complete video information as JSON in the field value

## Features

### URL Input

-   Accepts various YouTube URL formats:
    -   `https://www.youtube.com/watch?v=dQw4w9WgXcQ`
    -   `https://youtu.be/dQw4w9WgXcQ`
    -   `https://youtube.com/embed/dQw4w9WgXcQ`
    -   `https://m.youtube.com/watch?v=dQw4w9WgXcQ`

### Video Preview

-   Embedded YouTube player using standard iframe embed
-   Responsive design (640x360 default, scales down)
-   Full player controls and functionality

### Video Details Display

-   Video title
-   Author name (channel) and profile link
-   Video dimensions (width/height)
-   Thumbnail information
-   Direct link to video
-   Provider information

### Data Storage

The field stores a JSON object with complete video metadata:

```json
{
	"url": "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
	"title": "Rick Astley - Never Gonna Give You Up (Official Video)",
	"author_name": "Rick Astley",
	"author_url": "https://www.youtube.com/@RickAstleyYT",
	"type": "video",
	"height": 360,
	"width": 640,
	"version": "1.0",
	"provider_name": "YouTube",
	"provider_url": "https://www.youtube.com/",
	"thumbnail_height": 360,
	"thumbnail_width": 480,
	"thumbnail_url": "https://i.ytimg.com/vi/dQw4w9WgXcQ/hqdefault.jpg",
	"html": "<iframe width=\"640\" height=\"360\" src=\"https://www.youtube.com/embed/dQw4w9WgXcQ?feature=oembed\" ...",
	"video_id": "dQw4w9WgXcQ"
}
```

## Usage

1. **Add URL**: Paste a YouTube video URL into the input field
2. **Fetch Video**: Click "Fetch" to retrieve video details
3. **Preview**: The video will automatically load in the embedded player
4. **Remove**: Click "Remove" to clear the video and start over

## Technical Details

### Dependencies

-   No external player libraries required
-   Uses YouTube's standard iframe embed
-   Built with React and TypeScript

### API Usage

-   Uses YouTube's public oEmbed API: `https://www.youtube.com/oembed`
-   No authentication required for public videos
-   Supports responsive embeds

### Error Handling

-   Invalid URL detection
-   Network error handling
-   Graceful fallbacks for missing data

## Installation

The component is ready to use with the existing project setup. No additional dependencies required beyond the base Agility App SDK.

## Browser Support

Works with all modern browsers that support:

-   ES6+ JavaScript features
-   HTML5 video
-   YouTube's iframe embed player
