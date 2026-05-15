import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, Clock, Globe2, MapPin, Navigation, Phone } from "lucide-react";
import { CategoryIcon } from "@/components/CategoryIcon";
import { RomeMap } from "@/components/RomeMap";
import { SiteLayout } from "@/components/SiteLayout";
import {
  categoryMeta,
  getGoogleMapsUrl,
  getPlace,
  isCategory,
  type Category,
} from "@/data/resources";

export const Route = createFileRoute("/$category_/$slug")({
  beforeLoad: ({ params }) => {
    if (!isCategory(params.category) || !getPlace(params.slug, params.category)) throw notFound();
  },
  head: ({ params }) => {
    const place = getPlace(params.slug, params.category);
    if (!place) return { meta: [{ title: "Not found" }] };
    return {
      meta: [
        { title: `${place.title} · Roma Places Map` },
        { name: "description", content: place.shortDescription },
        { property: "og:title", content: `${place.title} · Roma Places Map` },
        { property: "og:description", content: place.shortDescription },
      ],
    };
  },
  component: DetailPage,
  notFoundComponent: () => (
    <SiteLayout>
      <div className="mx-auto max-w-3xl px-6 py-24 text-center">
        <h1 className="font-serif text-5xl">Place not found</h1>
        <Link to="/" className="mt-6 inline-flex items-center gap-2 text-primary">
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          Home
        </Link>
      </div>
    </SiteLayout>
  ),
});

function DetailPage() {
  const { category, slug } = Route.useParams();
  const cat = category as Category;
  const place = getPlace(slug, cat)!;
  const meta = categoryMeta[cat];

  return (
    <SiteLayout>
      <article>
        <section className="border-b border-border bg-card">
          <div className="mx-auto grid max-w-[1500px] gap-6 px-4 py-8 sm:px-6 lg:grid-cols-[minmax(0,1fr)_520px] lg:items-end">
            <div>
              <Link
                to="/$category"
                params={{ category: cat }}
                className="inline-flex items-center gap-2 rounded-md border border-border bg-background px-3 py-2 text-sm transition-colors hover:bg-secondary"
              >
                <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                {meta.navLabel}
              </Link>
              <div className="mt-8 flex flex-wrap items-center gap-2">
                <p className="flex items-center gap-2 text-xs uppercase text-primary">
                  <CategoryIcon category={cat} className="h-4 w-4" />
                  {place.kind} · {place.neighborhood}
                </p>
                {place.recommendedBy?.map((reco) => (
                  <span
                    key={reco}
                    className="rounded-md border border-primary/30 bg-primary/10 px-2 py-1 text-xs font-medium text-primary"
                  >
                    {reco}
                  </span>
                ))}
              </div>
              <h1 className="mt-3 font-serif text-4xl leading-none sm:text-5xl md:text-7xl">
                {place.title}
              </h1>
              <p className="mt-5 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8">
                {place.shortDescription}
              </p>
            </div>
            <img
              src={place.image}
              alt={place.imageAlt}
              className="h-72 w-full rounded-lg object-cover lg:h-80"
            />
          </div>
        </section>

        <section className="mx-auto grid max-w-[1500px] gap-6 px-4 py-8 sm:px-6 lg:grid-cols-[minmax(0,1fr)_420px]">
          <div className="space-y-6">
            <div className="rounded-lg border border-border bg-card p-5">
              <h2 className="font-serif text-3xl">Notes</h2>
              <p className="mt-3 text-base leading-7 text-foreground/80">{place.details}</p>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <InfoBlock
                icon={<MapPin className="h-4 w-4" />}
                label="Address"
                value={place.address}
              />
              <InfoBlock icon={<Clock className="h-4 w-4" />} label="Hours" value={place.hours} />
              {place.phone && (
                <InfoBlock
                  icon={<Phone className="h-4 w-4" />}
                  label="Phone"
                  value={
                    <a
                      href={`tel:${place.phone.replace(/\s+/g, "")}`}
                      className="hover:text-foreground"
                    >
                      {place.phone}
                    </a>
                  }
                />
              )}
            </div>
          </div>

          <aside className="space-y-4">
            <div className="h-80">
              <RomeMap places={[place]} selectedSlug={place.slug} onSelect={() => undefined} />
            </div>
            <div className="rounded-lg border border-border bg-card p-4">
              <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                <a
                  href={getGoogleMapsUrl(place)}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex min-h-11 items-center justify-center gap-2 rounded-md bg-primary px-3 py-2 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
                >
                  <Navigation className="h-4 w-4" aria-hidden="true" />
                  Google Maps
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
              </div>
            </div>
          </aside>
        </section>
      </article>
    </SiteLayout>
  );
}

function InfoBlock({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: React.ReactNode;
}) {
  return (
    <div className="rounded-lg border border-border bg-card p-5">
      <p className="flex items-center gap-2 text-xs uppercase text-primary">
        {icon}
        {label}
      </p>
      <p className="mt-3 text-sm leading-6 text-muted-foreground">{value}</p>
    </div>
  );
}
