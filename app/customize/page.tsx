"use client"

import { useEffect, useRef, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Slider } from "@/components/ui/slider"
import { ArrowLeft, Smile, Sparkles, Palette, Download } from "lucide-react"
import Link from "next/link"

type Filter = {
  name: string
  apply: (ctx: CanvasRenderingContext2D, width: number, height: number) => void
}

type StickerTheme = {
  id: string
  name: string
  emoji: string
  stickers: {
    emoji: string
    positions: { x: number; y: number; rotation: number; scale: number }[]
  }[]
}

// Border color options
const borderColors = [
  { name: "Green", value: "#9ACD32" },
  { name: "White", value: "#ffffff" },
  { name: "Black", value: "#000000" },
  { name: "Pink", value: "#ff69b4" },
  { name: "Purple", value: "#9370db" },
  { name: "Blue", value: "#4169e1" },
  { name: "Red", value: "#ff0000" },
  { name: "Gold", value: "#ffd700" },
]

const filters: Filter[] = [
  {
    name: "Normal",
    apply: (ctx) => {}, // No filter
  },
  {
    name: "Grayscale",
    apply: (ctx, width, height) => {
      const imageData = ctx.getImageData(0, 0, width, height)
      const data = imageData.data
      for (let i = 0; i < data.length; i += 4) {
        const avg = (data[i] + data[i + 1] + data[i + 2]) / 3
        data[i] = avg // red
        data[i + 1] = avg // green
        data[i + 2] = avg // blue
      }
      ctx.putImageData(imageData, 0, 0)
    },
  },
  {
    name: "Sepia",
    apply: (ctx, width, height) => {
      const imageData = ctx.getImageData(0, 0, width, height)
      const data = imageData.data
      for (let i = 0; i < data.length; i += 4) {
        const r = data[i]
        const g = data[i + 1]
        const b = data[i + 2]
        data[i] = Math.min(255, r * 0.393 + g * 0.769 + b * 0.189)
        data[i + 1] = Math.min(255, r * 0.349 + g * 0.686 + b * 0.168)
        data[i + 2] = Math.min(255, r * 0.272 + g * 0.534 + b * 0.131)
      }
      ctx.putImageData(imageData, 0, 0)
    },
  },
  {
    name: "Vintage",
    apply: (ctx, width, height) => {
      // First apply sepia
      const imageData = ctx.getImageData(0, 0, width, height)
      const data = imageData.data
      for (let i = 0; i < data.length; i += 4) {
        const r = data[i]
        const g = data[i + 1]
        const b = data[i + 2]
        data[i] = Math.min(255, r * 0.393 + g * 0.769 + b * 0.189)
        data[i + 1] = Math.min(255, r * 0.349 + g * 0.686 + b * 0.168)
        data[i + 2] = Math.min(255, r * 0.272 + g * 0.534 + b * 0.131)
      }

      // Then add a slight vignette effect
      const centerX = width / 2
      const centerY = height / 2
      const radius = Math.sqrt(centerX * centerX + centerY * centerY)

      for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
          const idx = (y * width + x) * 4
          const distance = Math.sqrt(Math.pow(x - centerX, 2) + Math.pow(y - centerY, 2))
          const vignette = 0.7 + 0.3 * Math.cos((Math.PI * distance) / radius)

          data[idx] = data[idx] * vignette
          data[idx + 1] = data[idx + 1] * vignette
          data[idx + 2] = data[idx + 2] * vignette
        }
      }

      ctx.putImageData(imageData, 0, 0)
    },
  },
  {
    name: "Bright",
    apply: (ctx, width, height) => {
      const imageData = ctx.getImageData(0, 0, width, height)
      const data = imageData.data
      const brightness = 30 // Adjust this value to control brightness

      for (let i = 0; i < data.length; i += 4) {
        data[i] = Math.min(255, data[i] + brightness)
        data[i + 1] = Math.min(255, data[i + 1] + brightness)
        data[i + 2] = Math.min(255, data[i + 2] + brightness)
      }

      ctx.putImageData(imageData, 0, 0)
    },
  },
  {
    name: "Cool",
    apply: (ctx, width, height) => {
      const imageData = ctx.getImageData(0, 0, width, height)
      const data = imageData.data

      for (let i = 0; i < data.length; i += 4) {
        data[i + 2] = Math.min(255, data[i + 2] + 20) // Increase blue
      }

      ctx.putImageData(imageData, 0, 0)
    },
  },
  {
    name: "Warm",
    apply: (ctx, width, height) => {
      const imageData = ctx.getImageData(0, 0, width, height)
      const data = imageData.data

      for (let i = 0; i < data.length; i += 4) {
        data[i] = Math.min(255, data[i] + 20) // Increase red
        data[i + 1] = Math.min(255, data[i + 1] + 10) // Slightly increase green
      }

      ctx.putImageData(imageData, 0, 0)
    },
  },
]

// Predefined sticker themes with positions
const stickerThemes: StickerTheme[] = [
  {
    id: "none",
    name: "None",
    emoji: "❌",
    stickers: [],
  },
  {
    id: "bunny",
    name: "Bunny",
    emoji: "🐰",
    stickers: [
      {
        emoji: "🐰",
        positions: [
          { x: 0.85, y: 0.15, rotation: 0, scale: 1.2 }, // Top right of first photo
          { x: 0.15, y: 0.85, rotation: 0, scale: 1.2 }, // Bottom left of last photo
        ],
      },
      {
        emoji: "❤️",
        positions: [
          { x: 0.15, y: 0.15, rotation: -15, scale: 0.8 }, // Top left of first photo
          { x: 0.85, y: 0.5, rotation: 15, scale: 0.8 }, // Right side of middle photo
        ],
      },
    ],
  },
  {
    id: "party",
    name: "Party",
    emoji: "🎉",
    stickers: [
      {
        emoji: "🎉",
        positions: [
          { x: 0.85, y: 0.15, rotation: 15, scale: 1 },
          { x: 0.15, y: 0.85, rotation: -15, scale: 1 },
        ],
      },
      {
        emoji: "🎈",
        positions: [
          { x: 0.15, y: 0.15, rotation: -10, scale: 0.9 },
          { x: 0.85, y: 0.85, rotation: 10, scale: 0.9 },
        ],
      },
    ],
  },
  {
    id: "love",
    name: "Love",
    emoji: "❤️",
    stickers: [
      {
        emoji: "❤️",
        positions: [
          { x: 0.85, y: 0.15, rotation: 15, scale: 1 },
          { x: 0.15, y: 0.5, rotation: -15, scale: 0.8 },
          { x: 0.5, y: 0.85, rotation: 0, scale: 1.2 },
        ],
      },
      {
        emoji: "💕",
        positions: [
          { x: 0.15, y: 0.15, rotation: -10, scale: 0.9 },
          { x: 0.85, y: 0.5, rotation: 10, scale: 0.9 },
        ],
      },
    ],
  },
  {
    id: "stars",
    name: "Stars",
    emoji: "⭐",
    stickers: [
      {
        emoji: "⭐",
        positions: [
          { x: 0.85, y: 0.15, rotation: 0, scale: 1 },
          { x: 0.15, y: 0.85, rotation: 0, scale: 1 },
        ],
      },
      {
        emoji: "✨",
        positions: [
          { x: 0.15, y: 0.15, rotation: 0, scale: 1 },
          { x: 0.85, y: 0.85, rotation: 0, scale: 1 },
          { x: 0.5, y: 0.5, rotation: 0, scale: 1.5 },
        ],
      },
    ],
  },
  {
    id: "cool",
    name: "Cool",
    emoji: "😎",
    stickers: [
      {
        emoji: "😎",
        positions: [{ x: 0.85, y: 0.15, rotation: 0, scale: 1.2 }],
      },
      {
        emoji: "🔥",
        positions: [{ x: 0.15, y: 0.85, rotation: 0, scale: 1 }],
      },
      {
        emoji: "👍",
        positions: [{ x: 0.15, y: 0.15, rotation: -15, scale: 0.9 }],
      },
    ],
  },
  {
    id: "flowers",
    name: "Flowers",
    emoji: "🌸",
    stickers: [
      {
        emoji: "🌸",
        positions: [
          { x: 0.85, y: 0.15, rotation: 0, scale: 1 },
          { x: 0.15, y: 0.85, rotation: 0, scale: 1 },
        ],
      },
      {
        emoji: "🌿",
        positions: [
          { x: 0.15, y: 0.15, rotation: -30, scale: 0.9 },
          { x: 0.85, y: 0.85, rotation: 30, scale: 0.9 },
        ],
      },
    ],
  },
]

export default function CustomizePage() {
  const router = useRouter()
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const canvasContainerRef = useRef<HTMLDivElement>(null)
  const [photos, setPhotos] = useState<string[]>([])
  const [rawPhotos, setRawPhotos] = useState<string[]>([])
  const [layout, setLayout] = useState<{ rows: number; cols: number; isPortrait: boolean } | null>(null)
  const [selectedFilter, setSelectedFilter] = useState<string>("Normal")
  const [brightness, setBrightness] = useState<number>(100)
  const [contrast, setContrast] = useState<number>(100)
  const [selectedStickerTheme, setSelectedStickerTheme] = useState<string>("none")
  const [editHistory, setEditHistory] = useState<
    {
      photos: string[]
      filter: string
      brightness: number
      contrast: number
      stickerTheme: string
      borderColor: string
      borderWidth: number
    }[]
  >([])
  const [currentHistoryIndex, setCurrentHistoryIndex] = useState(-1)
  const [borderColor, setBorderColor] = useState("#9ACD32") // Default green border
  const [borderWidth, setBorderWidth] = useState(15) // Default border width
  const [canvasSize, setCanvasSize] = useState({ width: 400, height: 800 })

  useEffect(() => {
    // Disable any active camera streams when entering customization page
    const disableCameraStreams = () => {
      navigator.mediaDevices
        .getUserMedia({ video: true })
        .then((stream) => {
          // Stop all tracks to release the camera
          stream.getTracks().forEach((track) => {
            track.stop()
          })
        })
        .catch((err) => {
          console.log("No camera to disable or already disabled")
        })
    }

    disableCameraStreams()

    // Get photos and layout from localStorage
    const savedPhotos = localStorage.getItem("photoboothPhotos")
    const savedRawPhotos = localStorage.getItem("photoboothRawPhotos") || savedPhotos
    const savedLayout = localStorage.getItem("photoboothLayout")
    const isPortrait = localStorage.getItem("photoboothLayoutIsPortrait") === "true"

    if (!savedPhotos || !savedLayout) {
      router.push("/")
      return
    }

    try {
      const parsedPhotos = JSON.parse(savedPhotos)
      const parsedRawPhotos = JSON.parse(savedRawPhotos)
      setPhotos(parsedPhotos)
      setRawPhotos(parsedRawPhotos)
      setLayout(getLayoutConfig(savedLayout, isPortrait))

      // Reset filter and adjustments to default values
      setSelectedFilter("Normal")
      setBrightness(100)
      setContrast(100)

      // Initialize history with original state
      const initialState = {
        photos: parsedRawPhotos,
        filter: "Normal",
        brightness: 100,
        contrast: 100,
        stickerTheme: "none",
        borderColor: "#9ACD32",
        borderWidth: 15,
      }
      setEditHistory([initialState])
      setCurrentHistoryIndex(0)

      // Initialize canvas with raw photos
      if (parsedRawPhotos.length > 0) {
        // Preload the first image to get its dimensions
        const img = new Image()
        img.onload = () => {
          // Calculate aspect ratio and set canvas size
          const aspectRatio = img.height / img.width
          const containerWidth = canvasContainerRef.current?.clientWidth || 400
          const newWidth = Math.min(containerWidth, 400)

          // For portrait layouts, make the canvas taller
          let newHeight
          if (isPortrait) {
            const layoutConfig = getLayoutConfig(savedLayout, isPortrait)
            newHeight = newWidth * aspectRatio * layoutConfig.rows
          } else {
            newHeight = newWidth * aspectRatio
          }

          setCanvasSize({ width: newWidth, height: newHeight })

          // Render canvas after size is set
          setTimeout(() => {
            renderCanvas(parsedRawPhotos, getLayoutConfig(savedLayout, isPortrait))
          }, 0)
        }
        img.src = parsedRawPhotos[0]
      }
    } catch (err) {
      console.error("Error loading photos:", err)
      router.push("/")
    }
  }, [router])

  // Add resize event listener to adjust canvas size when window resizes
  useEffect(() => {
    const handleResize = () => {
      if (rawPhotos.length > 0 && canvasContainerRef.current && layout) {
        const containerWidth = canvasContainerRef.current.clientWidth
        const img = new Image()
        img.onload = () => {
          const aspectRatio = img.height / img.width
          const newWidth = Math.min(containerWidth, 400)

          // For portrait layouts, make the canvas taller
          let newHeight
          if (layout?.isPortrait) {
            newHeight = newWidth * aspectRatio * (layout?.rows || 3)
          } else {
            newHeight = newWidth * aspectRatio
          }

          setCanvasSize({ width: newWidth, height: newHeight })

          // Re-render canvas after size change
          setTimeout(() => {
            renderCanvas(rawPhotos, layout)
          }, 0)
        }
        img.src = rawPhotos[0]
      }
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [rawPhotos, layout])

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

  const renderCanvas = (photoList: string[], layoutConfig: { rows: number; cols: number; isPortrait: boolean }) => {
    if (!canvasRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas size based on the calculated dimensions
    canvas.width = canvasSize.width
    canvas.height = canvasSize.height

    // Clear canvas with border color
    ctx.fillStyle = borderColor
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    // Calculate cell dimensions
    const cellWidth = canvas.width
    const cellHeight = canvas.height / layoutConfig.rows

    // Define padding (space between photos)
    const padding = borderWidth

    // Draw photos
    const photoCount = Math.min(photoList.length, layoutConfig.rows * layoutConfig.cols)
    let loadedImages = 0
    const totalImages = photoCount

    const loadImage = (index: number) => {
      if (index >= photoCount) return

      const row = Math.floor(index / layoutConfig.cols)
      const col = index % layoutConfig.cols

      const x = col * cellWidth
      const y = row * cellHeight

      // Calculate the inner cell area (accounting for padding)
      const innerX = x + padding
      const innerY = y + padding
      const innerWidth = cellWidth - padding * 2
      const innerHeight = cellHeight - padding * 2

      // Load and draw image
      const img = new Image()
      img.crossOrigin = "anonymous"
      img.onload = () => {
        // Calculate scaling to fit the cell while maintaining aspect ratio
        const imgAspect = img.width / img.height
        let drawWidth,
          drawHeight,
          offsetX = 0,
          offsetY = 0

        if (layoutConfig.isPortrait) {
          // For portrait layouts, fill the width and calculate height
          drawWidth = innerWidth
          drawHeight = drawWidth / imgAspect
          offsetY = (innerHeight - drawHeight) / 2
        } else {
          // For landscape or square layouts
          if (imgAspect > innerWidth / innerHeight) {
            // Image is wider than cell
            drawWidth = innerWidth
            drawHeight = drawWidth / imgAspect
            offsetY = (innerHeight - drawHeight) / 2
          } else {
            // Image is taller than cell
            drawHeight = innerHeight
            drawWidth = drawHeight * imgAspect
            offsetX = (innerWidth - drawWidth) / 2
          }
        }

        // Draw image
        ctx.drawImage(img, innerX + offsetX, innerY + offsetY, drawWidth, drawHeight)

        loadedImages++

        // Load next image
        if (index + 1 < photoCount) {
          loadImage(index + 1)
        }

        // Apply filters and draw stickers only after all images are loaded
        if (loadedImages === totalImages) {
          if (selectedFilter !== "Normal" || brightness !== 100 || contrast !== 100) {
            applyFilter()
          }

          // Apply stickers after all photos are loaded
          if (selectedStickerTheme !== "none") {
            drawStickers()
          }

          // Add "photobooth" text at the bottom
          ctx.font = "bold 20px Arial"
          ctx.fillStyle = "white"
          ctx.textAlign = "center"
          ctx.fillText("photobooth", canvas.width / 2, canvas.height - 20)
        }
      }
      img.src = photoList[index]
    }

    // Start loading images
    if (photoCount > 0) {
      loadImage(0)
    }
  }

  const applyFilter = () => {
    if (!canvasRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Apply selected filter (only if not "Normal")
    if (selectedFilter !== "Normal") {
      const filter = filters.find((f) => f.name === selectedFilter)
      if (filter) {
        filter.apply(ctx, canvas.width, canvas.height)
      }
    }

    // Apply brightness and contrast (only if not default values)
    if (brightness !== 100 || contrast !== 100) {
      applyBrightnessContrast(ctx, canvas.width, canvas.height, brightness, contrast)
    }
  }

  const applyBrightnessContrast = (
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number,
    brightness: number,
    contrast: number,
  ) => {
    const imageData = ctx.getImageData(0, 0, width, height)
    const data = imageData.data

    // Convert to percentage values
    const brightnessValue = (brightness - 100) * 2.55
    const contrastFactor = (259 * (contrast + 255)) / (255 * (259 - contrast))

    for (let i = 0; i < data.length; i += 4) {
      // Apply brightness
      data[i] = Math.max(0, Math.min(255, data[i] + brightnessValue))
      data[i + 1] = Math.max(0, Math.min(255, data[i + 1] + brightnessValue))
      data[i + 2] = Math.max(0, Math.min(255, data[i + 2] + brightnessValue))

      // Apply contrast
      data[i] = Math.max(0, Math.min(255, contrastFactor * (data[i] - 128) + 128))
      data[i + 1] = Math.max(0, Math.min(255, contrastFactor * (data[i + 1] - 128) + 128))
      data[i + 2] = Math.max(0, Math.min(255, contrastFactor * (data[i + 2] - 128) + 128))
    }

    ctx.putImageData(imageData, 0, 0)
  }

  const drawStickers = () => {
    if (!canvasRef.current || !layout) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Find the selected sticker theme
    const theme = stickerThemes.find((theme) => theme.id === selectedStickerTheme)
    if (!theme) return

    // Calculate cell dimensions
    const cellWidth = canvas.width
    const cellHeight = canvas.height / layout.rows

    // Draw each sticker in the theme
    theme.stickers.forEach((sticker) => {
      sticker.positions.forEach((position, index) => {
        // Determine which cell this sticker belongs to
        const cellIndex = Math.min(index, layout.rows - 1)

        // Calculate position within the cell
        const x = position.x * cellWidth
        const y = (cellIndex + position.y) * cellHeight

        ctx.save()
        ctx.translate(x, y)
        ctx.rotate((position.rotation * Math.PI) / 180)
        ctx.scale(position.scale, position.scale)
        ctx.font = "30px Arial"
        ctx.textAlign = "center"
        ctx.textBaseline = "middle"
        ctx.fillText(sticker.emoji, 0, 0)
        ctx.restore()
      })
    })
  }

  const handleFilterChange = (filterName: string) => {
    if (selectedFilter === filterName) return // Prevent re-applying the same filter

    setSelectedFilter(filterName)

    // Save current state to history before making changes
    saveToHistory()

    // Always start with raw photos and apply the new filter
    renderCanvas(rawPhotos, layout || { rows: 3, cols: 1, isPortrait: true })
  }

  const handleBrightnessChange = (value: number[]) => {
    setBrightness(value[0])
    renderCanvas(rawPhotos, layout || { rows: 3, cols: 1, isPortrait: true })
  }

  const handleContrastChange = (value: number[]) => {
    setContrast(value[0])
    renderCanvas(rawPhotos, layout || { rows: 3, cols: 1, isPortrait: true })
  }

  const handleBorderColorChange = (color: string) => {
    setBorderColor(color)
    saveToHistory()
    renderCanvas(rawPhotos, layout || { rows: 3, cols: 1, isPortrait: true })
  }

  const handleBorderWidthChange = (value: number[]) => {
    setBorderWidth(value[0])
    renderCanvas(rawPhotos, layout || { rows: 3, cols: 1, isPortrait: true })
  }

  const handleStickerThemeChange = (themeId: string) => {
    setSelectedStickerTheme(themeId)
    saveToHistory()
    renderCanvas(rawPhotos, layout || { rows: 3, cols: 1, isPortrait: true })
  }

  // Add this function to save adjustments to history when slider is released
  const handleAdjustmentComplete = () => {
    saveToHistory()
  }

  const saveToHistory = () => {
    // If we're not at the end of the history, truncate it
    if (currentHistoryIndex < editHistory.length - 1) {
      setEditHistory(editHistory.slice(0, currentHistoryIndex + 1))
    }

    // Add current state to history
    const newHistoryEntry = {
      photos: rawPhotos,
      filter: selectedFilter,
      brightness: brightness,
      contrast: contrast,
      stickerTheme: selectedStickerTheme,
      borderColor: borderColor,
      borderWidth: borderWidth,
    }

    setEditHistory([...editHistory, newHistoryEntry])
    setCurrentHistoryIndex(currentHistoryIndex + 1)
  }

  const handleUndo = () => {
    if (currentHistoryIndex <= 0) return

    const previousState = editHistory[currentHistoryIndex - 1]
    setSelectedFilter(previousState.filter)
    setBrightness(previousState.brightness)
    setContrast(previousState.contrast)
    setSelectedStickerTheme(previousState.stickerTheme)
    setBorderColor(previousState.borderColor)
    setBorderWidth(previousState.borderWidth)
    setCurrentHistoryIndex(currentHistoryIndex - 1)

    renderCanvas(rawPhotos, layout || { rows: 3, cols: 1, isPortrait: true })
  }

  const handleReset = () => {
    // Reset to initial state
    if (editHistory.length === 0) return

    const initialState = editHistory[0]
    setSelectedFilter(initialState.filter)
    setBrightness(initialState.brightness)
    setContrast(initialState.contrast)
    setSelectedStickerTheme(initialState.stickerTheme)
    setBorderColor(initialState.borderColor)
    setBorderWidth(initialState.borderWidth)
    setCurrentHistoryIndex(0)

    renderCanvas(rawPhotos, layout || { rows: 3, cols: 1, isPortrait: true })
  }

  const savePhoto = () => {
    if (!canvasRef.current) return

    const canvas = canvasRef.current
    const finalImage = canvas.toDataURL("image/jpeg", 1.0)

    // Save to localStorage for history
    const savedPhotos = localStorage.getItem("photoboothHistory")
    let photoHistory = []

    if (savedPhotos) {
      try {
        photoHistory = JSON.parse(savedPhotos)
      } catch (err) {
        console.error("Error parsing photo history:", err)
      }
    }

    // Add timestamp to the photo
    const newHistoryItem = {
      id: Date.now(),
      image: finalImage,
      date: new Date().toISOString(),
    }

    photoHistory.unshift(newHistoryItem)
    localStorage.setItem("photoboothHistory", JSON.stringify(photoHistory))

    // Navigate to the final page
    localStorage.setItem("photoboothFinal", finalImage)
    router.push("/final")
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-center mb-2 font-handwriting transform -rotate-1">
            <span className="bg-gradient-to-r from-[#ff3399] to-[#9933ff] bg-clip-text text-transparent">
              Customize Your Photos
            </span>
          </h1>
          <p className="text-[#993366] text-center font-handwriting">
            Add filters, stickers, and effects to make your photos special
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-4 mb-8">
          <div ref={canvasContainerRef} className="w-full flex justify-center">
            <canvas
              ref={canvasRef}
              width={canvasSize.width}
              height={canvasSize.height}
              className="rounded-lg shadow-md"
            />
          </div>

          <div className="flex justify-between mb-4">
            <div className="flex gap-2">
              <Button size="sm" variant="outline" onClick={handleUndo} disabled={currentHistoryIndex <= 0}>
                Undo
              </Button>
              <Button size="sm" variant="outline" onClick={handleReset} disabled={currentHistoryIndex <= 0}>
                Reset All
              </Button>
            </div>
          </div>

          {/* Border customization controls */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium mb-2 font-handwriting text-[#993366]">Border Color</label>
              <div className="flex flex-wrap gap-2">
                {borderColors.map((color) => (
                  <div
                    key={color.value}
                    className={`w-8 h-8 rounded-full cursor-pointer border ${
                      borderColor === color.value ? "ring-2 ring-offset-2 ring-[#ff66cc]" : "border-gray-300"
                    }`}
                    style={{ backgroundColor: color.value }}
                    onClick={() => handleBorderColorChange(color.value)}
                    title={color.name}
                  />
                ))}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2 font-handwriting text-[#993366]">Border Width</label>
              <Slider
                value={[borderWidth]}
                min={5}
                max={30}
                step={1}
                onValueChange={handleBorderWidthChange}
                onValueCommit={handleAdjustmentComplete}
              />
            </div>
          </div>
        </div>

        <Tabs defaultValue="filters" className="mb-8">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="filters" className="flex items-center">
              <Palette className="mr-2 h-4 w-4" /> Filters
            </TabsTrigger>
            <TabsTrigger value="adjustments" className="flex items-center">
              <Sparkles className="mr-2 h-4 w-4" /> Adjustments
            </TabsTrigger>
            <TabsTrigger value="stickers" className="flex items-center">
              <Smile className="mr-2 h-4 w-4" /> Stickers
            </TabsTrigger>
          </TabsList>

          <TabsContent value="filters" className="p-4 border rounded-md mt-2">
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-7 gap-2">
              {filters.map((filter) => (
                <div
                  key={filter.name}
                  onClick={() => handleFilterChange(filter.name)}
                  className={`cursor-pointer p-2 rounded-md text-center ${
                    selectedFilter === filter.name ? "bg-[#ffccff] ring-2 ring-[#ff66cc]" : "hover:bg-[#ffeeee]"
                  }`}
                >
                  <div className="aspect-square bg-gray-200 rounded-md mb-1"></div>
                  <span className="text-sm font-handwriting">{filter.name}</span>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="adjustments" className="p-4 border rounded-md mt-2">
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2 font-handwriting text-[#993366]">Brightness</label>
                <Slider
                  value={[brightness]}
                  min={0}
                  max={200}
                  step={1}
                  onValueChange={handleBrightnessChange}
                  onValueCommit={handleAdjustmentComplete}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 font-handwriting text-[#993366]">Contrast</label>
                <Slider
                  value={[contrast]}
                  min={0}
                  max={200}
                  step={1}
                  onValueChange={handleContrastChange}
                  onValueCommit={handleAdjustmentComplete}
                />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="stickers" className="p-4 border rounded-md mt-2">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {stickerThemes.map((theme) => (
                <div
                  key={theme.id}
                  onClick={() => handleStickerThemeChange(theme.id)}
                  className={`cursor-pointer p-3 rounded-md text-center transition-all ${
                    selectedStickerTheme === theme.id
                      ? "bg-[#ffccff] ring-2 ring-[#ff66cc] transform scale-105"
                      : "hover:bg-[#ffeeee] hover:scale-105"
                  }`}
                >
                  <div className="aspect-square flex items-center justify-center text-4xl mb-2">{theme.emoji}</div>
                  <span className="text-sm font-handwriting text-[#993366]">{theme.name}</span>
                </div>
              ))}
            </div>
            <p className="text-sm text-[#993366] mt-4 font-handwriting">
              Click on a sticker theme to add cute decorations to your photos!
            </p>
          </TabsContent>
        </Tabs>

        <div className="flex justify-between">
          <Link href="/capture">
            <Button variant="outline">
              <ArrowLeft className="mr-2 h-4 w-4" /> Back
            </Button>
          </Link>

          <Button
            onClick={savePhoto}
            className="bg-gradient-to-r from-[#ff66cc] to-[#9933ff] hover:from-[#ff33cc] hover:to-[#6600cc] text-white"
          >
            <Download className="mr-2 h-4 w-4" /> Save & Continue
          </Button>
        </div>
      </div>
    </div>
  )
}
