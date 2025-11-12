# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

### Essential Commands
- `npm install` - Install dependencies
- `npm run dev` - Start development server on localhost:3000
- `npm run build` - Build the site for production (outputs to `/dist`)
- `npm start` - Start production server
- `npm run lint` - Run ESLint to check for code issues
- `npm run prettier` - Format code files (JS/TS/CSS/HTML)
- `npm run mdprettier` - Format Markdown files

### Build Process
The build process includes a pre-build step that fetches image sizes (`node scripts/fetch-image-sizes.mjs`) before running the Next.js build.

## Architecture Overview

This is a **Next.js documentation site** built with:

- **Next.js 15** with App Router (app directory structure)
- **Markdoc** for parsing and rendering markdown content
- **Tailwind CSS** for styling
- **FlexSearch** for client-side search functionality
- **React components** for interactive elements

### Key Architecture Concepts

#### Directory Structure
The site follows Next.js App Router conventions where URLs map to directory structure:
- `app/(docs)/` - Main documentation content
- `app/(blog)/` - Blog posts
- All documentation pages must be named `page.md`
- URL structure mirrors folder structure (e.g., `/app/(docs)/dcs/api/page.md` → `/dcs/api`)

#### Content Management
- **Markdown with Markdoc**: All content is written in Markdown and processed by Markdoc
- **Custom Components**: Available through Markdoc tags (see `src/markdoc/tags.js`)
- **Frontmatter**: Each page requires frontmatter with `title`, `docId`, and `metadata`
- **Internal Linking**: Use `[](docId:your-doc-id-here)` syntax for cross-references
- **Navigation**: Auto-generated from `_meta.json` files in directories

#### Styling System
- **Tailwind CSS** with custom Storj brand colors
- **Dark Mode**: Implemented with `next-themes` and class-based dark mode
- **Custom Grid**: Uses CSS Grid with custom templates for sidebar/content/TOC layouts
- **Typography**: Inter font with custom font sizing scale

#### Search Implementation
- **Client-side search** powered by FlexSearch
- **Auto-indexing** of all documentation content
- **Keyboard shortcut** (⌘K) for quick access
- Configuration in `src/markdoc/search.mjs`

### Important File Locations

#### Configuration Files
- `next.config.mjs` - Next.js configuration with Markdoc integration
- `markdoc.config.json` - Markdoc schema configuration
- `src/markdoc/config.mjs` - Markdoc tags and nodes
- `tailwind.config.js` - Tailwind configuration with Storj branding

#### Core Components
- `src/components/Navigation.jsx` - Main site navigation
- `src/components/Hero.jsx` - Homepage hero section
- `src/components/MarkdownLayout.jsx` - Layout for documentation pages
- `src/components/Search.jsx` - Search functionality
- `src/markdoc/tags.js` - Custom Markdoc components

#### Content Structure
- `app/(docs)/` - Documentation content organized by product/feature
- `src/markdoc/partials/` - Reusable content snippets
- `public/` - Static assets and installation scripts

## Content Guidelines

### Creating New Pages
1. Create `page.md` file in appropriate directory
2. Include required frontmatter:
   ```markdown
   ---
   title: "Page Title"
   docId: "unique-16-char-id"
   metadata:
     title: "Browser Title"
     description: "Page description for SEO"
   ---
   ```
3. Generate unique docId with `pwgen -1 16` or similar

### Internal Linking
- Use docId syntax: `[](docId:abc123)` 
- Override link text: `[Custom Text](docId:abc123)`
- Add fragments: `[](docId:abc123#section)`

### Images
- Store in Storj's internal "Website Assets" project
- Use prefix: `https://link.us1.storjshare.io/raw/jua7rls6hkx5556qfcmhrqed2tfa/docs/images`

## Documentation Style Guide (Diataxis Framework)

This site follows the [Diataxis framework](https://diataxis.fr/) for systematic technical documentation. Use this guide to determine the appropriate documentation type and writing approach.

### The Four Documentation Types

Documentation should serve one of four distinct purposes. Use the **Diataxis Compass** to decide:

| **Purpose** | **Skill Acquisition (Learning)** | **Skill Application (Working)** |
|-------------|-----------------------------------|----------------------------------|
| **Action-oriented (Doing)** | **Tutorials** | **How-to Guides** |
| **Knowledge-oriented (Understanding)** | **Explanation** | **Reference** |

### 1. Tutorials (Learning by Doing)

**Purpose**: Help newcomers learn by completing meaningful tasks
**Example**: "Getting Started with Storj DCS", "Your First Upload"

#### Writing Guidelines:
- Use first-person plural ("We will create...")
- Provide step-by-step instructions
- Show expected results at each step
- Minimize explanation - focus on actions
- Ensure instructions work reliably
- Build confidence through early wins

#### Structure:
```markdown
# Tutorial Title
Brief introduction of what they'll achieve

## What you'll build
Show the end goal

## Step 1: Setup
Clear, specific instructions

## Step 2: First action
Expected output/result

## What's next
Link to related how-to guides
```

### 2. How-to Guides (Goal-oriented Solutions)

**Purpose**: Guide competent users through specific tasks or problems
**Example**: "Configure CORS for Buckets", "Set up Presigned URLs"

#### Writing Guidelines:
- Use conditional imperatives ("If you want X, do Y")
- Assume basic competence
- Focus on the specific goal
- Address real-world complexity
- Avoid unnecessary background

#### Structure:
```markdown
# How to [achieve specific goal]
Brief problem/goal statement

## Prerequisites
What they need to know/have

## Steps
1. Clear action
2. Next action
3. Final step

## Verification
How to confirm success
```

### 3. Reference (Information Lookup)

**Purpose**: Provide authoritative technical information
**Example**: "API Endpoints", "CLI Command Reference", "Error Codes"

#### Writing Guidelines:
- Be strictly descriptive and neutral
- Use austere, factual language
- Organize by system structure
- Provide complete, accurate information
- Avoid opinions or explanations

#### Structure:
```markdown
# API Reference

## Endpoints

### GET /api/buckets
**Description**: Retrieves list of buckets
**Parameters**:
- `limit` (optional): Number of results
**Response**: JSON array of bucket objects
```

### 4. Explanation (Conceptual Understanding)

**Purpose**: Provide context, background, and deeper understanding
**Example**: "Why Decentralized Storage", "Understanding Access Controls"

#### Writing Guidelines:
- Discuss the bigger picture
- Explain design decisions and trade-offs
- Provide historical context
- Make connections between concepts
- Admit opinions and perspectives

#### Structure:
```markdown
# Understanding [Concept]
High-level overview

## Background
Why this matters

## How it works
Conceptual explanation

## Design decisions
Why things are this way

## Related concepts
Links to other explanations
```

### Content Organization Guidelines

#### Choose the Right Type
Ask yourself:
1. **Action or Knowledge?** (What vs. Why/How)
2. **Learning or Working?** (Study vs. Apply)

#### Common Storj Examples:
- **Tutorial**: "Build Your First App with Storj"
- **How-to**: "Migrate from AWS S3 to Storj DCS"  
- **Reference**: "S3 API Compatibility Matrix"
- **Explanation**: "Understanding Storj's Decentralized Architecture"

#### Writing Best Practices:
- Keep content types pure - don't mix tutorial steps with reference information
- Use consistent language patterns within each type
- Cross-link between related content of different types
- Update `_meta.json` files to reflect content organization

## Development Notes

### Static Export
The site is configured for static export (`output: 'export'`) and builds to `/dist` directory for deployment.

### Image Optimization
Images are unoptimized (`images: { unoptimized: true }`) due to static export requirements.

### Environment Variables
- `SITE_URL` and `NEXT_PUBLIC_SITE_URL` set to `https://storj.dev`
- Analytics via Plausible in production

### Custom Webpack Configuration
The Next.js config includes custom webpack rules for processing Markdown files and extracting metadata for canonical URLs.

# IMPORTANT: Do not use emojis.
