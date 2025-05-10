// ALL PROJECTS WILL BE DISPLAYED HERE
const projects = [
  {
    id: 1,
    title: 'Nexus AI',
    description: 'Nexus AI is a full-stack Django application that enables businesses to deploy AI-powered chatbots capable of answering questions using their own documents. Leveraging Retrieval-Augmented Generation (RAG), the system integrates with web, SMS, WhatsApp, and email channels, while offering a powerful analytics dashboard to track user engagement and performance.',
    technologies: ['Python', 'Django', 'PostgreSQL', 'Pinecone', 'Langchain', 'OpenAI', 'Google Gemini', 'Django Q2', 'Twilio', 'GMail API', 'META APIs'],
    link: 'https://github.com/username/nexus-ai',
    image: '/images/nexus-ai.png',
    categories: ['Full Stack', 'AI Agent Development']
  },
  {
    id: 2,
    title: 'Services AI',
    description: 'Services AI is a modular, AI-powered SaaS platform designed to help service-based businesses automate lead capture and engagement via SMS and voice calls. Built with Django, Twilio, and OpenAI, the system supports industry-specific workflows, intelligent appointment scheduling, and personalized AI-driven communication.',
    technologies: ['Django', 'JavaScript', 'HTML', 'CSS', 'Bootstrap', 'OpenAI', 'Langchain', 'Stripe', 'Square', 'Paypal', 'Django Q2', 'Twilio'],
    link: 'https://github.com/username/services-ai',
    image: '/images/services-ai.png',
    categories: ['AI Agent Development', 'Full Stack']
  },
  {
    id: 3,
    title: 'CleaningBiz AI',
    description: 'CleaningBizAI is a smart automation platform tailored for cleaning businesses. It offers voice and SMS-based virtual assistants that handle client communication, booking inquiries, and follow-ups without human intervention. It\'s designed to save time, increase booking rates, and provide 24/7 customer support.',
    technologies: ['Django', 'JavaScript', 'HTML', 'CSS', 'Bootstrap', 'OpenAI', 'Langchain', 'Stripe', 'Square', 'Paypal', 'Django Q2', 'Twilio'],
    link: 'https://github.com/username/cleaningbiz-ai',
    image: '/images/cleaningbiz-ai.png',
    categories: ['AI Agent Development', 'Full Stack']
  },
  {
    id: 4,
    title: 'eStore',
    description: 'The Multi-Vendor E-commerce Platform aimed to create a scalable marketplace connecting buyers and sellers. Built with Django, it offers secure user management, cart functionality, and integrated payments via Stripe and COD with OTP verification. Sellers benefit from a dashboard for managing products, orders, and payouts.',
    technologies: ['React', 'Redux', 'Tailwind CSS', 'Django REST Framework', 'PostgreSQL', 'HTML', 'CSS'],
    link: 'https://github.com/username/estore',
    image: '/images/estore.png',
    categories: ['Full Stack']
  },
  {
    id: 5,
    title: 'eBank',
    description: 'The Custom Banking Website is a comprehensive online banking system built with Django, offering secure account management, money transactions, and service requests. Key features include OTP verification for secure operations, virtual card issuance with customizable limits, and detailed financial management tools.',
    technologies: ['JavaScript', 'Django', 'PostgreSQL', 'Bootstrap', 'HTML', 'CSS'],
    link: 'https://github.com/username/ebank',
    image: '/images/ebank.png',
    categories: ['Full Stack']
  },
  {
    id: 6,
    title: 'SkillNet',
    description: 'Skillnet is an innovative platform designed to connect individuals looking to exchange skills and knowledge. Whether you\'re a developer wanting to learn graphic design or a marketer looking to pick up coding, SkillSwap provides a seamless way to barter expertise with like-minded professionals.',
    technologies: ['React', 'Redux', 'Tailwind CSS', 'Django REST Framework', 'PostgreSQL', 'Django Channels', 'Web Sockets', 'HTML', 'CSS'],
    link: 'https://github.com/username/skillnet',
    image: '/images/skillnet.png',
    categories: ['Full Stack']
  },
  {
    id: 7,
    title: 'InstaSync',
    description: 'InstaSync is a powerful Instagram post scheduling platform designed to help creators, businesses, and social media managers automate their content effortlessly. With an intuitive interface, users can plan, schedule, and auto-publish posts, reels, and stories with ease.',
    technologies: ['React', 'Redux', 'Tailwind CSS', 'Django REST Framework', 'PostgreSQL', 'Django-Q2', 'Instagram API', 'HTML', 'CSS'],
    link: 'https://github.com/username/instasync',
    image: '/images/instasync.png',
    categories: ['Full Stack']
  },
  {
    id: 8,
    title: 'Avante Salon',
    description: 'The Salon Management System was designed to streamline salon operations by managing staff attendance, appointments, and expenses. Built with Django, it features a user-friendly interface for tracking staff schedules and client bookings.',
    technologies: ['JavaScript', 'Django', 'SQLite', 'Bootstrap', 'HTML', 'CSS'],
    link: 'https://github.com/username/avante-salon',
    image: '/images/avante-salon.png',
    categories: ['Full Stack']
  }
];

export default projects;