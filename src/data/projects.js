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
    link: 'https://nexusai.up.railway.app',
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
    image: 'https://www.upwork.com/att/download/portfolio/persons/uid/1295795356457041920/profile/projects/files/b3add6d1-67a0-4b0a-8f01-06e641de8093', // Using Services AI image as placeholder
    images: [
      'https://www.upwork.com/att/download/portfolio/persons/uid/1295795356457041920/profile/projects/files/b3add6d1-67a0-4b0a-8f01-06e641de8093',
      'https://www.upwork.com/att/download/portfolio/persons/uid/1295795356457041920/profile/projects/files/4e1495bd-c792-40e1-ad60-3c9d9a343016',
      'https://www.upwork.com/att/download/portfolio/persons/uid/1295795356457041920/profile/projects/files/5fff8e10-3ac2-4fa4-8d96-4907d08ae3e5',
      'https://www.upwork.com/att/download/portfolio/persons/uid/1295795356457041920/profile/projects/files/50fe3559-e9ca-4210-a94b-f046ead03cc8',
      'https://www.upwork.com/att/download/portfolio/persons/uid/1295795356457041920/profile/projects/files/c34b28e4-05e1-4854-8132-8e9c862e97a5',
      'https://www.upwork.com/att/download/portfolio/persons/uid/1295795356457041920/profile/projects/files/c281a315-8f7d-4e93-8f12-70e09da52dd1',
      'https://www.upwork.com/att/download/portfolio/persons/uid/1295795356457041920/profile/projects/files/ece2f225-4a32-438f-a655-fd001f7936fb',
      'https://www.upwork.com/att/download/portfolio/persons/uid/1295795356457041920/profile/projects/files/cd2cb756-f6b0-4975-8034-45cb90f338a7',
      'https://www.upwork.com/att/download/portfolio/persons/uid/1295795356457041920/profile/projects/files/80fef0fd-3df4-44d8-9aef-91f5127ea49a',
      'https://www.upwork.com/att/download/portfolio/persons/uid/1295795356457041920/profile/projects/files/87dcd06a-e96c-4420-b2b9-abe649980ffe',
      'https://www.upwork.com/att/download/portfolio/persons/uid/1295795356457041920/profile/projects/files/f0970087-ff1d-480e-96f5-966fc50d2f52',
      'https://www.upwork.com/att/download/portfolio/persons/uid/1295795356457041920/profile/projects/files/f7c1d77c-58a7-457e-85ae-2beb0a563df6',
      'https://www.upwork.com/att/download/portfolio/persons/uid/1295795356457041920/profile/projects/files/55e093aa-9777-4d2d-b813-032f88c18c45',
      'https://www.upwork.com/att/download/portfolio/persons/uid/1295795356457041920/profile/projects/files/be2bc198-0892-4def-a734-787b3fe73063',

    ],
    categories: ['AI Agent Development', 'Full Stack']
  },
  {
    id: 4,
    title: 'eStore',
    description: 'The Multi-Vendor E-commerce Platform aimed to create a scalable marketplace connecting buyers and sellers. Built with Django, it offers secure user management, cart functionality, and integrated payments via Stripe and COD with OTP verification. Sellers benefit from a dashboard for managing products, orders, and payouts.',
    technologies: ['React', 'Redux', 'Tailwind CSS', 'Django REST Framework', 'PostgreSQL', 'HTML', 'CSS'],
    link: 'https://github.com/kashif56/estore',
    image: 'https://www.upwork.com/att/download/portfolio/persons/uid/1295795356457041920/profile/projects/files/8f1c6b86-418e-4beb-83e5-247d7714a9fa', // Using Nexus AI image as placeholder
    images: [
      'https://www.upwork.com/att/download/portfolio/persons/uid/1295795356457041920/profile/projects/files/8f1c6b86-418e-4beb-83e5-247d7714a9fa',
    
    ],
    categories: ['Full Stack']
  },
  {
    id: 5,
    title: 'eBank',
    description: 'The Custom Banking Website is a comprehensive online banking system built with Django, offering secure account management, money transactions, and service requests. Key features include OTP verification for secure operations, virtual card issuance with customizable limits, and detailed financial management tools.',
    technologies: ['JavaScript', 'Django', 'PostgreSQL', 'Bootstrap', 'HTML', 'CSS'],
    link: 'https://github.com/kashif56/ebank',
    image: 'https://www.upwork.com/att/download/portfolio/persons/uid/1295795356457041920/profile/projects/files/a4d33fb9-e71d-4f5f-861b-a627c505fee1', // Using Services AI image as placeholder
    images: [
     'https://www.upwork.com/att/download/portfolio/persons/uid/1295795356457041920/profile/projects/files/a4d33fb9-e71d-4f5f-861b-a627c505fee1'
    ],
    categories: ['Full Stack']
  },
  {
    id: 6,
    title: 'SkillNet',
    description: 'Skillnet is an innovative platform designed to connect individuals looking to exchange skills and knowledge. Whether you\'re a developer wanting to learn graphic design or a marketer looking to pick up coding, SkillSwap provides a seamless way to barter expertise with like-minded professionals.',
    technologies: ['React', 'Redux', 'Tailwind CSS', 'Django REST Framework', 'PostgreSQL', 'Django Channels', 'Web Sockets', 'HTML', 'CSS'],
    link: 'https://skillnet.up.railway.app',
    image: 'https://www.upwork.com/att/download/portfolio/persons/uid/1295795356457041920/profile/projects/files/319b11e1-2544-4d98-b61c-5602b8ff3f70',
    images: [
      'https://www.upwork.com/att/download/portfolio/persons/uid/1295795356457041920/profile/projects/files/319b11e1-2544-4d98-b61c-5602b8ff3f70',
      'https://www.upwork.com/att/download/portfolio/persons/uid/1295795356457041920/profile/projects/files/9934d760-b457-4458-9773-202690dd5858',
      'https://www.upwork.com/att/download/portfolio/persons/uid/1295795356457041920/profile/projects/files/f8ba9079-b43a-4e71-b4a5-7ac4c8a56d47',
      'https://www.upwork.com/att/download/portfolio/persons/uid/1295795356457041920/profile/projects/files/a6617280-4c19-47ca-a2a1-34f21adf0d6c',
      'https://www.upwork.com/att/download/portfolio/persons/uid/1295795356457041920/profile/projects/files/d921f486-0220-45c8-b6f4-e7aecd3839c9',

    ],
    categories: ['Full Stack']
  },
  {
    id: 7,
    title: 'InstaSync',
    description: 'InstaSync is a powerful Instagram post scheduling platform designed to help creators, businesses, and social media managers automate their content effortlessly. With an intuitive interface, users can plan, schedule, and auto-publish posts, reels, and stories with ease.',
    technologies: ['React', 'Redux', 'Tailwind CSS', 'Django REST Framework', 'PostgreSQL', 'Django-Q2', 'Instagram API', 'HTML', 'CSS'],
    link: 'https://instasync.up.railway.app',
    image: 'https://www.upwork.com/att/download/portfolio/persons/uid/1295795356457041920/profile/projects/files/f160642b-5bf9-4a60-a868-37c749dd9cdf',
    images: [
      'https://www.upwork.com/att/download/portfolio/persons/uid/1295795356457041920/profile/projects/files/f160642b-5bf9-4a60-a868-37c749dd9cdf',

    ],
    categories: ['Full Stack']
  },
  {
    id: 8,
    title: 'Avante Salon',
    description: 'The Salon Management System was designed to streamline salon operations by managing staff attendance, appointments, and expenses. Built with Django, it features a user-friendly interface for tracking staff schedules and client bookings.',
    technologies: ['JavaScript', 'Django', 'SQLite', 'Bootstrap', 'HTML', 'CSS'],
    link: 'https://github.com/kashif56/saloon_management/',
    image: 'https://www.upwork.com/att/download/portfolio/persons/uid/1295795356457041920/profile/projects/files/1240a669-8918-4f6d-8997-e947cd65165a',
    images: [
      'https://www.upwork.com/att/download/portfolio/persons/uid/1295795356457041920/profile/projects/files/1240a669-8918-4f6d-8997-e947cd65165a',
    ],
    categories: ['Full Stack']
  }
];

export default projects;