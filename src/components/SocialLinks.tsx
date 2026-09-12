import { Mail } from 'lucide-react';
import { profile } from '@/data/profile';
import { cn } from '@/lib/utils';
import { GithubIcon, LinkedinIcon } from '@/components/icons/BrandIcons';

export function SocialLinks({ className }: { className?: string }) {
  return (
    <div className={cn('flex items-center gap-4 text-muted', className)}>
      <a href={profile.github} target="_blank" rel="noreferrer" aria-label="GitHub" className="hover:text-foreground">
        <GithubIcon size={18} />
      </a>
      <a href={profile.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn" className="hover:text-foreground">
        <LinkedinIcon size={18} />
      </a>
      <a href={profile.social.email} aria-label="Email" className="hover:text-foreground">
        <Mail size={18} />
      </a>
    </div>
  );
}
