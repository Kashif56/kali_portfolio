// Import images for Nexus AI project
import nexusAiThumbnail from '../assets/projects/nexus_ai/Nexus AI Thumbnail.png';
import nexusAiDashboard from '../assets/projects/nexus_ai/Dashboard Page.png';
import nexusAiAnalytics from '../assets/projects/nexus_ai/Analytics.png';
import nexusAiKB from '../assets/projects/nexus_ai/KB Page.png';
import nexusAiChat from '../assets/projects/nexus_ai/Public Chat Page.png';
import nexusAiDataSource from '../assets/projects/nexus_ai/Data Source Page.png';

// Import images for Services AI project
import servicesAiThumbnail from '../assets/projects/services_ai/Services AI Thumbnail.png';
import servicesAiDashboard from '../assets/projects/services_ai/Dashboard.png';
import servicesAiBookingForm from '../assets/projects/services_ai/Booking Form.png';
import servicesAiBookingDetail from '../assets/projects/services_ai/Booking Detail Page.png';
import servicesAiBusinessProfile from '../assets/projects/services_ai/Business Profile Page.png';
import servicesAiAgent from '../assets/projects/services_ai/AI Agent.png';
import servicesAiPaymentGateways from '../assets/projects/services_ai/Payment Gateways Page.png';
import servicesAiInvoiceDetail from '../assets/projects/services_ai/Invoice Detail Page.png';
import servicesAiProfile from '../assets/projects/services_ai/Profile Page.png';
import servicesAiStaffDetail from '../assets/projects/services_ai/Staff Detail Page.png';
import servicesAiLeadDetail from '../assets/projects/services_ai/Lead Detail Page.png';
import servicesAiPricing from '../assets/projects/services_ai/Pricing and Service Page.png';
import servicesAiSmtp from '../assets/projects/services_ai/SMTP Config Page.png';

// ALL PROJECTS WILL BE DISPLAYED HERE
const projects = [
  {
    id: 1,
    title: 'Nexus AI',
    description: 'Nexus AI is a full-stack Django application that enables businesses to deploy AI-powered chatbots capable of answering questions using their own documents. Leveraging Retrieval-Augmented Generation (RAG), the system integrates with web, SMS, WhatsApp, and email channels, while offering a powerful analytics dashboard to track user engagement and performance.',
    technologies: ['Python', 'Django', 'PostgreSQL', 'Pinecone', 'Langchain', 'OpenAI', 'Google Gemini', 'Django Q2', 'Twilio', 'GMail API', 'META APIs'],
    link: 'https://github.com/kashif56/nexus_ai',
    image: nexusAiThumbnail,
    images: [
      nexusAiThumbnail,
      nexusAiDashboard,
      nexusAiAnalytics,
      nexusAiKB,
      nexusAiChat,
      nexusAiDataSource
    ],
    categories: ['Full Stack', 'AI Agent Development']
  },
  {
    id: 2,
    title: 'Services AI',
    description: 'Services AI is a modular, AI-powered SaaS platform designed to help service-based businesses automate lead capture and engagement via SMS and voice calls. Built with Django, Twilio, and OpenAI, the system supports industry-specific workflows, intelligent appointment scheduling, and personalized AI-driven communication.',
    technologies: ['Django', 'JavaScript', 'HTML', 'CSS', 'Bootstrap', 'OpenAI', 'Langchain', 'Stripe', 'Square', 'Paypal', 'Django Q2', 'Twilio'],
    link: 'https://github.com/kashif56/services_ai',
    image: servicesAiThumbnail,
    images: [
      servicesAiThumbnail,
      servicesAiDashboard,
      servicesAiBookingForm,
      servicesAiBookingDetail,
      servicesAiBusinessProfile,
      servicesAiAgent
    ],
    categories: ['AI Agent Development', 'Full Stack']
  },
  {
    id: 3,
    title: 'CleaningBiz AI',
    description: 'CleaningBizAI is a smart automation platform tailored for cleaning businesses. It offers voice and SMS-based virtual assistants that handle client communication, booking inquiries, and follow-ups without human intervention. It\'s designed to save time, increase booking rates, and provide 24/7 customer support.',
    technologies: ['Django', 'JavaScript', 'HTML', 'CSS', 'Bootstrap', 'OpenAI', 'Langchain', 'Stripe', 'Square', 'Paypal', 'Django Q2', 'Twilio'],
    link: 'cleaningbizai.com',
    image: servicesAiThumbnail, // Using Services AI image as placeholder
    images: [
      servicesAiThumbnail,
      servicesAiDashboard,
      servicesAiBookingForm
    ],
    categories: ['AI Agent Development', 'Full Stack']
  },
  {
    id: 4,
    title: 'eStore',
    description: 'The Multi-Vendor E-commerce Platform aimed to create a scalable marketplace connecting buyers and sellers. Built with Django, it offers secure user management, cart functionality, and integrated payments via Stripe and COD with OTP verification. Sellers benefit from a dashboard for managing products, orders, and payouts.',
    technologies: ['React', 'Redux', 'Tailwind CSS', 'Django REST Framework', 'PostgreSQL', 'HTML', 'CSS'],
    link: 'https://github.com/username/estore',
    image: nexusAiDashboard, // Using Nexus AI image as placeholder
    images: [
      nexusAiDashboard,
      nexusAiDataSource,
      nexusAiKB
    ],
    categories: ['Full Stack']
  },
  {
    id: 5,
    title: 'eBank',
    description: 'The Custom Banking Website is a comprehensive online banking system built with Django, offering secure account management, money transactions, and service requests. Key features include OTP verification for secure operations, virtual card issuance with customizable limits, and detailed financial management tools.',
    technologies: ['JavaScript', 'Django', 'PostgreSQL', 'Bootstrap', 'HTML', 'CSS'],
    link: 'https://github.com/username/ebank',
    image: servicesAiDashboard, // Using Services AI image as placeholder
    images: [
      servicesAiDashboard,
      servicesAiPaymentGateways,
      servicesAiInvoiceDetail
    ],
    categories: ['Full Stack']
  },
  {
    id: 6,
    title: 'SkillNet',
    description: 'Skillnet is an innovative platform designed to connect individuals looking to exchange skills and knowledge. Whether you\'re a developer wanting to learn graphic design or a marketer looking to pick up coding, SkillSwap provides a seamless way to barter expertise with like-minded professionals.',
    technologies: ['React', 'Redux', 'Tailwind CSS', 'Django REST Framework', 'PostgreSQL', 'Django Channels', 'Web Sockets', 'HTML', 'CSS'],
    link: 'https://github.com/username/skillnet',
    image: servicesAiProfile, // Using Services AI image as placeholder
    images: [
      servicesAiProfile,
      servicesAiStaffDetail,
      servicesAiBusinessProfile
    ],
    categories: ['Full Stack']
  },
  {
    id: 7,
    title: 'InstaSync',
    description: 'InstaSync is a powerful Instagram post scheduling platform designed to help creators, businesses, and social media managers automate their content effortlessly. With an intuitive interface, users can plan, schedule, and auto-publish posts, reels, and stories with ease.',
    technologies: ['React', 'Redux', 'Tailwind CSS', 'Django REST Framework', 'PostgreSQL', 'Django-Q2', 'Instagram API', 'HTML', 'CSS'],
    link: 'https://github.com/username/instasync',
    image: servicesAiLeadDetail, // Using Services AI image as placeholder
    images: [
      servicesAiLeadDetail,
      servicesAiBookingDetail,
      servicesAiPricing
    ],
    categories: ['Full Stack']
  },
  {
    id: 8,
    title: 'Avante Salon',
    description: 'The Salon Management System was designed to streamline salon operations by managing staff attendance, appointments, and expenses. Built with Django, it features a user-friendly interface for tracking staff schedules and client bookings.',
    technologies: ['JavaScript', 'Django', 'SQLite', 'Bootstrap', 'HTML', 'CSS'],
    link: 'https://github.com/username/avante-salon',
    image: servicesAiBookingForm, // Using Services AI image as placeholder
    images: [
      servicesAiBookingForm,
      servicesAiStaffDetail,
      servicesAiSmtp
    ],
    categories: ['Full Stack']
  }
];

export default projects;