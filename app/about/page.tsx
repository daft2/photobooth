export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-center">About Our Photobooth</h1>

        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Welcome to our Photobooth App!</h2>

          <p className="mb-4">
            Our photobooth application is designed to bring joy and creativity to your photo-taking experience. Whether
            you're at a party, event, or just having fun at home, our app lets you capture, customize, and save
            memorable moments.
          </p>

          <h3 className="text-lg font-semibold mt-6 mb-2">Features</h3>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>Multiple photo layouts including classic strips and grid arrangements</li>
            <li>Real-time photo capture using your device's camera</li>
            <li>Creative filters and adjustments to enhance your photos</li>
            <li>Fun stickers and decorative elements</li>
            <li>Download and save your creations</li>
            <li>Access your photo history anytime</li>
          </ul>

          <h3 className="text-lg font-semibold mt-6 mb-2">Privacy First</h3>
          <p className="mb-4">
            We value your privacy. All photo processing happens directly in your browser - your photos are never
            uploaded to any server. Your creations are stored locally on your device and only you have access to them.
          </p>

          <h3 className="text-lg font-semibold mt-6 mb-2">About the Developers</h3>
          <p>
            This application was created with love by a team passionate about photography and web development. We hope
            you enjoy using our photobooth as much as we enjoyed creating it!
          </p>
        </div>
      </div>
    </div>
  )
}
