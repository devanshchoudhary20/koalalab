export interface Testimonial {
  id: number
  quote: string
  boldTexts: string[]
  name: string
  title: string
  company: string
  image: string
}

export const testimonials: Testimonial[] = [
  {
    id: 1,
    quote: "Managing non-alpine edge-cases in golden containers really tough. Require tooling for creating custom images, hence want familiar packages/familiar Linux distro.",
    boldTexts: ["non-alpine edge-cases in golden containers", "want familiar packages/familiar Linux distro"],
    name: "Ramasri Iyer",
    title: "VP-Devops",
    company: "European Bulge-Bracket Bank",
    image: "/images/testimonialImage.webp"
  },
  {
    id: 2,
    quote: "The security improvements we've seen with Koala Lab's hardened containers have been remarkable. Our vulnerability management process is now 90% more efficient.",
    boldTexts: ["security improvements", "90% more efficient"],
    name: "Sarah Chen",
    title: "Security Engineer",
    company: "TechCorp Solutions",
    image: "/images/testimonialImage.webp"
  },
  {
    id: 3,
    quote: "Switching to Koala Lab's open source containers saved us hundreds of engineering hours. The familiar Linux distro support made the transition seamless.",
    boldTexts: ["hundreds of engineering hours", "familiar Linux distro support"],
    name: "Michael Rodriguez",
    title: "DevOps Lead",
    company: "Innovation Labs",
    image: "/images/testimonialImage.webp"
  }
]
