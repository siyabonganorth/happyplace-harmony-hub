
import { User, Department, UserRole } from '../types';

// Create demo users (2 per department + director)
export const USERS: User[] = [
  // Director (Super Admin)
  {
    id: 'director-1',
    email: 'director@vybecartel.com',
    name: 'Cee-Jay Siyabonga',
    role: 'director',
    department: 'Audiophiles', // Primary department, but has access to all
    createdAt: new Date('2023-01-01'),
    avatar: '/placeholder.svg'
  },
  
  // Audiophiles Department
  {
    id: 'audio-head-1',
    email: 'audiohead@vybecartel.com',
    name: 'Mntungwa',
    role: 'head',
    department: 'Audiophiles',
    createdAt: new Date('2023-01-15'),
    avatar: '/placeholder.svg'
  },
  {
    id: 'audio-member-1',
    email: 'audiomember@vybecartel.com',
    name: 'Audio Team Member',
    role: 'member',
    department: 'Audiophiles',
    createdAt: new Date('2023-02-01'),
    avatar: '/placeholder.svg'
  },
  
  // Vismasters Department
  {
    id: 'vis-head-1',
    email: 'vishead@vybecartel.com',
    name: 'Neo',
    role: 'head',
    department: 'Vismasters',
    createdAt: new Date('2023-01-10'),
    avatar: '/placeholder.svg'
  },
  {
    id: 'vis-member-1',
    email: 'vismember@vybecartel.com',
    name: 'Visual Team Member',
    role: 'member',
    department: 'Vismasters',
    createdAt: new Date('2023-02-05'),
    avatar: '/placeholder.svg'
  },
  
  // adVYBE Department
  {
    id: 'ad-head-1',
    email: 'adhead@vybecartel.com',
    name: 'Lungile',
    role: 'head',
    department: 'adVYBE',
    createdAt: new Date('2023-01-12'),
    avatar: '/placeholder.svg'
  },
  {
    id: 'ad-member-1',
    email: 'admember@vybecartel.com',
    name: 'Advertising Team Member',
    role: 'member',
    department: 'adVYBE',
    createdAt: new Date('2023-02-10'),
    avatar: '/placeholder.svg'
  }
];

// Demo credentials for login
export const DEMO_CREDENTIALS = [
  { email: 'director@vybecartel.com', password: 'password', role: 'Director (Cee-Jay Siyabonga)' },
  { email: 'audiohead@vybecartel.com', password: 'password', role: 'Audiophiles Head (Mntungwa)' },
  { email: 'audiomember@vybecartel.com', password: 'password', role: 'Audiophiles Member' },
  { email: 'vishead@vybecartel.com', password: 'password', role: 'Vismasters Head (Neo)' },
  { email: 'vismember@vybecartel.com', password: 'password', role: 'Vismasters Member' },
  { email: 'adhead@vybecartel.com', password: 'password', role: 'adVYBE Head (Lungile)' },
  { email: 'admember@vybecartel.com', password: 'password', role: 'adVYBE Member' },
];
