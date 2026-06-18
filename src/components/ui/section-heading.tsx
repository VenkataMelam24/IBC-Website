import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  className?: string;
  center?: boolean;
};

export function SectionHeading({
  title,
  description,
  className,
  center = false,
}: SectionHeadingProps) {
  return (
    <div className={cn("max-w-3xl", center && "mx-auto text-center", className)}>
      <h2 className="font-heading text-3xl font-bold leading-[1.35] text-foreground md:text-5xl">
        {title}
      </h2>
      <div className={cn("mt-3 h-1 w-20 bg-primary", center && "mx-auto")} />
      {description ? (
        <p className="mt-5 text-base leading-relaxed text-muted-foreground md:text-lg">
          {description}
        </p>
      ) : null}
    </div>
  );
}
