
import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function Home() {
  const router = useRouter();

  // Typewriter effect
  useEffect(() => {
    const phrases = ["Edit Images", "Extract Text", "Create Designs"];
    let index = 0;
    const el = document.getElementById('typewriter');
    
    const loop = () => {
      const text = phrases[index];
      let i = 0;
      const typing = setInterval(() => {
        el.textContent = text.slice(0, i++);
        if (i > text.length) {
          clearInterval(typing);
          setTimeout(() => {
            el.style.opacity = 0;
            setTimeout(() => {
              index = (index + 1) % phrases.length;
              loop();
              el.style.opacity = 1;
            }, 500);
          }, 1500);
        }
      }, 100);
    };
    loop();
  }, []);

  return (
    <div className="home-container">
      <header className="hero-section">
        <h1 className="text-5xl font-bold mb-4">
          <span id="typewriter" className="text-[var(--accent)]"></span>
        </h1>
        <p className="text-xl mb-8">AI-powered editing directly in your browser</p>
        <button 
          onClick={() => router.push('/editor')}
          className="btn-primary animate-enter"
        >
          Start Editing →
        </button>
      </header>

      <div className="features-grid">
        {[
          { icon: "🖼️", title: "Drag & Drop", desc: "Upload images instantly" },
          { icon: "🔍", title: "Smart OCR", desc: "Extract text from any image" },
          { icon: "🎨", title: "Advanced Tools", desc: "Fonts, colors, and effects" }
        ].map((feature, i) => (
          <div 
            key={i} 
            className="feature-card card-hover" 
            style={{ animationDelay: `${i * 0.1}s` }}
          >
            <span className="text-4xl mb-3">{feature.icon}</span>
            <h3 className="text-xl font-semibold">{feature.title}</h3>
            <p className="text-gray-600">{feature.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
