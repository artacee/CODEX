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
    id: 'life',
    title: 'Life & Sustainability',
    description: 'Focus on biological sciences, physical survival, and the environment.',
    icon: HeartPulse,
    color: 'bg-green-500',
    tags: ['HealthTech', 'AgriTech']
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

export const SPONSORS: Sponsor[] = [
  { name: "Google Cloud", logo: "https://picsum.photos/200/80", tier: "platinum" },
  { name: "Vercel", logo: "https://picsum.photos/200/81", tier: "platinum" },
  { name: "Figma", logo: "https://picsum.photos/200/82", tier: "gold" },
  { name: "Auth0", logo: "https://picsum.photos/200/83", tier: "gold" },
  { name: "Notion", logo: "https://picsum.photos/200/84", tier: "silver" },
  { name: "Github", logo: "https://picsum.photos/200/85", tier: "silver" },
];

export const PROBLEM_STATEMENTS: ProblemStatement[] = [
    {
        "id": "ps-001",
        "title": "Implementation of the Alumni Association platform for the University/Institute.",
        "category": "Software",
        "theme": "Accessibility, Inclusion & Assistive Technology",
        "trackId": "smart",
        "sections": {
            "background": "“Inclusivity” is the motto of Education department, Government of Gujarat. Opportunity for all is the new slogan and The Indian Government has come up with Indian Sign Language. There has been lot of work in done in American sign language and focusing on interpretation in English. Majority schools in India adopt local language. In Gujarat, the deaf and mute students would be learning Gujarati by sign language. There are two general methods of deaf education are manualism and oralism. The students learn at school but at home if they want to practice material in Digital form is in limited form especially considering Indian Sign Language and Gujarati as local language.",
            "description": "The proposed comprehensive Mobile Application aims to address the key challenges faced in learning beyond classroom by deaf and mute students. The key features of the application include interpretation of alphabets and numbers in Gujarati, writing practice, basic words and sentences, mathematics exercises, science learning via sign language tutorials, conversion between Gujarati text/speech and sign language, and data analytics for learning assessment. The application will cater to teachers, students, parents and HR.",
            "challenge": null,
            "ask": null,
            "expected_solution": "The implementation of this comprehensive Mobile application is expected to improve learning of basic mathematics and science, increase communication, enable better assessment of learning, and help include specially abled students into mainstream education through text, speech, and sign language conversion."
        }
    },
    {
        "id": "ps-002",
        "title": "AI based Customized time slot Delivery of Articles/Parcels",
        "category": "Software",
        "theme": "Transportation, Logistics & Smart Cities",
        "trackId": "smart",
        "sections": {
            "background": "Due to fast and hectic lifestyle, GenZ desires customized, time-bound doorstep services. E-commerce and financial organizations provide such services using digital platforms and AI, creating higher customer expectations.",
            "description": "India Post delivers articles and parcels mostly during office hours, leading to failed deliveries, repeated attempts, and customer dissatisfaction when recipients are unavailable.",
            "challenge": null,
            "ask": null,
            "expected_solution": "Allow senders and recipients to select or modify delivery time slots online, creating AI training data for future deliveries and improving last-mile delivery efficiency."
        }
    },
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
        "id": "ps-004",
        "title": "Kudumbashree Digital Storefront Generator",
        "category": null,
        "theme": "Digital Commerce & Livelihood Enablement",
        "trackId": "smart",
        "sections": {
            "background": null,
            "description": null,
            "challenge": "Women entrepreneurs lack the tech skills to list products online.",
            "ask": "Build a zero-code app where a seller uploads a product photo and GenAI generates descriptions, pricing, and a catalog item ready for ONDC.",
            "expected_solution": null
        }
    },
    {
        "id": "ps-005",
        "title": "Mesh Network SOS App for Communication Blackouts",
        "category": null,
        "theme": "Disaster Management & Emergency Response",
        "trackId": "open",
        "sections": {
            "background": null,
            "description": null,
            "challenge": "When towers go down, victims are isolated.",
            "ask": "Develop a mobile application using BLE and Wi-Fi Direct to form a peer-to-peer mesh network for message relaying.",
            "expected_solution": null
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
        "id": "ps-007",
        "title": "Smart Soil-to-Market Planner for Exotic Fruits",
        "category": null,
        "theme": "Agriculture & Rural Innovation (AgriTech)",
        "trackId": "life",
        "sections": {
            "background": null,
            "description": null,
            "challenge": "Farmers switch to exotic fruits without knowing soil and climate suitability.",
            "ask": "Create a predictive model using soil health and weather data to recommend optimal crop mixes.",
            "expected_solution": null
        }
    },
    {
        "id": "ps-008",
        "title": "Canopy Health Monitoring via Drone AI",
        "category": null,
        "theme": "Agriculture & Rural Innovation (AgriTech)",
        "trackId": "life",
        "sections": {
            "background": null,
            "description": null,
            "challenge": "Detecting diseases and pests in tall coconut trees is dangerous and difficult from the ground.",
            "ask": "Develop a computer vision model analyzing drone or high-zoom imagery to identify pest signatures.",
            "expected_solution": null
        }
    },
    {
        "id": "ps-009",
        "title": "Real-time closed captioning solution in Indian languages",
        "category": "Software",
        "theme": "Accessibility, Inclusion & Assistive Technology",
        "trackId": "open",
        "sections": {
            "background": null,
            "description": null,
            "challenge": null,
            "ask": null,
            "expected_solution": "An AI-based system converting live speech into real-time multilingual captions, simplifying text for Deaf-friendly understanding, and supporting offline and digital platforms."
        }
    },
    {
        "id": "ps-010",
        "title": "AI-Powered Mobile Platform for Democratizing Sports Talent Assessment",
        "category": "Software",
        "theme": "Accessibility, Inclusion & Assistive Technology",
        "trackId": "open",
        "sections": {
            "background": "Identifying and assessing athletic talent in India is limited by infrastructure and access to standardized assessment facilities.",
            "description": "The platform enables athletes to record videos of fitness tests, uses AI/ML for verification, and submits data for evaluation and profiling.",
            "challenge": null,
            "ask": null,
            "expected_solution": "A scalable, low-cost mobile application with AI-based verification, cheat detection, benchmarking, and dashboards for authorities."
        }
    },
    {
        "id": "ps-011",
        "title": "Secure water level data collection from rivers using image processing",
        "category": "Software",
        "theme": "Smart Infrastructure, Environment & Sustainability",
        "trackId": "life",
        "sections": {
            "background": "Water level monitoring in India is often manual, leading to inefficiencies and delays.",
            "description": "The application uses image processing, GPS, geofencing, and metadata to securely collect and validate water level data.",
            "challenge": null,
            "ask": null,
            "expected_solution": "A GPS-aware mobile application with secure data capture, offline sync, role-based access, and cloud dashboard integration."
        }
    },
    {
        "id": "ps-012",
        "title": "Smart Tourist Safety Monitoring & Incident Response System",
        "category": "Software",
        "theme": "Travel, Tourism & Public Safety",
        "trackId": "smart",
        "sections": {
            "background": "Tourism safety in remote regions requires technology-driven real-time monitoring and response systems.",
            "description": "The system includes digital tourist IDs, mobile applications, AI-based anomaly detection, dashboards, and optional IoT integration.",
            "challenge": null,
            "ask": null,
            "expected_solution": "A robust digital ecosystem ensuring tourist safety, rapid incident response, and secure identity verification."
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
    },
    {
        "id": "ps-014",
        "title": "Civic Issue Reporting",
        "category": null,
        "theme": "Smart Governance / GovTech",
        "trackId": "smart",
        "sections": {
            "background": "India faces massive unresolved civic complaints causing economic loss and erosion of trust.",
            "description": null,
            "challenge": "Civic issues go unreported due to slow channels and lack of transparency.",
            "ask": null,
            "expected_solution": null
        }
    },
    {
        "id": "ps-015",
        "title": "Food Waste Redistribution",
        "category": null,
        "theme": "Smart Infrastructure, Environment & Sustainability",
        "trackId": "life",
        "sections": {
            "background": "India wastes large amounts of food while many face food insecurity due to coordination and trust gaps.",
            "description": null,
            "challenge": "Edible food waste coexists with unmet demand in shelters.",
            "ask": null,
            "expected_solution": null
        }
    },
    {
        "id": "ps-019",
        "title": "Real-time Maritime Domain Awareness for Illegal Fishing and Smuggling",
        "category": null,
        "theme": "LegalTech & Judicial Systems",
        "trackId": "digital",
        "sections": {
            "background": null,
            "description": "Analyze large-scale AIS data, SAR imagery, and vessel tracking data to establish normal maritime behavior in a nation’s Exclusive Economic Zone and detect illegal, unreported, and unregulated fishing or smuggling activities in real time.",
            "challenge": "Processing massive, noisy geospatial track data and correlating it with satellite imagery to detect non-cooperative or suspicious vessels.",
            "ask": null,
            "expected_solution": null
        }
    },
     {
    "id": "ps-020",
    "title": "AI supported AICTE Approval process portal",
    "category": "Software",
    "theme": "Smart Governance / GovTech",
    "trackId": "smart",
    "sections": {
      "background": "The All India Council for Technical Education (AICTE) is the primary body responsible for the accreditation and approval of technical education institutions across India. This process, which includes application submissions, document verification, and detailed evaluations by multiple stakeholders, is currently burdened by inefficiencies.",
      "challenge": "The AICTE approval process involves numerous steps and interactions among educational institutions, regulatory authorities, and evaluators, requiring modernization to improve efficiency and transparency.",
      "description": "Design an AI-driven portal to automate and optimize submission, verification, and evaluation workflows; enhance document verification using AI; improve transparency through real-time tracking and communication.",
      "ask": null,
      "expected_solution": "Accelerated processing times, reduced administrative burden, enhanced document validation accuracy, improved transparency and communication."
    }
  },
  {
    "id": "ps-021",
    "title": "Recovery of Deleted Data and Associated Metadata from XFS and Btrfs Filesystems",
    "category": "Software",
    "theme": "Cybersecurity, Digital Forensics & Law Enforcement Tech",
    "trackId": "digital",
    "sections": {
      "background": "Digital evidence is crucial in forensic investigations. While recovery tools for FAT and NTFS are mature, modern file systems like XFS and Btrfs use complex data structures that make deleted data and metadata recovery challenging.",
      "challenge": "Recovering deleted data and complete metadata from XFS and Btrfs file systems requires specialized techniques due to journaling, copy-on-write, and complex allocation mechanisms.",
      "description": "XFS and Btrfs delay overwriting deleted data, enabling potential recovery. However, extracting files and accurate metadata such as timestamps and filenames requires deep understanding of internal structures.",
      "ask": null,
      "expected_solution": "Develop comprehensive recovery techniques to extract deleted data across multiple file types, recover complete metadata, provide user-friendly GUI/CLI interfaces, and ensure data integrity through validation and verification."
    }
  },
  {
    "id": "ps-022",
    "title": "Development of a Paperless Scholarship Disbursement System for PMSSS",
    "category": "Software",
    "theme": "Smart Governance / GovTech",
    "trackId": "smart",
    "sections": {
      "background": "The Prime Minister's Special Scholarship Scheme (PMSSS) involves extensive paperwork for document submission and verification, leading to delays and inefficiencies. A digital approach is required to streamline scholarship disbursement.",
      "challenge": "Manual document handling causes delays, inefficiencies, and environmental impact due to paper usage.",
      "description": "Develop a secure online portal for students to upload documents digitally, enable automated verification by the SAG Bureau, forward verified documents to the Finance Bureau, provide real-time tracking and notifications.",
      "ask": null,
      "expected_solution": "A fully digital, paperless system enabling document upload, verification, automated forwarding for payment processing, improved efficiency, reduced processing time, and minimized risk of document loss."
    }
  },
  {
    "id": "ps-023",
    "title": "AI-Driven Research Engine for Commercial Courts",
    "category": "Software",
    "theme": "LegalTech & Judicial Systems",
    "trackId": "open",
    "sections": {
      "background": "Despite reforms under the Commercial Courts Act, 2015, large pendency of cases continues to delay dispute resolution. Leveraging technology is essential to expedite judicial processes.",
      "challenge": "Expediting commercial dispute resolution without compromising reliability, ethics, and feasibility within the Indian judicial system.",
      "description": "Develop an AI-driven research engine that aggregates legal data, extracts relevant precedents and principles, customizes results per case, uses predictive analytics, supports multilingual access, ensures data localization, and operates as a neutral facilitator.",
      "ask": null,
      "expected_solution": "An AI-driven research engine to assist judges and judicial officers in legal research, improve efficiency, and support faster dispute resolution while maintaining transparency and ethical use of AI."
    }
  },
  {
    "id": "ps-024",
    "title": "VoIP Calls Tracing: Trace the origin and path of Voice over Internet Protocol (VoIP) calls",
    "category": null,
    "theme": "Cybersecurity, Digital Forensics & Law Enforcement Tech",
    "trackId": "digital",
    "sections": {
      "background": null,
      "description": "It becomes difficult for police officers to trace internet calls. Thus, an advanced solution becomes the need where the police can trace the person who is making an internet call. There should be a solution that can fetch the internet call details.",
      "challenge": null,
      "ask": null,
      "expected_solution": "The prime motive is to identify the location of the person who is trying to make internet calls."
    }
  },
  {
    "id": "ps-025",
    "title": "Social Media Analysis / Record Finding Tool",
    "category": null,
    "theme": "Cybersecurity, Digital Forensics & Law Enforcement Tech",
    "trackId": "digital",
    "sections": {
      "background": null,
      "description": "A solution or interface that works as an open-source platform to help get records crowdsourced through multiple platforms and websites. The system should interconnect platforms based on email ID or mobile numbers using information available in the public domain.",
      "challenge": null,
      "ask": null,
      "expected_solution": "Police only have to enter the email or mobile number of the suspect and the solution should provide all the linkages on different platforms via the social engineering process."
    }
  },
  {
    "id": "ps-026",
    "title": "Student Innovation – Renewable / Sustainable Energy",
    "category": "Software",
    "theme": "Smart Infrastructure, Environment & Sustainability",
    "trackId": "life",
    "sections": {
      "background": null,
      "description": "Innovative ideas that help manage and generate renewable or sustainable energy sources more efficiently.",
      "challenge": null,
      "ask": null,
      "expected_solution": null
    }
  },
  {
    "id": "ps-027",
    "title": "Student Innovation – Clean & Green Technology",
    "category": "Software",
    "theme": "Smart Infrastructure, Environment & Sustainability",
    "trackId": "life",
    "sections": {
      "background": null,
      "description": "Solutions could be in the form of waste segregation, disposal, and improvements to sanitation systems.",
      "challenge": null,
      "ask": null,
      "expected_solution": null
    }
  }
];