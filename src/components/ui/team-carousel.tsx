"use client";

import { useRef } from "react";
import Image from "next/image";

export type TeamMember = {
  name: string;
  role: string;
  initials: string;
  image?: string;
  linkedin?: string;
};

function LinkedInIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

export function TeamCarousel({ members }: { members: TeamMember[] }) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const slide = (dir: "left" | "right") => {
    if (!scrollRef.current) return;
    const cardWidth = scrollRef.current.offsetWidth / 2 + 8;
    scrollRef.current.scrollBy({ left: dir === "right" ? cardWidth : -cardWidth, behavior: "smooth" });
  };

  const showNav = members.length > 2;

  return (
    <div className="relative">
      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto snap-x snap-mandatory [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {members.map((member) => (
          <div
            key={member.name}
            className="snap-start w-[calc(50%-8px)] flex-none overflow-hidden rounded-2xl bg-white/[0.05] transition-colors hover:bg-white/[0.08]"
          >
            {/* Avatar area */}
            <div className="relative h-72 overflow-hidden bg-white/[0.02]">
              {member.image ? (
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-cover object-top"
                />
              ) : (
                <div className="flex h-full items-center justify-center">
                  <div className="flex h-20 w-20 items-center justify-center rounded-full border border-accent/50 bg-white/[0.04]">
                    <span className="font-heading text-2xl font-bold tracking-wide text-accent">{member.initials}</span>
                  </div>
                </div>
              )}
            </div>
            {/* Info */}
            <div className="border-t border-white/[0.08] px-4 py-4">
              <p className="font-heading text-[11px] font-bold uppercase tracking-[0.08em] text-primary-foreground">
                {member.name}
              </p>
              <p className="mt-1 text-[10px] leading-relaxed text-primary-foreground/50">{member.role}</p>
              {member.linkedin && (
                <a
                  href={member.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2.5 inline-flex items-center gap-1.5 text-[9px] font-bold uppercase tracking-[0.12em] text-accent/60 transition-colors hover:text-accent"
                >
                  <LinkedInIcon /> LinkedIn
                </a>
              )}
            </div>
          </div>
        ))}
      </div>

      {showNav && (
        <div className="mt-5 flex gap-2">
          <button
            onClick={() => slide("left")}
            aria-label="Previous"
            className="flex h-8 w-8 items-center justify-center rounded-full border border-white/15 text-primary-foreground/60 transition-colors hover:border-accent/40 hover:text-accent"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>
          <button
            onClick={() => slide("right")}
            aria-label="Next"
            className="flex h-8 w-8 items-center justify-center rounded-full border border-white/15 text-primary-foreground/60 transition-colors hover:border-accent/40 hover:text-accent"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
}
