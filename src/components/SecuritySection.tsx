"use client";

import { useEffect, useRef } from "react";
import { useLanguage } from "@/i18n/LanguageContext";

export function SecuritySection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const { t } = useLanguage();

  useEffect(() => {
    let rafId = 0;

    const updateScrollMotion = () => {
      rafId = 0;
      const el = sectionRef.current;
      if (!el) return;
      const vh = window.innerHeight || 1;
      const rect = el.getBoundingClientRect();
      const rawProgress = (vh - rect.top) / (vh * 0.85);
      const clamped = Math.min(Math.max(rawProgress, 0), 1);
      const eased = 1 - Math.pow(1 - clamped, 3);
      el.style.setProperty("--sec-progress", eased.toFixed(3));
    };

    const onScroll = () => {
      if (!rafId) {
        rafId = window.requestAnimationFrame(updateScrollMotion);
      }
    };

    updateScrollMotion();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });

    return () => {
      if (rafId) window.cancelAnimationFrame(rafId);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="security"
      className="sec-section"
      aria-labelledby="sec-heading"
    >
      <div className="frame sec-section__grid">
        <div className="sec-section__copy">
          <span className="sec-eyebrow">{t.security.eyebrow}</span>
          <h2 id="sec-heading" className="sec-section__title">
            {t.security.titleLine1}
            <br />
            {t.security.titleLine2}
          </h2>
          <p className="sec-section__lead">
            {t.security.leadPart1}
            <strong>{t.security.leadHighlight1}</strong>
            {t.security.leadAnd}
            <strong>{t.security.leadHighlight2}</strong>
            {t.security.leadPart2}
          </p>

          <div className="sec-actions">
            <a
              href="https://github.com/skillops-toolkit/SkillOps/blob/main/.github/SECURITY.md"
              target="_blank"
              rel="noopener noreferrer"
              role="button"
              className="btn-motif"
            >
              {t.security.securityPolicyBtn}
            </a>
          </div>
        </div>

        <div
          className="sec-panel"
          data-ui
          aria-label={t.security.panelAria}
        >
          <div className="sec-panel__head">
            <span className="sec-panel__repo">{t.security.panelTitle}</span>
            <span className="sec-panel__badge">{t.security.panelBadge}</span>
          </div>

          <div className="sec-pillars">
            {t.security.pillars.map((pillar) => (
              <div key={pillar.tag} className="sec-pillar-card">
                <div className="sec-pillar-card__meta">
                  <span className="sec-pillar-card__tag">{pillar.tag}</span>
                  <code className="sec-pillar-card__path">{pillar.path}</code>
                </div>
                <p className="sec-pillar-card__desc">{pillar.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
