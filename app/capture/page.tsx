"use client"

import { useEffect, useRef, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ArrowLeft, ArrowRight, Camera, RefreshCw } from "lucide-react"
import Link from "next/link"
import { useMobile } from "@/hooks/use-mobile"

export default function CapturePage() {
  const router = useRouter()
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [stream, setStream] = useState<MediaStream | null>(null)
  const [photos, setPhotos] = useState<string[]>([])
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0)
  const [layout, setLayout] = useState<{ rows: number; cols: number; isPortrait: boolean } | null>(null)
  const [totalPhotos, setTotalPhotos] = useState(0)
  const [countdown, setCountdown] = useState<number | null>(null)
  const isMobile = useMobile()
  const [isCapturing, setIsCapturing] = useState(false)
  const [allPhotosTaken, setAllPhotosTaken] = useState(false)

  useEffect(() => {
    // Get layout from localStorage
    const savedLayout = localStorage.getItem("photoboothLayout")
    const isPortrait = localStorage.getItem("photoboothLayoutIsPortrait") === "true"

    if (!savedLayout) {
      router.push("/layouts")
      return
    }

    // Find the layout configuration
    const layoutConfig = getLayoutConfig(savedLayout, isPortrait)
    setLayout(layoutConfig)
    setTotalPhotos(layoutConfig.rows * layoutConfig.cols)

    // Initialize camera
    initCamera()

    return () => {
      // Clean up camera stream when component unmounts
      if (stream) {
        stream.getTracks().forEach((track) => track.stop())
      }
    }
  }, [router])

  const getLayoutConfig = (layoutId: string, isPortrait: boolean) => {
    const layouts: Record<string, { rows: number; cols: number; isPortrait: boolean }> = {
      classic: { rows: 3, cols: 1, isPortrait },
      grid2x2: { rows: 2, cols: 2, isPortrait: false },
      double: { rows: 2, cols: 1, isPortrait },
      triple: { rows: 3, cols: 1, isPortrait },
      quad: { rows: 4, cols: 1, isPortrait },
    }

    return layouts[layoutId] || { rows: 3, cols: 1, isPortrait: true } // Default to 3x1 if not found
  }

  const initCamera = async () => {
    try {
      const constraints = {
        video: {
          width: { ideal: 1280 },
          height: { ideal: 720 },
          facingMode: isMobile ? "user" : "user",
        },
        audio: false,
      }

      const mediaStream = await navigator.mediaDevices.getUserMedia(constraints)
      setStream(mediaStream)

      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream
      }
    } catch (err) {
      console.error("Error accessing camera:", err)
      alert("Unable to access camera. Please make sure you have granted camera permissions.")
    }
  }

  const startCaptureSequence = () => {
    if (isCapturing) return

    setIsCapturing(true)
    setPhotos([])
    setCurrentPhotoIndex(0)

    // Start the sequence for the first photo
    startCountdownForPhoto(0)
  }

  const startCountdownForPhoto = (photoIndex: number) => {
    if (photoIndex >= totalPhotos) {
      setIsCapturing(false)
      setAllPhotosTaken(true)
      return
    }

    setCurrentPhotoIndex(photoIndex)
    setCountdown(3)

    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev === null || prev <= 1) {
          clearInterval(timer)
          capturePhoto(photoIndex)
          return null
        }
        return prev - 1
      })
    }, 1000)
  }

  const capturePhoto = (photoIndex: number) => {
    if (videoRef.current && canvasRef.current && stream) {
      const video = videoRef.current
      const canvas = canvasRef.current
      const context = canvas.getContext("2d")

      if (context) {
        // Set canvas dimensions to match video
        canvas.width = video.videoWidth
        canvas.height = video.videoHeight

        // Draw the current video frame to the canvas
        context.drawImage(video, 0, 0, canvas.width, canvas.height)

        // Convert canvas to data URL and add to photos array
        const photoDataUrl = canvas.toDataURL("image/jpeg", 1.0) // Use highest quality

        setPhotos((prev) => {
          const newPhotos = [...prev]
          newPhotos[photoIndex] = photoDataUrl
          return newPhotos
        })

        // Move to next photo with a short delay
        setTimeout(() => {
          startCountdownForPhoto(photoIndex + 1)
        }, 1000)
      }
    }
  }

  const retakeAllPhotos = () => {
    setPhotos([])
    setCurrentPhotoIndex(0)
    setAllPhotosTaken(false)
  }

  const handleContinue = () => {
    if (photos.length === totalPhotos) {
      // Save photos to localStorage
      localStorage.setItem("photoboothPhotos", JSON.stringify(photos))
      localStorage.setItem("photoboothRawPhotos", JSON.stringify(photos)) // Store raw photos separately
      router.push("/customize")
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-center mb-2 font-handwriting transform -rotate-1">
            <span className="bg-gradient-to-r from-[#ff3399] to-[#9933ff] bg-clip-text text-transparent">
              Take Your Photos
            </span>
          </h1>
          <p className="text-[#993366] text-center font-handwriting">
            Photo {currentPhotoIndex + 1} of {totalPhotos}
          </p>
        </div>

        <div className="relative mb-8">
          {/* Video preview */}
          <div className="aspect-video bg-black rounded-lg overflow-hidden relative">
            <video ref={videoRef} autoPlay playsInline muted className="w-full h-full object-cover" />

            {/* Countdown overlay */}
            {countdown !== null && (
              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
                <span className="text-white text-8xl font-bold">{countdown}</span>
              </div>
            )}

            {/* Progress indicators */}
            <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
              {Array.from({ length: totalPhotos }).map((_, i) => (
                <div
                  key={i}
                  className={`w-3 h-3 rounded-full ${
                    i < photos.length ? "bg-[#ff66cc]" : i === photos.length ? "bg-white" : "bg-gray-400"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Hidden canvas for capturing photos */}
          <canvas ref={canvasRef} className="hidden" />
        </div>

        <div className="flex justify-between">
          <div>
            <Link href="/layouts">
              <Button variant="outline">
                <ArrowLeft className="mr-2 h-4 w-4" /> Back
              </Button>
            </Link>
          </div>

          {allPhotosTaken ? (
            <div className="flex gap-2">
              <Button variant="outline" onClick={retakeAllPhotos} className="mr-2">
                <RefreshCw className="mr-2 h-4 w-4" /> Retake All Photos
              </Button>

              <Button
                onClick={handleContinue}
                className="bg-gradient-to-r from-[#ff66cc] to-[#9933ff] hover:from-[#ff33cc] hover:to-[#6600cc] text-white"
              >
                Continue <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          ) : (
            <Button
              onClick={startCaptureSequence}
              disabled={isCapturing || countdown !== null}
              className="bg-gradient-to-r from-[#ff66cc] to-[#9933ff] hover:from-[#ff33cc] hover:to-[#6600cc] text-white"
            >
              {isCapturing ? (
                `Taking photos...`
              ) : (
                <>
                  <Camera className="mr-2 h-4 w-4" /> Take Photos
                </>
              )}
            </Button>
          )}
        </div>

        {/* Photo thumbnails */}
        <div className="mt-8">
          <h3 className="text-lg font-semibold mb-2 font-handwriting text-[#993366]">Photos:</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {Array.from({ length: totalPhotos }).map((_, index) => (
              <div
                key={index}
                className={`${layout?.isPortrait ? "aspect-[3/4]" : "aspect-square"} rounded-md overflow-hidden border ${
                  photos[index] ? "border-[#9ACD32]" : "border-gray-200"
                } shadow-sm`}
              >
                {photos[index] ? (
                  <img
                    src={photos[index] || "/placeholder.svg"}
                    alt={`Photo ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gray-100">
                    <span className="text-gray-400">{index + 1}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
