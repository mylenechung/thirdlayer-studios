import { fetchContactPage, fetchServices } from '@/lib/sanity-fetch';
import { ContactClient } from '@/components/ContactClient';

export const revalidate = 60;

export default async function ContactPage() {
  const [page, services] = await Promise.all([
    fetchContactPage(),
    fetchServices(),
  ]);

  return <ContactClient page={page} services={services} />;
}
