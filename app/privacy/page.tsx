export default function PrivacyPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-center">Privacy Policy</h1>

        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Your Privacy Matters</h2>

          <p className="mb-4">Last Updated: April 9, 2023</p>

          <h3 className="text-lg font-semibold mt-6 mb-2">Overview</h3>
          <p className="mb-4">
            This Privacy Policy explains how our Photobooth application handles your data. We've designed this app with
            privacy as a priority, ensuring that your photos and personal information remain under your control.
          </p>

          <h3 className="text-lg font-semibold mt-6 mb-2">Data Collection and Storage</h3>
          <p className="mb-4">
            <strong>Client-Side Processing:</strong> All photo capture, editing, and storage happens directly in your
            browser. Your photos are never uploaded to our servers.
          </p>
          <p className="mb-4">
            <strong>Local Storage:</strong> Your photos are saved in your browser's local storage, which means they
            remain on your device. We cannot access these photos.
          </p>

          <h3 className="text-lg font-semibold mt-6 mb-2">Camera Access</h3>
          <p className="mb-4">
            Our application requires access to your device's camera to function. This access is used solely for
            capturing photos within the app. We do not record or store video streams.
          </p>

          <h3 className="text-lg font-semibold mt-6 mb-2">Third-Party Services</h3>
          <p className="mb-4">
            This application does not integrate with third-party services or analytics tools that would collect or
            process your data.
          </p>

          <h3 className="text-lg font-semibold mt-6 mb-2">Data Retention</h3>
          <p className="mb-4">
            Your photos remain in your browser's local storage until you choose to delete them using the application's
            history management features or clear your browser data.
          </p>

          <h3 className="text-lg font-semibold mt-6 mb-2">Changes to This Policy</h3>
          <p className="mb-4">
            We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new
            Privacy Policy on this page.
          </p>

          <h3 className="text-lg font-semibold mt-6 mb-2">Contact Us</h3>
          <p>
            If you have any questions about this Privacy Policy, please contact us through the Contact page on our
            website.
          </p>
        </div>
      </div>
    </div>
  )
}
