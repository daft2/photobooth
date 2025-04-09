import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Camera, Sparkles, Rewind, FastForward } from "lucide-react"

export default function Home() {
  return (
    <div className="min-h-screen bg-[#ffccff] bg-opacity-70 overflow-hidden relative">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[10%] left-[5%] w-32 h-32 bg-[#ff99cc] rounded-full opacity-40 animate-pulse"></div>
        <div className="absolute top-[30%] right-[10%] w-40 h-40 bg-[#cc99ff] rounded-full opacity-30 animate-pulse animation-delay-2000"></div>
        <div className="absolute bottom-[20%] left-[15%] w-36 h-36 bg-[#99ccff] rounded-full opacity-40 animate-pulse animation-delay-4000"></div>

        {/* Glitter effects */}
        <div className="absolute top-[15%] right-[25%] text-4xl animate-bounce animation-delay-1000">✨</div>
        <div className="absolute bottom-[30%] right-[15%] text-3xl animate-bounce animation-delay-3000">✨</div>
        <div className="absolute top-[45%] left-[10%] text-5xl animate-bounce animation-delay-2000">✨</div>

        {/* Retro patterns */}
        <div className="absolute top-0 left-0 w-full h-full bg-[url('/placeholder.svg?height=100&width=100')] opacity-5"></div>
      </div>

      <div className="container mx-auto px-4 py-8 relative z-10">
        {/* Tumblr-style header with glitch effect */}
        <div className="mb-16 mt-8 relative">
          <h1
            className="text-5xl md:text-7xl font-bold text-center mb-2 relative z-10 
                         glitch-text transform -rotate-1 text-[#ff66cc]"
          >
            <span className="absolute top-0 left-0 text-[#00ccff] opacity-70 transform translate-x-[2px] translate-y-[-2px]">
              Photobooth Dreams
            </span>
            <span className="relative">Photobooth Dreams</span>
            <span className="absolute top-0 left-0 text-[#ff3366] opacity-70 transform translate-x-[-2px] translate-y-[2px]">
              Photobooth Dreams
            </span>
          </h1>

          <p className="text-lg md:text-xl text-center max-w-2xl mx-auto relative z-10 font-mono text-[#660066] transform rotate-[0.5deg]">
            ✧･ﾟ: *✧･ﾟ:* create memories, not just photos *:･ﾟ✧*:･ﾟ✧
          </p>
        </div>

        {/* Collage-style content */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 mb-16 relative">
          {/* Main feature - tilted and with a polaroid frame */}
          <div className="md:col-span-7 md:col-start-2 transform md:rotate-[-2deg] hover:rotate-0 transition-all duration-500 relative z-20">
            <div className="bg-white p-3 shadow-lg">
              <div className="relative h-64 md:h-80 overflow-hidden bg-gradient-to-r from-[#ff9999] via-[#ffcc99] to-[#ffff99]">
                <div className="absolute inset-0 flex items-center justify-center">
                  <Camera className="w-20 h-20 text-white opacity-80" />
                </div>
              </div>
              <div className="py-4 text-center">
                <p className="font-handwriting text-lg text-[#333333]">Capture the moment ♡</p>
              </div>
            </div>

            {/* Decorative tape */}
            <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 rotate-[-5deg] w-16 h-6 bg-[#ffcc00] opacity-70"></div>
          </div>

          {/* Overlapping feature boxes */}
          <div className="md:col-span-5 md:col-start-7 md:row-start-1 transform md:translate-y-12 md:rotate-[3deg] relative z-10">
            <div className="bg-[#ccffff] p-4 shadow-md transform hover:scale-105 transition-all duration-300">
              <h3 className="text-2xl font-bold mb-2 text-[#006666] transform -rotate-1">Choose Your Vibe</h3>
              <p className="text-[#004444] font-mono">Multiple layouts to express your mood~</p>
              <div className="mt-3 flex justify-end">
                <div className="w-8 h-8 rounded-full bg-[#66cccc] flex items-center justify-center">
                  <Rewind className="w-4 h-4 text-white" />
                </div>
              </div>
            </div>
          </div>

          <div className="md:col-span-4 md:col-start-3 transform md:translate-y-6 md:rotate-[-1deg] relative z-30">
            <div className="bg-[#ffcccc] p-4 shadow-md transform hover:scale-105 transition-all duration-300">
              <h3 className="text-2xl font-bold mb-2 text-[#993333] transform rotate-1">Add Magic</h3>
              <p className="text-[#662222] font-mono">Filters & stickers for days!</p>
              <div className="mt-3 flex justify-end">
                <div className="w-8 h-8 rounded-full bg-[#ff9999] flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-white" />
                </div>
              </div>
            </div>
          </div>

          <div className="md:col-span-5 md:col-start-6 transform md:translate-y-[-20px] md:rotate-[2deg] relative z-20">
            <div className="bg-[#ccccff] p-4 shadow-md transform hover:scale-105 transition-all duration-300">
              <h3 className="text-2xl font-bold mb-2 text-[#333399] transform -rotate-1">Save Forever</h3>
              <p className="text-[#222266] font-mono">Keep your digital memories safe~</p>
              <div className="mt-3 flex justify-end">
                <div className="w-8 h-8 rounded-full bg-[#9999ff] flex items-center justify-center">
                  <FastForward className="w-4 h-4 text-white" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Call to action - styled like a sticker */}
        <div className="flex justify-center mb-16 relative">
          <div className="relative transform rotate-[-3deg] hover:rotate-0 transition-all duration-300">
            <Link href="/layouts">
              <Button
                size="lg"
                className="bg-[#ff66cc] hover:bg-[#ff33cc] text-white px-8 py-6 rounded-full shadow-lg 
                           border-4 border-white font-bold text-lg relative overflow-hidden group"
              >
                <span className="relative z-10 group-hover:animate-pulse">
                  Start Creating <ArrowRight className="ml-2 h-5 w-5 inline" />
                </span>
                <span
                  className="absolute inset-0 bg-gradient-to-r from-[#ff99cc] to-[#ff66ff] opacity-0 
                                 group-hover:opacity-100 transition-opacity duration-300"
                ></span>
              </Button>
            </Link>

            {/* Sticker-like decorations */}
            <div className="absolute -top-4 -right-4 text-3xl transform rotate-12 animate-bounce animation-delay-1000">
              🌟
            </div>
            <div className="absolute -bottom-3 -left-3 text-2xl transform -rotate-12 animate-bounce animation-delay-2000">
              💖
            </div>
          </div>
        </div>

        {/* Scattered polaroid-style feature highlights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 relative">
          {featureItems.map((item, index) => (
            <div key={index} className={`transform ${item.rotate} hover:rotate-0 transition-all duration-500 relative`}>
              <div className="bg-white p-2 shadow-md">
                <div className={`h-40 ${item.bgColor} flex items-center justify-center`}>
                  <span className="text-4xl">{item.emoji}</span>
                </div>
                <div className="p-3">
                  <p className="font-handwriting text-center text-lg">{item.text}</p>
                </div>
              </div>

              {/* Random decorative elements */}
              {item.decoration && (
                <div className={`absolute ${item.decorationPosition} text-xl`}>{item.decoration}</div>
              )}
            </div>
          ))}
        </div>

        {/* Footer with retro web elements */}
        <div className="text-center mb-8">
          <div className="inline-block border border-[#cc66cc] bg-[#ffccff] bg-opacity-50 px-4 py-2 rounded-lg transform -rotate-1">
            <p className="text-[#660066] font-mono text-sm">⋆｡°✩ made with love in 2023 ✩°｡⋆</p>
          </div>

          <div className="mt-4 flex justify-center gap-2">
            <div className="w-3 h-3 bg-[#ff66cc] rounded-full animate-pulse"></div>
            <div className="w-3 h-3 bg-[#cc66ff] rounded-full animate-pulse animation-delay-500"></div>
            <div className="w-3 h-3 bg-[#6666ff] rounded-full animate-pulse animation-delay-1000"></div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Feature items with random rotations and decorations
const featureItems = [
  {
    emoji: "📸",
    text: "instant memories~",
    bgColor: "bg-[#ffeecc]",
    rotate: "rotate-[-2deg]",
    decoration: "✂️",
    decorationPosition: "-top-2 -right-2",
  },
  {
    emoji: "🌈",
    text: "express yourself!",
    bgColor: "bg-[#ccffee]",
    rotate: "rotate-[1deg]",
    decoration: "📌",
    decorationPosition: "-top-2 -left-2",
  },
  {
    emoji: "💾",
    text: "digital keepsakes",
    bgColor: "bg-[#eeccff]",
    rotate: "rotate-[-1deg]",
    decoration: "🔖",
    decorationPosition: "-bottom-2 -right-2",
  },
]
