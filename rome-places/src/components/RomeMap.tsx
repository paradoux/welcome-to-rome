import { useEffect, useMemo, useRef, useState } from "react";
import type * as Leaflet from "leaflet";
import { categoryMeta, type Place } from "@/data/resources";

interface RomeMapProps {
  places: Place[];
  selectedSlug?: string;
  onSelect: (slug: string) => void;
}

export function RomeMap({ places, selectedSlug, onSelect }: RomeMapProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const leafletRef = useRef<typeof Leaflet | null>(null);
  const mapRef = useRef<Leaflet.Map | null>(null);
  const markerLayerRef = useRef<Leaflet.LayerGroup | null>(null);
  const [isReady, setIsReady] = useState(false);
  const placeKey = useMemo(() => places.map((place) => place.slug).join("|"), [places]);

  useEffect(() => {
    let cancelled = false;

    async function bootMap() {
      const L = await import("leaflet");
      if (cancelled || !containerRef.current || mapRef.current) return;

      leafletRef.current = L;
      const map = L.map(containerRef.current, {
        zoomControl: false,
        scrollWheelZoom: true,
        attributionControl: true,
      }).setView([41.8955, 12.4823], 13);

      L.control.zoom({ position: "bottomright" }).addTo(map);
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 19,
        attribution: "&copy; OpenStreetMap contributors",
      }).addTo(map);

      mapRef.current = map;
      setIsReady(true);
    }

    void bootMap();

    return () => {
      cancelled = true;
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    const L = leafletRef.current;
    const map = mapRef.current;
    if (!isReady || !L || !map) return;

    markerLayerRef.current?.remove();
    markerLayerRef.current = L.layerGroup().addTo(map);

    places.forEach((place) => {
      const isSelected = place.slug === selectedSlug;
      const icon = L.divIcon({
        className: "rome-map-marker",
        html: `<span class="rome-marker${isSelected ? " is-selected" : ""}" style="--pin-color: ${
          categoryMeta[place.category].accent
        }" title="${escapeHtml(place.title)}"><span>${escapeHtml(place.marker)}</span></span>`,
        iconSize: [44, 44],
        iconAnchor: [22, 42],
        popupAnchor: [0, -36],
      });

      L.marker([place.lat, place.lng], { icon, title: place.title })
        .addTo(markerLayerRef.current!)
        .on("click", () => onSelect(place.slug))
        .bindTooltip(place.title, {
          direction: "top",
          offset: [0, -28],
          opacity: 0.94,
        });
    });
  }, [isReady, onSelect, places, selectedSlug]);

  useEffect(() => {
    const L = leafletRef.current;
    const map = mapRef.current;
    if (!isReady || !L || !map || places.length === 0) return;

    const bounds = L.latLngBounds(places.map((place) => [place.lat, place.lng]));
    map.fitBounds(bounds, { padding: [48, 48], maxZoom: places.length === 1 ? 15 : 13 });
  }, [isReady, placeKey, places]);

  useEffect(() => {
    const map = mapRef.current;
    if (!isReady || !map || !selectedSlug) return;

    const place = places.find((item) => item.slug === selectedSlug);
    if (!place) return;

    map.panTo([place.lat, place.lng], { animate: true, duration: 0.7 });
  }, [isReady, places, selectedSlug]);

  return (
    <div className="relative h-full min-h-[320px] overflow-hidden rounded-lg border border-border bg-secondary shadow-sm sm:min-h-[420px]">
      <div ref={containerRef} className="h-full min-h-[320px] w-full sm:min-h-[420px]" />
      {!isReady && (
        <div className="absolute inset-0 grid place-items-center bg-card text-sm text-muted-foreground">
          Loading map
        </div>
      )}
    </div>
  );
}

function escapeHtml(value: string) {
  return value.replace(/[&<>"']/g, (character) => {
    switch (character) {
      case "&":
        return "&amp;";
      case "<":
        return "&lt;";
      case ">":
        return "&gt;";
      case '"':
        return "&quot;";
      default:
        return "&#39;";
    }
  });
}
