export interface Tab {
  id: string
  label: "Accelerate" | "Manage" | "Secure"
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
    description: "Get FedRAMP and PCI-DSS ready with hardened containers—cut compliance timelines and streamline your security posture.",
    cta1: "View libraries →",
    cta2: "Learn More →",
    image: "/images/Accelerate.webp",
  },
  {
    id: "manage",
    label: "Manage",
    title: "Manage your infrastructure.",
    description: "Centralized control and monitoring for all your containerized applications with enterprise-grade security and compliance.",
    cta1: "View dashboard →",
    cta2: "Learn More →",
    image: "/images/Manage.webp",
  },
  {
    id: "secure",
    label: "Secure",
    title: "Secure your applications.",
    description: "Advanced security scanning and vulnerability management with real-time threat detection and automated remediation.",
    cta1: "Security features →",
    cta2: "Learn More →",
    image: "/images/Secure.webp", 
  },
]
