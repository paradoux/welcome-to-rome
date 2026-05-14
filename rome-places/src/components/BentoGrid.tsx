import { Link } from "@tanstack/react-router";
import { getResourceDateLabel, type Resource } from "@/data/resources";

const sizeClasses: Record<NonNullable<Resource["size"]>, string> = {
  sm: "md:basis-[calc((100%_-_2rem)_/_3)] md:min-h-[200px]",
  md: "md:basis-[calc((100%_-_1rem)_/_2)] md:min-h-[200px]",
  lg: "md:basis-[calc((100%_-_1rem)_/_2)] md:min-h-[416px]",
};

export function BentoGrid({ items }: { items: Resource[] }) {
  return (
    <div className="flex flex-col gap-4 md:flex-row md:flex-wrap md:justify-center">
      {items.map((item) => (
        <Link
          key={item.slug}
          to="/$category/$slug"
          params={{ category: item.category, slug: item.slug }}
          className={`group relative min-h-[200px] overflow-hidden rounded-2xl border border-border/60 bg-card p-6 transition-all hover:border-primary/60 hover:-translate-y-0.5 md:flex-none ${sizeClasses[item.size ?? "sm"]}`}
        >
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity"
            style={{ background: "var(--gradient-aurora)" }}
          />
          <div className="relative h-full flex flex-col justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-primary/80">
                {item.tag} · {getResourceDateLabel(item)}
              </p>
              <h3 className="mt-3 line-clamp-3 font-serif text-2xl md:text-3xl leading-tight">
                {item.title}
              </h3>
              <p className="mt-1 text-sm text-muted-foreground">{item.creator}</p>
            </div>
            <p className="mt-4 text-sm text-foreground/70 line-clamp-2">{item.blurb}</p>
          </div>
        </Link>
      ))}
    </div>
  );
}
