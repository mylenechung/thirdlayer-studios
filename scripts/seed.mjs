/**
 * Sanity seed script — uploads all /public assets and creates all documents.
 * Run: node scripts/seed.mjs
 */
import { createClient } from '@sanity/client';
import { createReadStream } from 'node:fs';
import { resolve, extname, basename } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const PUBLIC   = resolve(__dirname, '../public');

const client = createClient({
  projectId: 'dfj6gqw9',
  dataset:   'production',
  apiVersion: '2024-01-01',
  token: 'skBKKqA0a1wO1GQMQmEh82Y2XK1tt0U9jIdl9qrrKkM3QNuNVYq4h5JmcYfp6MqVZrBRY9WN88BQGxfHomg32P2rnbsj9j6Tp0BKyDewMSgHfzcqXpP6kqUmfbgZqSWuChiXBW3GvPAjx3qhDFREVCMcyh4n4mck99MmJy6R9GYVK3tKAMrR',
  useCdn: false,
});

// ── helpers ────────────────────────────────────────────────────────────────

function mimeType(filePath) {
  const ext = extname(filePath).toLowerCase();
  const map = {
    '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg',
    '.png': 'image/png', '.webp': 'image/webp',
    '.mp4': 'video/mp4', '.mov': 'video/quicktime',
  };
  return map[ext] ?? 'application/octet-stream';
}

function isImage(filePath) {
  return /\.(jpe?g|png|webp|gif)$/i.test(filePath);
}

async function uploadAsset(relPath) {
  const abs      = resolve(PUBLIC, relPath);
  const type     = isImage(abs) ? 'image' : 'file';
  const filename = basename(abs);
  console.log(`  ↑  uploading ${relPath} …`);
  const asset = await client.assets.upload(type, createReadStream(abs), {
    filename,
    contentType: mimeType(abs),
  });
  console.log(`     ✓ ${asset._id}`);
  return asset._id;
}

function imgRef(id)  { return { _type: 'image', asset: { _type: 'reference', _ref: id } }; }
function fileRef(id) { return { _type: 'file',  asset: { _type: 'reference', _ref: id } }; }
function key()       { return Math.random().toString(36).slice(2, 10); }

// ── upload phase ────────────────────────────────────────────────────────────

console.log('\n── Uploading assets ──────────────────────────────────────');

const hero1    = await uploadAsset('hero-slideshow/hero-slide-01.jpg');
const hero2    = await uploadAsset('hero-slideshow/hero-slide-02.jpg');

const aesopKV  = await uploadAsset('projects/aesop/key-visual.jpg');
const aesopML  = await uploadAsset('projects/aesop/model-led.jpg');
const aesopUS  = await uploadAsset('projects/aesop/usage-shot.jpg');
const aesopCG  = await uploadAsset('projects/aesop/cinemagraph.mp4');

const lpoPort  = await uploadAsset('projects/le-petit-olivier/key-visual-portrait.jpg');
const lpoLand  = await uploadAsset('projects/le-petit-olivier/key-visual-landscape.jpg');
const lpoPU    = await uploadAsset('projects/le-petit-olivier/product-usage.jpg');

const sensKV   = await uploadAsset('projects/sensodyne/key-visual.jpg');
const sensML   = await uploadAsset('projects/sensodyne/model-led.jpg');
const sensPU   = await uploadAsset('projects/sensodyne/product-usage.jpg');

const purKV    = await uploadAsset('projects/purina/key-visual.jpg');
const purML1   = await uploadAsset('projects/purina/model-led_01.jpg');
const purML2   = await uploadAsset('projects/purina/model-led_02.jpg');

const methPort = await uploadAsset('method/Method_portrait.jpg');
const methL1   = await uploadAsset('method/Method_landscape01.jpg');
const methL2   = await uploadAsset('method/Method_landscape02.jpg');

const ds1      = await uploadAsset('digital-sets/digitalsets1.jpg');
const ds2      = await uploadAsset('digital-sets/digitalsets2.jpg');

const motVid   = await uploadAsset('motion/Motion.mp4');

// ── create / replace documents ─────────────────────────────────────────────

console.log('\n── Creating documents ────────────────────────────────────');

// Hero slides
await client.createOrReplace({
  _id: 'heroSlide-01', _type: 'heroSlide',
  label: 'Key Visual', order: 1,
  image: imgRef(hero1),
});
console.log('✓ heroSlide-01');

await client.createOrReplace({
  _id: 'heroSlide-02', _type: 'heroSlide',
  label: 'Campaign Shot', order: 2,
  image: imgRef(hero2),
});
console.log('✓ heroSlide-02');

// Projects
await client.createOrReplace({
  _id: 'project-aesop', _type: 'project',
  client: 'AESOP',
  slug: { _type: 'slug', current: 'aesop' },
  category: 'Key Visual · Cinemagraph',
  description: 'Cedar-inspired set details, model-led usage shots, and a cinemagraph that brings the Resolute Facial Concentrate to life.',
  bgColor: '#2d1f14', highlightColor: '#8b5c38',
  featured: true, order: 1,
  slides: [
    { _key: key(), label: 'Key Visual',  aspectRatio: '3/4', mediaType: 'image', image: imgRef(aesopKV) },
    { _key: key(), label: 'Model-Led',   aspectRatio: '3/4', mediaType: 'image', image: imgRef(aesopML) },
    { _key: key(), label: 'Usage Shot',  aspectRatio: '3/4', mediaType: 'image', image: imgRef(aesopUS) },
    { _key: key(), label: 'Cinemagraph', aspectRatio: '3/4', mediaType: 'video', video: fileRef(aesopCG) },
  ],
});
console.log('✓ project-aesop');

await client.createOrReplace({
  _id: 'project-le-petit-olivier', _type: 'project',
  client: 'LE PETIT OLIVIER',
  slug: { _type: 'slug', current: 'le-petit-olivier' },
  category: 'Key Visual · Portrait & Landscape',
  description: "Two key visuals adapted for portrait and landscape applications, with a usage shot highlighting the lotion's light, fluid texture.",
  bgColor: '#162a1e', highlightColor: '#2e7a4f',
  featured: true, order: 2,
  slides: [
    { _key: key(), label: 'Key Visual — Portrait',  aspectRatio: '3/4', mediaType: 'image', image: imgRef(lpoPort) },
    { _key: key(), label: 'Key Visual — Landscape', aspectRatio: '4/3', mediaType: 'image', image: imgRef(lpoLand) },
    { _key: key(), label: 'Product Usage',          aspectRatio: '3/4', mediaType: 'image', image: imgRef(lpoPU)   },
  ],
});
console.log('✓ project-le-petit-olivier');

await client.createOrReplace({
  _id: 'project-sensodyne', _type: 'project',
  client: 'SENSODYNE',
  slug: { _type: 'slug', current: 'sensodyne' },
  category: 'Key Visual · Usage · Model-Led',
  description: 'A cohesive blue palette across all assets — key visual, product usage, and model-led — set within a consistent bathroom environment.',
  bgColor: '#0e1e38', highlightColor: '#2060b0',
  featured: true, order: 3,
  slides: [
    { _key: key(), label: 'Key Visual',    aspectRatio: '3/4', mediaType: 'image', image: imgRef(sensKV) },
    { _key: key(), label: 'Model-Led',     aspectRatio: '3/4', mediaType: 'image', image: imgRef(sensML) },
    { _key: key(), label: 'Product Usage', aspectRatio: '3/4', mediaType: 'image', image: imgRef(sensPU) },
  ],
});
console.log('✓ project-sensodyne');

await client.createOrReplace({
  _id: 'project-purina', _type: 'project',
  client: 'PURINA',
  slug: { _type: 'slug', current: 'purina' },
  category: 'Key Visual · Usage · Lifestyle',
  description: 'Key visuals and usage-led moments combining accurate product presentation with expressive dog shots that highlight appetite, texture, and feeding appeal.',
  bgColor: '#2e1f08', highlightColor: '#9a7018',
  featured: true, order: 4,
  slides: [
    { _key: key(), label: 'Key Visual',   aspectRatio: '4/3', mediaType: 'image', image: imgRef(purKV)  },
    { _key: key(), label: 'Model-Led',    aspectRatio: '4/3', mediaType: 'image', image: imgRef(purML1) },
    { _key: key(), label: 'Model-Led 02', aspectRatio: '3/4', mediaType: 'image', image: imgRef(purML2) },
  ],
});
console.log('✓ project-purina');

// Homepage sections
await client.createOrReplace({
  _id: 'singleton-homepageSections', _type: 'homepageSections',
  methodImages: {
    portrait:    imgRef(methPort),
    landscape01: imgRef(methL1),
    landscape02: imgRef(methL2),
  },
  digitalSetsImages: {
    image01: imgRef(ds1),
    image02: imgRef(ds2),
  },
  motionVideo: fileRef(motVid),
});
console.log('✓ homepageSections');

// Site settings
await client.createOrReplace({
  _id: 'singleton-siteSettings', _type: 'siteSettings',
  email: 'hello@thirdlayerstudios.com',
  instagram: '@thirdlayerstudios',
  footerTagline: 'AI-assisted product imagery for ambitious brands.',
});
console.log('✓ siteSettings');

console.log('\n── Done! All content seeded to Sanity ───────────────────\n');
