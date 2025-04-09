"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft, ArrowRight } from "lucide-react"
import Link from "next/link"

type Layout = {
  id: string
  name: string
  description: string
  rows: number
  cols: number
  preview: string
  isPortrait: boolean
}

const layouts: Layout[] = [
  {
    id: "classic",
    name: "Classic Strip",
    description: "3 photos in a vertical strip",
    rows: 3,
    cols: 1,
    preview: "grid-rows-3 grid-cols-1",
    isPortrait: true,
  },
  {
    id: "grid2x2",
    name: "2×2 Grid",
    description: "4 photos in a square grid",
    rows: 2,
    cols: 2,
    preview: "grid-rows-2 grid-cols-2",
    isPortrait: false,
  },
  {
    id: "double",
    name: "Double Strip",
    description: "2 photos in a vertical strip",
    rows: 2,
    cols: 1,
    preview: "grid-rows-2 grid-cols-1",
    isPortrait: true,
  },
  {
    id: "triple",
    name: "Triple Strip",
    description: "3 photos in a vertical strip",
    rows: 3,
    cols: 1,
    preview: "grid-rows-3 grid-cols-1",
    isPortrait: true,
  },
  {
    id: "quad",
    name: "Quad Strip",
    description: "4 photos in a vertical strip",
    rows: 4,
    cols: 1,
    preview: "grid-rows-4 grid-cols-1",
    isPortrait: true,
  },
]

export default function LayoutSelection() {
  const [selectedLayout, setSelectedLayout] = useState<string | null>(null)
  const router = useRouter()

  const handleContinue = () => {
    if (selectedLayout) {
      // Store the selected layout in localStorage
      const selectedLayoutObj = layouts.find((layout) => layout.id === selectedLayout)
      localStorage.setItem("photoboothLayout", selectedLayout)
      localStorage.setItem("photoboothLayoutIsPortrait", String(selectedLayoutObj?.isPortrait || true))
      router.push("/capture")
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-center mb-2 font-handwriting transform -rotate-1">
            <span className="bg-gradient-to-r from-[#ff3399] to-[#9933ff] bg-clip-text text-transparent">
              Choose Your Layout
            </span>
          </h1>
          <p className="text-[#993366] text-center font-handwriting">Select a layout for your photobooth session</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {layouts.map((layout) => (
            <Card
              key={layout.id}
              className={`cursor-pointer transition-all ${
                selectedLayout === layout.id
                  ? "ring-2 ring-[#ff66cc] shadow-lg transform rotate-0"
                  : "hover:shadow-md transform rotate-1 hover:rotate-0"
              }`}
              onClick={() => setSelectedLayout(layout.id)}
            >
              <CardContent className="p-6">
                <div
                  className={`aspect-[${layout.isPortrait ? "3/4" : "4/3"}] bg-[#ffeeee] rounded-lg mb-4 overflow-hidden`}
                >
                  <div className={`w-full h-full grid ${layout.preview}`} style={{ padding: "8px", gap: "8px" }}>
                    {Array.from({ length: layout.rows * layout.cols }).map((_, i) => (
                      <div
                        key={i}
                        className={`bg-white rounded-md w-full h-full border-4 border-[#9ACD32] shadow-sm ${
                          layout.isPortrait ? "aspect-[3/4]" : "aspect-[4/3]"
                        }`}
                      ></div>
                    ))}
                  </div>
                </div>
                <h3 className="font-semibold text-lg font-handwriting text-[#993366]">{layout.name}</h3>
                <p className="text-[#666666] text-sm font-handwriting">{layout.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="flex justify-between">
          <Link href="/">
            <Button variant="outline">
              <ArrowLeft className="mr-2 h-4 w-4" /> Back
            </Button>
          </Link>
          <Button
            onClick={handleContinue}
            disabled={!selectedLayout}
            className="bg-gradient-to-r from-[#ff66cc] to-[#9933ff] hover:from-[#ff33cc] hover:to-[#6600cc] text-white"
          >
            Continue <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
