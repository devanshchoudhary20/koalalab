"use client"

import * as React from "react"
import Image from "next/image"

type VideoData = {
  id: string
  thumbnailSrc?: string
  badge: string
  title: string
  personName: string
  role: string
}

type VideoCarouselProps = {
  videos?: VideoData[]
  ariaLabel?: string
}

export default function VideoCarousel({
  videos = [
    {
      id: "1124157115",
      thumbnailSrc: "/images/VideoThumbnail.webp",
      badge: "CMC",
      title: "Container-first Linux Distro",
      personName: "ABHIMANYU DHAMIJA",
      role: "CEO, KoalaLab"
    },
    {
      id: "1124155632",
      thumbnailSrc: "/images/VideoThumbnail.webp",
      badge: "CMC",
      title: "Container-first Linux Distro",
      personName: "ABHIMANYU DHAMIJA",
      role: "CEO, KoalaLab"
    },
    {
      id: "1124155590",
      thumbnailSrc: "/images/VideoThumbnail.webp",
      badge: "CMC",
      title: "Container-first Linux Distro",
      personName: "ABHIMANYU DHAMIJA",
      role: "CEO, KoalaLab"
    },
    {
      id: "1124155414",
      thumbnailSrc: "/images/VideoThumbnail.webp",
      badge: "CMC",
      title: "Container-first Linux Distro",
      personName: "ABHIMANYU DHAMIJA",
      role: "CEO, KoalaLab"
    },
  ],
  ariaLabel = "Video carousel",
}: VideoCarouselProps) {
  const [isOpen, setIsOpen] = React.useState(false)
  const [activeIndex, setActiveIndex] = React.useState<number | null>(null)

  const scrollRef = React.useRef<HTMLDivElement>(null)
  const iframeRef = React.useRef<HTMLIFrameElement>(null)
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

  }

  const closeModal = () => {
    setIsOpen(false)
    setActiveIndex(null)

  }



  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    // close when clicking backdrop (outside the centered panel)
    if (e.target === e.currentTarget) {
      closeModal()
    }
  }

  return (
    <section aria-label={ariaLabel} className="w-full relative py-24 overflow-scroll scrollbar-hide">
      {/* Background Image */}
      <div 
        className="absolute bottom-0 bg-contain bg-no-repeat bg-bottom inset-0"
        style={{
          backgroundImage: "url('/images/VideoBackground.webp')",
          backgroundPositionX: "left",
          backgroundSize: "inherit"
        }}
      />
      
      {/* Main Heading */}
      <div className="mb-12 flex justify-center relative z-10">
        <div className="text-center max-w-4xl px-4">
          <h2 className="text-gradient-fill-desktop">
            Engineering container security.{' '}
            <span className="text-heading-large text-gray-800 mb-4">from first principles</span>
          </h2>
          <p className="text-body-medium text-primary-text_blue">
           From OpenSSF to top security podcasts, hear how we built 0-deb <br /> to reimagine secure containers.
          </p>
        </div>
      </div>

      {/* Carousel */}
      <div
        ref={scrollRef}
        className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 scrollbar-hide lg:flex-row-reverse relative z-10 mx-4 ml-auto w-[80%] "
        role="listbox"
        aria-label="Video thumbnails"
      >
        {videos.map((video, idx) => (
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
              {/* Video thumbnail */}
              <Image
                src={video.thumbnailSrc || "/placeholder.svg"}
                alt="Video thumbnail"
                className="h-full w-full object-cover"
                loading="lazy"
                decoding="async"
                width={420}
                height={520}
              />

              {/* Play Button - Positioned in lower-right quadrant */}
              <div className="absolute bottom-3 right-3">
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
              <iframe
                ref={iframeRef}
                src={`https://player.vimeo.com/video/${videos[activeIndex].id}?badge=0&autopause=0&player_id=0&app_id=58479&muted=0`}
                width="100%"
                height="100%"
                frameBorder="0"
                allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                title={`Video ${activeIndex + 1}`}
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
<path d="M34.085 65C51.4819 65 65.585 50.897 65.585 33.5C65.585 16.103 51.4819 2 34.085 2C16.688 2 2.58496 16.103 2.58496 33.5C2.58496 50.897 16.688 65 34.085 65Z" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M27.785 20.9L46.685 33.5L27.785 46.1V20.9Z" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
</svg>
  )
}



