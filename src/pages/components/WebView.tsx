
import React, { forwardRef, useImperativeHandle, useRef, useEffect } from 'react';
import { Browser } from '@capacitor/browser';

interface WebViewProps {
  url: string;
  onLoadStart?: () => void;
  onLoadEnd?: () => void;
}

interface WebViewRef {
  goBack: () => void;
  goForward: () => void;
  reload: () => void;
}

export const WebView = forwardRef<WebViewRef, WebViewProps>(
  ({ url, onLoadStart, onLoadEnd }, ref) => {
    const iframeRef = useRef<HTMLIFrameElement>(null);
    const historyStack = useRef<string[]>([]);
    const currentHistoryIndex = useRef<number>(-1);

    const loadUrl = (urlToLoad: string) => {
      if (onLoadStart) onLoadStart();
      
      if (iframeRef.current) {
        iframeRef.current.src = urlToLoad;
        
        // Only add to history if it's a new URL (not navigating through history)
        if (urlToLoad !== historyStack.current[currentHistoryIndex.current]) {
          // If we're not at the end of the history, trim the forward history
          if (currentHistoryIndex.current < historyStack.current.length - 1) {
            historyStack.current = historyStack.current.slice(0, currentHistoryIndex.current + 1);
          }
          
          historyStack.current.push(urlToLoad);
          currentHistoryIndex.current = historyStack.current.length - 1;
        }
      }
    };

    useImperativeHandle(ref, () => ({
      goBack: () => {
        if (currentHistoryIndex.current > 0) {
          currentHistoryIndex.current--;
          loadUrl(historyStack.current[currentHistoryIndex.current]);
        }
      },
      goForward: () => {
        if (currentHistoryIndex.current < historyStack.current.length - 1) {
          currentHistoryIndex.current++;
          loadUrl(historyStack.current[currentHistoryIndex.current]);
        }
      },
      reload: () => {
        if (iframeRef.current && currentHistoryIndex.current >= 0) {
          if (onLoadStart) onLoadStart();
          iframeRef.current.src = historyStack.current[currentHistoryIndex.current];
        }
      }
    }));

    useEffect(() => {
      loadUrl(url);
    }, [url]);

    const handleIframeLoad = () => {
      if (onLoadEnd) onLoadEnd();
    };

    return (
      <div className="flex-grow w-full h-full">
        <iframe
          ref={iframeRef}
          className="w-full h-full border-none"
          onLoad={handleIframeLoad}
          title="Web Content"
          sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
        />
      </div>
    );
  }
);

WebView.displayName = 'WebView';
