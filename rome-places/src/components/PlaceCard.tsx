import { Link } from "@tanstack/react-router";
import { Clock, ExternalLink, Globe2, MapPin, Navigation } from "lucide-react";
import { categoryMeta, getGoogleMapsUrl, type Category, type Place } from "@/data/resources";

interface PlaceCardProps {
  place: Place;
  compact?: boolean;
  showCategory?: boolean;
}

export function PlaceCard({ place, compact = false, showCategory = false }: PlaceCardProps) {
  const meta = categoryMeta[place.category];

  return (
    <article className="overflow-hidden rounded-lg border border-border bg-card shadow-sm">
      <div className={compact ? "h-36" : "h-48"}>
        <img
          src={place.image}
          alt={place.imageAlt}
          className="h-full w-full object-cover"
          loading="lazy"
        />
      </div>
      <div className="space-y-4 p-4">
        <div className="flex items-start gap-3">
          <span
            className="grid h-10 w-10 shrink-0 place-items-center rounded-md text-xs font-semibold text-white"
            style={{ background: meta.accent }}
          >
            {place.marker}
          </span>
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              {showCategory && (
                <Link
                  to="/$category"
                  params={{ category: place.category }}
                  className="rounded-md bg-secondary px-2 py-1 text-xs font-medium text-secondary-foreground"
                >
                  {meta.navLabel}
                </Link>
              )}
              {place.recommendedBy && (
                <span className="rounded-md border border-primary/30 bg-primary/10 px-2 py-1 text-xs font-medium text-primary">
                  {place.recommendedBy}
                </span>
              )}
            </div>
            <h3 className="mt-2 font-serif text-2xl leading-tight">{place.title}</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              {place.kind} · {place.neighborhood}
            </p>
          </div>
        </div>

        <p className="text-sm leading-6 text-foreground/80">
          {compact ? place.shortDescription : place.details}
        </p>

        <div className="space-y-2 text-sm text-muted-foreground">
          <p className="flex gap-2">
            <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
            <span>{place.address}</span>
          </p>
          <p className="flex gap-2">
            <Clock className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
            <span>{place.hours}</span>
          </p>
        </div>

        <div className="grid grid-cols-2 gap-2 sm:flex sm:flex-wrap">
          <a
            href={getGoogleMapsUrl(place)}
            target="_blank"
            rel="noreferrer"
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-md bg-primary px-3 py-2 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
          >
            <Navigation className="h-4 w-4" aria-hidden="true" />
            Maps
          </a>
          {place.website && (
            <a
              href={place.website}
              target="_blank"
              rel="noreferrer"
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-md border border-border bg-background px-3 py-2 text-sm font-medium transition-colors hover:bg-secondary"
            >
              <Globe2 className="h-4 w-4" aria-hidden="true" />
              Website
            </a>
          )}
          {place.reserveUrl && (
            <a
              href={place.reserveUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-md border border-border bg-background px-3 py-2 text-sm font-medium transition-colors hover:bg-secondary"
            >
              <ExternalLink className="h-4 w-4" aria-hidden="true" />
              Reserve
            </a>
          )}
          <Link
            to="/$category/$slug"
            params={{ category: place.category as Category, slug: place.slug }}
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-md border border-border bg-background px-3 py-2 text-sm font-medium transition-colors hover:bg-secondary"
          >
            Details
          </Link>
        </div>
      </div>
    </article>
  );
}
