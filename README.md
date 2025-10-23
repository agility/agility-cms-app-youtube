# Agility CMS YouTube Video Field App

A custom field application for Agility CMS that enables content editors to easily embed and manage YouTube videos directly within their content. Built with the Agility Apps SDK v2, this app provides a seamless experience for adding YouTube videos with automatic metadata fetching and live previews.

![YouTube App](https://img.shields.io/badge/YouTube-FF0000?style=for-the-badge&logo=youtube&logoColor=white)
![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=next.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

## 🎥 Features

### **URL Input & Validation**

-   Simple paste-and-go interface for YouTube URLs
-   Supports multiple URL formats:
    -   `https://www.youtube.com/watch?v=dQw4w9WgXcQ`
    -   `https://youtu.be/dQw4w9WgXcQ`
    -   `https://youtube.com/embed/dQw4w9WgXcQ`
    -   `https://m.youtube.com/watch?v=dQw4w9WgXcQ`
-   Automatic video ID extraction and validation

### **Automatic Metadata Fetching**

-   Uses YouTube's public oEmbed API to retrieve:
    -   Video title
    -   Thumbnail image
    -   Video dimensions (width/height)
    -   Author information (channel name and URL)
    -   Provider information
-   No API keys required for public videos

### **Live Video Preview**

-   Embedded YouTube player using YouTube's standard embed iframe
-   Full playback controls
-   Responsive player that adapts to container size
-   Support for all YouTube player features

### **Responsive Design**

-   **Desktop (≥600px)**: Side-by-side layout with video and details
-   **Mobile (<600px)**: Stacked layout for optimal mobile viewing
-   Automatically adjusts iframe height using `useResizeHeight()`

### **Complete Data Storage**

-   Stores full video metadata as structured JSON
-   Easy access to video information in templates and API responses
-   Persistent storage across content edits

## 🚀 Quick Start

### Installation

1. **Clone the repository**

    ```bash
    git clone https://github.com/agility/agility-cms-app-youtube.git
    cd agility-cms-app-youtube
    ```

2. **Install dependencies**

    ```bash
    npm install
    # or
    yarn install
    ```

3. **Run the development server**

    ```bash
    npm run dev
    # or
    yarn dev
    ```

4. **Open in browser**
   Navigate to [http://localhost:3001](http://localhost:3001)

### Testing the Field

1. Navigate to `/fields/youtube-field` in your browser
2. Paste a YouTube URL (try: `https://www.youtube.com/watch?v=dQw4w9WgXcQ`)
3. Click "Fetch" to load the video
4. Preview the video and see the metadata

## 📁 Project Structure

```
app/
├── fields/
│   └── youtube-field/
│       └── page.tsx              # Main YouTube field component
├── api/
│   ├── app-uninstall/
│   │   └── route.ts              # Uninstall webhook handler
│   └── hello/
│       └── route.ts              # Health check endpoint
├── layout.tsx                    # Root layout with permissions policy
└── page.tsx                      # Home page with app documentation

components/
└── CommonDashboard.tsx           # Shared dashboard component

public/
└── .well-known/
    └── agility-app.json          # App definition file

styles/
└── globals.css                   # Global styles with Tailwind
```

## 🔧 Technical Implementation

### Core Dependencies

```json
{
	"@agility/app-sdk": "^2.1.0",
	"next": "16.0.0",
	"react": "19.2.0",
	"typescript": "^5.5.4"
}
```

### Key Hooks & Methods Used

#### `useAgilityAppSDK()`

Access SDK functionality and field data:

```typescript
const { initializing, fieldValue } = useAgilityAppSDK()
```

#### `useResizeHeight()`

Automatically adjust iframe height:

```typescript
const containerRef = useResizeHeight(10)
return <div ref={containerRef}>...</div>
```

#### `contentItemMethods.setFieldValue()`

Save video data to the field:

```typescript
contentItemMethods.setFieldValue({
	value: JSON.stringify(videoData)
})
```

### Data Structure

The field stores video data as JSON:

```typescript
interface YouTubeVideoData {
	url: string
	title: string
	author_name: string
	author_url: string
	type: string
	height: number
	width: number
	version: string
	provider_name: string
	provider_url: string
	thumbnail_height: number
	thumbnail_width: number
	thumbnail_url: string
	html: string
	video_id: string
}
```

### YouTube Player Integration

```typescript
// Using the YouTube Player API
const loadYouTubePlayer = (videoId: string) => {
	// Load the YouTube Player API
	const tag = document.createElement("script")
	tag.src = "https://www.youtube.com/iframe_api"
	document.head.appendChild(tag)

	// Initialize player when API is ready
	window.onYouTubeIframeAPIReady = () => {
		new window.YT.Player("player", {
			videoId: videoId,
			width: 640,
			height: 360,
			events: {
				onReady: (event) => {
					console.log("Player is ready")
				}
			}
		})
	}
}
```

## 🔐 Permissions Policy

The app includes proper Permissions Policy headers to avoid browser console warnings:

```typescript
// next.config.js
headers: [
	{
		key: "Permissions-Policy",
		value: "autoplay=*, encrypted-media=*, fullscreen=*, clipboard-write=*, web-share=*"
	}
]
```

Permissions enabled:

-   **autoplay**: Allow video autoplay
-   **encrypted-media**: Support DRM content
-   **fullscreen**: Enable fullscreen video
-   **clipboard-write**: Allow copying URLs
-   **web-share**: Enable sharing features

### App Definition

The app definition is served at `/.well-known/agility-app.json` and includes:

```json
{
	"name": "YouTube Video Field",
	"version": "1.0.0",
	"description": "Embed and manage YouTube videos",
	"surfaces": {
		"fields": [
			{
				"name": "youtube-field",
				"displayName": "YouTube Video",
				"path": "/fields/youtube-field"
			}
		]
	}
}
```

## 🐛 Troubleshooting

### Player Not Loading

Check the browser console for errors:

-   **"Invalid YouTube URL"**: URL format is incorrect
-   **"Failed to fetch video data"**: Video may be private or network issue
-   **"Unable to load video player"**: Player initialization failed

### Console Warnings

Permissions policy warnings have been resolved. If you still see them:

1. Clear browser cache
2. Restart development server
3. Check `next.config.js` headers configuration

### Testing Public Videos

Use these URLs for testing:

-   `https://www.youtube.com/watch?v=dQw4w9WgXcQ`
-   `https://youtu.be/jNQXAC9IVRw`

See [YOUTUBE_FIELD_USAGE.md](./YOUTUBE_FIELD_USAGE.md) for detailed debugging information.

## 📚 Documentation

-   **[YOUTUBE_FIELD_USAGE.md](./YOUTUBE_FIELD_USAGE.md)** - Detailed usage guide
-   [Agility CMS Apps Documentation](https://agilitycms.com/docs/apps)
-   [Agility Apps SDK v2](https://github.com/agility/agility-cms-app-sdk)
-   [YouTube Player API](https://developers.google.com/youtube/iframe_api_reference)
-   [YouTube oEmbed API](https://developers.google.com/youtube/player_parameters#oembed)

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

-   Built with [Agility CMS](https://agilitycms.com)
-   Video player by [YouTube](https://youtube.com)
-   Powered by [Next.js](https://nextjs.org)
-   Styled with [Tailwind CSS](https://tailwindcss.com)

---

Made with ❤️ for the Agility CMS community
