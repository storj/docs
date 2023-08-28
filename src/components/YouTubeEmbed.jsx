'use client'

import YouTube from 'react-youtube'

export default function YouTubeEmbed({ videoId }) {
  return (
    <YouTube
      videoId={videoId}
      opts={{ host: 'https://www.youtube-nocookie.com' }}
      className="youtubeContainer"
    />
  )
}
