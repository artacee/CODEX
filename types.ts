import { LucideIcon } from 'lucide-react';

export interface NavItem {
  label: string;
  href: string;
}

export interface Track {
  title: string;
  description: string;
  icon: LucideIcon;
  color: string;
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
