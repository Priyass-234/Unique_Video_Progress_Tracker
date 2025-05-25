import { Lecture } from '../types';

export const mockLectures: Lecture[] = [
  {
    id: 'lecture-1',
    title: 'Introduction to Web Development',
    description: 'Learn the fundamentals of web development including HTML, CSS, and JavaScript. This comprehensive lecture covers the basics that every web developer should know.',
    duration: 1800, // 30 minutes
    videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4', // Placeholder video
    thumbnailUrl: 'https://images.pexels.com/photos/270348/pexels-photo-270348.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  },
  {
    id: 'lecture-2',
    title: 'React Fundamentals',
    description: 'Dive into React.js and learn about components, props, state, and hooks. Build interactive user interfaces with the most popular front-end library.',
    duration: 2400, // 40 minutes
    videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4', // Placeholder video
    thumbnailUrl: 'https://images.pexels.com/photos/11035471/pexels-photo-11035471.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  },
  {
    id: 'lecture-3',
    title: 'Advanced JavaScript Concepts',
    description: 'Master advanced JavaScript concepts including closures, prototypes, asynchronous programming, and ES6+ features. Take your JavaScript skills to the next level.',
    duration: 3600, // 60 minutes
    videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4', // Placeholder video
    thumbnailUrl: 'https://images.pexels.com/photos/4164418/pexels-photo-4164418.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  },
  {
    id: 'lecture-4',
    title: 'TypeScript for React Developers',
    description: 'Learn how to use TypeScript with React to create type-safe applications. Understand interfaces, types, generics, and how to properly type React components.',
    duration: 3000, // 50 minutes
    videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4', // Placeholder video
    thumbnailUrl: 'https://images.pexels.com/photos/577585/pexels-photo-577585.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  },
  {
    id: 'lecture-5',
    title: 'Building RESTful APIs',
    description: 'Learn how to design and implement RESTful APIs using Node.js and Express. Understand REST principles, routing, middleware, and database integration.',
    duration: 2700, // 45 minutes
    videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4', // Placeholder video
    thumbnailUrl: 'https://images.pexels.com/photos/546819/pexels-photo-546819.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  },
  {
    id: 'lecture-6',
    title: 'Responsive Web Design',
    description: 'Master responsive web design techniques using CSS Grid, Flexbox, and media queries. Create websites that look great on any device, from mobile to desktop.',
    duration: 2100, // 35 minutes
    videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4', // Placeholder video
    thumbnailUrl: 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  },
];