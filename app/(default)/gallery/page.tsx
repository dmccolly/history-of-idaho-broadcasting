export const metadata = {
  title: 'Gallery - Idaho Broadcasting Foundation',
  description: 'Multimedia gallery of Idaho broadcasting history',
}

export const dynamic = 'force-dynamic'

export default function GalleryPage() {
  const videos = [
    '76979871',
    '22439234',
    '357274472',
    '60594348',
    '29865111',
    '146022717',
  ]

  return (
    <div className="min-h-screen bg-white py-32">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <h1 className="text-4xl font-bold text-slate-900 mb-8 text-center">
          Gallery
        </h1>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {videos.map((id) => (
            <div key={id} className="relative pb-[56.25%]">
              <iframe
                src={`https://player.vimeo.com/video/${id}`}
                className="absolute top-0 left-0 w-full h-full rounded-lg"
                frameBorder="0"
                allow="autoplay; fullscreen; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
