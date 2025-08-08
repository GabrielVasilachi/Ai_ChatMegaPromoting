// Sample data for AI Chat marketing site

export interface Company {
  id: number;
  name: string;
  logo: string; // placeholder path
}

export interface Testimonial {
  id: number;
  name: string;
  title: string;
  company: string;
  avatar: string; // placeholder path
  quote: string;
  metrics: {
    label: string;
    value: string;
  };
}

export interface IndustryCard {
  id: number;
  title: string;
  description: string;
  benefits: string[];
}

export interface PricingPlan {
  id: number;
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  isPopular?: boolean;
  ctaText: string;
}

// Company logos for social proof
export const companies: Company[] = [
  { id: 1, name: "TechCorp", logo: "/placeholder-logo-1.png" },
  { id: 2, name: "MedHealth", logo: "/placeholder-logo-2.png" },
  { id: 3, name: "AutoDealer", logo: "/placeholder-logo-3.png" },
  { id: 4, name: "RetailPlus", logo: "/placeholder-logo-4.png" },
  { id: 5, name: "LogiFlow", logo: "/placeholder-logo-5.png" },
  { id: 6, name: "SaaS Solutions", logo: "/placeholder-logo-6.png" },
  { id: 7, name: "RestaurantChain", logo: "/placeholder-logo-7.png" },
  { id: 8, name: "FinanceFirst", logo: "/placeholder-logo-8.png" },
];

// How it works steps
export const howItWorksSteps = [
  {
    id: 1,
    title: "Connect Your Channels",
    description: "Integrate with your existing chat platforms, phone systems, and messaging apps in minutes.",
  },
  {
    id: 2,
    title: "Train Your AI Agent",
    description: "Upload your knowledge base, FAQs, and company information to customize responses.",
  },
  {
    id: 3,
    title: "Go Live 24/7",
    description: "Your AI receptionist starts handling inquiries instantly, escalating complex issues to your team.",
  },
];

// Industry-specific modules
export const industryCards: IndustryCard[] = [
  {
    id: 1,
    title: "Restaurant",
    description: "Handle reservations, menu questions, and delivery inquiries automatically.",
    benefits: ["Reservation management", "Menu assistance", "Order tracking", "Special requests"],
  },
  {
    id: 2,
    title: "Healthcare",
    description: "Manage appointment scheduling and answer common patient questions securely.",
    benefits: ["Appointment booking", "Insurance verification", "Prescription inquiries", "HIPAA compliant"],
  },
  {
    id: 3,
    title: "Auto",
    description: "Qualify leads, schedule test drives, and provide service information.",
    benefits: ["Lead qualification", "Service scheduling", "Inventory questions", "Financing info"],
  },
  {
    id: 4,
    title: "SaaS",
    description: "Support trial users, handle billing questions, and route technical issues.",
    benefits: ["Trial support", "Billing assistance", "Feature explanations", "Technical routing"],
  },
  {
    id: 5,
    title: "Retail",
    description: "Answer product questions, check inventory, and assist with returns.",
    benefits: ["Product information", "Inventory checking", "Return processing", "Store locations"],
  },
  {
    id: 6,
    title: "Logistics",
    description: "Track shipments, handle delivery questions, and manage scheduling.",
    benefits: ["Shipment tracking", "Delivery scheduling", "Route optimization", "Status updates"],
  },
];

// Customer testimonials
export const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Sarah Johnson",
    title: "Operations Manager",
    company: "MedHealth Clinic",
    avatar: "/placeholder-avatar-1.png",
    quote: "Our AI receptionist handles 80% of patient inquiries automatically. We've reduced wait times and improved patient satisfaction significantly.",
    metrics: {
      label: "Response time reduced",
      value: "75%",
    },
  },
  {
    id: 2,
    name: "Mike Chen",
    title: "Restaurant Owner",
    company: "Chen's Bistro",
    avatar: "/placeholder-avatar-2.png",
    quote: "Never miss a reservation again. The AI handles our booking system perfectly, even during our busiest hours.",
    metrics: {
      label: "Bookings increased",
      value: "45%",
    },
  },
  {
    id: 3,
    name: "Lisa Rodriguez",
    title: "Customer Success Lead",
    company: "TechFlow SaaS",
    avatar: "/placeholder-avatar-3.png",
    quote: "Our support team can now focus on complex issues while the AI handles all the routine questions flawlessly.",
    metrics: {
      label: "Support tickets reduced",
      value: "60%",
    },
  },
];

// Pricing plans
export const pricingPlans: PricingPlan[] = [
  {
    id: 1,
    name: "Free",
    price: "$0",
    period: "month",
    description: "Perfect for small businesses getting started",
    features: [
      "Up to 100 conversations/month",
      "Basic AI responses",
      "Email support",
      "1 integration",
    ],
    ctaText: "Get Started Free",
  },
  {
    id: 2,
    name: "Growth",
    price: "$49",
    period: "month",
    description: "For growing businesses with higher volume",
    features: [
      "Up to 2,500 conversations/month",
      "Advanced AI with learning",
      "Priority support",
      "5 integrations",
      "Custom branding",
      "Analytics dashboard",
    ],
    isPopular: true,
    ctaText: "Start Growth Plan",
  },
  {
    id: 3,
    name: "Enterprise",
    price: "Custom",
    period: "pricing",
    description: "For large organizations with custom needs",
    features: [
      "Unlimited conversations",
      "Custom AI training",
      "Dedicated support manager",
      "Unlimited integrations",
      "White-label solution",
      "Advanced analytics",
      "SLA guarantee",
    ],
    ctaText: "Contact Sales",
  },
];

// Code examples for developer section
export const codeExamples = {
  curl: `curl -X POST "https://api.ai-chat.com/v1/chat" \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "message": "How can I help you today?",
    "user_id": "user123",
    "context": {
      "channel": "website",
      "previous_messages": []
    }
  }'`,
  
  javascript: `import { AiChat } from '@ai-chat/sdk';

const client = new AiChat('YOUR_API_KEY');

async function handleMessage(message, userId) {
  try {
    const response = await client.chat.create({
      message,
      userId,
      context: {
        channel: 'website',
        previousMessages: []
      }
    });
    
    return response.reply;
  } catch (error) {
    console.error('AI Chat error:', error);
    return 'Sorry, I encountered an error. Please try again.';
  }
}`,
};

// Footer links
export const footerLinks = {
  product: [
    { label: "Features", href: "#features" },
    { label: "Pricing", href: "#pricing" },
    { label: "API Docs", href: "/docs" },
    { label: "Integrations", href: "/integrations" },
  ],
  company: [
    { label: "About", href: "/about" },
    { label: "Blog", href: "/blog" },
    { label: "Careers", href: "/careers" },
    { label: "Contact", href: "/contact" },
  ],
  support: [
    { label: "Help Center", href: "/help" },
    { label: "Community", href: "/community" },
    { label: "Status", href: "/status" },
    { label: "Privacy", href: "/privacy" },
  ],
};
