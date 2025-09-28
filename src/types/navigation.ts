import { ComponentType, SVGProps } from 'react'

export interface NavigationItem {
  name: string
  href: string
  description?: string
  icon?: ComponentType<SVGProps<SVGSVGElement>>
}

export interface FooterNavigation {
  solutions: NavigationItem[]
  support: NavigationItem[]
  company: NavigationItem[]
  legal: NavigationItem[]
  social: NavigationItem[]
}
