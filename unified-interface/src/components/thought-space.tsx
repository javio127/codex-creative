'use client';

import { useState, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';
import { Search, Plus, X, Twitter, Youtube, Globe, Sparkles } from 'lucide-react';

interface ContentBlock {
  id: string;
  type: 'text' | 'twitter' | 'youtube' | 'web' | 'ai-generated';
  content: any;
  position: { x: number; y: number };
  timestamp: Date;
}

interface ThoughtSpaceProps {
  className?: string;
}

export function ThoughtSpace({ className }: ThoughtSpaceProps) {
  const [blocks, setBlocks] = useState<ContentBlock[]>([]);
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const addBlock = useCallback((type: ContentBlock['type'], content: any) => {
    const newBlock: ContentBlock = {
      id: crypto.randomUUID(),
      type,
      content,
      position: { 
        x: Math.random() * 300, 
        y: Math.random() * 200 
      },
      timestamp: new Date()
    };
    setBlocks(prev => [...prev, newBlock]);
  }, []);

  const removeBlock = useCallback((id: string) => {
    setBlocks(prev => prev.filter(block => block.id !== id));
  }, []);

  const handleGenerateContent = async () => {
    if (!prompt.trim()) return;
    
    setIsGenerating(true);
    try {
      // Simulate AI content generation
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Add multiple content blocks based on the prompt
      addBlock('ai-generated', {
        prompt,
        response: `AI-generated response for: "${prompt}"`
      });
      
      // Simulate fetching related content from different sources
      if (prompt.toLowerCase().includes('twitter') || prompt.toLowerCase().includes('social')) {
        addBlock('twitter', {
          username: 'example_user',
          content: `Twitter content related to: ${prompt}`,
          likes: Math.floor(Math.random() * 1000),
          retweets: Math.floor(Math.random() * 100)
        });
      }
      
      if (prompt.toLowerCase().includes('video') || prompt.toLowerCase().includes('youtube')) {
        addBlock('youtube', {
          title: `Video about ${prompt}`,
          channel: 'Example Channel',
          views: Math.floor(Math.random() * 100000),
          duration: '5:30'
        });
      }
      
      setPrompt('');
    } catch (error) {
      console.error('Error generating content:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const renderBlock = (block: ContentBlock) => {
    const baseStyle = `absolute transition-all duration-300 hover:scale-105 cursor-move`;
    
    switch (block.type) {
      case 'text':
        return (
          <Card 
            key={block.id}
            className={baseStyle}
            style={{ 
              left: block.position.x, 
              top: block.position.y,
              width: '300px'
            }}
          >
            <CardHeader className="pb-2">
              <div className="flex justify-between items-center">
                <CardTitle className="text-sm">Text Note</CardTitle>
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
              <p className="text-sm">{block.content}</p>
            </CardContent>
          </Card>
        );
        
      case 'twitter':
        return (
          <Card 
            key={block.id}
            className={`${baseStyle} border-blue-200 bg-blue-50/50`}
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
              <p className="text-sm mb-2">{block.content.content}</p>
              <div className="flex gap-4 text-xs text-gray-500">
                <span>❤️ {block.content.likes}</span>
                <span>🔄 {block.content.retweets}</span>
              </div>
            </CardContent>
          </Card>
        );
        
      case 'youtube':
        return (
          <Card 
            key={block.id}
            className={`${baseStyle} border-red-200 bg-red-50/50`}
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
              <h4 className="font-semibold text-sm mb-1">{block.content.title}</h4>
              <div className="flex gap-4 text-xs text-gray-500">
                <span>👁️ {block.content.views.toLocaleString()}</span>
                <span>⏱️ {block.content.duration}</span>
              </div>
            </CardContent>
          </Card>
        );
        
      case 'ai-generated':
        return (
          <Card 
            key={block.id}
            className={`${baseStyle} border-purple-200 bg-purple-50/50`}
            style={{ 
              left: block.position.x, 
              top: block.position.y,
              width: '350px'
            }}
          >
            <CardHeader className="pb-2">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-purple-500" />
                  <CardTitle className="text-sm">AI Response</CardTitle>
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
              <div className="mb-2">
                <p className="text-xs text-gray-500 mb-1">Prompt:</p>
                <p className="text-sm font-medium">{block.content.prompt}</p>
              </div>
              <Separator className="my-2" />
              <div>
                <p className="text-xs text-gray-500 mb-1">Response:</p>
                <p className="text-sm">{block.content.response}</p>
              </div>
            </CardContent>
          </Card>
        );
        
      default:
        return null;
    }
  };

  return (
    <div className={`relative w-full h-screen bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden ${className}`}>
      {/* Floating Input Panel */}
      <div className="absolute top-6 left-1/2 transform -translate-x-1/2 z-10">
        <Card className="w-96 shadow-lg">
          <CardContent className="p-4">
            <div className="flex gap-2">
              <Textarea
                placeholder="Enter your prompt to generate unified content..."
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                className="flex-1 min-h-[60px]"
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && e.metaKey) {
                    handleGenerateContent();
                  }
                }}
              />
              <Button 
                onClick={handleGenerateContent}
                disabled={isGenerating || !prompt.trim()}
                className="self-end"
              >
                {isGenerating ? (
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                ) : (
                  <Search className="h-4 w-4" />
                )}
              </Button>
            </div>
            <p className="text-xs text-gray-500 mt-2">
              ⌘ + Enter to generate • Content will appear dynamically below
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Content Blocks */}
      <div className="absolute inset-0 pt-32">
        {blocks.map(renderBlock)}
      </div>

      {/* Quick Actions */}
      <div className="absolute bottom-6 right-6 flex flex-col gap-2">
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" size="sm">
              <Plus className="h-4 w-4 mr-2" />
              Add Note
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Text Note</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <Textarea placeholder="Enter your note..." />
              <Button onClick={() => {
                // Implementation for adding text note
                addBlock('text', 'Sample text note');
              }}>
                Add Note
              </Button>
            </div>
          </DialogContent>
        </Dialog>
        
        <Button 
          variant="outline" 
          size="sm"
          onClick={() => setBlocks([])}
        >
          <X className="h-4 w-4 mr-2" />
          Clear All
        </Button>
      </div>

      {/* Background Grid */}
      <div 
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0,0,0,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,0,0,0.1) 1px, transparent 1px)
          `,
          backgroundSize: '20px 20px'
        }}
      />
    </div>
  );
} 