import { fetchContactPage } from '@/lib/sanity-fetch';
import { ContactClient } from '@/components/ContactClient';

export const revalidate = 60;

export default async function ContactPage() {
  const page = await fetchContactPage();
  return <ContactClient page={page} />;
}
