import { revalidatePath } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const secret = req.nextUrl.searchParams.get('secret');

  if (secret !== process.env.SANITY_REVALIDATE_SECRET) {
    return NextResponse.json({ message: 'Invalid secret' }, { status: 401 });
  }

  // Revalidate all pages that show Sanity content
  revalidatePath('/');
  revalidatePath('/works');
  revalidatePath('/works/[slug]', 'page');

  return NextResponse.json({ revalidated: true, now: Date.now() });
}
