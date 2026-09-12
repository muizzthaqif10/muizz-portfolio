import { profile } from '@/data/profile';

export type GithubRepo = {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  updated_at: string;
  fork: boolean;
};

/**
 * Fetches public repositories for the configured GitHub username.
 * Returns null (rather than throwing) if no username is configured or the
 * request fails, so callers can gracefully fall back to static project data.
 */
export async function getGithubRepos(): Promise<GithubRepo[] | null> {
  const username = process.env.NEXT_PUBLIC_GITHUB_USERNAME || profile.githubUsername;

  if (!username) return null;

  try {
    const res = await fetch(
      `https://api.github.com/users/${username}/repos?sort=updated&per_page=6`,
      {
        headers: { Accept: 'application/vnd.github+json' },
        next: { revalidate: 3600 },
      },
    );

    if (!res.ok) return null;

    const repos = (await res.json()) as GithubRepo[];
    return repos.filter((repo) => !repo.fork);
  } catch {
    return null;
  }
}
