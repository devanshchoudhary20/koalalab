export interface Tab {
  id: string
  label: "Accelerate" | "Unlock" | "Love"
  title: string
  description: string
  cta1: string
  cta2: string
  image: string
}

export const TAB_DATA: Tab[] = [
  {
    id: "accelerate",
    label: "Accelerate",
    title: "Accelerate your compliance.",
    description: "Koala base container images enable continuous compliance across the increasing vulnerability management standards of FedRAMP, PCI, CRA compliances",
    cta1: "View libraries →",
    cta2: "Learn More →",
    image: "/images/Accelerate.webp",
  },
  {
    id: "unlock",
    label: "Unlock",
    title: "Unlock team productivity.",
    description: "Unlock productivity for your security teams. With 90% less CVEs in your applications, koala container images reduce CVE patching & management overhead.",
    cta1: "View dashboard →",
    cta2: "Learn More →",
    image: "/images/Manage.webp",
  },
  {
    id: "love",
    label: "Love",
    title: "Developers love this.",
    description: "Koala's debloated containers ensure rare release blockers, familiar toolchain and efficient cloud infra; your developers will love these containers.",
    cta1: "Security features →",
    cta2: "Learn More →",
    image: "/images/Secure.webp", 
  },
]
