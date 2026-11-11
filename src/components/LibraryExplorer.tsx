"use client";

import { useMemo, useState } from "react";
import {
  LIBRARY_CATALOG,
  type LibraryModuleKind
} from "@/data/library-catalog";
import { useLanguage } from "@/i18n/LanguageContext";

type FilterKind = "all" | LibraryModuleKind;

export function LibraryExplorer() {
  const [activeKind, setActiveKind] = useState<FilterKind>("all");
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [copiedSlug, setCopiedSlug] = useState<string | null>(null);
  const { locale, t } = useLanguage();

  const counts = useMemo(() => {
    const skills = LIBRARY_CATALOG.filter((m) => m.kind === "skill").length;
    const subagents = LIBRARY_CATALOG.filter(
      (m) => m.kind === "subagent"
    ).length;
    return {
      all: LIBRARY_CATALOG.length,
      skill: skills,
      subagent: subagents
    };
  }, []);

  const allTags = useMemo(() => {
    const tagFreq = new Map<string, number>();
    for (const mod of LIBRARY_CATALOG) {
      for (const rawTag of mod.tags) {
        const tag = rawTag.toLowerCase();
        tagFreq.set(tag, (tagFreq.get(tag) ?? 0) + 1);
      }
    }
    return Array.from(tagFreq.entries())
      .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
      .map(([tag]) => tag);
  }, []);

  const visibleModules = useMemo(() => {
    const normalizedQuery = searchQuery
      .trim()
      .toLowerCase()
      .replace(/^#+/, "");

    return LIBRARY_CATALOG.filter((mod) => {
      if (activeKind !== "all" && mod.kind !== activeKind) {
        return false;
      }

      if (
        activeTag &&
        !mod.tags.some((tag) => tag.toLowerCase() === activeTag)
      ) {
        return false;
      }

      if (!normalizedQuery) {
        return true;
      }

      const localizedSummary = mod.summary[locale].toLowerCase();
      const matchesSlug = mod.slug.toLowerCase().includes(normalizedQuery);
      const matchesTrack = mod.track.toLowerCase().includes(normalizedQuery);
      const matchesTag = mod.tags.some((tag) =>
        tag.toLowerCase().includes(normalizedQuery)
      );
      const matchesSummary = localizedSummary.includes(normalizedQuery);

      return matchesSlug || matchesTrack || matchesTag || matchesSummary;
    });
  }, [activeKind, activeTag, locale, searchQuery]);

  const handleCopy = async (cmd: string, slug: string) => {
    try {
      await navigator.clipboard.writeText(cmd);
      setCopiedSlug(slug);
      window.setTimeout(() => {
        setCopiedSlug((prev) => (prev === slug ? null : prev));
      }, 1800);
    } catch {
      // Fallback no-op if clipboard is unavailable
    }
  };

  const handleToggleTag = (tag: string) => {
    const normalized = tag.toLowerCase();
    setActiveTag((prev) => (prev === normalized ? null : normalized));
  };

  const handleResetFilters = () => {
    setActiveKind("all");
    setActiveTag(null);
    setSearchQuery("");
  };

  return (
    <section className="library-clean" aria-labelledby="library-heading">
      <div className="frame library-clean__container">
        <header className="library-clean__header">
          <div className="library-clean__contribute">
            <span>{t.library.contributePrompt}</span>
            <a
              href="https://github.com/skillops-toolkit/SkillOps/blob/main/CONTRIBUTING.md"
              target="_blank"
              rel="noopener noreferrer"
              className="library-clean__contribute-link"
            >
              {t.library.contributeLink}
            </a>
          </div>

          <h1 id="library-heading" className="library-clean__title">
            {t.library.title}
          </h1>
          <p className="library-clean__sub">{t.library.sub}</p>

          <div
            className="library-switch"
            role="tablist"
            aria-label={t.library.switchAria}
          >
            <button
              type="button"
              role="tab"
              aria-selected={activeKind === "all"}
              className="library-switch__btn"
              onClick={() => setActiveKind("all")}
            >
              <span>{t.library.allTab}</span>
              <span className="library-switch__count">{counts.all}</span>
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={activeKind === "skill"}
              className="library-switch__btn"
              onClick={() => setActiveKind("skill")}
            >
              <span>{t.library.skillsTab}</span>
              <span className="library-switch__count">{counts.skill}</span>
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={activeKind === "subagent"}
              className="library-switch__btn"
              onClick={() => setActiveKind("subagent")}
            >
              <span>{t.library.agentsTab}</span>
              <span className="library-switch__count">{counts.subagent}</span>
            </button>
          </div>

          <div className="library-controls">
            <div className="library-search">
              <span className="library-search__icon" aria-hidden="true">
                /
              </span>
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t.library.searchPlaceholder}
                aria-label={t.library.searchPlaceholder}
                className="library-search__input"
              />
              {searchQuery && (
                <button
                  type="button"
                  className="library-search__clear"
                  onClick={() => setSearchQuery("")}
                >
                  {t.library.clearSearch}
                </button>
              )}
            </div>

            <div className="library-tag-bar" role="group" aria-label="Filter by tag">
              <button
                type="button"
                className={`library-tag-pill ${
                  activeTag === null ? "is-active" : ""
                }`}
                onClick={() => setActiveTag(null)}
              >
                {t.library.allTags}
              </button>
              {allTags.map((tag) => {
                const isActive = activeTag === tag;
                return (
                  <button
                    key={tag}
                    type="button"
                    className={`library-tag-pill ${
                      isActive ? "is-active" : ""
                    }`}
                    onClick={() => handleToggleTag(tag)}
                  >
                    #{tag}
                  </button>
                );
              })}
            </div>
          </div>
        </header>

        {visibleModules.length === 0 ? (
          <div className="library-empty" data-ui>
            <p className="library-empty__title">{t.library.emptyTitle}</p>
            <button
              type="button"
              className="btn-motif"
              onClick={handleResetFilters}
            >
              {t.library.resetFilters}
            </button>
          </div>
        ) : (
          <div className="library-clean__list">
            {visibleModules.map((mod) => {
              const cmd = `npx skillops-cli@latest add ${mod.slug}`;
              const isCopied = copiedSlug === mod.slug;
              const summary = mod.summary[locale];

              return (
                <article
                  key={mod.slug}
                  className="library-clean-card"
                  data-ui
                  aria-label={mod.slug}
                >
                  <div className="library-clean-card__top">
                    <div className="library-clean-card__identity">
                      <span className="library-clean-card__badge">
                        {mod.kind === "skill"
                          ? t.library.badgeSkill
                          : t.library.badgeAgent}
                      </span>
                      <h2 className="library-clean-card__name">{mod.slug}</h2>
                    </div>

                    <span className="library-clean-card__meta">
                      {mod.track} · {mod.version}
                    </span>
                  </div>

                  <p className="library-clean-card__desc">{summary}</p>

                  <div className="library-clean-card__cmd">
                    <code>{cmd}</code>
                    <button
                      type="button"
                      className="library-clean-card__copy"
                      onClick={() => handleCopy(cmd, mod.slug)}
                    >
                      {isCopied ? t.library.copied : t.library.copy}
                    </button>
                  </div>

                  <div className="library-clean-card__bottom">
                    <div className="library-clean-card__tags">
                      {mod.tags.map((tag) => {
                        const isTagActive = activeTag === tag.toLowerCase();
                        return (
                          <button
                            key={tag}
                            type="button"
                            className={`library-clean-card__tag ${
                              isTagActive ? "is-active" : ""
                            }`}
                            onClick={() => handleToggleTag(tag)}
                          >
                            #{tag}
                          </button>
                        );
                      })}
                    </div>

                    <span className="library-clean-card__compat">
                      {t.library.compatibleBadge}
                    </span>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
