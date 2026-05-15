import {
  BadgeCheck,
  Bot,
  BriefcaseBusiness,
  Clapperboard,
  FileText,
  Megaphone,
  MousePointerClick,
  Search,
  Share2,
  Sparkles,
  Target,
  Workflow,
} from "lucide-react";

export const contactInfo = {
  phone: "9109167827",
  whatsapp: "https://wa.me/919109167827",
  instagram: "https://www.instagram.com/hiyagency.in",
  instagramHandle: "hiyagency.in",
  linkedin: "https://www.linkedin.com/company/hiyagency",
  facebook: "https://www.facebook.com/profile.php?id=61588912052640",
  email: "hello@hiyagency.in",
};

export const clientLogos = [
  "Financial Investment Group",
  "Sonam Creation",
  "Desi Jayka",
  "Kidzee",
  "Kinetic Green",
];

export const defaultShippedProjects = clientLogos.map((client_name, index) => ({
  client_name,
  display_order: index + 1,
  published: true,
}));

export const testimonials = [
  {
    quote:
      "HIY rebuilt our website and lead flow so enquiries felt clearer from day one. The design finally matched the trust we wanted clients to feel.",
    name: "Operations lead",
    role: "Investment firm website",
  },
  {
    quote:
      "Our ecommerce store went from cluttered to clean. Product pages, checkout flow, and WhatsApp follow-up now feel like one system.",
    name: "Founder",
    role: "Ecommerce brand",
  },
  {
    quote:
      "They handled website, Meta ads, and enquiry routing together. We stopped juggling three vendors for one growth goal.",
    name: "Director",
    role: "Financial services",
  },
  {
    quote:
      "The school campaign creative and landing page worked as one story. Parents understood the offer faster and our team got better quality calls.",
    name: "Coordinator",
    role: "School / education campaign",
  },
  {
    quote:
      "For a local business, speed mattered. HIY launched a sharp site with clear CTAs and helped us look credible in our own city.",
    name: "Owner",
    role: "Local business",
  },
  {
    quote:
      "Automation and follow-up systems saved us hours every week. Growth work finally felt organized instead of reactive.",
    name: "Operator",
    role: "Growth & automation",
  },
];

export const trustChips = [
  "Custom Websites",
  "Meta & Google Ads",
  "Video Editing",
  "Automation",
  "Branding",
  "SEO Listings",
];

export const positioningCards = [
  {
    title: "Online Presence",
    text: "We create websites and digital identities that make your business look credible, premium, and ready for customers.",
    icon: MousePointerClick,
  },
  {
    title: "Customer Acquisition",
    text: "We help you attract traffic, generate leads, and convert attention into real business conversations.",
    icon: Target,
  },
  {
    title: "Business Systems",
    text: "We build admin panels, dashboards, automations, and workflows that make your operations easier to manage.",
    icon: Workflow,
  },
];

export const services = [
  {
    slug: "custom-websites",
    title: "Custom Websites for Every Type of Business",
    shortTitle: "Custom Websites",
    description:
      "We design and build custom websites that match your business, your offer, and your customers - not recycled templates. From e-commerce stores and cafes to consultancy firms, real estate businesses, personal brands, and private web portals, we create websites that are built to look premium and convert.",
    points: [
      "Landing pages",
      "Business websites",
      "E-commerce websites",
      "SaaS and product websites",
      "Real estate websites",
      "Cafe, restaurant, and local business websites",
      "Portfolio and personal brand websites",
      "Admin panels and dashboards",
      "Hosting setup",
      "Domain connection",
      "SSL certificate",
      "Contact forms and lead flows",
      "Social media integrations",
      "WhatsApp and call CTAs",
      "Performance optimization",
      "SEO-ready structure",
    ],
    icon: BriefcaseBusiness,
  },
  {
    slug: "performance-marketing",
    title: "Performance Marketing & Paid Growth",
    shortTitle: "Performance Marketing",
    description:
      "We help businesses bring the right traffic through Meta, Google, and YouTube campaigns. From ad creatives to budget optimization, we focus on campaigns that are built to generate enquiries, leads, bookings, and sales.",
    points: [
      "Meta ads",
      "Google ads",
      "YouTube campaign setup",
      "Lead generation campaigns",
      "Creative strategy",
      "Static and motion ad creatives",
      "Audience testing",
      "Budget optimization",
      "Retargeting campaigns",
      "Scaling strategy",
      "Campaign reporting",
      "Conversion-focused copy",
    ],
    icon: Megaphone,
  },
  {
    slug: "video-editing-content-production",
    title: "Professional Video Editing That Holds Attention",
    shortTitle: "Video Editing",
    description:
      "We edit videos with hooks, pacing, storytelling, and brand visuals that make people stop scrolling. From podcasts to reels, shorts, ads, and brand videos, we create content that feels clean, sharp, and intentional.",
    points: [
      "Podcast editing",
      "YouTube video editing",
      "YouTube Shorts",
      "Instagram Reels",
      "Ad video editing",
      "Hook writing",
      "Storytelling structure",
      "Captions and motion text",
      "Premium transitions",
      "Brand visual language",
      "Content repurposing",
      "Short-form content systems",
    ],
    icon: Clapperboard,
  },
  {
    slug: "automation-ai-systems",
    title: "Automation & AI Systems for Modern Businesses",
    shortTitle: "Automation & AI Systems",
    description:
      "We build smart systems that reduce manual work, capture leads faster, and help teams respond better. From chatbots to internal dashboards, we create automation flows that save time and improve operations.",
    points: [
      "Instagram chatbots",
      "WhatsApp chatbots",
      "Website chatbots",
      "AI response systems",
      "Lead qualification systems",
      "Workflow automation",
      "n8n workflows",
      "Zapier integrations",
      "Internal dashboards",
      "CRM automation",
      "Follow-up systems",
      "Notification systems",
    ],
    icon: Bot,
  },
  {
    slug: "branding-positioning",
    title: "Branding That Makes Your Business Look Clear and Premium",
    shortTitle: "Branding & Positioning",
    description:
      "We help brands look sharp, sound confident, and position themselves properly in the market. From logo systems to brand messaging, we shape how your business is seen and remembered.",
    points: [
      "Logo direction",
      "Identity systems",
      "Brand voice",
      "Messaging",
      "Offer creation",
      "Positioning strategy",
      "Visual language",
      "Profile optimization",
      "Service packaging",
      "Premium brand presentation",
    ],
    icon: BadgeCheck,
  },
  {
    slug: "social-media-management",
    title: "Social Media Systems That Keep Your Brand Active",
    shortTitle: "Social Media Management",
    description:
      "We help businesses stay consistent, visible, and engaging across social platforms with planned content, daily posting systems, and growth-focused engagement.",
    points: [
      "Content calendars",
      "Daily posting systems",
      "Caption writing",
      "Engagement growth",
      "Brand consistency",
      "Creative planning",
      "Reels strategy",
      "Post design",
      "Community interaction",
      "Campaign-based content",
    ],
    icon: Share2,
  },
  {
    slug: "seo-listings-local-discovery",
    title: "Search Listings That Help Customers Find You",
    shortTitle: "SEO Listings",
    description:
      "We help businesses become easier to discover through organic and paid listings across search engines and local platforms. Perfect for local businesses that want more calls, visits, and enquiries.",
    points: [
      "Google Business Profile setup",
      "Google Maps optimization",
      "Justdial listing support",
      "Local SEO basics",
      "Search engine listing",
      "Business description writing",
      "Service keyword optimization",
      "Review strategy",
      "Location-based visibility",
      "Paid listing support where required",
    ],
    icon: Search,
  },
  {
    slug: "copywriting-conversion-messaging",
    title: "Words That Make People Understand, Trust, and Take Action",
    shortTitle: "Copywriting",
    description:
      "Good design attracts attention, but strong copy converts it. We write website copy, ad copy, captions, offers, and campaign messaging that makes your business sound clear, premium, and convincing.",
    points: [
      "Website copy",
      "Landing page copy",
      "Ad copy",
      "Sales messaging",
      "Offer writing",
      "Hook writing",
      "Instagram captions",
      "Campaign scripts",
      "CTA writing",
      "Brand tone development",
      "Conversion-focused messaging",
    ],
    icon: FileText,
  },
  {
    slug: "ad-creatives",
    title: "Ad Creatives Built for Attention and Action",
    shortTitle: "Ad Creatives",
    description:
      "We create static and motion ad creatives that are designed to stop the scroll, explain the offer quickly, and push people toward enquiries.",
    points: [
      "Static ad creatives",
      "Motion ad creatives",
      "Reel-style ads",
      "Product/service ad visuals",
      "Hook-based layouts",
      "CTA-focused designs",
      "Multiple ad variations",
      "Creative testing support",
      "Premium brand-aligned visuals",
    ],
    icon: Sparkles,
  },
];

export const processSteps = [
  {
    title: "Discovery",
    text: "We understand your business, offer, audience, and current online presence.",
  },
  {
    title: "Strategy",
    text: "We map the right website, campaign, content, or automation system based on your actual goal.",
  },
  {
    title: "Design",
    text: "We create a premium visual direction with strong UX, copy, and conversion flow.",
  },
  {
    title: "Build",
    text: "We develop the website, system, creatives, or campaigns with production-level quality.",
  },
  {
    title: "Launch",
    text: "We connect domain, hosting, tracking, forms, CTAs, and final integrations.",
  },
  {
    title: "Optimize",
    text: "We improve based on leads, traffic, engagement, and business response.",
  },
];

export const teamMembers = [
  {
    name: "Abhigyan Pandey",
    role: "Founder / Websites & Ads",
    bio: "IIT Delhi certified, ex-cyber security field, now working in the digital agency sector. Handles website strategy, paid ads, digital systems, and client growth execution.",
    experience: "4+ years",
    tags: [
      "IIT Delhi Certified",
      "Ex-Cyber Security Field",
      "Websites",
      "Ads",
      "Digital Systems",
    ],
  },
  {
    name: "Ranveer Singh Tekam",
    role: "Co-Founder / Copywriting, Video & Production",
    bio: "Certified from The Real World. Copywriter, video editor, and production-focused creative with experience across multiple production companies and client projects.",
    experience: "4+ years",
    tags: [
      "Copywriting",
      "Video Editing",
      "Production",
      "Storytelling",
      "Client Projects",
    ],
  },
];

export const whyHiy = [
  {
    title: "Website + ads + systems",
    text: "Strategy, design, campaigns, and backend tools under one roof so your growth stack stays aligned.",
  },
  {
    title: "Premium design that builds trust",
    text: "Every touchpoint is shaped to feel credible, modern, and intentional before a visitor ever enquires.",
  },
  {
    title: "Conversion-first execution",
    text: "Pages, creatives, and flows are built around clear CTAs, enquiry paths, and measurable next steps.",
  },
  {
    title: "Fast launch, clean backend",
    text: "Go live quickly with hosting, forms, tracking, and admin-ready setup you can actually manage.",
  },
  {
    title: "Human support, not corporate noise",
    text: "Direct communication, clear ownership, and practical guidance without endless handoffs.",
  },
];

export const leadWorkOptions = [
  "Website",
  "Ads",
  "Video Editing",
  "Automation",
  "Branding",
  "Social Media Management",
  "SEO / Listings",
  "Copywriting",
  "Complete Growth Package",
  "Other",
];

export const budgetOptions = [
  "Below ₹10,000",
  "₹10,000 - ₹25,000",
  "₹25,000 - ₹50,000",
  "₹50,000 - ₹1,00,000",
  "₹1,00,000+",
];

export const sampleLeads = [
  {
    name: "Priya Sharma",
    phone: "9876543210",
    email: "priya@example.com",
    work_required: "Website",
    budget: "₹25,000 - ₹50,000",
    timeline_days: 21,
    status: "New",
    source: "Website",
    created_at: "2026-05-01T09:00:00Z",
  },
  {
    name: "Arjun Mehta",
    phone: "9123456780",
    email: "arjun@example.com",
    work_required: "Complete Growth Package",
    budget: "₹1,00,000+",
    timeline_days: 45,
    status: "Proposal Sent",
    source: "Instagram",
    created_at: "2026-04-29T12:30:00Z",
  },
];

export const sampleClients = [
  {
    client_name: "Northline Cafe",
    business_name: "Northline Cafe",
    service_type: "Website + Local SEO",
    project_status: "In Progress",
    payment_amount: 65000,
    amount_paid: 35000,
    deadline: "2026-05-22",
  },
  {
    client_name: "Tekam Productions",
    business_name: "Tekam Productions",
    service_type: "Video Editing System",
    project_status: "Review",
    payment_amount: 42000,
    amount_paid: 42000,
    deadline: "2026-05-10",
  },
];

export const sampleProjects = [
  {
    title: "Cafe launch website",
    service_category: "Custom Websites",
    status: "In Progress",
    priority: "High",
    progress: 68,
    due_date: "2026-05-22",
  },
  {
    title: "Founder reel batch",
    service_category: "Video Editing",
    status: "In Review",
    priority: "Medium",
    progress: 86,
    due_date: "2026-05-10",
  },
  {
    title: "Lead response automation",
    service_category: "Automation",
    status: "Pending",
    priority: "Urgent",
    progress: 15,
    due_date: "2026-05-06",
  },
];

export const sampleEmployees = [
  {
    name: "Ranveer Singh Tekam",
    role: "Copywriting, Video & Production",
    status: "Active",
    payout_type: "Per Project",
    payout_due: 18000,
    payout_paid: 42000,
  },
  {
    name: "Abhigyan Pandey",
    role: "Websites, Ads & Systems",
    status: "Active",
    payout_type: "Custom",
    payout_due: 0,
    payout_paid: 0,
  },
];

export const sampleTasks = [
  {
    title: "Finalize homepage first fold",
    status: "In Progress",
    priority: "High",
    due_date: "2026-05-04",
    assigned_employee: "Abhigyan Pandey",
  },
  {
    title: "Export 12 reel edits",
    status: "Todo",
    priority: "Medium",
    due_date: "2026-05-07",
    assigned_employee: "Ranveer Singh Tekam",
  },
  {
    title: "Send campaign proposal",
    status: "Todo",
    priority: "Urgent",
    due_date: "2026-05-02",
    assigned_employee: "Abhigyan Pandey",
  },
];

export const samplePayments = [
  {
    client: "Northline Cafe",
    project: "Cafe launch website",
    total_amount: 65000,
    amount_paid: 35000,
    amount_pending: 30000,
    payment_status: "Partial",
    due_date: "2026-05-14",
  },
  {
    client: "Tekam Productions",
    project: "Founder reel batch",
    total_amount: 42000,
    amount_paid: 42000,
    amount_pending: 0,
    payment_status: "Paid",
    due_date: "2026-05-05",
  },
];
