import { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import PageHeader from "@/components/base/PageHeader";
import StatusChip from "@/components/base/StatusChip";
import EmptyState from "@/components/feature/EmptyState";
import { assetList, assetTypeFilters } from "@/mocks/assets";

export default function AssetsPage() {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [type, setType] = useState("all");

  const records = useMemo(() => {
    const q = query.trim().toLowerCase();
    return assetList.filter((asset) => {
      const matchesType = type === "all" ? true : asset.type === type;
      const matchesQuery =
        !q ||
        asset.name.toLowerCase().includes(q) ||
        asset.id.toLowerCase().includes(q) ||
        asset.category.toLowerCase().includes(q);
      return matchesType && matchesQuery;
    });
  }, [query, type]);

  return (
    <div className="animate-fade-in pb-8">
      <PageHeader
        title="Assets"
        onBack={() => navigate("/home")}
        actions={
          <Link
            to="/assets/scan"
            aria-label="Scan asset QR"
            className="glass-input flex h-9 w-9 cursor-pointer items-center justify-center rounded-md text-foreground-700 transition-colors hover:bg-background-50/70"
          >
            <i className="ri-qr-scan-2-line text-[18px]" />
          </Link>
        }
      />

      <div className="space-y-4 px-4 pt-4">
        <div className="relative">
          <span className="pointer-events-none absolute left-3 top-1/2 flex h-5 w-5 -translate-y-1/2 items-center justify-center text-foreground-400">
            <i className="ri-search-line text-[17px]" />
          </span>
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search by name or asset ID"
            className="glass-input w-full rounded-md py-2.5 pl-10 pr-3 text-sm text-foreground-900 outline-none transition-colors placeholder:text-foreground-400 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/25"
          />
        </div>

        <div className="no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4">
          {assetTypeFilters.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setType(item.id)}
              className={`whitespace-nowrap rounded-full border px-3.5 py-1.5 text-xs font-medium backdrop-blur-md transition-colors ${
                type === item.id
                  ? "border-primary-600/50 bg-primary-600 text-background-50"
                  : "border-background-50/60 bg-background-50/45 text-foreground-600 hover:bg-background-50/75"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        {records.length === 0 ? (
          <EmptyState
            icon="ri-building-2-line"
            title="No assets found"
            description="No assets match your search or filter in your authorised jurisdiction."
          />
        ) : (
          <div className="space-y-2.5">
            {records.map((asset) => (
              <Link
                key={asset.id}
                to={`/assets/detail/${asset.id}`}
                className="glass-panel block cursor-pointer rounded-lg p-3.5 transition-colors hover:bg-background-50/75"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="text-[10.5px] font-medium uppercase tracking-wide text-foreground-400">
                      {asset.id}
                    </p>
                    <p className="mt-0.5 text-sm font-semibold text-foreground-950">{asset.name}</p>
                    <p className="mt-0.5 text-[11px] text-foreground-600">{asset.location}</p>
                  </div>
                  <StatusChip label={asset.condition} />
                </div>
                <div className="mt-2.5 flex items-center gap-1.5 text-[11px] text-foreground-500">
                  <i className="ri-user-star-line text-[13px]" />
                  {asset.category} · Beat {asset.beat}
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}