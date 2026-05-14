import { Link } from "@tanstack/react-router";
import { MapPin } from "lucide-react";
import { categoryMeta, categoryOrder } from "@/data/resources";

export function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
}

function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/92 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-[1500px] items-center justify-between gap-4 px-4 sm:px-6">
        <Link to="/" className="flex min-w-0 items-center gap-3">
          <span className="grid h-9 w-9 shrink-0 place-items-center rounded-md bg-primary text-primary-foreground">
            <MapPin className="h-4 w-4" aria-hidden="true" />
          </span>
          <span className="min-w-0">
            <span className="block truncate font-serif text-2xl leading-none">Roma</span>
            <span className="block truncate text-xs uppercase text-muted-foreground">
              Places map
            </span>
          </span>
        </Link>
        <nav className="hidden items-center gap-1 overflow-x-auto text-sm md:flex">
          {categoryOrder.map((category) => (
            <Link
              key={category}
              to="/$category"
              params={{ category }}
              className="rounded-md px-3 py-2 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
              activeProps={{ className: "rounded-md bg-secondary px-3 py-2 text-foreground" }}
            >
              {categoryMeta[category].navLabel}
            </Link>
          ))}
        </nav>
      </div>
      <nav className="no-scrollbar mx-auto flex max-w-[1500px] gap-2 overflow-x-auto px-4 pb-3 text-sm md:hidden">
        {categoryOrder.map((category) => (
          <Link
            key={category}
            to="/$category"
            params={{ category }}
            className="min-h-10 shrink-0 rounded-md border border-border bg-card px-3 py-2 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
            activeProps={{
              className:
                "min-h-10 shrink-0 rounded-md border border-primary bg-primary px-3 py-2 text-primary-foreground",
            }}
          >
            {categoryMeta[category].navLabel}
          </Link>
        ))}
      </nav>
    </header>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-[1500px] flex-col gap-3 px-4 py-8 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <p>Roma places map · no login, no API key.</p>
        <p>Map data © OpenStreetMap contributors.</p>
      </div>
    </footer>
  );
}
