# YouTube

The YouTube App for Agility enables users to seamlessly search, select, and embed YouTube videos directly into their content with automatic metadata fetching and live previews.

YouTube is the world's largest video hosting platform that enables you to deliver high-quality video experiences to your audience. With billions of videos, powerful analytics, and reliable streaming, YouTube is trusted by creators and businesses worldwide.

This integration makes publishing Agility content with YouTube videos quick and easy.

## Features

-   Embed YouTube videos directly from Agility CMS content
-   Automatic video metadata fetching via YouTube's oEmbed API
-   Live video preview using the standard YouTube embed player
-   Support for multiple YouTube URL formats
-   Stores complete video metadata in a JSON object which is returned from the Agility API
-   Responsive design that works on desktop and mobile devices
-   No API keys required for public videos

## The YouTube Video Field

Renders a Video field that allows you to embed YouTube videos in your content.

When you click the field, you can paste any YouTube video URL, and the app will automatically fetch the video details and display a live preview.

The field supports various YouTube URL formats:

-   `https://www.youtube.com/watch?v=dQw4w9WgXcQ`
-   `https://youtu.be/dQw4w9WgXcQ`
-   `https://youtube.com/embed/dQw4w9WgXcQ`
-   `https://m.youtube.com/watch?v=dQw4w9WgXcQ`

## Requirements

In order to use this integration, some set up is required.

-   Ensure you have a [Agility CMS](https://agilitycms.com/trial/) account
-   A [YouTube](https://youtube.com) account (optional - required only if you want to upload videos)
-   Install the app from the Marketplace
-   Create Content Models that use the YouTube Video custom field
-   Output/render the YouTube videos in your digital solution (i.e. website or app)

## Install the App

You can install the app from the Settings / Apps section of Agility.

1. Navigate to **Settings** > **Apps**
2. Click **Install** on the YouTube Video Field app
3. The app will be available immediately for use in your Content Models

## Set Up Content Models to use YouTube Fields

In order to use YouTube fields, you need to have Content Models or Page Modules in Agility CMS that utilize this new field type.

Add a YouTube field to any Content Model in Agility CMS:

-   Navigate to **Models** > **Content Models** > **{Your Content Model}**
-   Click **Add Field**
    -   Field Name: YouTube Video
    -   Field Type: Custom Field
    -   Custom Field Type: YouTube Video

Next, create some content using your Content Model:

-   Navigate to an instance of your content that is based off your Content Model
-   Click **+ New**
-   Fill out the fields
    -   On the YouTube Video field, paste a YouTube video URL (e.g., `https://www.youtube.com/watch?v=dQw4w9WgXcQ`)
    -   Click **Fetch** to load the video details
    -   The video will appear with a live preview and complete metadata
    -   Click **Save** to save your content

## Render/Output the YouTube Videos in your Solution

Now that you've set up the field and allow editors to embed YouTube videos, the next thing you'll need to do is actually output these fields in your digital solution (i.e. website or app).

The value for a YouTube Video field will be a JSON string returned from the Content Fetch or GraphQL API.

### YouTube Field Values

In order to properly read your YouTube video data, you'll need to parse the string to an object.

In JavaScript, this can be accomplished using `JSON.parse(youtubeVideoFieldValue)`.

### API Response Format

```json
{
	// The original YouTube URL
	"url": "https://www.youtube.com/watch?v=dQw4w9WgXcQ",

	// Video title
	"title": "Rick Astley - Never Gonna Give You Up (Official Video)",

	// Author information (channel)
	"author_name": "Rick Astley",
	"author_url": "https://www.youtube.com/@RickAstleyYT",

	// Video type
	"type": "video",

	// Video dimensions
	"height": 360,
	"width": 640,

	// API version
	"version": "1.0",

	// Provider information
	"provider_name": "YouTube",
	"provider_url": "https://www.youtube.com/",

	// Thumbnail information
	"thumbnail_height": 360,
	"thumbnail_width": 480,
	"thumbnail_url": "https://i.ytimg.com/vi/dQw4w9WgXcQ/hqdefault.jpg",

	// Embed HTML code
	"html": "<iframe width=\"640\" height=\"360\" src=\"https://www.youtube.com/embed/dQw4w9WgXcQ?feature=oembed\" frameborder=\"0\" allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share\" allowfullscreen></iframe>",

	// YouTube video ID
	"video_id": "dQw4w9WgXcQ"
}
}
```

### Rendering Example

Here's an example of how to render a YouTube video field in a Next.js application:

```jsx
import React from "react"

const YouTubeVideo = ({ fieldValue }) => {
	// Parse the JSON string
	const videoData = JSON.parse(fieldValue)

	if (!videoData || !videoData.video_id) {
		return null
	}

	return (
		<div className="youtube-video">
			<h2>{videoData.title}</h2>

			{/* Responsive video container */}
			<div
				className="video-container"
				style={{
					position: "relative",
					paddingBottom: "56.25%", // 16:9 aspect ratio
					height: 0,
					overflow: "hidden"
				}}
			>
				<iframe
					src={`https://www.youtube.com/embed/${videoData.video_id}`}
					style={{
						position: "absolute",
						top: 0,
						left: 0,
						width: "100%",
						height: "100%"
					}}
					frameBorder="0"
					allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
					allowFullScreen
				/>
			</div>

			{/* Video metadata */}
			{videoData.author_name && (
				<p className="author">
					By{" "}
					<a href={videoData.author_url} target="_blank" rel="noopener noreferrer">
						{videoData.author_name}
					</a>
				</p>
			)}
		</div>
	)
}

export default YouTubeVideo
```

### Using the YouTube Player API

For more advanced use cases, you can use the official [YouTube Player API](https://developers.google.com/youtube/iframe_api_reference) to have programmatic control over the video player:

```jsx
import React, { useEffect, useRef } from "react"

const YouTubePlayerAdvanced = ({ fieldValue }) => {
	const videoData = JSON.parse(fieldValue)
	const playerRef = useRef(null)
	const youtubePlayerRef = useRef(null)

	useEffect(() => {
		// Load the YouTube Player API
		if (!window.YT) {
			const tag = document.createElement("script")
			tag.src = "https://www.youtube.com/iframe_api"
			const firstScriptTag = document.getElementsByTagName("script")[0]
			firstScriptTag.parentNode.insertBefore(tag, firstScriptTag)
		}

		// Initialize the YouTube player when API is ready
		window.onYouTubeIframeAPIReady = () => {
			if (playerRef.current && videoData.video_id) {
				youtubePlayerRef.current = new window.YT.Player(playerRef.current, {
					videoId: videoData.video_id,
					width: 640,
					height: 360,
					events: {
						onReady: (event) => {
							console.log("YouTube player ready")
						},
						onStateChange: (event) => {
							if (event.data === window.YT.PlayerState.PLAYING) {
								console.log("Video started playing")
							}
							if (event.data === window.YT.PlayerState.ENDED) {
								console.log("Video ended")
							}
						}
					}
				})
			}
		}

		// If API is already loaded
		if (window.YT && window.YT.Player) {
			window.onYouTubeIframeAPIReady()
		}

		// Cleanup
		return () => {
			if (youtubePlayerRef.current && youtubePlayerRef.current.destroy) {
				youtubePlayerRef.current.destroy()
			}
		}
	}, [videoData.video_id])

	return (
		<div>
			<h2>{videoData.title}</h2>
			<div ref={playerRef}></div>
		</div>
	)
}

export default YouTubePlayerAdvanced
```

To use the YouTube Player API, you don't need to install additional packages as it's loaded directly from YouTube:

```html
<!-- The API script is loaded automatically in the component above -->
<script src="https://www.youtube.com/iframe_api"></script>
```

### Displaying Video Thumbnails

You can also use the thumbnail URL to display video previews in listings or grids:

```jsx
const VideoThumbnail = ({ fieldValue }) => {
	const videoData = JSON.parse(fieldValue)

	return (
		<div className="video-thumbnail">
			<img
				src={videoData.thumbnail_url}
				alt={videoData.title}
				width={videoData.thumbnail_width}
				height={videoData.thumbnail_height}
			/>
			<h3>{videoData.title}</h3>
			<p>Channel: {videoData.author_name}</p>
		</div>
	)
}
```

### Using YouTube Libraries

YouTube provides official APIs and libraries to help you work with their platform:

-   [YouTube Player API](https://developers.google.com/youtube/iframe_api_reference) - Official JavaScript API for embedding and controlling YouTube videos
-   [YouTube Data API](https://developers.google.com/youtube/v3) - Full API documentation for advanced integrations
-   [React YouTube](https://www.npmjs.com/package/react-youtube) - Popular React component for YouTube videos
-   [Vue YouTube](https://github.com/anteriovieira/vue-youtube) - Vue.js component for YouTube videos

For comprehensive documentation and advanced features, visit the [YouTube Developers Portal](https://developers.google.com/youtube).

## Best Practices

### Performance Optimization

-   Use the thumbnail URL for video previews in list views to avoid loading multiple video players
-   Implement lazy loading for videos that are below the fold
-   Consider using the `loading="lazy"` attribute on iframes (where supported)

### Accessibility

-   Always include the video title in your markup for screen readers
-   Ensure the YouTube player is keyboard accessible (this is built-in to YouTube's player)
-   Provide captions when available (YouTube supports closed captions and auto-generated captions)

### Privacy and GDPR

-   YouTube offers privacy controls for your videos
-   Consider using YouTube's privacy-enhanced mode (`youtube-nocookie.com`) for GDPR compliance
-   Learn more at [YouTube's Privacy Policy](https://policies.google.com/privacy)

## Troubleshooting

### Video Not Loading

-   Ensure the YouTube video is set to **Public** or **Unlisted** and that you have the appropriate permissions
-   Check that the URL is correctly formatted
-   Verify that the video has not been deleted from YouTube or made private

### Metadata Not Fetching

-   The app uses YouTube's public oEmbed API which only works with public and unlisted videos
-   If you're using private videos, they will not work with the oEmbed API
-   Check your network connection and ensure YouTube's API is accessible

### Player Issues

-   Ensure your browser supports HTML5 video
-   Check that you're not blocking iframes or third-party content
-   Clear your browser cache and try again
-   Some videos may have embedding restrictions set by the video owner

## Support

For issues related to:

-   **The Agility CMS YouTube App**: Contact [Agility CMS Support](https://help.agilitycms.com/)
-   **YouTube Platform**: Visit [YouTube Help Center](https://support.google.com/youtube)
-   **Video Hosting**: Check [YouTube's Creator Documentation](https://support.google.com/youtube/topic/9257530)

## Related Resources

-   [Agility CMS Apps Documentation](https://agilitycms.com/docs/apps)
-   [Agility CMS Content Fetch API](https://agilitycms.com/docs/content-fetch-api)
-   [YouTube Developer Documentation](https://developers.google.com/youtube)
-   [YouTube Player API Documentation](https://developers.google.com/youtube/iframe_api_reference)
