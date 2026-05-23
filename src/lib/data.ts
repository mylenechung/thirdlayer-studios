export type Slide = {
  label: string;
  ratio: string;
  type: 'image' | 'video';
  src: string;
};

export type Project = {
  id: string;
  client: string;
  category: string;
  description: string;
  bg: string;
  hi: string;
  slides: Slide[];
};

export type GalleryItem = {
  id: string;
  title: string;
  bg: string;
  ratio: string;
  src?: string;
};

export type Service = {
  n: string;
  title: string;
  desc: string;
  tags: string[];
};

export const PROJECTS: Project[] = [
  {
    id: 'aesop',
    client: 'AESOP',
    category: 'Key Visual · Cinemagraph',
    description: 'Cedar-inspired set details, model-led usage shots, and a cinemagraph that brings the Resolute Facial Concentrate to life.',
    bg: '#2d1f14',
    hi: '#8b5c38',
    slides: [
      { label: 'Key Visual',  ratio: '3/4', type: 'image', src: '/projects/aesop/key-visual.jpg' },
      { label: 'Model-Led',   ratio: '3/4', type: 'image', src: '/projects/aesop/model-led.jpg' },
      { label: 'Usage Shot',  ratio: '3/4', type: 'image', src: '/projects/aesop/usage-shot.jpg' },
      { label: 'Cinemagraph', ratio: '3/4', type: 'video', src: '/projects/aesop/cinemagraph.mp4' },
    ],
  },
  {
    id: 'le-petit-olivier',
    client: 'LE PETIT OLIVIER',
    category: 'Key Visual · Portrait & Landscape',
    description: "Two key visuals adapted for portrait and landscape applications, with a usage shot highlighting the lotion's light, fluid texture.",
    bg: '#162a1e',
    hi: '#2e7a4f',
    slides: [
      { label: 'Key Visual — Portrait',  ratio: '3/4', type: 'image', src: '/projects/le-petit-olivier/key-visual-portrait.jpg' },
      { label: 'Key Visual — Landscape', ratio: '4/3', type: 'image', src: '/projects/le-petit-olivier/key-visual-landscape.jpg' },
      { label: 'Product Usage',          ratio: '3/4', type: 'image', src: '/projects/le-petit-olivier/product-usage.jpg' },
    ],
  },
  {
    id: 'sensodyne',
    client: 'SENSODYNE',
    category: 'Key Visual · Usage · Model-Led',
    description: 'A cohesive blue palette across all assets — key visual, product usage, and model-led — set within a consistent bathroom environment.',
    bg: '#0e1e38',
    hi: '#2060b0',
    slides: [
      { label: 'Key Visual',    ratio: '3/4', type: 'image', src: '/projects/sensodyne/key-visual.jpg' },
      { label: 'Model-Led',     ratio: '3/4', type: 'image', src: '/projects/sensodyne/model-led.jpg' },
      { label: 'Product Usage', ratio: '3/4', type: 'image', src: '/projects/sensodyne/product-usage.jpg' },
    ],
  },
  {
    id: 'purina',
    client: 'PURINA',
    category: 'Key Visual · Usage · Lifestyle',
    description: 'Key visuals and usage-led moments combining accurate product presentation with expressive dog shots that highlight appetite, texture, and feeding appeal.',
    bg: '#2e1f08',
    hi: '#9a7018',
    slides: [
      { label: 'Key Visual',   ratio: '4/3', type: 'image', src: '/projects/purina/key-visual.jpg' },
      { label: 'Model-Led',    ratio: '4/3', type: 'image', src: '/projects/purina/model-led_01.jpg' },
      { label: 'Model-Led 02', ratio: '3/4', type: 'image', src: '/projects/purina/model-led_02.jpg' },
    ],
  },
];

export const GALLERY: GalleryItem[] = [
  { id: 'g1', title: 'PH Care',  bg: '#1e1e1e', ratio: '4/3', src: '/gallery/PH_Care_ThirdLayerStudios.jpg' },
  { id: 'g2', title: 'Cetaphil', bg: '#1a1e2e', ratio: '3/4', src: '/gallery/Cetaphil_ThirdLayerStudios.jpg' },
];

export const SERVICES: Service[] = [
  {
    n: '01',
    title: 'Key Visual Production',
    desc: 'Hero-level campaign imagery art directed with attention to composition, lighting logic, material realism, and brand alignment. Each key visual is developed as a standalone hero asset designed to create maximum visual impact across a single intended format and application.',
    tags: ['Campaign', 'Hero Imagery'],
  },
  {
    n: '02',
    title: 'Campaign Sets & Multi-Format',
    desc: 'Cohesive campaign image systems adapted across portrait, landscape, and square formats from a unified art direction. Built for flexible deployment across digital, social, e-commerce, and print while maintaining visual consistency throughout the campaign.',
    tags: ['Social', 'Digital', 'Print', 'Multi-Format'],
  },
  {
    n: '03',
    title: 'Cinemagraph & Motion',
    desc: 'Available as an add-on to Key Visuals and Campaign Sets, our cinemagraphs introduce subtle looping motion while maintaining controlled product accuracy, lighting consistency, and packaging fidelity. Designed for elevated social, digital, and motion-first campaign applications.',
    tags: ['Reels', 'Social', 'Digital Ads'],
  },
  {
    n: '04',
    title: 'Brand & Packaging Photography',
    desc: 'Production-grade product and packaging photography created as the foundation for our AI-assisted workflow. Depending on the project brief, practical shoots and truth plates may be produced to ensure accurate brand representation, packaging detail, and material realism across all generated outputs.',
    tags: ['Practical Capture', 'Packaging Fidelity'],
  },
];
