# Unified Interface - AI-Powered Content Canvas

A revolutionary unified, cross-platform interface that seamlessly integrates content from multiple sources using AI agents and MCP (Model Context Protocol) servers. This creates a thought-space canvas where users can generate, manipulate, and explore content dynamically without traditional page constraints.

## 🌟 Features

### Core Functionality
- **Dynamic Content Generation**: AI-powered content aggregation from multiple sources (Twitter, YouTube, Web Search)
- **Canvas-like Interface**: Fluid, infinite thought-space for content exploration
- **Real-time Integration**: Seamless connection with various APIs and content platforms
- **MCP Server Simulation**: Built-in simulation of Model Context Protocol for tool orchestration
- **Responsive Design**: Beautiful, modern UI with glassmorphism effects

### Content Sources
- **Twitter Integration**: Social media content and trending discussions
- **YouTube Search**: Video content and channel information
- **Web Search**: Articles, news, and research materials
- **AI Analysis**: Intelligent content processing and summarization

### User Experience
- **No Authentication Required**: Get started immediately without setup
- **Drag & Drop Interface**: Move content blocks freely across the canvas
- **Real-time Updates**: Live content generation and updates
- **Keyboard Shortcuts**: Efficient interaction (⌘ + Enter to generate)
- **Quick Actions**: Fast content addition and canvas management

## 🏗️ Architecture

### Tech Stack
- **Framework**: Next.js 15 with TypeScript
- **UI Components**: shadcn/ui with Radix UI primitives
- **Styling**: Tailwind CSS with custom design system
- **AI Integration**: AI SDK for content generation
- **State Management**: React hooks and context

### Project Structure
```
unified-interface/
├── src/
│   ├── app/                 # Next.js app directory
│   │   ├── globals.css      # Global styles and design tokens
│   │   ├── layout.tsx       # Root layout component
│   │   └── page.tsx         # Main application page
│   ├── components/          # React components
│   │   ├── ui/              # shadcn/ui components
│   │   ├── thought-space.tsx      # Basic thought space
│   │   └── enhanced-thought-space.tsx  # Enhanced AI-integrated version
│   └── lib/                 # Utilities and services
│       ├── agent.ts         # Unified AI agent implementation
│       └── utils.ts         # Utility functions
├── components.json          # shadcn/ui configuration
├── tailwind.config.ts       # Tailwind CSS configuration
└── tsconfig.json           # TypeScript configuration
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd unified-interface
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000`

### Quick Start Guide

1. **Enter a Prompt**: Type your query in the floating input panel
2. **Generate Content**: Press ⌘ + Enter or click the search button
3. **Explore Results**: Content blocks will appear dynamically on the canvas
4. **Interact**: Move blocks around, remove unwanted content, add manual notes
5. **Iterate**: Continue generating new content or refine your queries

## 🔧 Configuration

### Environment Variables
Create a `.env.local` file for API configurations:
```env
# Optional: Real API integrations
OPENAI_API_KEY=your_openai_key
TWITTER_API_KEY=your_twitter_key
YOUTUBE_API_KEY=your_youtube_key
```

### Customization

#### Adding New Content Sources
1. Extend the `MCPServer` class in `lib/agent.ts`
2. Add new content types to the `ContentBlock` interface
3. Create rendering logic in the `renderBlock` function
4. Update the agent's source analysis logic

#### UI Customization
- Modify design tokens in `globals.css`
- Update component styles in `components/`
- Customize the canvas background and animations

## 🎯 Usage Examples

### Research Assistant
```
Query: "artificial intelligence trends 2024"
Result: AI analysis + trending tweets + research articles + explanatory videos
```

### Learning Tool
```
Query: "learn react hooks tutorial"
Result: Official documentation + YouTube tutorials + community discussions + practice examples
```

### News Aggregation
```
Query: "latest tech news social media"
Result: News articles + Twitter discussions + video summaries + expert opinions
```

## 🔄 MCP Integration

The application simulates Model Context Protocol (MCP) servers for:

- **Tool Orchestration**: Coordinated calls to multiple content sources
- **Content Processing**: AI-powered analysis and summarization
- **UI Component Generation**: Dynamic component rendering based on content type
- **Data Transformation**: Unified format conversion for different content types

### MCP Server Simulation
```typescript
// Example MCP tool call
const result = await mcpServer.callTool('twitter.search', { 
  query: 'AI development' 
});
```

## 🎨 Design Philosophy

### Canvas-First Approach
- **Infinite Space**: No traditional page boundaries
- **Fluid Interaction**: Natural content manipulation
- **Visual Hierarchy**: Content organized by importance and relevance

### Unified Experience
- **Single Interface**: All content sources accessible from one place
- **Consistent Design**: Unified visual language across different content types
- **Contextual Organization**: Related content automatically grouped

### AI-Powered Intelligence
- **Smart Content Selection**: AI determines relevant sources based on query
- **Automatic Summarization**: Key insights extracted from multiple sources
- **Contextual Understanding**: Content analyzed for relevance and quality

## 🛠️ Development

### Available Scripts
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run type-check   # Run TypeScript checks
```

### Adding Features

1. **New Content Types**: Extend the `ContentBlock` interface
2. **Additional Sources**: Add new methods to the `MCPServer` class
3. **UI Components**: Create new components in `components/`
4. **Styling**: Update Tailwind classes and CSS variables

## 📝 API Reference

### UnifiedAgent Class
```typescript
class UnifiedAgent {
  generateUnifiedContent(prompt: string): Promise<UnifiedContent>
  processWithMCPTools(prompt: string, toolRequests: ToolRequest[]): Promise<any>
  getUIComponent(contentType: string, data: any): Promise<any>
}
```

### Content Interfaces
```typescript
interface ContentBlock {
  id: string
  type: 'twitter' | 'youtube' | 'web' | 'ai-response' | 'unified'
  content: any
  position: { x: number; y: number }
  timestamp: Date
  source?: string
}
```

## 🔮 Future Enhancements

### Planned Features
- **Real API Integration**: Connect to actual Twitter, YouTube, and web search APIs
- **User Authentication**: Save and sync thought spaces across devices
- **Collaborative Editing**: Real-time collaboration on shared canvases
- **Export Options**: Save content as PDFs, presentations, or documents
- **Advanced AI Features**: Content generation, automatic connections, smart grouping

### Roadmap
1. **Phase 1**: Core functionality and MCP simulation ✅
2. **Phase 2**: Real API integrations and authentication
3. **Phase 3**: Collaboration features and export options
4. **Phase 4**: Advanced AI capabilities and automation

## 🤝 Contributing

We welcome contributions! Please see our contributing guidelines for:
- Code style requirements
- Testing procedures
- Pull request process
- Feature request guidelines

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **shadcn/ui**: Beautiful, accessible UI components
- **Tailwind CSS**: Utility-first CSS framework
- **Next.js**: React framework for production
- **AI SDK**: Streamlined AI integration
- **MCP Protocol**: Inspiration for tool orchestration

---

**Built with ❤️ for the future of unified content interfaces**
