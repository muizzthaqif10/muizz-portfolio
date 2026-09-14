import type { Metadata } from 'next';
import { PageLayout } from '@/components/ui/PageLayout';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { ContactSection } from '@/components/contact/ContactSection';
import { profile } from '@/data/profile';

export const metadata: Metadata = {
  title: 'Contact',
  description: `Get in touch with ${profile.fullName}.`,
};

export default function ContactPage() {
  return (
    <PageLayout className="max-w-3xl">
      <SectionHeading eyebrow="contact" title="Contact" />
      <ContactSection withForm />
    </PageLayout>
  );
}
