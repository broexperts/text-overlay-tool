import { useRef, useState } from 'react';
import dynamic from 'next/dynamic';

// Lazy load heavy dependencies
const FabricCanvas = dynamic(() => import('../components/FabricCanvas'), { 
  ssr: false,
  loading: () => <div className="loading-spinner"></div>
});

export default function Editor() {
  const [activeTool, setActiveTool] = useState('text');
  const canvasRef = useRef(null);

  const handleToolChange = (tool) => {
    setActiveTool(tool);
    // Tool-specific logic would go here
  };

  return (
    <div className="editor-layout">
      <aside className="tool-panel">
        <ToolButton 
          icon="✏️" 
          active={activeTool === 'text'}
          onClick={() => handleToolChange('text')}
        />
        <ToolButton 
          icon="🔍" 
          active={activeTool === 'ocr'}
          onClick={() => handleToolChange('ocr')}
        />
        {/* More tools... */}
      </aside>

      <main className="canvas-container">
        <FabricCanvas ref={canvasRef} />
      </main>

      <div className="property-panel">
        {activeTool === 'text' && <TextProperties />}
        {activeTool === 'ocr' && <OCRPanel />}
      </div>
    </div>
  );
}
