export const metadata = {
  title: 'Gallery - Idaho Broadcasting Foundation',
  description: 'Multimedia gallery of Idaho broadcasting history',
}

export const dynamic = 'force-dynamic'

export default function GalleryPage() {
  return (
    <div className="min-h-screen bg-white py-32">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center">
        <h1 className="text-4xl font-bold text-slate-900 mb-4">Gallery</h1>
        <p className="text-slate-700">Videos and photos coming soon.</p>
      </div>
    </div>
  )
}
