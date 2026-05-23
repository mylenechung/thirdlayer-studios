import { groq } from 'next-sanity';

export const heroSlidesQuery = groq`
  *[_type == "heroSlide"] | order(order asc) {
    label,
    "imageUrl": image.asset->url
  }
`;

export const projectsQuery = groq`
  *[_type == "project"] | order(order asc) {
    "slug": slug.current,
    client, category, description, bgColor, highlightColor, featured,
    slides[] {
      label, aspectRatio, mediaType,
      "imageUrl": image.asset->url,
      "videoUrl": video.asset->url
    }
  }
`;

export const siteSettingsQuery = groq`
  *[_type == "siteSettings"][0] { email, instagram, footerTagline }
`;

export const homepageSectionsQuery = groq`
  *[_type == "homepageSections"][0] {
    "methodPortrait": methodImages.portrait.asset->url,
    "methodLandscape01": methodImages.landscape01.asset->url,
    "methodLandscape02": methodImages.landscape02.asset->url,
    "digitalSets01": digitalSetsImages.image01.asset->url,
    "digitalSets02": digitalSetsImages.image02.asset->url,
    "motionVideoUrl": motionVideo.asset->url
  }
`;
