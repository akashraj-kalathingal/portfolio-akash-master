import { Section } from "./Primitives";
import { getGithubData, username } from "@/lib/github";
import { Github, Star, GitFork, ArrowUpRight } from "lucide-react";

export default async function GithubSection() {
  const { user, repos } = await getGithubData();

  return (
    <Section id="github" label="06 / GitHub" title="Code in the open.">
      <div className="grid gap-6 lg:grid-cols-[1fr_2fr]">
        {/* Profile card */}
        <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 backdrop-blur-md">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/5">
              <Github className="h-5 w-5 text-white" />
            </div>
            <div>
              <div className="text-sm font-semibold text-white">@{username}</div>
              <a
                href={`https://github.com/${username}`}
                target="_blank"
                rel="noreferrer"
                className="font-mono text-[11px] text-[var(--color-fg-subtle)] hover:text-[var(--color-accent)]"
              >
                github.com/{username} ↗
              </a>
            </div>
          </div>

          {user?.bio && (
            <p className="mt-4 text-sm leading-relaxed text-[var(--color-fg-muted)]">{user.bio}</p>
          )}

          <div className="mt-6 grid grid-cols-2 gap-3">
            <Stat label="Public repos" value={user?.public_repos ?? "—"} />
            <Stat label="Followers" value={user?.followers ?? "—"} />
          </div>
        </div>

        {/* Recent repos */}
        <div className="grid gap-3 sm:grid-cols-2">
          {repos.length === 0 ? (
            <div className="col-span-full rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 text-sm text-[var(--color-fg-muted)] backdrop-blur-md">
              No public repositories surfaced yet. The page renders fine —
              repos appear here once they're public on{" "}
              <a
                href={`https://github.com/${username}`}
                className="text-[var(--color-accent)] underline"
                target="_blank"
                rel="noreferrer"
              >
                @{username}
              </a>
              .
            </div>
          ) : (
            repos.map((r) => (
              <a
                key={r.name}
                href={r.html_url}
                target="_blank"
                rel="noreferrer"
                className="group relative overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.02] p-5 backdrop-blur-md transition-colors hover:border-[var(--color-accent)]/40"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="font-mono text-sm font-medium text-white">{r.name}</div>
                  <ArrowUpRight className="h-4 w-4 shrink-0 text-[var(--color-fg-subtle)] transition-colors group-hover:text-[var(--color-accent)]" />
                </div>
                {r.description && (
                  <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-[var(--color-fg-muted)]">
                    {r.description}
                  </p>
                )}
                <div className="mt-4 flex items-center gap-3 font-mono text-[11px] text-[var(--color-fg-subtle)]">
                  {r.language && (
                    <span className="inline-flex items-center gap-1">
                      <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-accent)]" />
                      {r.language}
                    </span>
                  )}
                  <span className="inline-flex items-center gap-1">
                    <Star className="h-3 w-3" />
                    {r.stargazers_count}
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <GitFork className="h-3 w-3" />
                    {r.forks_count}
                  </span>
                </div>
              </a>
            ))
          )}
        </div>
      </div>
    </Section>
  );
}

function Stat({ label, value }: { label: string; value: number | string }) {
  return (
    <div className="rounded-xl border border-white/[0.04] bg-white/[0.02] p-3">
      <div className="font-mono text-[9px] uppercase tracking-wider text-[var(--color-fg-subtle)]">
        {label}
      </div>
      <div className="mt-1 text-lg font-semibold text-white">{value}</div>
    </div>
  );
}
