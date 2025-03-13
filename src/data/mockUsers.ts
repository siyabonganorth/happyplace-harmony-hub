
import { User } from "../types";

// These are mock users for demo/testing purposes
// In production, real users from Supabase auth would be used
export const MOCK_USERS: User[] = [
  // Director
  {
    id: "director-1",
    email: "ceejay@vybecartel.com",
    name: "Cee-Jay",
    role: "director",
    department: "Audiophiles", // Directors can see across all departments
    createdAt: new Date("2023-01-01")
  },
  
  // Department heads
  {
    id: "audio-head-1",
    email: "mntungwa@vybecartel.com",
    name: "Mntungwa",
    role: "head",
    department: "Audiophiles",
    createdAt: new Date("2023-01-02")
  },
  {
    id: "vis-head-1",
    email: "neo@vybecartel.com",
    name: "Neo",
    role: "head",
    department: "Vismasters",
    createdAt: new Date("2023-01-02")
  },
  {
    id: "ad-head-1",
    email: "lungile@vybecartel.com",
    name: "Lungile",
    role: "head",
    department: "adVYBE",
    createdAt: new Date("2023-01-02")
  },
  {
    id: "team-head-1",
    email: "harmony@vybecartel.com",
    name: "Harmony",
    role: "head",
    department: "TeamSync",
    createdAt: new Date("2023-01-02")
  },
  
  // Regular department members
  {
    id: "audio-member-1",
    email: "audio1@vybecartel.com",
    name: "Audio Team Member 1",
    role: "member",
    department: "Audiophiles",
    createdAt: new Date("2023-01-03")
  },
  {
    id: "vis-member-1",
    email: "vis1@vybecartel.com",
    name: "Visual Team Member 1",
    role: "member",
    department: "Vismasters",
    createdAt: new Date("2023-01-03")
  },
  {
    id: "ad-member-1",
    email: "ad1@vybecartel.com",
    name: "Ad Team Member 1",
    role: "member",
    department: "adVYBE",
    createdAt: new Date("2023-01-03")
  },
  {
    id: "team-member-1",
    email: "teamsync1@vybecartel.com",
    name: "TeamSync Member 1",
    role: "member",
    department: "TeamSync",
    createdAt: new Date("2023-01-03")
  }
];

// Alias for MOCK_USERS for backward compatibility 
export const USERS = MOCK_USERS;

// Demo credentials for the login form
export const DEMO_CREDENTIALS = [
  {
    email: "ceejay@vybecartel.com",
    role: "Director"
  },
  {
    email: "mntungwa@vybecartel.com",
    role: "Audiophiles Head"
  },
  {
    email: "neo@vybecartel.com",
    role: "Vismasters Head"
  },
  {
    email: "lungile@vybecartel.com",
    role: "adVYBE Head"
  },
  {
    email: "harmony@vybecartel.com",
    role: "TeamSync Head"
  },
  {
    email: "audio1@vybecartel.com",
    role: "Audiophiles Member"
  },
  {
    email: "vis1@vybecartel.com",
    role: "Vismasters Member"
  },
  {
    email: "ad1@vybecartel.com",
    role: "adVYBE Member"
  },
  {
    email: "teamsync1@vybecartel.com",
    role: "TeamSync Member"
  }
];
