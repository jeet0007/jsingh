# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Essential Commands

### Core Development Commands

```bash
# Development workflow
yarn dev                    # Start development server with turbo
yarn build                  # Build production version
yarn start                  # Start production server
yarn lint                   # Run ESLint
yarn export                 # Build and export static files
```

### Task Master Integration

```bash
# Project Setup
task-master init                                    # Initialize Task Master in current project
task-master parse-prd .taskmaster/docs/prd.txt      # Generate tasks from PRD document
task-master models --setup                        # Configure AI models interactively

# Daily Development Workflow
task-master list                                   # Show all tasks with status
task-master next                                   # Get next available task to work on
task-master show <id>                             # View detailed task information (e.g., task-master show 1.2)
task-master set-status --id=<id> --status=done    # Mark task complete

# Task Management
task-master add-task --prompt="description" --research        # Add new task with AI assistance
task-master expand --id=<id> --research --force              # Break task into subtasks
task-master update-task --id=<id> --prompt="changes"         # Update specific task
task-master update --from=<id> --prompt="changes"            # Update multiple tasks from ID onwards
task-master update-subtask --id=<id> --prompt="notes"        # Add implementation notes to subtask
```

## Project Architecture

### Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript with strict mode
- **Styling**: Tailwind CSS with custom neumorphism design system
- **State Management**: TanStack Query for server state
- **Deployment**: Netlify with Next.js plugin
- **Icons**: React Icons
- **Syntax Highlighting**: Prism React Renderer

### Application Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── globals.css         # Global styles and Tailwind imports
│   ├── layout.tsx          # Root layout with metadata and providers
│   ├── page.tsx            # Homepage with tool showcase
│   └── tools/              # Tool-specific pages
│       ├── format-converter/
│       │   ├── actions.ts   # Server actions for format conversion
│       │   ├── metadata.ts  # SEO metadata
│       │   └── page.tsx     # Format converter UI
│       └── url-to-screenshot/
│           ├── actions.ts   # Server actions for screenshot
│           ├── metadata.ts  # SEO metadata
│           └── page.tsx     # URL to screenshot UI
├── components/
│   ├── JsonLd.tsx          # Structured data component
│   ├── QueryProvider.tsx   # TanStack Query provider
│   └── ToolCard.tsx        # Reusable tool card component
└── config/
    └── routes.ts           # Centralized route definitions
```

### Design System

The project uses a custom neumorphism design system:

- **Colors**: Defined in `tailwind.config.js` with primary/secondary/tertiary palette
- **Shadows**: Custom neumorphism shadows for depth and interactivity
- **Typography**: DM Sans font family
- **Components**: Consistent shadow patterns for cards, buttons, inputs

### Tool Development Pattern

Each tool follows a consistent pattern:

1. **Page Component** (`page.tsx`): Client-side UI with form handling
2. **Server Actions** (`actions.ts`): Server-side logic with proper error handling
3. **Metadata** (`metadata.ts`): SEO optimization and structured data
4. **Route Registration**: Add to `src/config/routes.ts`
5. **Homepage Integration**: Add ToolCard to main page

### Key Design Principles

- **Server Actions**: Use Next.js server actions for data mutations
- **Error Handling**: Comprehensive error handling with user-friendly messages
- **Accessibility**: Proper ARIA labels and semantic HTML
- **SEO**: Rich metadata, structured data, and OpenGraph tags
- **Performance**: TanStack Query for efficient state management
- **Responsive**: Mobile-first design with Tailwind breakpoints

## Development Workflow

### Adding New Tools

1. Create tool directory under `src/app/tools/`
2. Implement page component with form and mutation handling
3. Create server action for backend logic
4. Add metadata file for SEO
5. Register route in `src/config/routes.ts`
6. Add ToolCard to homepage
7. Update layout structured data if needed

### Styling Guidelines

- Use existing neumorphism shadow classes
- Follow consistent spacing and typography
- Implement responsive design with Tailwind breakpoints
- Use semantic HTML elements
- Apply proper contrast for accessibility

### Error Handling Pattern

```typescript
// Server actions
try {
  // Logic here
  return result;
} catch (error) {
  console.error("Operation error:", error);
  throw new Error(`Failed to operation: ${error instanceof Error ? error.message : String(error)}`);
}

// Client components
const mutation = useMutation({
  mutationFn: serverAction,
  onError: (error) => {
    setError(error instanceof Error ? error.message : 'Operation failed');
  },
  onSuccess: () => {
    setError(null);
  },
});
```

## Task Master Integration

### Project Structure

```
.taskmaster/
├── tasks/              # Task files directory
│   ├── tasks.json      # Main task database
│   ├── task-1.md      # Individual task files
│   └── task-2.md
├── docs/              # Documentation directory
│   ├── prd.txt        # Product requirements
└── config.json        # AI models & settings
```

### Development Workflow with Task Master

1. **Task Planning**: Use `task-master parse-prd` to generate tasks from PRDs
2. **Task Expansion**: Break down complex tasks with `task-master expand`
3. **Implementation**: Track progress with `task-master update-subtask`
4. **Completion**: Mark tasks done with `task-master set-status`

### Integration with Git

- Reference task IDs in commit messages: `feat: implement HLS player (task 1.2)`
- Use task descriptions for PR titles and descriptions
- Update task progress before committing code

## Configuration Files

### Package.json Scripts

- `dev`: Development server with Turbo
- `build`: Production build
- `start`: Production server
- `lint`: ESLint validation
- `export`: Static export for deployment

### Tailwind Configuration

Custom configuration includes:
- Neumorphism design system
- Custom color palette
- Extended shadows and spacing
- Custom fonts and animations

### Netlify Configuration

- Build command: `npm run build`
- Publish directory: `.next`
- Uses `@netlify/plugin-nextjs` for deployment

## Important Notes

### File Management

- Never manually edit `tasks.json` - use task-master commands
- Always use server actions for data mutations
- Follow the established tool pattern for consistency
- Update routes.ts when adding new tools

### Development Best Practices

- Use TypeScript strict mode
- Implement proper error boundaries
- Add comprehensive metadata for SEO
- Follow accessibility guidelines
- Use TanStack Query for server state
- Implement responsive design patterns

### Task Master Workflow

- Use `task-master next` to get the next available task
- Update task progress with implementation notes
- Mark tasks complete only after testing
- Use dependencies to manage task ordering
- Expand complex tasks into manageable subtasks

---

_This guide ensures Claude Code can effectively work with both the existing codebase and the Task Master workflow for systematic development._