import { Product } from './types';

const pdf = (id: string) => `/courses/${id}.pdf`;

export const products: Product[] = [
  { id: '1', title: 'Full-Stack Web Development Masterclass', description: 'From zero to deployment. Master React, Node.js, and Postgres in this comprehensive 60-hour course.', price: 1899.00, category: 'Web Development', icon: 'Layers', pdfUrl: pdf('1') },
  { id: '2', title: 'API Architecture & Integration', description: 'Design robust, scalable REST and GraphQL APIs. Includes advanced rate limiting and auth.', price: 349.00, category: 'Backend', icon: 'Server', pdfUrl: pdf('2') },
  { id: '3', title: 'Kubernetes & Docker Deployment', description: 'Containerize and orchestrate your applications like a pro. CI/CD pipelines included.', price: 549.00, category: 'DevOps', icon: 'Box', pdfUrl: pdf('3') },
  { id: '4', title: 'Advanced Cybersecurity & Hacking', description: 'Learn ethical hacking, penetration testing, and how to secure modern web apps.', price: 649.00, category: 'Security', icon: 'ShieldAlert', pdfUrl: pdf('4') },
  { id: '5', title: 'Cloud Architecture with AWS', description: 'Master AWS services, serverless architecture, and scalable infrastructure design.', price: 499.00, category: 'Cloud', icon: 'Cloud', pdfUrl: pdf('5') },
  { id: '6', title: 'System Design Interview Prep', description: 'Aces your technical interviews by mastering large-scale system design concepts.', price: 5.00, category: 'Career', icon: 'Network', pdfUrl: pdf('6') },
  { id: '7', title: 'Machine Learning & AI Engineering', description: 'Build, train, and deploy machine learning models and LLM-based applications.', price: 1099.00, category: 'AI', icon: 'Cpu', pdfUrl: pdf('7') },
  { id: '8', title: 'React & Next.js Pro Patterns', description: 'Advanced React patterns, Server Components, and performance optimization.', price: 399.00, category: 'Frontend', icon: 'Code', pdfUrl: pdf('8') },
  { id: '9', title: 'Modern Python Development', description: 'Python for backend, data science, and automation. Includes FastAPI and Pandas.', price: 329.00, category: 'Languages', icon: 'Terminal', pdfUrl: pdf('9') },
  { id: '10', title: 'Rust for Systems Programming', description: 'Memory safety without garbage collection. Master Rust for high-performance apps.', price: 479.00, category: 'Languages', icon: 'Zap', pdfUrl: pdf('10') },
  { id: '11', title: 'Advanced Database Optimization', description: 'Deep dive into indexing, query optimization, and scaling SQL/NoSQL databases.', price: 389.00, category: 'Data', icon: 'Database', pdfUrl: pdf('11') },
  { id: '12', title: 'Mobile App Dev with React Native', description: 'Build cross-platform iOS and Android applications with React Native and Expo.', price: 449.00, category: 'Mobile', icon: 'Smartphone', pdfUrl: pdf('12') },
  { id: '13', title: 'UI/UX Design for Developers', description: 'Design beautiful, accessible, and high-converting user interfaces using modern tools.', price: 299.00, category: 'Design', icon: 'Palette', pdfUrl: pdf('13') },
  { id: '14', title: 'Technical Leadership & Management', description: 'Transition from senior engineer to tech lead or engineering manager effectively.', price: 599.00, category: 'Career', icon: 'Users', pdfUrl: pdf('14') },
  { id: '15', title: 'Web3 & Smart Contract Dev', description: 'Build decentralized applications, write Solidity contracts, and deploy to Ethereum.', price: 529.00, category: 'Blockchain', icon: 'Link', pdfUrl: pdf('15') }
];
