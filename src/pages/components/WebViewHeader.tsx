
import React, { useState, KeyboardEvent } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, ArrowRight, RefreshCw, LoaderCircle } from 'lucide-react';

interface WebViewHeaderProps {
  url: string;
  isLoading: boolean;
  onUrlChange: (url: string) => void;
  onGoBack: () => void;
  onGoForward: () => void;
  onRefresh: () => void;
}

export const WebViewHeader: React.FC<WebViewHeaderProps> = ({
  url,
  isLoading,
  onUrlChange,
  onGoBack,
  onGoForward,
  onRefresh
}) => {
  const [inputUrl, setInputUrl] = useState(url);

  const handleUrlSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Add https:// if no protocol is specified
    let processedUrl = inputUrl.trim();
    if (!/^https?:\/\//i.test(processedUrl)) {
      processedUrl = 'https://' + processedUrl;
    }
    
    onUrlChange(processedUrl);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleUrlSubmit(e);
    }
  };

  return (
    <div className="bg-white border-b border-gray-200 p-2 shadow-sm">
      <div className="flex items-center gap-2">
        <div className="flex space-x-1">
          <Button 
            variant="outline" 
            size="icon" 
            onClick={onGoBack}
            className="w-8 h-8"
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <Button 
            variant="outline" 
            size="icon" 
            onClick={onGoForward}
            className="w-8 h-8"
          >
            <ArrowRight className="h-4 w-4" />
          </Button>
          <Button 
            variant="outline" 
            size="icon" 
            onClick={onRefresh}
            className="w-8 h-8"
            disabled={isLoading}
          >
            {isLoading ? (
              <LoaderCircle className="h-4 w-4 animate-spin" />
            ) : (
              <RefreshCw className="h-4 w-4" />
            )}
          </Button>
        </div>
        
        <form onSubmit={handleUrlSubmit} className="flex-1 flex items-center">
          <Input
            type="text"
            value={inputUrl}
            onChange={(e) => setInputUrl(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Enter URL"
            className="flex-1"
          />
          <Button type="submit" variant="ghost" className="ml-1">Go</Button>
        </form>
      </div>
      
      {isLoading && (
        <div className="w-full bg-gray-200 h-1 mt-1">
          <div className="bg-blue-500 h-1 w-full animate-pulse"></div>
        </div>
      )}
    </div>
  );
};
