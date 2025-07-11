# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- `pnpm run dev` - Start development server with Turbopack
- `pnpm run build` - Build the project for production (static export)
- `pnpm run start` - Start production server
- `pnpm run lint` - Run ESLint

## Project Architecture

This is a Next.js 15 portfolio website built with App Router and configured for static export. The architecture centers around interactive graphics demonstrations using Three.js, WebGPU, and custom shaders.

### Key Technologies

- **Next.js 15** with App Router and static export (`output: 'export'`)
- **Three.js** with React Three Fiber for 3D graphics
- **WebGPU** for compute shaders and advanced graphics
- **TailwindCSS** for styling
- **TypeScript** with strict mode enabled
- **Turbopack** for development

### Directory Structure

- `app/(pages)/` - Next.js App Router pages with grouped routing
- `app/components/` - Reusable React components
- `app/data/` - Static data and project definitions
- `app/types/` - TypeScript type definitions
- `public/static/` - Static assets (images, videos, favicons)

### Shader File Handling

The project has custom webpack configuration to handle shader files:
- Supported extensions: `.vert`, `.frag`, `.glsl`, `.wgsl`
- Uses `raw-loader` to import shaders as strings
- Works with both webpack and Turbopack

### Component Patterns

Components follow these patterns:
- **Client Components**: Use `'use client'` for interactive graphics components
- **Project Cards**: Use gradient backgrounds and display project metadata
- **Graphics Components**: Typically combine Three.js/WebGPU with React hooks
- **Shader Components**: Import shader files directly and use them in materials

### Project Data Structure

Projects are defined in `app/data/project-list.ts` with:
- Title, description, and thumbnail image
- Tags for categorization (GPU, Shaders, VFX, Web)
- Technology logos (houdini, substance-designer, threejs, typescript, unreal, webgpu)
- Link routing to individual project pages

### Graphics Implementation Notes

- **Three.js scenes** use React Three Fiber with Canvas wrapper
- **WebGPU components** handle device initialization and compute shaders
- **Custom shaders** are imported as raw strings and used in materials
- **Animation loops** use `useFrame` hook or manual RAF
- **Controls** use Leva for real-time parameter adjustment

### TypeScript Configuration

- Strict mode enabled with comprehensive type checking
- Path aliases: `@/*` maps to project root
- Includes WebGPU types for GPU programming
- Target ES2017 with modern module resolution

### Static Export

The project is configured for static export with:
- All pages pre-rendered at build time
- No server-side features (API routes, middleware)
- Static assets served from `/public/static/`
- Optimized for deployment to static hosting