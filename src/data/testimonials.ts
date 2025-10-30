export interface Testimonial {
  id: number
  quote: string
  boldTexts: string[]
  name: string
  title: string
  company: string
  image: string
  linkedinUrl: string
}

export const testimonials: Testimonial[] = [
  {
    id: 1,
    quote: "Shifting your infra & getting platform teams to start using distroless containers is really hard(even when bought from a vendor)",
    boldTexts: ["distroless containers"],
    name: "Ashish Bhadouria",
    title: "Security Leader",
    company: "IKEA",
    image: "/images/AshishLinkedIn.webp",
    linkedinUrl: "https://www.linkedin.com/in/ashishbhadouria/"
  },
  {
    id: 2,
    quote: "Problems with alpine-base containers, especially python. Scaling \"hardened container image program\" internally is really challenging",
    boldTexts: ["alpine-base containers", "hardened container image program"],
    name: "Darshil Desai",
    title: "Security Engineer",
    company: "SNAP",
    image: "/images/darshilLinkedIn.webp",
    linkedinUrl: "https://www.linkedin.com/in/darshil-desai-90a36711b/"
  },
  {
    id: 3,
    quote: "We do a lot of custom work on top of our containers for our specific usecases. Hardened containers are necessity for compliance but platform teams unable to work with distroless containers",
    boldTexts: ["custom work on top of our containers", "Hardened containers are necessity for compliance"],
    name: "Shibly Meeran",
    title: "Security Leader",
    company: "Amagi",
    image: "/images/shiblyLinkedIn.webp",
    linkedinUrl: "https://www.linkedin.com/in/shibme"
  },
  {
    id: 4,
    quote: "Scaling hardened container images program internally while managing edge-cases really cumbersome. Require tooling to create custom packages.",
    boldTexts: ["hardened container images program", "tooling to create custom packages"],
    name: "Sandip Pradhan",
    title: "Devops Lead",
    company: "Deutsche Bank",
    image: "/images/SandipLinkedIn.webp",
    linkedinUrl: "https://www.linkedin.com/in/sandippradhan/b"
  }
]
