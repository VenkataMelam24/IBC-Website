"use client";

import { useState, useEffect, useRef } from "react";
import { Clock3 } from "lucide-react";

const hours = [
  { day: "Monday",    time: "Closed",        closed: true  },
  { day: "Tuesday",   time: "16:00 – 22:00", closed: false },
  { day: "Wednesday", time: "16:00 – 22:00", closed: false },
  { day: "Thursday",  time: "16:00 – 22:00", closed: false },
  { day: "Friday",    time: "12:00 – 22:00", closed: false },
  { day: "Saturday",  time: "12:00 – 22:00", closed: false },
  { day: "Sunday",    time: "12:00 – 22:00", closed: false },
];

export function OpeningTimesButton() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Close on outside click
  useEffect(() => {
    function handle(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    if (open) document.addEventListener("mousedown", handle);
    return () => document.removeEventListener("mousedown", handle);
  }, [open]);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        className="inline-flex h-12 items-center justify-center gap-2 rounded-xl border border-primary/35 px-6 text-sm font-semibold tracking-wide text-primary transition-colors hover:bg-primary/8"
      >
        <Clock3 className="h-4 w-4" />
        Opening Times
      </button>

      {open && (
        <div className="absolute left-0 top-[3.25rem] z-50 w-64 rounded-2xl border border-border bg-background p-5 shadow-[0_16px_48px_-12px_rgba(0,0,0,0.18)]">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-primary">
            Opening Hours
          </p>
          <div className="space-y-2">
            {hours.map(({ day, time, closed }) => (
              <div key={day} className="flex items-center justify-between text-sm">
                <span className="font-medium text-foreground">{day}</span>
                <span className={closed ? "font-semibold text-primary" : "text-muted-foreground"}>
                  {time}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
