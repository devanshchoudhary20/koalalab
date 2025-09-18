import { ComponentType } from 'react'

export interface NavigationItem {
  name: string
  href: string
  description?: string
  icon?: ComponentType<any>
}

export interface FooterNavigation {
  solutions: NavigationItem[]
  support: NavigationItem[]
  company: NavigationItem[]
  legal: NavigationItem[]
  social: NavigationItem[]
}
