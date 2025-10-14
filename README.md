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
- **Mock APIs**: Express.js server with CORS

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
# Start the Next.js app (uses mock data by default)
npm run dev:app

# Or start both API and frontend servers (if you want to use MockApis server)
npm run dev
```

### Mock Data vs Real API

The application supports two modes:

**Mock Data Mode (Default)**
- Uses static mock data files
- No server required
- Faster development
- Perfect for demos and development

**Real API Mode**
- Uses MockApis server or real API
- Requires server to be running
- More realistic data flow

To switch between modes, create a `.env.local` file:
```bash
# For mock data (default)
NEXT_PUBLIC_USE_MOCK_DATA=true

# For real API
NEXT_PUBLIC_USE_MOCK_DATA=false
NEXT_PUBLIC_API_BASE_URL=http://localhost:3000/api/v1
```

### Development Scripts

- `npm run dev` - Start both API and frontend servers concurrently
- `npm run dev:api` - Start Mock APIs server on port 3000
- `npm run dev:app` - Start Next.js development server on port 3001 (recommended)
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

The platform integrates with Mock APIs providing the following endpoints:

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

## License

This project is licensed under the MIT License.