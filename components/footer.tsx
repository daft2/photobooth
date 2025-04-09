import Link from "next/link"
import { Heart, Star } from "lucide-react"

export default function Footer() {
  return (
    <footer className="mt-auto font-handwriting relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-[10%] left-[5%] w-20 h-20 bg-[#ff99cc] rounded-full opacity-20 animate-blob"></div>
        <div className="absolute top-[30%] right-[10%] w-24 h-24 bg-[#cc99ff] rounded-full opacity-15 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-[10%] left-[40%] w-16 h-16 bg-[#99ccff] rounded-full opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      {/* Top border */}
      <div className="h-2 bg-gradient-to-r from-[#99ccff] via-[#cc99ff] to-[#ff66cc]"></div>

      {/* Main footer content */}
      <div className="bg-[#ffccff] bg-opacity-90 py-6 relative">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center">
            {/* Retro divider */}
            <div className="w-full max-w-md flex items-center justify-center mb-4">
              <div className="h-[1px] bg-[#ff99cc] flex-grow"></div>
              <div className="mx-2 text-[#ff66cc]">
                <Star className="h-4 w-4 inline-block" />
                <Heart className="h-4 w-4 inline-block mx-1" />
                <Star className="h-4 w-4 inline-block" />
              </div>
              <div className="h-[1px] bg-[#ff99cc] flex-grow"></div>
            </div>

            {/* Main text */}
            <p className="text-[#993366] text-center mb-2 transform -rotate-1">
              <span className="inline-block animate-pulse">✧</span> made with{" "}
              <Heart className="h-3 w-3 inline-block text-[#ff3366] animate-pulse" /> in 2023{" "}
              <span className="inline-block animate-pulse animation-delay-1000">✧</span>
            </p>

            {/* Quick links */}
            <div className="flex flex-wrap justify-center gap-x-4 gap-y-2 mb-4">
              <Link
                href="/about"
                className="text-[#993366] hover:text-[#ff3399] transition-colors transform hover:scale-110 inline-block"
              >
                About
              </Link>
              <Link
                href="/privacy"
                className="text-[#993366] hover:text-[#ff3399] transition-colors transform hover:scale-110 inline-block"
              >
                Privacy
              </Link>
              <Link
                href="/contact"
                className="text-[#993366] hover:text-[#ff3399] transition-colors transform hover:scale-110 inline-block"
              >
                Contact
              </Link>
            </div>

            {/* Decorative elements */}
            <div className="flex justify-center gap-2 mb-2">
              <div className="w-3 h-3 bg-[#ff66cc] rounded-full animate-pulse"></div>
              <div className="w-3 h-3 bg-[#cc66ff] rounded-full animate-pulse animation-delay-500"></div>
              <div className="w-3 h-3 bg-[#6666ff] rounded-full animate-pulse animation-delay-1000"></div>
            </div>

            {/* Nostalgic web counter */}
            <div className="bg-black text-[#33ff33] font-mono text-xs px-2 py-1 rounded inline-block transform rotate-1">
              visitors: 000,042
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
