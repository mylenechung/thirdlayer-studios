import { fetchServices, fetchServicesPage } from '@/lib/sanity-fetch';
import { ServicesClient } from '@/components/ServicesClient';

export const revalidate = 60;

export default async function ServicesPage() {
  const [page, services] = await Promise.all([
    fetchServicesPage(),
    fetchServices(),
  ]);

  return <ServicesClient page={page} services={services} />;
}
