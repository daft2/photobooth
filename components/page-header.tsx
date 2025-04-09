import { Sparkles } from "lucide-react"

interface PageHeaderProps {
  title: string
  description?: string
  emoji?: string
}

export default function PageHeader({ title, description, emoji = "✨" }: PageHeaderProps) {
  return (
    <div className="mb-8 relative">
      {/* Decorative elements */}
      <div className="absolute -top-6 -left-6 text-3xl animate-float">{emoji}</div>
      <div className="absolute -top-4 -right-4 text-2xl animate-float animation-delay-2000">{emoji}</div>

      <div className="relative z-10 text-center">
        <h1 className="text-3xl md:text-4xl font-bold mb-2 font-handwriting transform -rotate-1 inline-block relative">
          <span className="bg-gradient-to-r from-[#ff3399] to-[#9933ff] bg-clip-text text-transparent">{title}</span>
          <Sparkles className="absolute -top-4 -right-6 h-5 w-5 text-[#ff66cc] animate-pulse" />
        </h1>

        {description && (
          <div className="relative">
            <p className="text-[#993366] max-w-2xl mx-auto font-handwriting transform rotate-1">{description}</p>
            <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-24 h-[1px] bg-[#ff99cc]"></div>
          </div>
        )}
      </div>
    </div>
  )
}
