import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import PageHeader from "@/components/base/PageHeader";
import { baseMaps, mapFeatures, mapLayers, offlinePackages } from "@/mocks/map";

export default function MapPage() {
  const [searchParams] = useSearchParams();
  const [layers, setLayers] = useState(mapLayers.map((layer) => ({ ...layer })));
  const [baseMap, setBaseMap] = useState("map");
  const [layersOpen, setLayersOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [focused, setFocused] = useState<string | null>(searchParams.get("focus"));

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return mapFeatures.filter(
      (feature) =>
        feature.name.toLowerCase().includes(q) ||
        feature.type.toLowerCase().includes(q) ||
        feature.detail.toLowerCase().includes(q),
    );
  }, [query]);

  const toggleLayer = (id: string) => {
    setLayers((prev) =>
      prev.map((layer) => (layer.id === id ? { ...layer, active: !layer.active } : layer)),
    );
  };

  const totalLayers = layers.length;
  const compact = totalLayers > 3;

  return (
    <div className="animate-fade-in pb-8">
      <PageHeader title="Map" />

      <div className="px-4 pt-3">
        <div className="relative h-[56vh] min-h-[420px] overflow-hidden rounded-lg border border-background-200 bg-background-100">
          <iframe
            title="Redhakhol Forest Division map"
            src="https://www.google.com/maps?q=21.0833,84.3500&z=12&output=embed"
            className="h-full w-full"
            referrerPolicy="no-referrer-when-downgrade"
          />

          {/* Search */}
          <div className="absolute left-3 right-3 top-3">
            <div className="glass-bar flex items-center gap-2 rounded-md border px-3 py-2">
              <i className="ri-search-line text-[16px] text-foreground-500" />
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search assets, tasks, boundaries..."
                className="w-full bg-transparent text-sm text-foreground-900 outline-none placeholder:text-foreground-500"
              />
              {query ? (
                <button
                  type="button"
                  aria-label="Clear search"
                  onClick={() => setQuery("")}
                  className="cursor-pointer text-foreground-500"
                >
                  <i className="ri-close-line text-[16px]" />
                </button>
              ) : null}
            </div>

            {query ? (
              <div className="glass-strong mt-2 max-h-56 overflow-y-auto rounded-md border">
                {results.length === 0 ? (
                  <p className="px-3 py-4 text-center text-xs text-foreground-600">
                    No matching features.
                  </p>
                ) : (
                  results.map((feature) => (
                    <button
                      key={feature.id}
                      type="button"
                      onClick={() => {
                        setFocused(feature.name);
                        setQuery("");
                      }}
                      className="flex w-full cursor-pointer items-center justify-between gap-3 border-b border-background-50/50 px-3 py-2.5 text-left last:border-b-0 hover:bg-background-50/60"
                    >
                      <span className="min-w-0">
                        <span className="block truncate text-[13px] font-medium text-foreground-950">
                          {feature.name}
                        </span>
                        <span className="block truncate text-[10.5px] text-foreground-500">
                          {feature.detail}
                        </span>
                      </span>
                      <span className="shrink-0 rounded-full bg-secondary-100 px-2 py-0.5 text-[10px] font-semibold text-secondary-900">
                        {feature.type}
                      </span>
                    </button>
                  ))
                )}
              </div>
            ) : null}
          </div>

          {/* Map controls */}
          <div className="absolute right-3 top-16 flex flex-col gap-2">
            <button
              type="button"
              aria-label="Re-centre to current location"
              className="glass-bar flex h-9 w-9 cursor-pointer items-center justify-center rounded-md border text-primary-700"
            >
              <i className="ri-focus-3-line text-[18px]" />
            </button>
            <button
              type="button"
              aria-label="Map layers"
              onClick={() => setLayersOpen((prev) => !prev)}
              className={`glass-bar flex h-9 w-9 cursor-pointer items-center justify-center rounded-md border ${
                layersOpen ? "text-primary-800" : "text-primary-700"
              }`}
            >
              <i className="ri-stack-line text-[18px]" />
            </button>
          </div>

          {/* Layers panel — compact, scrolls when there are many layers */}
          {layersOpen ? (
            <div className="glass-strong absolute right-3 top-28 w-52 rounded-md border p-2">
              <p className="px-1 pb-2 font-heading text-[11px] font-semibold uppercase tracking-[0.12em] text-foreground-600">
                Layers
              </p>
              <div className={`space-y-1 ${compact ? "max-h-52 overflow-y-auto" : ""}`}>
                {layers.map((layer) => (
                  <button
                    key={layer.id}
                    type="button"
                    onClick={() => toggleLayer(layer.id)}
                    className="flex w-full cursor-pointer items-center gap-2 rounded-md px-2 py-1.5 text-left hover:bg-background-50/60"
                  >
                    <span
                      className={`flex h-4 w-4 shrink-0 items-center justify-center rounded border ${
                        layer.active
                          ? "border-primary-600 bg-primary-600 text-background-50"
                          : "border-foreground-500/40"
                      }`}
                    >
                      {layer.active ? <i className="ri-check-line text-[11px]" /> : null}
                    </span>
                    <span className="min-w-0 flex-1 truncate text-[11.5px] text-foreground-800">
                      {layer.label}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          ) : null}

          {/* Base map switch */}
          <div className="absolute bottom-3 left-3">
            <div className="glass-bar inline-flex rounded-full border p-1">
              {baseMaps.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setBaseMap(item.id)}
                  className={`flex cursor-pointer items-center gap-1.5 whitespace-nowrap rounded-full px-3 py-1 text-[11px] font-medium transition-colors ${
                    baseMap === item.id
                      ? "bg-primary-600 text-background-50"
                      : "text-foreground-600 hover:text-foreground-900"
                  }`}
                >
                  <i className={`${item.icon} text-[13px]`} />
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {focused ? (
            <div className="glass-bar absolute bottom-3 right-3 flex max-w-[60%] items-center gap-2 rounded-md border px-3 py-1.5">
              <i className="ri-map-pin-2-fill text-[14px] text-primary-700" />
              <span className="truncate text-[11px] font-medium text-foreground-800">
                {focused}
              </span>
              <button
                type="button"
                aria-label="Clear focused feature"
                onClick={() => setFocused(null)}
                className="cursor-pointer text-foreground-500"
              >
                <i className="ri-close-line text-[14px]" />
              </button>
            </div>
          ) : null}
        </div>

        {/* Simplified offline map list */}
        <div className="mt-5">
          <p className="mb-3 font-heading text-[13px] font-semibold uppercase tracking-[0.12em] text-foreground-600">
            Offline Maps
          </p>
          <div className="overflow-hidden glass-panel rounded-lg">
            {offlinePackages.map((pkg, index) => (
              <div
                key={pkg.id}
                className={`flex items-center justify-between gap-3 px-3.5 py-3 ${
                  index > 0 ? "border-t border-background-200" : ""
                }`}
              >
                <p className="min-w-0 truncate text-sm font-medium text-foreground-900">
                  {pkg.name}
                </p>
                <button
                  type="button"
                  className="flex shrink-0 cursor-pointer items-center gap-1.5 whitespace-nowrap rounded-md border border-background-300 bg-background-50 px-3 py-1.5 text-[11px] font-medium text-foreground-700 hover:bg-background-100"
                >
                  <i
                    className={`${
                      pkg.action === "Update" ? "ri-refresh-line" : "ri-download-2-line"
                    } text-[13px]`}
                  />
                  {pkg.action}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}