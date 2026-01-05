import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { GoogleGenAI } from "@google/genai";
import { Sparkles, Loader2, Lightbulb } from 'lucide-react';
import { Button } from './ui/Button';

export const IdeaGenerator: React.FC = () => {
  const [topic, setTopic] = useState('');
  const [idea, setIdea] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const generateIdea = async () => {
    if (!topic) return;
    
    setLoading(true);
    setIdea(null);

    try {
      // In a real app, you would use a backend proxy to hide the API key or force user selection
      // For this demo, we assume the environment variable is set or we mock it if missing for UI demo purposes
      const apiKey = process.env.API_KEY || ''; 
      
      if (!apiKey) {
        // Fallback for demo without API Key
        await new Promise(resolve => setTimeout(resolve, 2000));
        setIdea(`Since no API key is configured in this demo, here is a mock idea for "${topic}": A decentralized platform that gamifies ${topic} using NFT achievements to boost community engagement.`);
        setLoading(false);
        return;
      }

      const ai = new GoogleGenAI({ apiKey });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Generate a unique, innovative, and technically feasible project idea for CODEX (a 24-hour Gen AI hackathon) based on the keyword: "${topic}". Keep it under 50 words. Be punchy and exciting.`,
      });
      
      setIdea(response.text || "Could not generate an idea. Try again.");
    } catch (error) {
      console.error(error);
      setIdea("Error connecting to the creative matrix. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-24 bg-surface border-y border-white/5 relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="mb-10"
          >
            <span className="text-primary font-mono text-sm tracking-widest uppercase mb-2 block">Powered by Gemini 2.0</span>
            <h2 className="font-display font-bold text-4xl md:text-5xl mb-6">STUCK FOR IDEAS?</h2>
            <p className="text-muted text-lg">Use our AI assistant to brainstorm your next winning project for CODEX.</p>
          </motion.div>

          <div className="glass p-2 rounded-2xl flex flex-col md:flex-row gap-2 max-w-2xl mx-auto mb-8">
            <input
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="Enter a keyword (e.g., 'Health', 'Crypto', 'Education')"
              className="flex-1 bg-transparent border-none text-white px-6 py-4 focus:ring-0 focus:outline-none placeholder:text-gray-600 font-medium"
            />
            <Button 
              onClick={generateIdea} 
              disabled={loading || !topic}
              className="md:w-auto w-full"
            >
              {loading ? <Loader2 className="animate-spin" /> : <Sparkles className="w-4 h-4" />}
              {loading ? 'Thinking...' : 'Generate Idea'}
            </Button>
          </div>

          {idea && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="bg-gradient-to-br from-white/10 to-white/5 p-8 rounded-2xl border border-white/10 text-left relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-4 opacity-20">
                <Lightbulb className="w-12 h-12" />
              </div>
              <h3 className="text-primary font-bold mb-2 uppercase tracking-wide text-xs">Generated Concept</h3>
              <p className="font-display text-xl md:text-2xl leading-relaxed">{idea}</p>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
};