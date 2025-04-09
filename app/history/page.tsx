"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Download, Trash2 } from "lucide-react"
import Link from "next/link"

type HistoryItem = {
  id: number
  image: string
  date: string
}

export default function HistoryPage() {
  const [history, setHistory] = useState<HistoryItem[]>([])

  useEffect(() => {
    // Get photo history from localStorage
    const savedHistory = localStorage.getItem("photoboothHistory")

    if (savedHistory) {
      try {
        const parsedHistory = JSON.parse(savedHistory)
        setHistory(parsedHistory)
      } catch (err) {
        console.error("Error parsing photo history:", err)
      }
    }
  }, [])

  const downloadImage = (image: string, id: number) => {
    const link = document.createElement("a")
    link.href = image
    link.download = `photobooth_${id}.jpg`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const deleteImage = (id: number) => {
    const updatedHistory = history.filter((item) => item.id !== id)
    setHistory(updatedHistory)
    localStorage.setItem("photoboothHistory", JSON.stringify(updatedHistory))
  }

  const clearHistory = () => {
    if (confirm("Are you sure you want to clear your entire photo history?")) {
      setHistory([])
      localStorage.removeItem("photoboothHistory")
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString() + " " + date.toLocaleTimeString()
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-center mb-2">Your Photo History</h1>
          <p className="text-gray-600 text-center">View and download all your previous photobooth creations</p>
        </div>

        {history.length === 0 ? (
          <div className="text-center py-12 bg-gray-50 rounded-lg">
            <h2 className="text-xl font-semibold mb-2">No Photos Yet</h2>
            <p className="text-gray-600 mb-4">You haven't created any photobooth images yet.</p>
            <Link href="/">
              <Button className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white">
                Create Your First Photo
              </Button>
            </Link>
          </div>
        ) : (
          <>
            <div className="flex justify-end mb-4">
              <Button variant="outline" onClick={clearHistory} className="text-red-500 hover:text-red-700">
                <Trash2 className="mr-2 h-4 w-4" /> Clear History
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {history.map((item) => (
                <div key={item.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                  <div className="aspect-square overflow-hidden">
                    <img
                      src={item.image || "/placeholder.svg"}
                      alt={`Photo from ${formatDate(item.date)}`}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="p-4">
                    <p className="text-gray-600 text-sm mb-3">{formatDate(item.date)}</p>

                    <div className="flex justify-between">
                      <Button variant="outline" size="sm" onClick={() => downloadImage(item.image, item.id)}>
                        <Download className="mr-2 h-4 w-4" /> Download
                      </Button>

                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => deleteImage(item.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <Trash2 className="mr-2 h-4 w-4" /> Delete
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  )
}
