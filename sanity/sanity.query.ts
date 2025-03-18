import { groq } from "next-sanity";
import client from "./sanity.client";

// Updated to filter by userId
export async function getProfile(userId?: string) {
  const filter = userId ? `&& userId == $userId` : '';
  return client.fetch(
    groq`*[_type == "profile" ${filter}]{
      _id,
      userId,
      fullName,
      headline,
      "slug": slug.current,
      profileImage {
        alt, 
        "image": asset->url
      },
      shortBio,
      location,
      fullBio,
      email,
      "resumeURL": resumeURL.asset->url,
      socialLinks
    }`,
    userId ? { userId } : {}
  );
}

export async function getProfileBySlug(slug: string) {
  return client.fetch(
    groq`*[_type == "profile" && slug.current == $slug][0]{
      _id,
      userId,
      fullName,
      headline,
      "slug": slug.current,
      profileImage {
        alt, 
        "image": asset->url
      },
      shortBio,
      location,
      fullBio,
      email,
      "resumeURL": resumeURL.asset->url,
      socialLinks
    }`,
    { slug }
  );
}

// Updated to filter by userId
export async function getJob(userId?: string) {
  const filter = userId ? `&& userId == $userId` : '';
  return client.fetch(
    groq`*[_type == "job" ${filter}]{
      _id,
      userId,
      name,
      jobTitle,
      "logo": logo.asset->url,
      url,
      description,
      startDate,
      endDate
    }`,
    userId ? { userId } : {}
  );
}

// Updated to filter by userId
export async function getBlogPosts(userId?: string) {
  const filter = userId ? `&& userId == $userId` : '';
  return client.fetch(
    groq`*[_type == "post" ${filter}] | order(publishedAt desc) {
      _id,
      userId,
      title,
      "slug": slug.current,
      publishedAt,
      excerpt,
      mainImage {
        alt,
        "image": asset->url
      }
    }`,
    userId ? { userId } : {}
  );
}

// Updated to filter by userId
export async function getSkills(userId?: string) {
  try {
    const filter = userId ? `&& userId == $userId` : '';
    const query = groq`*[_type == "skills" ${filter}]{
      _id,
      userId,
      title,
      description,
      icon,
      highlight,
      Headline
    }`;
    
    const data = await client.fetch(query, userId ? { userId } : {});
    return data;
  } catch (error) {
    throw error;
  }
}

// Updated to filter by userId
export async function getProjects(userId?: string) {
  const filter = userId ? `&& userId == $userId` : '';
  return client.fetch(
    groq`*[_type == "project" ${filter}] {
      _id,
      userId,
      name,
      "slug": slug.current,
      tagline,
      projectUrl,
      "coverImage": {
        "image": coverImage.asset->url,
        "alt": coverImage.alt
      }
    }`,
    userId ? { userId } : {}
  );
}

// Updated to filter by userId
export async function getsingleProject(slug: string | undefined, userId?: string) {
  if (!slug) return null;
  
  const filter = userId ? `&& userId == $userId` : '';
  return client.fetch(
    groq`*[_type == "project" && slug.current == $slug ${filter}][0]{
      name,
      userId,
      tagline,
      "coverImage": {
        "image": coverImage.asset->url,
        "alt": coverImage.alt
      },
      description,
      projectUrl
    }`,
    { slug, ...(userId ? { userId } : {}) }
  );
}

// Updated to filter by userId
export async function getCaseStudies(userId?: string) {
  const filter = userId ? `&& userId == $userId` : '';
  const query = `*[_type == "caseStudy" ${filter}] {
    _id,
    userId,
    title,
    description,
    solutions,
    metrics
  }`;
  return await client.fetch(query, userId ? { userId } : {});
}

// Updated to filter by userId
export async function reviewsQuery(userId?: string) {
  const filter = userId ? `&& userId == $userId` : '';
  return client.fetch(
    groq`*[_type == "review" ${filter}] {
      _id,
      userId,
      author_name,
      author_url,
      "profile_photo_url": profile_photo_url.asset->url,
      rating,
      text,
      time,
      isGoogleReview
    }`,
    userId ? { userId } : {}
  );
}

// Updated to allow filtering navbar by userId (if needed)
export async function getNavbar(userId?: string) {
  const filter = userId ? `&& userId == $userId` : '';
  const query = `*[_type == "navbar" ${filter}][0] {
    logoText,
    userId,
    menuItems[] {
      _key,
      text,
      href,
      isExternal,
      order
    }
  }`;
  return await client.fetch(query, userId ? { userId } : {});
}