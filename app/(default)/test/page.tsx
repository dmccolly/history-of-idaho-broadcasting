export default function TestPage() {
  return (
    <div className="min-h-screen bg-white p-8">
      <h1 className="text-4xl font-bold text-black mb-4">Test Page</h1>
      <p className="text-lg text-gray-700 mb-4">
        This is a simple test page to verify that the Next.js app is working correctly.
      </p>
      <div className="bg-blue-500 text-white p-4 rounded">
        <p>If you can see this blue box, the styling is working.</p>
      </div>
      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-2">Component Test</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-gray-100 p-4 rounded">
            <h3 className="font-bold">Card 1</h3>
            <p>This is a test card.</p>
          </div>
          <div className="bg-gray-100 p-4 rounded">
            <h3 className="font-bold">Card 2</h3>
            <p>This is another test card.</p>
          </div>
        </div>
      </div>
    </div>
  )
}