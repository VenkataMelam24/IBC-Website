import Image from "next/image";
import { cn } from "@/lib/utils";

type MenuImageProps = {
  src?: string;
  alt: string;
  variant?: "card" | "thumb";
  className?: string;
};

export function MenuImage({ src, alt, variant = "card", className }: MenuImageProps) {
  if (variant === "thumb") {
    return (
      <div
        className={cn(
          "relative h-14 w-14 shrink-0 overflow-hidden rounded-full border border-border",
          className,
        )}
      >
        {src ? (
          <Image
            src={encodeURI(src)}
            alt={alt}
            fill
            sizes="56px"
            className="object-cover"
          />
        ) : (
          <div className="h-full w-full bg-[radial-gradient(circle_at_30%_30%,hsl(var(--accent)/0.35),hsl(var(--primary)/0.52)_65%,hsl(var(--copper)/0.5))]" />
        )}
      </div>
    );
  }

  return (
    <div className={cn("relative aspect-[4/3] overflow-hidden", className)}>
      {src ? (
        <Image
          src={encodeURI(src)}
          alt={alt}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
        />
      ) : (
        <div className="h-full w-full bg-[radial-gradient(ellipse_at_30%_20%,hsl(var(--accent)/0.36),transparent_45%),radial-gradient(ellipse_at_75%_70%,hsl(var(--copper)/0.32),transparent_55%),linear-gradient(145deg,hsl(var(--primary)/0.74),hsl(10_48%_20%)_82%)]" />
      )}
    </div>
  );
}
