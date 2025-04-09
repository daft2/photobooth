"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Download, History, Home } from "lucide-react"
import Link from "next/link"

export default function FinalPage() {
  const router = useRouter()
  const [finalImage, setFinalImage] = useState<string | null>(null)

  useEffect(() => {
    // Get final image from localStorage
    const savedImage = localStorage.getItem("photoboothFinal")

    if (!savedImage) {
      router.push("/")
      return
    }

    setFinalImage(savedImage)
  }, [router])

  const downloadImage = () => {
    if (!finalImage) return

    const link = document.createElement("a")
    link.href = finalImage
    link.download = `photobooth_${new Date().toISOString().slice(0, 10)}.jpg`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const startNewSession = () => {
    // Clear current session data but keep history
    localStorage.removeItem("photoboothLayout")
    localStorage.removeItem("photoboothPhotos")
    localStorage.removeItem("photoboothFinal")

    router.push("/")
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-center mb-2 font-handwriting transform -rotate-1">
            <span className="bg-gradient-to-r from-[#ff3399] to-[#9933ff] bg-clip-text text-transparent">
              Your Photobooth Creation
            </span>
          </h1>
          <p className="text-[#993366] text-center font-handwriting">
            Your photos are ready! Download or start a new session.
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 mb-8 border-2 border-[#ff99cc] border-dashed transform rotate-1">
          {finalImage && (
            <div className="flex justify-center mb-6">
              <div className="relative inline-block transform hover:rotate-0 transition-all duration-500">
                <img
                  src={finalImage || "/placeholder.svg"}
                  alt="Final photobooth creation"
                  className="max-w-full rounded-lg shadow-md"
                />
                <div className="absolute -top-3 -right-3 text-2xl animate-float">✨</div>
                <div className="absolute -bottom-3 -left-3 text-2xl animate-float animation-delay-2000">✨</div>
              </div>
            </div>
          )}

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button
              onClick={downloadImage}
              className="bg-gradient-to-r from-[#ff66cc] to-[#9933ff] hover:from-[#ff33cc] hover:to-[#6600cc] text-white"
            >
              <Download className="mr-2 h-4 w-4" /> Download Photo
            </Button>

            <Link href="/history">
              <Button variant="outline">
                <History className="mr-2 h-4 w-4" /> View History
              </Button>
            </Link>

            <Button variant="outline" onClick={startNewSession}>
              <Home className="mr-2 h-4 w-4" /> New Session
            </Button>
          </div>
        </div>

        <div className="text-center">
          <p className="text-[#993366] mb-4 font-handwriting">
            Your photo has been saved to your history. You can access all your photos in the History page.
          </p>

          <Link href="/customize">
            <Button variant="link">
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Customize
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
