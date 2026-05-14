import { useCallback, useState } from "react";
import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, ListChecks } from "lucide-react";
import { CategoryIcon } from "@/components/CategoryIcon";
import { PlaceCard } from "@/components/PlaceCard";
import { RomeMap } from "@/components/RomeMap";
import { SiteLayout } from "@/components/SiteLayout";
import { categoryMeta, getPlacesByCategory, isCategory, type Category } from "@/data/resources";

export const Route = createFileRoute("/$category")({
  beforeLoad: ({ params }) => {
    if (!isCategory(params.category)) throw notFound();
  },
  head: ({ params }) => {
    if (!isCategory(params.category)) return { meta: [{ title: "Not found" }] };
    const meta = categoryMeta[params.category];
    return {
      meta: [
        { title: `${meta.title} · Roma Places Map` },
        { name: "description", content: meta.description },
        { property: "og:title", content: `${meta.title} · Roma Places Map` },
        { property: "og:description", content: meta.description },
      ],
    };
  },
  component: CategoryPage,
  notFoundComponent: () => (
    <SiteLayout>
      <div className="mx-auto max-w-3xl px-6 py-24 text-center">
        <h1 className="font-serif text-5xl">Category not found</h1>
        <Link to="/" className="mt-6 inline-flex items-center gap-2 text-primary">
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          Home
        </Link>
      </div>
    </SiteLayout>
  ),
});

function CategoryPage() {
  const { category } = Route.useParams();
  const cat = category as Category;
  const meta = categoryMeta[cat];
  const items = getPlacesByCategory(cat);
  const [selectedSlug, setSelectedSlug] = useState(items[0]?.slug);
  const selectedPlace = items.find((place) => place.slug === selectedSlug) ?? items[0];

  const selectPlace = useCallback((slug: string) => {
    setSelectedSlug(slug);
  }, []);

  return (
    <SiteLayout>
      <section className="border-b border-border bg-card">
        <div className="mx-auto max-w-[1500px] px-4 py-8 sm:px-6">
          <Link
            to="/"
            className="inline-flex items-center gap-2 rounded-md border border-border bg-background px-3 py-2 text-sm transition-colors hover:bg-secondary"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            Map
          </Link>
          <div className="mt-6 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="flex items-center gap-2 text-xs uppercase text-primary">
                <CategoryIcon category={cat} className="h-4 w-4" />
                {meta.label}
              </p>
              <h1 className="mt-3 font-serif text-4xl leading-none sm:text-5xl md:text-6xl">
                {meta.title}
              </h1>
              <p className="mt-4 max-w-[20rem] text-sm leading-6 text-muted-foreground sm:max-w-2xl">
                {meta.description}
              </p>
            </div>
            <div className="inline-flex items-center gap-2 rounded-md bg-secondary px-3 py-2 text-sm text-secondary-foreground">
              <ListChecks className="h-4 w-4" aria-hidden="true" />
              {items.length} places
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-[1500px] gap-4 px-4 py-4 sm:px-6 lg:grid-cols-[minmax(0,1fr)_400px] lg:py-6">
        <div className="h-[52svh] min-h-[340px] max-h-[520px] lg:sticky lg:top-24 lg:h-[calc(100vh-128px)] lg:max-h-none">
          <RomeMap places={items} selectedSlug={selectedPlace?.slug} onSelect={selectPlace} />
        </div>
        <div className="grid gap-4">
          {selectedPlace && <PlaceCard place={selectedPlace} showCategory />}
          {items.map((place) => (
            <PlaceCard key={place.slug} place={place} compact />
          ))}
        </div>
      </section>
    </SiteLayout>
  );
}
