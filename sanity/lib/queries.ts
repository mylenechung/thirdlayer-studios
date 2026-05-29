import { groq } from 'next-sanity';

export const heroSlidesQuery = groq`
  *[_type == "heroSlide"] | order(order asc) {
    label,
    "image": image { asset->, crop, hotspot }
  }
`;

export const projectsQuery = groq`
  *[_type == "project"] | order(order asc) {
    "slug": slug.current,
    client, category, description, bgColor, highlightColor, featured,
    slides[] {
      label, aspectRatio, mediaType,
      "image": image { asset->, crop, hotspot },
      "videoUrl": video.asset->url
    }
  }
`;

export const servicesQuery = groq`
  *[_type == "service"] | order(order asc) {
    number, title, description,
    "tags": tags[]
  }
`;

export const siteSettingsQuery = groq`
  *[_type == "siteSettings"][0] { email, instagram, footerTagline }
`;

export const homepageContentQuery = groq`
  *[_type == "homepageSections"][0] {
    heroHeadline, heroHeadlineAccent, heroSubtext,
    whoWeAreHeading,
    whoWeAreBody[] { text, italic },
    approachHeading, approachBody,
    approachSteps[] { number, label },
    methodHeading, methodTagline, methodBody,
    "methodPortrait":    methodImages.portrait    { asset->, crop, hotspot },
    "methodLandscape01": methodImages.landscape01 { asset->, crop, hotspot },
    "methodLandscape02": methodImages.landscape02 { asset->, crop, hotspot },
    motionHeading,
    motionBody[] { text, italic },
    "motionVideoUrl":    motionVideo.asset->url,
    digitalSetsHeading, digitalSetsHeadingAccent, digitalSetsBody,
    "digitalSets01":     digitalSetsImages.image01 { asset->, crop, hotspot },
    "digitalSets02":     digitalSetsImages.image02 { asset->, crop, hotspot }
  }
`;

export const servicesPageQuery = groq`
  *[_type == "servicesPage"][0] {
    heroHeading,
    steps[] { number, title, description }
  }
`;

export const contactPageQuery = groq`
  *[_type == "contactPage"][0] {
    heroHeading, availabilityText
  }
`;

export const worksPageQuery = groq`
  *[_type == "worksPage"][0] {
    heading, galleryDescription
  }
`;

export const aboutPageQuery = groq`
  *[_type == "aboutPage"][0] {
    heroHeading,
    storyHeading, storyBody01, storyBody02,
    philosophyQuote, philosophyBody
  }
`;
