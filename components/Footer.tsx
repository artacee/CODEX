import React from 'react';
import { Instagram } from 'lucide-react';
import { CodexLogo } from './ui/CodexLogo';
import { Magnetic } from './ui/Magnetic';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-surface border-t border-white/5 py-12">
      <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="text-center md:text-left">
          <div className="mb-4 flex justify-center md:justify-start">
             <CodexLogo className="h-16 w-auto" />
          </div>
          <p className="text-white/60 text-sm mb-1 font-medium">Department of Computer Science & Engineering</p>
          <p className="text-muted text-xs">TKM Institute of Technology, Musaliar Hills, Kollam</p>
          <p className="text-muted text-xs mt-4">© 2026 CODEX. All rights reserved.</p>
        </div>

        <div className="flex flex-col items-center md:items-end gap-6">
            <div className="flex items-center gap-6">
              <Magnetic>
                <a 
                  href="https://www.instagram.com/codex.tki?igsh=MTZ3dDNhNWR2Zzl6Mw==" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted hover:text-primary transition-colors block"
                  aria-label="Instagram"
                  data-cursor="hover"
                >
                  <Instagram className="w-5 h-5" />
                </a>
              </Magnetic>
            </div>
            <div className="text-center md:text-right">
              <p className="text-xs text-muted mb-1">Have questions?</p>
              <Magnetic>
                <a href="mailto:support@codextki.dev" data-cursor="hover" className="text-sm font-bold text-white hover:text-primary transition-colors inline-block">
                  support@codextki.dev
                </a>
              </Magnetic>
            </div>
        </div>
      </div>
    </footer>
  );
};