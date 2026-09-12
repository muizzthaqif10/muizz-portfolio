import type { Metadata } from 'next';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { ContactSection } from '@/components/contact/ContactSection';
import { profile } from '@/data/profile';

export const metadata: Metadata = {
  title: 'Contact',
  description: `Get in touch with ${profile.fullName}.`,
};

export default function ContactPage() {
  return (
    <Container className="max-w-3xl py-16 sm:py-20">
      <SectionHeading eyebrow="contact" title="Contact" />
      <ContactSection withForm />
    </Container>
  );
}
