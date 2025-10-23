export default function Home() {
	return (
		<main className="m-10">
			<h1 className="text-3xl font-bold mb-6">YouTube Video Field App</h1>

			<div className="space-y-4 max-w-4xl">
				<p className="text-lg text-gray-700">
					This Agility CMS app provides a powerful YouTube video field that allows content editors to easily embed and manage YouTube videos in their content.
				</p>

				<div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
					<h2 className="text-xl font-semibold mb-3 text-blue-900">Key Features</h2>
					<ul className="space-y-2 text-gray-700">
						<li className="flex items-start">
							<span className="text-blue-600 mr-2">•</span>
							<span><strong>URL Input & Validation:</strong> Simply paste any YouTube video URL and the app automatically validates and extracts video information</span>
						</li>
						<li className="flex items-start">
							<span className="text-blue-600 mr-2">•</span>
							<span><strong>Automatic Metadata Fetching:</strong> Uses YouTube's oEmbed API to retrieve video title, thumbnail, author details, and video dimensions</span>
						</li>
						<li className="flex items-start">
							<span className="text-blue-600 mr-2">•</span>
							<span><strong>Live Video Preview:</strong> Embedded YouTube player using YouTube's standard iframe embed for seamless video playback</span>
						</li>
						<li className="flex items-start">
							<span className="text-blue-600 mr-2">•</span>
							<span><strong>Responsive Design:</strong> Side-by-side layout on desktop (≥600px) and stacked layout on mobile devices</span>
						</li>
						<li className="flex items-start">
							<span className="text-blue-600 mr-2">•</span>
							<span><strong>Complete Data Storage:</strong> Saves full video metadata as JSON for use in templates and API responses</span>
						</li>
					</ul>
				</div>

				<div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
					<h2 className="text-xl font-semibold mb-3 text-gray-900">How It Works</h2>
					<ol className="space-y-2 text-gray-700 list-decimal list-inside">
						<li>Content editors paste a YouTube video URL into the field</li>
						<li>The app validates the URL and extracts the video ID</li>
						<li>Video metadata is fetched from YouTube's public oEmbed API</li>
						<li>A live preview appears with the embedded YouTube player</li>
						<li>Video details are displayed alongside the player</li>
						<li>All data is stored as structured JSON in the field value</li>
					</ol>
				</div>

				<div className="bg-green-50 border border-green-200 rounded-lg p-6">
					<h2 className="text-xl font-semibold mb-3 text-green-900">Supported Video Types</h2>
					<ul className="space-y-2 text-gray-700">
						<li className="flex items-start">
							<span className="text-green-600 mr-2">✓</span>
							<span>Public YouTube videos</span>
						</li>
						<li className="flex items-start">
							<span className="text-green-600 mr-2">✓</span>
							<span>Unlisted YouTube videos (with proper URL)</span>
						</li>
						<li className="flex items-start">
							<span className="text-green-600 mr-2">✓</span>
							<span>Various YouTube URL formats (youtube.com, youtu.be, m.youtube.com)</span>
						</li>
					</ul>
				</div>

				<div className="border-t border-gray-200 pt-6">
					<p className="text-sm text-gray-600">
						Built with the Agility App SDK v2, this app demonstrates modern field component development with React, TypeScript, and Tailwind CSS.
						View the app definition{" "}
						<a className="text-blue-500 hover:text-blue-600 underline" href="/.well-known/agility-app.json">
							here
						</a>.
					</p>
				</div>
			</div>
		</main>
	)
}
