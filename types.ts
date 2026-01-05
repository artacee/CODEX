import { LucideIcon } from 'lucide-react';

export interface NavItem {
  label: string;
  href: string;
}

export interface Track {
  id: string; // Added for filtering
  title: string;
  description: string;
  icon: LucideIcon;
  color: string;
  tags: string[];
}

export interface Prize {
  place: string;
  amount: string;
  perks: string[];
  color: string;
}

export interface Sponsor {
  name: string;
  logo: string; // URL
  tier: 'platinum' | 'gold' | 'silver';
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface ProblemStatement {
  id: string;
  title: string;
  category: string | null;
  theme: string;
  trackId: string; // To link with Track
  sections: {
    background: string | null;
    description: string | null;
    challenge: string | null;
    ask: string | null;
    expected_solution: string | null;
  };
}