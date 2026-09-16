import { Product } from './types';

const pdf = (id: string) => `/courses/${id}.pdf`;

export const products: Product[] = [
  {
    id: '1',
    title: 'Modern Backend Engineering',
    description: 'Build scalable, production-ready backend systems using modern API design, database architecture, security patterns, and deployment workflows for high-performance web applications.',
    price: 900.00,
    category: 'Backend',
    icon: 'Server',
    pdfUrl: pdf('1')
  },
  {
    id: '2',
    title: 'Modern Frontend Programming',
    description: 'Learn modern frontend development with advanced user interface patterns, component architecture, responsive design, and performance-focused coding practices for polished web products.',
    price: 600.00,
    category: 'Frontend',
    icon: 'Code',
    pdfUrl: pdf('2')
  },
  {
    id: '3',
    title: 'iOS and Swift Development',
    description: 'Create native iPhone and iPad apps with Swift, UIKit, app architecture, APIs, and deployment workflows for building elegant mobile experiences from idea to launch.',
    price: 420.00,
    category: 'Mobile',
    icon: 'Smartphone',
    pdfUrl: pdf('3')
  }
];
