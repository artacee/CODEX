import { Cpu, Globe, Lock, Rocket, Code2, HeartPulse, BrainCircuit, Sparkles } from 'lucide-react';
import { NavItem, Track, Prize, FaqItem, Sponsor, ProblemStatement } from './types';

export const NAV_ITEMS: NavItem[] = [
  { label: 'About', href: '#about' },
  { label: 'Tracks', href: '#tracks' },
  { label: 'Schedule', href: '#schedule' },
  { label: 'Prizes', href: '#prizes' },
  { label: 'Sponsors', href: '#sponsors' },
  { label: 'FAQ', href: '#faq' },
];

export const TRACKS: Track[] = [
  {
    id: 'digital',
    title: 'The Digital Frontier',
    description: 'Focus on cutting-edge software, security, and immersive experiences.',
    icon: Cpu,
    color: 'bg-blue-500',
    tags: ['AI', 'Web3', 'Cybersecurity', 'Gaming']
  },
  {
    id: 'smart',
    title: 'Smart Society',
    description: 'Focus on economic systems, governance, and empowering citizens.',
    icon: Globe,
    color: 'bg-purple-500',
    tags: ['FinTech', 'EdTech', 'Govt Tech']
  },
  {
    id: 'open',
    title: 'Open Innovation',
    description: 'The wildcard track for everything else.',
    icon: Rocket,
    color: 'bg-yellow-500',
    tags: ['Open Innovation']
  }
];

export const PRIZES: Prize[] = [
  {
    place: '2nd Place',
    amount: '₹25,000',
    perks: ['Silver Trophy', 'Certificates'],
    color: 'from-gray-300 to-gray-500'
  },
  {
    place: '1st Place',
    amount: '₹50,000',
    perks: ['Gold Trophy', 'Certificates'],
    color: 'from-yellow-300 to-yellow-600'
  },
  {
    place: '3rd Place',
    amount: '₹10,000',
    perks: ['Bronze Trophy', 'Certificates'],
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

export const SPONSORS: Sponsor[] = Object.keys(import.meta.glob('./public/partners/*.{png,jpg,jpeg,webp,svg}', { eager: true })).map(path => {
  const filename = path.split('/').pop() || '';
  const name = filename.split('.')[0].replace(/[-_]/g, ' ').toUpperCase();
  return {
    name,
    logo: `/partners/${filename}`,
    tier: 'platinum'
  };
});

export const PROBLEM_STATEMENTS: ProblemStatement[] = [
  {
    "id": "ps-003",
    "title": "Fake social media accounts and their detection",
    "category": "Software",
    "theme": "Cybersecurity, Digital Forensics & Law Enforcement Tech",
    "trackId": "digital",
    "sections": {
      "background": "Fake social media accounts pose security risks, including misinformation and malicious communication targeting organizations such as ITBP.",
      "description": "The problem involves identifying fake profiles on platforms like Facebook, Instagram, and Twitter and reporting them for suspension or deletion.",
      "challenge": null,
      "ask": null,
      "expected_solution": "Develop tools to identify fake accounts and establish a central agency to coordinate with social media platforms for time-bound suspension or deletion."
    }
  },
  {
    "id": "ps-006",
    "title": "AI-Powered Rapid Damage Assessment",
    "category": null,
    "theme": "Disaster Management & Emergency Response",
    "trackId": "open",
    "sections": {
      "background": null,
      "description": null,
      "challenge": "After floods, infrastructure damage assessment takes weeks.",
      "ask": "Build a tool using drone or satellite imagery to automatically quantify damage for faster fund release.",
      "expected_solution": null
    }
  },
  {
    "id": "ps-013",
    "title": "Enhancing Navigation for Railway Station Facilities and Locations",
    "category": "Software",
    "theme": "Transportation, Logistics & Smart Cities",
    "trackId": "smart",
    "sections": {
      "background": "RTN trucks operate on fixed routes with varying capacity utilization and delays.",
      "description": "Real-time tracking, GIS integration, and schedule management are required for efficient parcel movement.",
      "challenge": null,
      "ask": null,
      "expected_solution": "A GPS and GIS-based system enabling live tracking, alerts, capacity optimization, and automated MIS reporting."
    }
  }
];