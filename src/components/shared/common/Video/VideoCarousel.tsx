"use client"

import * as React from "react"
import Image from "next/image"

type VideoCarouselProps = {
  // Vimeo CDN direct MP4 links (progressive) recommended; using mock video URLs by default
  videos?: string[]
  // Single shared thumbnail for all videos (public path), defaults to our embedded thumbnail
  thumbnailSrc?: string
  // Accessible label for the carousel
  ariaLabel?: string
}

export default function VideoCarousel({
  videos = [
    "https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    "https://storage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
    "https://storage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4",
    "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
    "https://storage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4",
  ],
  thumbnailSrc = "/images/VideoThumbnail.webp",
  ariaLabel = "Video carousel",
}: VideoCarouselProps) {
  const [isOpen, setIsOpen] = React.useState(false)
  const [activeIndex, setActiveIndex] = React.useState<number | null>(null)

  const scrollRef = React.useRef<HTMLDivElement>(null)
  const videoRef = React.useRef<HTMLVideoElement>(null)
  const modalRef = React.useRef<HTMLDivElement>(null)
  const videoContainerRef = React.useRef<HTMLDivElement>(null)


  React.useEffect(() => {
    // lock body scroll when modal open
    if (isOpen) {
      const prev = document.body.style.overflow
      document.body.style.overflow = "hidden"
      return () => {
        document.body.style.overflow = prev
      }
    }
  }, [isOpen])

  React.useEffect(() => {
    // ESC to close
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeModal()
      }
    }
    if (isOpen) {
      window.addEventListener("keydown", onKey)
      return () => window.removeEventListener("keydown", onKey)
    }
  }, [isOpen])

  const openModal = (index: number) => {
    setActiveIndex(index)
    setIsOpen(true)
    // play after open
    setTimeout(() => {
      try {
        videoRef.current?.play().catch(() => {
          // autoplay might be blocked; user can press play
        })
      } catch {}
    }, 0)
  }

  const closeModal = () => {
    setIsOpen(false)
    setActiveIndex(null)
    // Pause and reset currentTime to free resources
    if (videoRef.current) {
      videoRef.current.pause()
      videoRef.current.currentTime = 0
      videoRef.current.src = videoRef.current.src // hint for some browsers to release buffer
    }
  }



  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    // close when clicking backdrop (outside the centered panel)
    if (e.target === e.currentTarget) {
      closeModal()
    }
  }

  return (
    <section aria-label={ariaLabel} className="w-full relative py-24">
      {/* Background Image */}
      <div 
        className="absolute bottom-0 bg-contain bg-no-repeat bg-bottom inset-0"
        style={{
          backgroundImage: "url('/images/VideoBackground.webp')",
          backgroundPositionX: "left",
          backgroundSize: "inherit"
        }}
      />
      
      {/* Header (optional) */}
      <div className="mb-3 flex items-center justify-between relative z-10">
       
      </div>

      {/* Carousel */}
      <div
        ref={scrollRef}
        className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 scrollbar-hide lg:flex-row-reverse relative z-10"
        role="listbox"
        aria-label="Video thumbnails"
      >
        {videos.map((_, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => openModal(idx)}
            className="group relative inline-flex min-w-[68%] max-w-[420px] snap-start flex-col overflow-hidden rounded-xl bg-card text-left shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-primary sm:min-w-[280px]"
            role="option"
            aria-label={`Open video ${idx + 1}`}
            aria-selected="false"
          >
            <div className="relative aspect-[4/5] w-full overflow-hidden">
              {/* Shared thumbnail */}
              <Image
                src={thumbnailSrc || "/placeholder.svg"}
                alt="Video thumbnail"
                className="h-full w-full object-cover"
                loading="lazy"
                decoding="async"
                width={420}
                height={520}
              />

              {/* Play badge */}
              <div className="pointer-events-none absolute left-3 top-3 inline-flex items-center gap-2 bg-background/80 text-xs font-medium text-foreground backdrop-blur">
                <PlayIcon className="h-12 w-12" />
              </div>

              {/* Subtle hover tint */}
              <div className="absolute inset-0 bg-foreground/0 transition group-hover:bg-foreground/5" />
            </div>
          </button>
        ))}
      </div>

      {/* Modal Player */}
      {isOpen && activeIndex !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/80 p-3 backdrop-blur-md"
          role="dialog"
          aria-modal="true"
          aria-label="Video player"
          onClick={handleBackdropClick}
        >
          <div
            ref={modalRef}
            className="relative mx-auto w-full max-w-screen-sm bg-background  shadow-xl md:max-w-screen-lg"
            onClick={(e) => e.stopPropagation()}
          >
            
            {/* Video container */}
            <div ref={videoContainerRef} className="relative aspect-video w-full overflow-hidden rounded-md bg-black">
              <video
                ref={videoRef}
                src={videos[activeIndex]}
                poster={thumbnailSrc}
                controls
                playsInline
                preload="metadata"
                className="h-full w-full"
                aria-label={`Video ${activeIndex + 1}`}
              />
            </div>
            
          </div>
        </div>
      )}
    </section>
  )
}
/* --- Icons (inline SVGs; accessible and lightweight) --- */

function PlayIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width="68" height="67" viewBox="0 0 68 67" fill="none" {...props}>
<path d="M34.085 65C51.4819 65 65.585 50.897 65.585 33.5C65.585 16.103 51.4819 2 34.085 2C16.688 2 2.58496 16.103 2.58496 33.5C2.58496 50.897 16.688 65 34.085 65Z" stroke="white" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M27.785 20.9L46.685 33.5L27.785 46.1V20.9Z" stroke="white" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
  )
}


