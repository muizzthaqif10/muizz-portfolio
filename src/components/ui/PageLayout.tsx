import { Container } from '@/components/ui/Container';
import { cn } from '@/lib/utils';

export function PageLayout({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <Container className={cn('pt-20 pb-16 sm:pt-24 sm:pb-20', className)}>{children}</Container>;
}
