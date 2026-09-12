import { Star, GitFork, Clock } from 'lucide-react';
import { GithubIcon } from '@/components/icons/BrandIcons';
import { getGithubRepos } from '@/lib/github';

export async function GithubReposSection() {
  const repos = await getGithubRepos();

  if (!repos || repos.length === 0) return null;

  return (
    <div className="mt-16">
      <div className="mb-6 flex items-center gap-2">
        <GithubIcon size={18} />
        <h2 className="font-mono text-sm text-accent">
          <span className="text-muted">{'// '}</span>
          latest from github
        </h2>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {repos.map((repo) => (
          <a
            key={repo.id}
            href={repo.html_url}
            target="_blank"
            rel="noreferrer"
            className="flex flex-col rounded-xl border border-border bg-surface p-5 transition-colors hover:border-accent/50"
          >
            <h3 className="font-mono text-sm font-medium text-foreground">{repo.name}</h3>
            {repo.description && (
              <p className="mt-2 line-clamp-2 text-sm text-muted">{repo.description}</p>
            )}
            <div className="mt-4 flex flex-wrap items-center gap-3 font-mono text-xs text-muted">
              {repo.language && <span>{repo.language}</span>}
              <span className="flex items-center gap-1">
                <Star size={12} />
                {repo.stargazers_count}
              </span>
              <span className="flex items-center gap-1">
                <GitFork size={12} />
                {repo.forks_count}
              </span>
              <span className="flex items-center gap-1">
                <Clock size={12} />
                {new Date(repo.updated_at).toLocaleDateString('en-US', {
                  month: 'short',
                  year: 'numeric',
                })}
              </span>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
