import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';
import { projects as mockProjects } from '../data/projects';
import { experiences as mockExperiences } from '../data/experience';
import { skillCategories as mockSkills } from '../data/skills';
import { defaultProfile } from '../data/profile';

// Check if Sanity is configured via environment variables
const projectId = import.meta.env.VITE_SANITY_PROJECT_ID || '';
const dataset = import.meta.env.VITE_SANITY_DATASET || 'production';
const apiVersion = '2026-05-23';

export const isSanityConfigured = projectId !== '';

// Initialize client if projectId is present
export const sanityClient = isSanityConfigured
  ? createClient({
      projectId,
      dataset,
      apiVersion,
      useCdn: true, // true for fast edge caching
    })
  : null;

// Helper to generate optimized image URLs from Sanity image assets
const builder = sanityClient ? imageUrlBuilder(sanityClient) : null;

export function urlFor(source: any) {
  if (!builder || !source) return { url: () => '' };
  return builder.image(source);
}

/* ==========================================================================
   1. PROJECTS API FETCH WITH OFFLINE FALLBACK
   ========================================================================== */
export async function getProjects() {
  if (!sanityClient) {
    console.warn('Sanity is not configured. Falling back to local projects data.');
    return mockProjects;
  }

  try {
    const query = `*[_type == "project"] | order(featured desc, _createdAt desc) {
      "id": _id,
      title,
      description,
      longDescription,
      "image": image.asset->url,
      tags,
      category,
      liveUrl,
      githubUrl,
      featured
    }`;
    const data = await sanityClient.fetch(query);
    return data.length > 0 ? data : mockProjects;
  } catch (error) {
    console.error('Error fetching projects from Sanity, falling back:', error);
    return mockProjects;
  }
}

/* ==========================================================================
   2. EXPERIENCE API FETCH WITH OFFLINE FALLBACK
   ========================================================================== */
export async function getExperiences() {
  if (!sanityClient) {
    console.warn('Sanity is not configured. Falling back to local experiences data.');
    return mockExperiences;
  }

  try {
    const query = `*[_type == "experience"] | order(isCurrent desc, period desc) {
      "id": _id,
      role,
      company,
      location,
      period,
      description,
      achievements,
      tags,
      isCurrent
    }`;
    const data = await sanityClient.fetch(query);
    return data.length > 0 ? data : mockExperiences;
  } catch (error) {
    console.error('Error fetching experiences from Sanity, falling back:', error);
    return mockExperiences;
  }
}

/* ==========================================================================
   3. SKILLS API FETCH WITH OFFLINE FALLBACK
   ========================================================================== */
export async function getSkills() {
  if (!sanityClient) {
    console.warn('Sanity is not configured. Falling back to local skills data.');
    return mockSkills;
  }

  try {
    const query = `*[_type == "skillCategory"] | order(_createdAt asc) {
      title,
      icon,
      skills[] {
        name,
        level
      }
    }`;
    const data = await sanityClient.fetch(query);
    return data.length > 0 ? data : mockSkills;
  } catch (error) {
    console.error('Error fetching skills from Sanity, falling back:', error);
    return mockSkills;
  }
}

/* ==========================================================================
   4. PROFILE API FETCH WITH OFFLINE FALLBACK
   ========================================================================== */
export async function getProfile() {
  if (!sanityClient) {
    console.warn('Sanity is not configured. Falling back to local profile data.');
    return defaultProfile;
  }

  try {
    const query = `*[_type == "profile"][0] {
      name,
      roles,
      heroTitle,
      heroSubtitle,
      aboutTitle,
      aboutText,
      "aboutImage": aboutImage.asset->url,
      cvUrl,
      email,
      githubUrl,
      linkedinUrl
    }`;
    const data = await sanityClient.fetch(query);
    if (!data) return defaultProfile;

    return {
      ...defaultProfile,
      ...data,
      aboutImage: data.aboutImage || defaultProfile.aboutImage,
    };
  } catch (error) {
    console.error('Error fetching profile from Sanity, falling back:', error);
    return defaultProfile;
  }
}
