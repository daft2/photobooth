"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Menu, X, Sparkles, Camera, Heart, Info, Shield, MessageCircle } from "lucide-react"
import { usePathname } from "next/navigation"

const navLinks = [
  { name: "Home", href: "/", icon: <Heart className="h-4 w-4" /> },
  { name: "History", href: "/history", icon: <Camera className="h-4 w-4" /> },
  { name: "About", href: "/about", icon: <Info className="h-4 w-4" /> },
  { name: "Privacy", href: "/privacy", icon: <Shield className="h-4 w-4" /> },
  { name: "Contact", href: "/contact", icon: <MessageCircle className="h-4 w-4" /> },
]

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrollPosition, setScrollPosition] = useState(0)
  const pathname = usePathname()

  // Track scroll position for parallax effects
  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <nav className="sticky top-0 z-50 font-handwriting">
      {/* Decorative top border */}
      <div className="h-2 bg-gradient-to-r from-[#ff66cc] via-[#cc99ff] to-[#99ccff]"></div>

      {/* Main navbar */}
      <div className="bg-[#ffccff] bg-opacity-90 backdrop-blur-sm border-b-2 border-[#ff99cc] border-dashed relative">
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div
            className="absolute left-[10%] w-6 h-6 text-2xl animate-float"
            style={{ top: `${Math.max(0, 5 - scrollPosition * 0.05)}px` }}
          >
            ✨
          </div>
          <div
            className="absolute right-[15%] w-6 h-6 text-2xl animate-float animation-delay-2000"
            style={{ top: `${Math.max(0, 10 - scrollPosition * 0.08)}px` }}
          >
            ✨
          </div>
        </div>

        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center">
              <div className="relative group">
                <span className="text-xl font-bold bg-gradient-to-r from-[#ff66cc] to-[#9933ff] bg-clip-text text-transparent transform rotate-[-1deg] inline-block group-hover:rotate-[1deg] transition-transform">
                  PhotoBooth
                </span>
                <span className="absolute -top-2 -right-4 text-lg transform rotate-12 opacity-0 group-hover:opacity-100 transition-opacity">
                  ✨
                </span>
                <Sparkles className="inline-block ml-1 h-4 w-4 text-[#ff66cc] animate-pulse" />
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-1">
              {navLinks.map((link, index) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`
                    px-3 py-2 rounded-md text-sm font-medium transition-all duration-300
                    transform hover:scale-110 hover:-rotate-1
                    ${
                      pathname === link.href
                        ? "bg-[#ff99cc] text-white shadow-md rotate-[-1deg]"
                        : "text-[#993366] hover:bg-[#ffccff] hover:text-[#ff3399]"
                    }
                    ${index % 2 === 0 ? "rotate-1" : "-rotate-1"}
                  `}
                >
                  <div className="flex items-center">
                    {link.icon}
                    <span className="ml-1">{link.name}</span>
                    {pathname === link.href && <span className="ml-1 animate-pulse">♥</span>}
                  </div>
                </Link>
              ))}
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleMenu}
                aria-label="Toggle menu"
                className="bg-[#ffccff] hover:bg-[#ff99cc] text-[#993366] hover:text-white rounded-full"
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-[#ffccff] border-b-2 border-[#ff99cc] border-dashed">
            {navLinks.map((link, index) => (
              <Link
                key={link.name}
                href={link.href}
                className={`
                  block px-3 py-2 rounded-md text-base font-medium transition-all
                  ${
                    pathname === link.href
                      ? "bg-[#ff99cc] text-white shadow-md"
                      : "text-[#993366] hover:bg-[#ffccff] hover:text-[#ff3399]"
                  }
                  ${index % 2 === 0 ? "transform rotate-1" : "transform -rotate-1"}
                `}
                onClick={() => setIsMenuOpen(false)}
              >
                <div className="flex items-center">
                  {link.icon}
                  <span className="ml-2">{link.name}</span>
                  {pathname === link.href && <span className="ml-1 animate-pulse">♥</span>}
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  )
}
