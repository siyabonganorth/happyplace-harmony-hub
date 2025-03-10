
import { User } from "../types";

// These are mock users for demo/testing purposes
// In production, real users from Supabase auth would be used
export const MOCK_USERS: User[] = [
  // Director
  {
    id: "director-1",
    email: "ceejay@vybe.company",
    name: "Cee-Jay",
    role: "director",
    department: "Audiophiles", // Directors can see across all departments
    createdAt: new Date("2023-01-01")
  },
  
  // Department heads
  {
    id: "audio-head-1",
    email: "mntungwa@vybe.company",
    name: "Mntungwa",
    role: "head",
    department: "Audiophiles",
    createdAt: new Date("2023-01-02")
  },
  {
    id: "vis-head-1",
    email: "neo@vybe.company",
    name: "Neo",
    role: "head",
    department: "Vismasters",
    createdAt: new Date("2023-01-02")
  },
  {
    id: "ad-head-1",
    email: "lungile@vybe.company",
    name: "Lungile",
    role: "head",
    department: "adVYBE",
    createdAt: new Date("2023-01-02")
  },
  
  // Regular department members
  {
    id: "audio-member-1",
    email: "audio1@vybe.company",
    name: "Audio Team Member 1",
    role: "member",
    department: "Audiophiles",
    createdAt: new Date("2023-01-03")
  },
  {
    id: "vis-member-1",
    email: "vis1@vybe.company",
    name: "Visual Team Member 1",
    role: "member",
    department: "Vismasters",
    createdAt: new Date("2023-01-03")
  },
  {
    id: "ad-member-1",
    email: "ad1@vybe.company",
    name: "Ad Team Member 1",
    role: "member",
    department: "adVYBE",
    createdAt: new Date("2023-01-03")
  }
];
