import { Cpu, Globe, Lock, Rocket, Code2, HeartPulse, BrainCircuit, Sparkles } from 'lucide-react';
import { NavItem, Track, Prize, FaqItem, Sponsor } from './types';

export const NAV_ITEMS: NavItem[] = [
  { label: 'About', href: '#about' },
  { label: 'Tracks', href: '#tracks' },
  { label: 'Prizes', href: '#prizes' },
  { label: 'Sponsors', href: '#sponsors' },
  { label: 'FAQ', href: '#faq' },
];

export const TRACKS: Track[] = [
  {
    title: 'Generative Models',
    description: 'Build innovative solutions using LLMs, Image Gen, or Audio synthesis.',
    icon: Sparkles,
    color: 'bg-green-500'
  },
  {
    title: 'AI Agents',
    description: 'Create autonomous agents that solve complex workflows and tasks.',
    icon: BrainCircuit,
    color: 'bg-blue-500'
  },
  {
    title: 'Computer Vision',
    description: 'Leverage visual data for real-time analysis and interaction.',
    icon: Globe,
    color: 'bg-purple-500'
  },
  {
    title: 'Open Innovation',
    description: 'Any solution that pushes the boundaries of AI technology.',
    icon: Rocket,
    color: 'bg-yellow-500'
  }
];

export const PRIZES: Prize[] = [
  {
    place: '2nd Place',
    amount: '₹25,000',
    perks: ['Silver Trophy', 'Certificates', 'Swag Kits'],
    color: 'from-gray-300 to-gray-500'
  },
  {
    place: '1st Place',
    amount: '₹50,000',
    perks: ['Gold Trophy', 'Direct Internship Opportunity', 'Certificates'],
    color: 'from-yellow-300 to-yellow-600'
  },
  {
    place: '3rd Place',
    amount: '₹10,000',
    perks: ['Bronze Trophy', 'Certificates', 'Swag Kits'],
    color: 'from-orange-300 to-orange-600'
  }
];

export const FAQS: FaqItem[] = [
  {
    question: "Where is the venue?",
    answer: "The hackathon will be held at TKM Institute of Technology, Musaliar Hills, Karuvelil P.O, Kollam, Kerala."
  },
  {
    question: "What is the duration?",
    answer: "CODEX is a 24-hour hackathon where innovation meets execution."
  },
  {
    question: "Who can participate?",
    answer: "Open to all students from any college/university. You just need a passion for building."
  },
  {
    question: "What is the team size?",
    answer: "You can form teams of 2-4 members. Inter-college teams are allowed."
  }
];

export const SPONSORS: Sponsor[] = [
  { name: "Google Cloud", logo: "https://picsum.photos/200/80", tier: "platinum" },
  { name: "Vercel", logo: "https://picsum.photos/200/81", tier: "platinum" },
  { name: "Figma", logo: "https://picsum.photos/200/82", tier: "gold" },
  { name: "Auth0", logo: "https://picsum.photos/200/83", tier: "gold" },
  { name: "Notion", logo: "https://picsum.photos/200/84", tier: "silver" },
  { name: "Github", logo: "https://picsum.photos/200/85", tier: "silver" },
];