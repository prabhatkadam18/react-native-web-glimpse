
import React, { useState, useRef } from 'react';
import { WebView } from './components/WebView';
import { WebViewHeader } from './components/WebViewHeader';

const Index = () => {
  const [url, setUrl] = useState('https://www.google.com');
  const [isLoading, setIsLoading] = useState(false);
  const webViewRef = useRef(null);

  const handleUrlChange = (newUrl: string) => {
    setUrl(newUrl);
  };

  const handleLoadStart = () => {
    setIsLoading(true);
  };

  const handleLoadEnd = () => {
    setIsLoading(false);
  };

  const handleGoBack = () => {
    webViewRef.current?.goBack();
  };

  const handleGoForward = () => {
    webViewRef.current?.goForward();
  };

  const handleRefresh = () => {
    webViewRef.current?.reload();
  };

  return (
    <div className="flex flex-col h-screen bg-white">
      <WebViewHeader 
        url={url} 
        onUrlChange={handleUrlChange}
        isLoading={isLoading}
        onGoBack={handleGoBack}
        onGoForward={handleGoForward}
        onRefresh={handleRefresh}
      />
      <WebView 
        ref={webViewRef}
        url={url}
        onLoadStart={handleLoadStart}
        onLoadEnd={handleLoadEnd}
      />
    </div>
  );
};

export default Index;
