'use client'

import { useAgilityAppSDK, contentItemMethods, useResizeHeight } from "@agility/app-sdk"
import { useState, useEffect, useRef } from "react"

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

export default function YouTubeField() {
	const { initializing, appInstallContext, fieldValue } = useAgilityAppSDK()
	const containerRef = useResizeHeight(10)
	const [inputUrl, setInputUrl] = useState("")
	const [videoData, setVideoData] = useState<YouTubeVideoData | null>(null)
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState("")

	// Initialize from existing field value
	useEffect(() => {
		if (fieldValue && typeof fieldValue === 'string') {
			try {
				const parsed = JSON.parse(fieldValue)
				if (parsed && parsed.url) {
					setVideoData(parsed)
					setInputUrl(parsed.url)
				}
			} catch (e) {
				console.error('Failed to parse field value:', e)
			}
		}
	}, [fieldValue])



	const extractYouTubeId = (url: string): string | null => {
		const regex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/
		const match = url.match(regex)
		return match ? match[1] : null
	}

	const fetchVideoData = async (url: string) => {
		setLoading(true)
		setError("")

		try {
			const youtubeId = extractYouTubeId(url)
			if (!youtubeId) {
				throw new Error("Invalid YouTube URL")
			}

			const oembedUrl = `https://www.youtube.com/oembed?url=${encodeURIComponent(url)}&format=json&maxwidth=640&maxheight=360`
			const response = await fetch(oembedUrl)

			if (!response.ok) {
				throw new Error("Failed to fetch video data")
			}

			const data = await response.json()

			console.log("Fetched video data:", data);

			const videoData: YouTubeVideoData = {
				...data,
				url: url,
				video_id: youtubeId
			}

			setVideoData(videoData)
			contentItemMethods.setFieldValue({ value: JSON.stringify(videoData) })
		} catch (err) {
			setError(err instanceof Error ? err.message : "An error occurred")
		} finally {
			setLoading(false)
		}
	}

	const handleUrlSubmit = (e: React.FormEvent) => {
		e.preventDefault()
		if (inputUrl.trim()) {
			fetchVideoData(inputUrl.trim())
		}
	}

	const clearVideo = () => {
		setVideoData(null)
		setInputUrl("")
		contentItemMethods.setFieldValue({ value: "" })

	}

	if (initializing) return null

	return (
		<div ref={containerRef} className="min-h-[200px]">
			<div className="space-y-4 ">


				{/* Error Message */}
				{error && (
					<div className="p-3 bg-red-50 border border-red-200 rounded-md">
						<p className="text-sm text-red-600">{error}</p>
					</div>
				)}

				{/* Video Preview */}
				{videoData && (
					<div className="border border-gray-200 rounded-lg overflow-hidden">
						{/* Responsive container: side-by-side on >=600px, stacked on <600px */}
						<div className="flex flex-col sm:flex-row">
							{/* Video Player */}
							<div className="sm:w-1/2 w-full min-h-[200px]">
								<div className="video-container relative h-full min-h-[200px]" dangerouslySetInnerHTML={{ __html: videoData.html }}></div>

							</div>

							{/* Video Details */}
							<div className="sm:w-1/2 p-4 ">
								<div className="flex justify-between items-start mb-3">
									<h3 className="text-lg font-semibold text-gray-900">
										{videoData.title}
									</h3>
									<button
										onClick={clearVideo}
										className="text-red-600 hover:text-red-800 text-sm"
									>
										Remove
									</button>
								</div>

								<div className="grid grid-cols-1 gap-2 text-xs text-gray-500">
									<div>
										<span className="font-medium">Type:</span> {videoData.type}
									</div>
									<div>
										<span className="font-medium">Provider:</span> {videoData.provider_name}
									</div>
									<div>
										<span className="font-medium">Width:</span> {videoData.width}
									</div>
									<div>
										<span className="font-medium">Height:</span> {videoData.height}
									</div>
									<div>
										<span className="font-medium">Thumbnail:</span> {videoData.thumbnail_width} x {videoData.thumbnail_height}
									</div>
									<div>
										<span className="font-medium">URL:</span>{" "}
										<a
											href={videoData.url}
											target="_blank"
											rel="noopener noreferrer"
											className="text-blue-600 hover:text-blue-800 break-all"
										>
											{videoData.url}
										</a>
									</div>
									<div>
										<span className="font-medium">Author:</span>{" "}
										<a
											href={videoData.author_url}
											target="_blank"
											rel="noopener noreferrer"
											className="text-blue-600 hover:text-blue-800"
										>
											{videoData.author_name}
										</a>
									</div>
								</div>
							</div>
						</div>
					</div>
				)}

				{/* Empty State */}
				{!videoData && !loading && (
					<>
						{/* URL Input Form */}
						<form onSubmit={handleUrlSubmit} className="space-y-2 text-sm p-1">
							<label className="block text-sm font-medium text-gray-700">
								YouTube Video URL
							</label>
							<div className="flex gap-2">
								<input
									type="url"
									value={inputUrl}
									onChange={(e) => setInputUrl(e.target.value)}
									placeholder="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
									className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent"
									disabled={loading}
								/>
								<button
									type="submit"
									disabled={loading || !inputUrl.trim()}
									className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
								>
									{loading ? "Loading..." : "Fetch"}
								</button>
							</div>
						</form>
						<div className="text-center py-8 border-2 border-dashed border-gray-300 rounded-lg">



							<div className="text-gray-500">

								<svg className="mx-auto h-10 w-10 text-red-600" fill="currentColor" viewBox="0 0 24 24">
									<path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
								</svg>
								<p className="mt-2 text-sm">Enter a YouTube URL to preview the video</p>
							</div>
						</div>
					</>
				)}
			</div>
		</div >
	)
}
