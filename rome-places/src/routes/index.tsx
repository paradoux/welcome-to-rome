import { useCallback, useMemo, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ListFilter, MapPinned } from "lucide-react";
import { CategoryIcon } from "@/components/CategoryIcon";
import { PlaceCard } from "@/components/PlaceCard";
import { RomeMap } from "@/components/RomeMap";
import { SiteLayout } from "@/components/SiteLayout";
import {
  categoryMeta,
  categoryOrder,
  featuredSlugs,
  places,
  type Category,
} from "@/data/resources";

type Filter = "all" | Category;

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Roma Places Map" },
      {
        name: "description",
        content:
          "A standalone Rome map with restaurants, gelaterie, bars, rooftops, culture, and walks.",
      },
      { property: "og:title", content: "Roma Places Map" },
      {
        property: "og:description",
        content: "Restaurants, sweets, bars, rooftops, culture, and walks mapped across Rome.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  const [filter, setFilter] = useState<Filter>("all");
  const [selectedSlug, setSelectedSlug] = useState(featuredSlugs[0]);
  const visiblePlaces = useMemo(
    () => (filter === "all" ? places : places.filter((place) => place.category === filter)),
    [filter],
  );
  const selectedPlace =
    visiblePlaces.find((place) => place.slug === selectedSlug) ?? visiblePlaces[0] ?? places[0];

  const selectPlace = useCallback((slug: string) => {
    setSelectedSlug(slug);
  }, []);

  function setCategory(next: Filter) {
    setFilter(next);
    const firstPlace = next === "all" ? places[0] : places.find((place) => place.category === next);
    if (firstPlace) setSelectedSlug(firstPlace.slug);
  }

  return (
    <SiteLayout>
      <section className="mx-auto grid max-w-[1500px] gap-4 px-4 py-4 sm:px-6 lg:grid-cols-[380px_minmax(0,1fr)] lg:py-6">
        <aside className="contents lg:block lg:space-y-4">
          <div className="order-1 min-w-0 rounded-lg border border-border bg-card p-5 shadow-sm">
            <p className="flex items-center gap-2 text-xs uppercase text-primary">
              <MapPinned className="h-4 w-4" aria-hidden="true" />
              Roma
            </p>
            <h1 className="mt-3 font-serif text-4xl leading-none sm:text-5xl">Places to go</h1>
            <p className="mt-4 max-w-[18rem] text-sm leading-6 text-muted-foreground sm:max-w-none">
              {places.length} saved stops across food, rooftops, culture, and walks.
            </p>
          </div>

          <div className="order-4 min-w-0 rounded-lg border border-border bg-card p-3 shadow-sm lg:order-none">
            <p className="mb-2 flex items-center gap-2 px-2 text-xs uppercase text-muted-foreground">
              <ListFilter className="h-4 w-4" aria-hidden="true" />
              Categories
            </p>
            <div className="grid grid-cols-2 gap-2">
              <FilterButton active={filter === "all"} onClick={() => setCategory("all")}>
                All
              </FilterButton>
              {categoryOrder.map((category) => (
                <FilterButton
                  key={category}
                  active={filter === category}
                  onClick={() => setCategory(category)}
                  accent={categoryMeta[category].accent}
                >
                  <CategoryIcon category={category} className="h-4 w-4" />
                  {categoryMeta[category].navLabel}
                </FilterButton>
              ))}
            </div>
          </div>

          <div className="order-3 min-w-0 lg:order-none">
            <PlaceCard place={selectedPlace} compact showCategory />
          </div>
        </aside>

        <div className="order-2 h-[44svh] min-h-[330px] max-h-[440px] min-w-0 lg:order-none lg:min-h-[calc(100vh-112px)] lg:max-h-none">
          <RomeMap
            places={visiblePlaces}
            selectedSlug={selectedPlace.slug}
            onSelect={selectPlace}
          />
        </div>
      </section>

      <section className="border-t border-border bg-secondary/45">
        <div className="mx-auto max-w-[1500px] px-4 py-12 sm:px-6">
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {categoryOrder.map((category) => {
              const categoryPlaces = places.filter((place) => place.category === category);
              return (
                <Link
                  key={category}
                  to="/$category"
                  params={{ category }}
                  className="group rounded-lg border border-border bg-card p-5 shadow-sm transition-colors hover:border-primary"
                >
                  <div className="flex items-center justify-between gap-3">
                    <span
                      className="grid h-10 w-10 place-items-center rounded-md text-white"
                      style={{ background: categoryMeta[category].accent }}
                    >
                      <CategoryIcon category={category} className="h-5 w-5" />
                    </span>
                    <span className="text-sm text-muted-foreground">{categoryPlaces.length}</span>
                  </div>
                  <h2 className="mt-4 font-serif text-3xl">{categoryMeta[category].title}</h2>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">
                    {categoryMeta[category].description}
                  </p>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}

function FilterButton({
  active,
  children,
  onClick,
  accent,
}: {
  active: boolean;
  children: React.ReactNode;
  onClick: () => void;
  accent?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex min-h-12 items-center justify-center gap-2 rounded-md border border-border px-2 py-2 text-sm font-medium transition-colors hover:bg-secondary sm:px-3"
      style={{
        background: active ? (accent ?? "var(--primary)") : undefined,
        color: active ? "white" : undefined,
        borderColor: active ? (accent ?? "var(--primary)") : undefined,
      }}
    >
      {children}
    </button>
  );
}
