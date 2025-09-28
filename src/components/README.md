# Components Structure

This directory follows industry-standard patterns for organizing React components in a scalable Next.js application.

## 📁 Directory Structure

```
src/components/
├── shared/                    # Reusable across multiple pages
│   ├── layout/               # Layout components (Header, Footer)
│   ├── ui/                   # Basic UI components (Button, Input, Modal)
│   └── common/               # Other shared components (ContactForm)
└── pages/                    # Page-specific components
    ├── home/                 # Homepage sections
    ├── about/                # About page sections
    └── contact/              # Contact page sections
```

## 🎯 Benefits of This Structure

### 1. **Clear Separation of Concerns**
- **Shared components**: Reusable across multiple pages
- **Page components**: Specific to individual pages

### 2. **Scalability**
- Easy to add new pages without cluttering
- Clear ownership of components
- Better team collaboration

### 3. **Maintainability**
- Components are logically grouped
- Easy to find and modify specific functionality
- Reduced cognitive load

### 4. **Import Organization**
- Clean import statements
- Index files for better exports
- Consistent import patterns

## 📋 Naming Conventions

### Components
- **PascalCase** for component files: `HeroSection.tsx`
- **Descriptive names**: `AboutHero.tsx`, `TeamSection.tsx`
- **Consistent suffixes**: `Section.tsx`, `Page.tsx`

### Directories
- **lowercase** for directories: `home/`, `about/`
- **Descriptive names**: `shared/`, `pages/`

## 🔄 Adding New Pages

1. Create new directory: `src/components/pages/[page-name]/`
2. Add page-specific components
3. Create `index.ts` for exports
4. Create `[PageName]Page.tsx` as main component
5. Add route in `src/pages/[page-name].tsx`

## 📦 Import Patterns

### From shared components:
```typescript
import { Header, Footer } from '@/components/shared/layout';
import { ContactForm } from '@/components/shared/common';
```

### From page components:
```typescript
import { HeroSection, CompanySection } from '@/components/pages/home';
import HomePage from '@/components/pages/home/HomePage';
```

## 🚀 Best Practices

1. **Keep components focused**: One responsibility per component
2. **Use index files**: For cleaner imports
3. **Consistent naming**: Follow established patterns
4. **Document components**: Add JSDoc comments for complex components
5. **Type safety**: Use TypeScript interfaces for props
