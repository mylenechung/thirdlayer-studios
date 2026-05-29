import { revalidatePath, revalidateTag } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const secret = req.nextUrl.searchParams.get('secret');

  if (secret !== process.env.SANITY_REVALIDATE_SECRET) {
    return NextResponse.json({ message: 'Invalid secret' }, { status: 401 });
  }

  // Clear the data cache (all fetch() calls tagged 'sanity')
  revalidateTag('sanity');

  // Also clear the full route cache for each page
  revalidatePath('/');
  revalidatePath('/works');
  revalidatePath('/works/[slug]', 'page');
  revalidatePath('/services');
  revalidatePath('/contact');
  revalidatePath('/about');

  return NextResponse.json({ revalidated: true, now: Date.now() });
}
