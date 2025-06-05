'use client';

import { useState, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';
import { Search, Plus, X, Twitter, Youtube, Globe, Sparkles, Brain, ExternalLink, Clock } from 'lucide-react';
import { unifiedAgent, type UnifiedContent, type TwitterContent, type YouTubeContent, type WebContent } from '@/lib/agent';

interface ContentBlock {
  id: string;
  type: 'twitter' | 'youtube' | 'web' | 'ai-response' | 'unified';
  content: any;
  position: { x: number; y: number };
  timestamp: Date;
  source?: string;
}

interface EnhancedThoughtSpaceProps {
  className?: string;
}

export function EnhancedThoughtSpace({ className }: EnhancedThoughtSpaceProps) {
  const [blocks, setBlocks] = useState<ContentBlock[]>([]);
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [lastQuery, setLastQuery] = useState('');

  const addBlock = useCallback((type: ContentBlock['type'], content: any, source?: string) => {
    const newBlock: ContentBlock = {
      id: crypto.randomUUID(),
      type,
      content,
      source,
      position: { 
        x: Math.random() * 400 + 50, 
        y: Math.random() * 300 + 50 
      },
      timestamp: new Date()
    };
    setBlocks(prev => [...prev, newBlock]);
    return newBlock.id;
  }, []);

  const removeBlock = useCallback((id: string) => {
    setBlocks(prev => prev.filter(block => block.id !== id));
  }, []);

  const updateBlockPosition = useCallback((id: string, position: { x: number; y: number }) => {
    setBlocks(prev => prev.map(block => 
      block.id === id ? { ...block, position } : block
    ));
  }, []);

  const handleGenerateUnifiedContent = async () => {
    if (!prompt.trim()) return;
    
    setIsGenerating(true);
    setLastQuery(prompt);
    
    try {
      // Use the unified agent to generate content from multiple sources
      const unifiedContent = await unifiedAgent.generateUnifiedContent(prompt);
      
      // Add AI response block
      if (unifiedContent.aiResponse) {
        addBlock('ai-response', unifiedContent.aiResponse, 'AI Agent');
      }
      
      // Add Twitter content blocks
      if (unifiedContent.twitter && unifiedContent.twitter.length > 0) {
        unifiedContent.twitter.forEach((tweet: TwitterContent) => {
          addBlock('twitter', tweet, 'Twitter');
        });
      }
      
      // Add YouTube content blocks
      if (unifiedContent.youtube && unifiedContent.youtube.length > 0) {
        unifiedContent.youtube.forEach((video: YouTubeContent) => {
          addBlock('youtube', video, 'YouTube');
        });
      }
      
      // Add Web content blocks
      if (unifiedContent.web && unifiedContent.web.length > 0) {
        unifiedContent.web.forEach((article: WebContent) => {
          addBlock('web', article, 'Web Search');
        });
      }
      
      // Add a unified summary block
      addBlock('unified', {
        query: prompt,
        metadata: unifiedContent.metadata,
        summary: `Generated ${unifiedContent.metadata.sources.length} types of content from ${unifiedContent.metadata.sources.join(', ')}`
      }, 'Unified Agent');
      
      setPrompt('');
    } catch (error) {
      console.error('Error generating unified content:', error);
      // Add error block
      addBlock('ai-response', {
        content: 'Sorry, I encountered an error while generating content. Please try again.',
        summary: 'Error occurred',
        sources: [],
        confidence: 0
      }, 'Error');
    } finally {
      setIsGenerating(false);
    }
  };

  const renderBlock = (block: ContentBlock) => {
    const baseStyle = `absolute transition-all duration-300 hover:scale-105 cursor-move shadow-lg`;
    
    switch (block.type) {
      case 'twitter':
        return (
          <Card 
            key={block.id}
            className={`${baseStyle} border-blue-200 bg-blue-50/80 backdrop-blur-sm`}
            style={{ 
              left: block.position.x, 
              top: block.position.y,
              width: '320px'
            }}
          >
            <CardHeader className="pb-2">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <Twitter className="h-4 w-4 text-blue-500" />
                  <CardTitle className="text-sm">@{block.content.username}</CardTitle>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-3 w-3 text-gray-400" />
                  <span className="text-xs text-gray-500">
                    {block.content.timestamp.toLocaleDateString()}
                  </span>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => removeBlock(block.id)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm mb-3">{block.content.content}</p>
              <div className="flex justify-between items-center">
                <div className="flex gap-4 text-xs text-gray-600">
                  <span>❤️ {block.content.likes}</span>
                  <span>🔄 {block.content.retweets}</span>
                </div>
                {block.content.url && (
                  <Button variant="ghost" size="sm">
                    <ExternalLink className="h-3 w-3" />
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        );
        
      case 'youtube':
        return (
          <Card 
            key={block.id}
            className={`${baseStyle} border-red-200 bg-red-50/80 backdrop-blur-sm`}
            style={{ 
              left: block.position.x, 
              top: block.position.y,
              width: '320px'
            }}
          >
            <CardHeader className="pb-2">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <Youtube className="h-4 w-4 text-red-500" />
                  <CardTitle className="text-sm">{block.content.channel}</CardTitle>
                </div>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => removeBlock(block.id)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <h4 className="font-semibold text-sm mb-2">{block.content.title}</h4>
              <div className="flex justify-between items-center">
                <div className="flex gap-4 text-xs text-gray-600">
                  <span>👁️ {block.content.views.toLocaleString()}</span>
                  <span>⏱️ {block.content.duration}</span>
                </div>
                {block.content.url && (
                  <Button variant="ghost" size="sm">
                    <ExternalLink className="h-3 w-3" />
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        );
        
      case 'web':
        return (
          <Card 
            key={block.id}
            className={`${baseStyle} border-green-200 bg-green-50/80 backdrop-blur-sm`}
            style={{ 
              left: block.position.x, 
              top: block.position.y,
              width: '340px'
            }}
          >
            <CardHeader className="pb-2">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <Globe className="h-4 w-4 text-green-500" />
                  <CardTitle className="text-sm">{block.content.domain}</CardTitle>
                </div>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => removeBlock(block.id)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <h4 className="font-semibold text-sm mb-2">{block.content.title}</h4>
              <p className="text-xs text-gray-600 mb-3">{block.content.snippet}</p>
              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-500">
                  {block.content.timestamp.toLocaleDateString()}
                </span>
                <Button variant="ghost" size="sm">
                  <ExternalLink className="h-3 w-3" />
                </Button>
              </div>
            </CardContent>
          </Card>
        );
        
      case 'ai-response':
        return (
          <Card 
            key={block.id}
            className={`${baseStyle} border-purple-200 bg-purple-50/80 backdrop-blur-sm`}
            style={{ 
              left: block.position.x, 
              top: block.position.y,
              width: '380px'
            }}
          >
            <CardHeader className="pb-2">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-purple-500" />
                  <CardTitle className="text-sm">AI Analysis</CardTitle>
                  {block.content.confidence && (
                    <span className="text-xs bg-purple-100 px-2 py-1 rounded">
                      {Math.round(block.content.confidence * 100)}%
                    </span>
                  )}
                </div>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => removeBlock(block.id)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="mb-3">
                <p className="text-xs text-gray-500 mb-1">Summary:</p>
                <p className="text-sm font-medium">{block.content.summary}</p>
              </div>
              <Separator className="my-2" />
              <div className="mb-3">
                <p className="text-xs text-gray-500 mb-1">Analysis:</p>
                <p className="text-sm">{block.content.content}</p>
              </div>
              {block.content.sources && block.content.sources.length > 0 && (
                <div className="flex flex-wrap gap-1">
                  {block.content.sources.map((source: string, idx: number) => (
                    <span key={idx} className="text-xs bg-gray-100 px-2 py-1 rounded">
                      {source}
                    </span>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        );
        
      case 'unified':
        return (
          <Card 
            key={block.id}
            className={`${baseStyle} border-gray-300 bg-gradient-to-br from-gray-50 to-white backdrop-blur-sm shadow-xl`}
            style={{ 
              left: block.position.x, 
              top: block.position.y,
              width: '400px'
            }}
          >
            <CardHeader className="pb-2">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <Brain className="h-4 w-4 text-gray-600" />
                  <CardTitle className="text-sm">Unified Summary</CardTitle>
                </div>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => removeBlock(block.id)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="mb-3">
                <p className="text-xs text-gray-500 mb-1">Query:</p>
                <p className="text-sm font-medium">{block.content.query}</p>
              </div>
              <Separator className="my-2" />
              <div className="mb-3">
                <p className="text-xs text-gray-500 mb-1">Content Generated:</p>
                <p className="text-sm">{block.content.summary}</p>
              </div>
              <div className="flex flex-wrap gap-1">
                {block.content.metadata.sources.map((source: string, idx: number) => (
                  <span key={idx} className="text-xs bg-blue-100 px-2 py-1 rounded">
                    {source}
                  </span>
                ))}
              </div>
              <div className="mt-2 text-xs text-gray-500">
                Generated at {block.content.metadata.timestamp.toLocaleTimeString()}
              </div>
            </CardContent>
          </Card>
        );
        
      default:
        return null;
    }
  };

  return (
    <div className={`relative w-full h-screen bg-gradient-to-br from-slate-50 to-blue-50 overflow-hidden ${className}`}>
      {/* Floating Input Panel */}
      <div className="absolute top-6 left-1/2 transform -translate-x-1/2 z-10">
        <Card className="w-[500px] shadow-xl backdrop-blur-sm bg-white/90">
          <CardContent className="p-6">
            <div className="flex gap-3">
              <Textarea
                placeholder="Enter your prompt to generate unified content from multiple sources..."
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                className="flex-1 min-h-[80px] text-sm"
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && e.metaKey) {
                    handleGenerateUnifiedContent();
                  }
                }}
              />
              <Button 
                onClick={handleGenerateUnifiedContent}
                disabled={isGenerating || !prompt.trim()}
                className="self-end h-12 px-6"
                size="lg"
              >
                {isGenerating ? (
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                ) : (
                  <Search className="h-5 w-5" />
                )}
              </Button>
            </div>
            <div className="flex justify-between items-center mt-3">
              <p className="text-xs text-gray-500">
                ⌘ + Enter to generate • Content from Twitter, YouTube, Web & AI
              </p>
              {lastQuery && (
                <p className="text-xs text-blue-600">
                  Last: "{lastQuery}"
                </p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Content Blocks */}
      <div className="absolute inset-0 pt-40">
        {blocks.map(renderBlock)}
      </div>

      {/* Status Panel */}
      <div className="absolute bottom-6 left-6">
        <Card className="backdrop-blur-sm bg-white/80">
          <CardContent className="p-3">
            <div className="flex items-center gap-4 text-sm">
              <span className="text-gray-600">
                Blocks: {blocks.length}
              </span>
              {isGenerating && (
                <div className="flex items-center gap-2">
                  <div className="animate-pulse h-2 w-2 bg-blue-500 rounded-full"></div>
                  <span className="text-blue-600">Generating content...</span>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="absolute bottom-6 right-6 flex flex-col gap-2">
        <Button 
          variant="outline" 
          size="sm"
          onClick={() => setBlocks([])}
          className="backdrop-blur-sm bg-white/80"
        >
          <X className="h-4 w-4 mr-2" />
          Clear Canvas
        </Button>
        
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" size="sm" className="backdrop-blur-sm bg-white/80">
              <Plus className="h-4 w-4 mr-2" />
              Quick Add
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Quick Add Content</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <Button 
                onClick={() => addBlock('ai-response', {
                  content: 'Sample AI response for quick testing',
                  summary: 'Quick test',
                  sources: ['Manual'],
                  confidence: 0.9
                }, 'Manual')}
                className="w-full"
              >
                Add AI Response
              </Button>
              <Button 
                onClick={() => addBlock('twitter', {
                  username: 'test_user',
                  content: 'Sample tweet for testing the interface',
                  likes: 42,
                  retweets: 7,
                  timestamp: new Date()
                }, 'Manual')}
                className="w-full"
              >
                Add Twitter Content
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Background Pattern */}
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `
            radial-gradient(circle at 25% 25%, rgba(99, 102, 241, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 75% 75%, rgba(236, 72, 153, 0.1) 0%, transparent 50%),
            linear-gradient(rgba(0,0,0,0.02) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,0,0,0.02) 1px, transparent 1px)
          `,
          backgroundSize: '800px 800px, 800px 800px, 40px 40px, 40px 40px'
        }}
      />
    </div>
  );
} 