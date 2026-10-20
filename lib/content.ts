// ---------------------------------------------------------------------------
// All portfolio content lives here. Edit this file to change text, links,
// projects and experience without touching any component.
// ---------------------------------------------------------------------------

export const profile = {
  name: "Mohammad Zeeshan Fayyaz",
  firstName: "Zeeshan",
  title: "Senior Web Developer & Team Lead",
  company: "GTCFX",
  location: "Dubai, UAE",
  email: "mzeeshanfayyaz93@gmail.com",
  linkedin: "https://linkedin.com/in/muhammad-zeeshan-fayyaz993",
  site: "https://mzeeshanfayyaz93.github.io",
  github: "https://github.com/mzeeshanfayyaz93",
  phone: "+971 52 505 8849",
  whatsapp:
    "https://wa.me/971525058849?text=Hi%20Zeeshan!%20I%20visited%20your%20portfolio%20and%20I'm%20interested%20in%20working%20with%20you.%20Could%20we%20discuss%20a%20project%3F",
  jobType: "Full-time / Freelance",
  cv: "/Zeeshan_CV.pdf",
  /** About section portrait (file in /public). */
  photo: "/profile.jpg",
  roles: [
    "fast, multilingual web apps",
    "custom Shopify & WordPress themes",
    "trading platform integrations",
    "automation that saves hours",
    "internal tools and portals",
  ],
  summary:
    "Senior Web Developer & Team Lead with 8+ years of experience building high-performance, multilingual and scalable web applications for fintech, events, real estate and e-commerce. I lead full-stack development at GTCFX in Dubai, working across Next.js, a Node.js headless CMS, MT5/MT4 integrations, CRM automation and regional domain architecture for 20+ markets. Before that I built 200+ custom Shopify and WordPress sites from scratch, theme development included, with no starter themes. An AI-augmented developer, I use ChatGPT, Claude, DeepSeek, Grok and AbacusAI daily to ship faster.",
};

export const highlights = [
  { label: "Years building for the web", value: "8+" },
  { label: "Country markets served", value: "20+" },
  { label: "Custom sites delivered", value: "200+" },
  { label: "Happy clients", value: "50+" },
];

export const interests = [
  "AI & automation",
  "UI/UX design",
  "Continuous learning",
  "Freelancing",
  "Blog writing",
  "Travel",
  "Music",
  "Cycling",
];

export const services = [
  {
    icon: "store",
    title: "Custom Shopify & WordPress websites",
    text: "Themes built from scratch, with no starter templates. Shopify (Liquid), WordPress, WooCommerce, ACF and WPML, set up for multiple currencies, VAT and local payment gateways.",
    points: ["Shopify theme development", "WooCommerce stores", "Multilingual sites"],
  },
  {
    icon: "code",
    title: "Fast, multilingual web apps",
    text: "Next.js, React and Tailwind websites with a Node.js headless CMS. Quick to load, easy for your team to edit, and ready for many languages, including right-to-left.",
    points: ["Next.js & React", "Strapi headless CMS", "i18n, RTL, regional domains"],
  },
  {
    icon: "chart",
    title: "Trading platform integrations",
    text: "MT5 and MT4 account automation, Copy Trading setup, client portal onboarding and card activation, all through secure server-side webhooks.",
    points: ["MT5 / MT4 APIs", "Client portals", "Secure webhooks"],
  },
  {
    icon: "workflow",
    title: "CRM & marketing automation",
    text: "Leads from Meta, Google and TikTok flow straight into Salesforce. Zapier routing, dynamic emails and deliverability set up across five email platforms.",
    points: ["Salesforce & Marketing Cloud", "Zapier flows", "SPF, DKIM, DMARC"],
  },
  {
    icon: "search",
    title: "SEO, analytics & speed",
    text: "GA4, Tag Manager and Search Console with event tracking, hreflang for every market, schema markup, and image and caching work that keeps pages fast.",
    points: ["Technical SEO", "GA4 & GTM", "Core Web Vitals"],
  },
  {
    icon: "bot",
    title: "AI-assisted delivery",
    text: "Daily use of Claude, Cursor, ChatGPT and other AI tools to ship faster, plus chatbot agents that qualify leads and hand over to your sales team.",
    points: ["Chatbot agents", "Faster delivery", "Lead qualification"],
  },
];

export const skillGroups = [
  {
    title: "Frontend",
    items: ["Next.js 14", "React.js", "TypeScript", "Tailwind CSS", "DaisyUI", "Headless UI", "Framer Motion", "Three.js"],
  },
  {
    title: "Backend & APIs",
    items: ["Node.js", "Strapi CMS", "REST APIs", "Webhooks", "MT5/MT4 SDK", "MSSQL", "Swagger"],
  },
  {
    title: "Trading & Fintech",
    items: ["MT5/MT4 account automation", "Copy Trading API", "Client portal onboarding", "Card activation webhooks"],
  },
  {
    title: "CRM & Marketing automation",
    items: ["Salesforce CRM", "Marketing Cloud", "Zapier", "Klaviyo", "Mailchimp", "Brevo", "SendPulse", "GetResponse"],
  },
  {
    title: "Shopify & theme development",
    items: ["Shopify Liquid", "Custom Shopify themes", "Store customisation", "Multi-currency & VAT", "Shipping zones & coupons", "Payment gateways", "Shopify Partner"],
  },
  {
    title: "WordPress & WooCommerce",
    items: ["Custom WordPress themes", "Custom plugins", "WooCommerce", "ACF", "WPML", "Gravity Forms", "The Events Calendar", "BuddyPress", "Stripe / PayPal / PayFort / Telr"],
  },
  {
    title: "Email & Communications",
    items: ["SendGrid", "Mailgun", "Nodemailer", "Twilio", "Dynamic email templates", "SPF / DKIM / DMARC"],
  },
  {
    title: "Cloud & DevOps",
    items: ["AWS EC2", "Vercel", "Cloudflare", "AliCloud", "PM2", "Nginx", "CI/CD", "GitHub / GitLab"],
  },
  {
    title: "Analytics & SEO",
    items: ["Google Analytics 4", "Google Tag Manager", "Search Console", "Event tracking", "hreflang", "Schema markup"],
  },
  {
    title: "AI & Security",
    items: ["Claude", "Cursor", "ChatGPT", "DeepSeek", "Grok", "AbacusAI", "reCAPTCHA", "OTP verification"],
  },
];

// Self-rated proficiency (from the original portfolio).
export const skillLevels = [
  { name: "Next.js / React.js", level: 90 },
  { name: "Tailwind CSS / DaisyUI / Headless UI", level: 90 },
  { name: "i18n, next-intl, RTL, regional domains", level: 90 },
  { name: "Node.js / Strapi CMS", level: 85 },
  { name: "Shopify (Liquid) & custom theme development", level: 90 },
  { name: "WordPress / WooCommerce themes & plugins", level: 90 },
  { name: "REST APIs / MT5 & MT4 integration", level: 85 },
  { name: "Klaviyo, Mailchimp, Brevo, SendPulse", level: 85 },
  { name: "Zapier automation pipelines", level: 85 },
  { name: "GA4 / GTM / SEO / web performance", level: 85 },
  { name: "AWS EC2 / Vercel / Cloudflare / AliCloud", level: 80 },
  { name: "Salesforce CRM & Marketing Cloud", level: 80 },
  { name: "AI tools & chatbot agents", level: 80 },
];

export const marquee = [
  "Next.js", "React", "TypeScript", "Tailwind CSS", "Node.js", "Strapi", "Three.js", "Framer Motion",
  "Shopify", "Liquid", "WordPress", "WooCommerce", "Theme development", "ACF", "WPML",
  "MT5 / MT4", "Salesforce", "Zapier", "Twilio", "AWS", "Vercel", "Cloudflare", "GA4", "GTM", "MSSQL",
];

export type Category = "Fintech" | "Automation" | "Web" | "Internal tools";

export const projects: {
  title: string;
  category: Category;
  text: string;
  tags: string[];
}[] = [
  {
    title: "GTCFX website rebuild",
    category: "Web",
    text: "Moved the main website from WordPress to Next.js 14 with a Node.js headless CMS (Strapi), a reusable component system, 20+ locales and strong Lighthouse scores.",
    tags: ["Next.js", "Strapi", "Tailwind", "next-intl"],
  },
  {
    title: "Custom Shopify themes",
    category: "Web",
    text: "Storefronts and themes written in Liquid from scratch, with multi-currency, VAT, shipping zones and payment gateways, plus A/B tests on product and checkout pages.",
    tags: ["Shopify", "Liquid", "Theme development", "CRO"],
  },
  {
    title: "WordPress & WooCommerce builds",
    category: "Web",
    text: "200+ custom themes and plugins with no starter themes: ACF, WPML, Gravity Forms, booking systems, subscriptions and offer logic, from Figma or PDF designs.",
    tags: ["WordPress", "WooCommerce", "ACF", "WPML"],
  },
  {
    title: "MT5 / MT4 account automation",
    category: "Fintech",
    text: "Automated live and demo account opening, Copy Trading setup and client portal onboarding through secure server-side webhooks.",
    tags: ["MT5", "MT4", "Webhooks", "Node.js"],
  },
  {
    title: "Card activation webhooks",
    category: "Fintech",
    text: "Webhook integration that automates GTC Credit Card activation end to end.",
    tags: ["Webhooks", "API", "Security"],
  },
  {
    title: "Lead pipeline to Salesforce",
    category: "Automation",
    text: "Captures leads from Meta, Google and TikTok campaigns and passes them straight into Salesforce, with Zapier routing and automated follow-up flows.",
    tags: ["Salesforce", "Zapier", "Meta", "TikTok"],
  },
  {
    title: "Dynamic QR code portal",
    category: "Internal tools",
    text: "Create and manage QR codes, and change the destination link at any time, even after the code has been printed.",
    tags: ["Next.js", "Node.js", "Dynamic links"],
  },
  {
    title: "Dynamic employee portal",
    category: "Internal tools",
    text: "An internal portal for employees, built to be flexible and easy to maintain.",
    tags: ["Next.js", "Node.js", "MSSQL"],
  },
  {
    title: "Client email & alert system",
    category: "Automation",
    text: "Dynamic personalised emails, automated server-down notifications to clients, and deliverability set up across five email platforms.",
    tags: ["SendGrid", "Mailgun", "SPF/DKIM/DMARC"],
  },
  {
    title: "Regional domains & failover",
    category: "Web",
    text: "IP-based detection that sends visitors to the right country domain across 20+ markets, with backup domain failover where needed.",
    tags: ["Cloudflare", "AWS", "Vercel", "DNS"],
  },
  {
    title: "Phone & OTP verification",
    category: "Fintech",
    text: "SMS OTP and phone number validation on sign-ups and forms to confirm each number is real and belongs to the user.",
    tags: ["Twilio", "OTP", "Validation"],
  },
];

export const experience = [
  {
    company: "GTCFX",
    role: "Senior Web Developer & Team Lead",
    period: "Sep 2023 – Present",
    place: "Dubai World Trade Centre, UAE",
    points: [
      "Led the complete rebrand and full-stack rebuild of the GTCFX website on Next.js and a Node.js headless CMS (Strapi), owning architecture, the component library and team code reviews.",
      "Integrated MT5 and MT4 trading APIs to automate Live and Demo account creation, Copy Trading setup and client portal onboarding through secure server-side webhooks.",
      "Architected IP-based regional detection and redirects across 20+ country domains, with backup domain failover for FX-restricted markets.",
      "Built the lead pipeline from Meta, Google and TikTok into Salesforce CRM, with Marketing Cloud flows and Zapier automation routing forms, leads and events with zero manual handling.",
      "Built email marketing automation across 5 platforms (Mailchimp, Klaviyo, Brevo, SendPulse, GetResponse) and configured SPF, DKIM and DMARC on branded domains.",
      "Deployed AI chatbot agents for client communication and lead qualification, with handoff to Sales and Support.",
      "Built a dynamic QR code portal, an employee portal, GTC Credit Card activation webhooks and phone / OTP verification.",
      "Managed infrastructure across AWS EC2, Vercel, SiteGround, GoDaddy, Cloudflare and AliCloud: SSL, DNS, CDN caching and CI/CD.",
      "Held Lighthouse targets (LCP under 2s, INP under 200ms) with WebP/AVIF, code-splitting and dynamic imports.",
      "Full i18n with next-intl for 20+ locales, RTL support, per-route SEO metadata and hreflang / canonical for country domains.",
      "Added a security layer: reCAPTCHA, OTP / email verification, honeypot, DOMPurify XSS sanitisation and Formik / Yup validation.",
      "Set up GA4, Google Tag Manager and Search Console with event tracking across the website.",
    ],
  },
  {
    company: "Platinum UAE",
    role: "Senior Web Developer",
    period: "Sep 2022 – Aug 2023",
    place: "Dubai, UAE",
    points: [
      "Owned the full web stack for a group of multi-brand company websites and online shopping portals.",
      "Built and maintained Shopify and WooCommerce stores: multi-currency, VAT, shipping zones, coupons and payment gateways (Stripe, PayPal, PayFort, Telr).",
      "Ran CRO experiments (A/B tests on product, detail and checkout pages) guided by GA4 and heatmap data.",
      "Managed country domains, SSL, Cloudflare / CloudFront CDN and DNS, with SEO structured data, XML sitemaps and Meta / TikTok / Snap pixels.",
      "Set up SPF / DKIM / DMARC and automation flows in Klaviyo and Mailchimp; ran staging-to-production deploys on Vercel and AWS EC2.",
    ],
  },
  {
    company: "Harbor Real Estate",
    role: "Senior Website Developer",
    period: "Apr 2021 – Aug 2022",
    place: "Dubai, UAE",
    points: [
      "Developed multilingual WordPress websites with WPML and custom booking systems with time slots and online payment.",
      "Integrated live property XML / JSON feeds with Dubizzle and Bayut for real-time listing sync.",
      "Managed email and SMS marketing databases and connected Facebook, Snapchat and TikTok lead generation.",
      "Sped up high-traffic listing pages with lazy loading, image compression and caching.",
    ],
  },
  {
    company: "Wolfiz Pvt. Ltd.",
    role: "Shopify & WordPress Developer Specialist",
    period: "Oct 2017 – Mar 2021",
    place: "Islamabad, Pakistan",
    points: [
      "Designed and built 200+ custom Shopify and WordPress websites from scratch for international clients, with no starter themes.",
      "Built WooCommerce customisations including subscription products, offer logic and payment gateway integrations.",
      "Worked with ACF, Gravity Forms, The Events Calendar, BuddyPress and the WooCommerce ecosystem.",
    ],
  },
  {
    company: "Freelance",
    role: "Web Developer",
    period: "2016 – 2017",
    place: "Rawalpindi, Pakistan",
    points: ["WordPress, custom HTML / CSS and small e-commerce projects for local and international clients."],
  },
  {
    company: "Webmekanics Pvt. Ltd.",
    role: "Frontend Developer",
    period: "2015 – 2016",
    place: "Rawalpindi, Pakistan",
    points: [
      "Built responsive UIs with HTML5, CSS3, Bootstrap and AngularJS, across the full development lifecycle.",
    ],
  },
];

export const education = [
  {
    degree: "BSc in Software Engineering",
    school: "University of Engineering & Technology (UET) Taxila, Pakistan",
    period: "2011 – 2015",
  },
  { degree: "FSc (Pre-Engineering)", school: "F.G. Degree College, Lahore Cantt", period: "2009 – 2011" },
  { degree: "Matriculation (Science)", school: "Garrison Boys High School, Lahore Cantt", period: "2006 – 2008" },
];

export const certifications = [
  "Next.js & React Advanced Development — Udemy",
  "Salesforce Marketing Cloud — Trailhead",
  "AWS Cloud Practitioner Essentials — AWS Training",
  "AI Tools & Prompt Engineering — ChatGPT, Claude, DeepSeek, Grok, AbacusAI",
  "Shopify Partner & Theme Development — Shopify Learn",
];

export type WorkType = "Web apps" | "Shopify" | "WordPress";

export const clientWork: { name: string; type: WorkType; note: string; url: string; image: string; bleed?: boolean }[] = [
  { name: "Air Academic", type: "Web apps", note: "Next.js · Figma to website", url: "https://airacademic.com/", image: "air-academic" },
  { name: "ProDoo", type: "Web apps", note: "Next.js · Figma to website", url: "https://stage.prodoo.com/", image: "prodoo" },
  { name: "Glam Seven", type: "Web apps", note: "Next.js · Figma to website", url: "https://www.glamseven.com/", image: "glam-seven" },
  { name: "STS Cars", type: "Web apps", note: "HTML & PHP · Web portal", url: "https://www.stscars.co.uk/", image: "sts-cars", bleed: true },
  { name: "Assa Transfer", type: "Web apps", note: "Website & online booking system", url: "https://assatransfers.co.uk/", image: "assa-transfer", bleed: true },
  { name: "Platinum Transfers", type: "Web apps", note: "Website & online booking system", url: "https://platinumtransfers.co.uk/", image: "platinum-transfers", bleed: true },
  { name: "Taxi Dispatch Software", type: "Web apps", note: "Web app · custom UI & design", url: "https://taxidespatch.co.uk/beta/", image: "taxi-dispatch", bleed: true },
  { name: "Snowe Home", type: "Shopify", note: "Custom theme development", url: "https://snowehome.com/", image: "snowe-home" },
  { name: "Mode & Affaire", type: "Shopify", note: "Full store customisation", url: "https://modeandaffaire.com/", image: "mode-affaire" },
  { name: "BURGA", type: "Shopify", note: "USA based store", url: "https://www.burga.com/", image: "burga" },
  { name: "Tilevera", type: "Shopify", note: "Custom theme & design", url: "https://www.tilevera.co.za/", image: "tilevera" },
  { name: "Discount LED Lights", type: "Shopify", note: "E-commerce store", url: "https://discountledlights.com/", image: "discount-led" },
  { name: "Sox and Jox", type: "Shopify", note: "E-commerce store", url: "https://www.soxandjox.co.za/", image: "sox-and-jox" },
  { name: "White Suede", type: "Shopify", note: "Jewellery store", url: "https://whitesuedejewelry.com/", image: "white-suede" },
  { name: "Yumi Organics", type: "Shopify", note: "Organic products store", url: "https://www.yumi-organics.ca/", image: "yumi-organics", bleed: true },
  { name: "GTCFX Portal", type: "WordPress", note: "PDF to website", url: "https://mtgtcfx.com/beta/", image: "gtcfx-portal" },
  { name: "Bliss Pilates", type: "WordPress", note: "Custom design", url: "https://blisspilates.com.au/", image: "bliss-pilates" },
  { name: "Moonwalk Properties", type: "WordPress", note: "Real estate website", url: "https://moonwalkproperties.com/", image: "moonwalk" },
  { name: "Agility ECC", type: "WordPress", note: "Full website development", url: "https://www.agilityecc.com/", image: "agility-ecc" },
  { name: "RockzFX", type: "WordPress", note: "Website & design", url: "https://rockzfx.com/", image: "rockzfx" },
  { name: "Powerhouse Hub", type: "WordPress", note: "Figma to website", url: "https://www.powerhousehub.com/", image: "powerhouse-hub" },
  { name: "Oxford Minibus Company", type: "WordPress", note: "Figma to website", url: "https://www.theoxfordminibuscompany.co.uk/", image: "oxford-minibus", bleed: true },
  { name: "Maximus Accountants", type: "WordPress", note: "Business website", url: "https://maximusaccountants.com/", image: "maximus", bleed: true },
  { name: "FreedomFi", type: "WordPress", note: "Custom website design", url: "https://freedomfi.com/", image: "freedomfi" },
  { name: "Home Scanner", type: "WordPress", note: "Promotional landing page", url: "https://promotion.homescaner.com/", image: "home-scanner" },
  { name: "One Nine Properties", type: "WordPress", note: "Real estate website", url: "https://onenineproperties.com/", image: "one-nine", bleed: true },
  { name: "360 Home Scanner", type: "WordPress", note: "Promotional landing page", url: "https://330rc.homescaner.com/", image: "360-home-scanner" },
];

// Testimonials as published on the original portfolio.
export const testimonials = [
  {
    quote:
      "Zeeshan is an exceptional developer — highly skilled, reliable, and always delivers on time. He built our platform with great attention to detail and performance.",
    name: "Ahsan Zahid",
    role: "CEO & Founder, Pakistan",
  },
  {
    quote:
      "Zeeshan worked with my team and was extremely cooperative, professional, and technically strong. A great asset to any project.",
    name: "Waleed Mansoor",
    role: "Senior Graphic Designer, UAE",
  },
  {
    quote:
      "Zeeshan developed multiple websites for us with excellent quality. He understands requirements quickly and delivers clean, scalable code.",
    name: "M Taimur Khan",
    role: "HR Manager, UAE",
  },
  {
    quote:
      "A very thorough and professional developer. Zeeshan took full ownership of our project and delivered beyond expectations.",
    name: "Noman Tariq",
    role: "Data Engineer, UAE",
  },
  {
    quote:
      "Zeeshan understood my requirements perfectly and delivered a high-quality website. Professional, communicative, and highly recommended.",
    name: "Ali Raza",
    role: "Entrepreneur, Pakistan",
  },
  {
    quote:
      "Amazing experience working with Zeeshan. A highly proficient Shopify developer who truly knows his craft. Highly recommended!",
    name: "M Amir",
    role: "CEO, Branding Bytes, Pakistan",
  },
];
