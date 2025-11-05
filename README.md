# KoalaLab Container Security Platform

A modern container security platform built with Next.js, TypeScript, and Tailwind CSS, designed to provide comprehensive security scanning and vulnerability management for container images.

## Features

- **Container Directory**: Browse and search through available container images
- **Security Scanning**: Comprehensive vulnerability scanning with CVE tracking
- **SBOM Management**: Software Bill of Materials for complete transparency
- **Advisory System**: Security advisories and status tracking
- **Comparison Analytics**: Compare security metrics against alternatives
- **Provenance Tracking**: Build information and source verification

## Technology Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS, Shadcn UI
- **State Management**: React Context + useReducer
- **Data Fetching**: Custom hooks with Fetch API
- **Icons**: Heroicons, Lucide React
- **API**: Netlify-hosted Mock API with offline fallback

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd koalalab
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

### API Configuration

The application uses the Netlify-hosted Mock API by default:

**Production API**
- Uses Netlify-hosted API: `https://koalalab-registry-api.netlify.app/api/v1`
- No local server required
- Works in production and development
- Automatic offline error handling

To use a different API endpoint, create a `.env.local` file:
```bash
NEXT_PUBLIC_API_BASE_URL=https://your-api-endpoint.com/api/v1
```

### Development Scripts

- `npm run dev` - Start Next.js development server
- `npm run build` - Build the application for production
- `npm run start` - Start the production server
- `npm run lint` - Run ESLint

## Project Structure

```
src/
├── components/
│   ├── pages/
│   │   ├── containers/          # Container directory components
│   │   └── container-details/   # Container detail page components
│   ├── shared/                  # Shared components
│   ├── ui/                      # Shadcn UI components
│   └── layout/                  # Layout components
├── hooks/                       # Custom React hooks
├── lib/
│   ├── api/                     # API client functions
│   └── utils/                   # Utility functions
├── types/                       # TypeScript type definitions
└── styles/                      # Global styles
```

## API Endpoints

The platform integrates with the Netlify-hosted Mock API providing the following endpoints:

### Containers
- `GET /api/v1/containers` - List containers with search and pagination
- `GET /api/v1/containers/:slug` - Get container details
- `GET /api/v1/containers/:slug/tags` - List container tags
- `GET /api/v1/containers/:slug/tags/:tag_slug/packages` - Get tag packages (SBOM)
- `GET /api/v1/containers/:slug/tags/:tag_slug/vulnerabilities` - Get tag vulnerabilities
- `GET /api/v1/containers/:slug/advisories` - Get container advisories
- `GET /api/v1/containers/:slug/tags/:tag_slug/comparison` - Get comparison data

### Packages
- `GET /api/v1/packages/:package_slug/versions/:version_slug/vulnerabilities/:cve_slug` - Get vulnerability details
- `GET /api/v1/packages/:package_slug/advisories/:cve_slug` - Get advisory details

## Key Features

### Container Directory
- Search and filter containers by category
- Responsive grid layout with container cards
- Pagination support
- FIPS compliance indicators

### Container Details
- Tabbed interface for different data views
- Tag management with vulnerability counts
- Security scanning results
- SBOM (Software Bill of Materials)
- Advisory management
- Comparison analytics
- Provenance information

### Security Features
- CVE tracking with severity levels
- CVSS score display
- Vulnerability timeline
- Security advisory system
- Compliance reporting

## Design System

The platform uses a custom design system with:

- **Brand Colors**: Teal primary colors with gradient accents
- **Typography**: Nunito Sans for headings, Noto Sans for content
- **Components**: Shadcn UI with custom theming
- **Responsive Design**: Mobile-first approach with tablet and desktop breakpoints

## Future Enhancements

- Real API integration
- Advanced filtering and search
- Export functionality
- User authentication
- Team collaboration features
- Advanced analytics and reporting

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

