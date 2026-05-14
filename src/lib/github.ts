/**
 * GitHub integration.
 *
 * Uses GitHub's public REST API. No token required for read-only stats
 * but unauthenticated requests are rate-limited to 60/hour per IP.
 * For production traffic, set a GITHUB_TOKEN env var with a fine-grained
 * read-only PAT — the fetch will use it if present.
 *
 * Data is fetched server-side with Next's revalidate so it isn't hit on
 * every request. Failures fall back to a static placeholder so the page
 * never breaks.
 */

import { profile } from "@/content/data";

const username = (() => {
  // Extract username from the GitHub URL in data.ts
  const m = profile.github.match(/github\.com\/([^/]+)/);
  return m?.[1] ?? "akashraj-kalathingal";
})();

type Repo = {
  name: string;
  description: string | null;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  topics: string[];
};

type GhUser = {
  public_repos: number;
  followers: number;
  bio: string | null;
};

async function gh<T>(path: string): Promise<T | null> {
  try {
    const res = await fetch(`https://api.github.com${path}`, {
      headers: {
        Accept: "application/vnd.github+json",
        "X-GitHub-Api-Version": "2022-11-28",
        ...(process.env.GITHUB_TOKEN
          ? { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` }
          : {}),
      },
      next: { revalidate: 3600 }, // refresh hourly
    });
    if (!res.ok) return null;
    return (await res.json()) as T;
  } catch {
    return null;
  }
}

export async function getGithubData(): Promise<{
  user: GhUser | null;
  repos: Repo[];
}> {
  const [user, repos] = await Promise.all([
    gh<GhUser>(`/users/${username}`),
    gh<Repo[]>(`/users/${username}/repos?sort=updated&per_page=6&type=owner`),
  ]);
  return { user, repos: repos ?? [] };
}

export { username };
