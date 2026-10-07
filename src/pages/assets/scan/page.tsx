import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PageHeader from "@/components/base/PageHeader";
import InfoBanner from "@/components/feature/InfoBanner";
import { assetList } from "@/mocks/assets";

export default function AssetScanPage() {
  const navigate = useNavigate();
  const [scanning, setScanning] = useState(false);

  const samples = assetList.filter((asset) => asset.type === "Asset").slice(0, 3);

  const handleScan = () => {
    if (scanning) return;
    setScanning(true);
    setTimeout(() => {
      setScanning(false);
      navigate(`/assets/detail/${samples[0].id}`);
    }, 1300);
  };

  return (
    <div className="animate-fade-in pb-8">
      <PageHeader title="Scan Asset QR" onBack={() => navigate("/assets")} />

      <div className="space-y-4 px-4 pt-4">
        <div className="glass-panel rounded-lg p-4">
          <div className="relative mx-auto flex h-56 w-full max-w-[300px] items-center justify-center overflow-hidden rounded-xl border border-background-50/50 bg-foreground-950/85">
            <span className="absolute left-4 top-4 h-8 w-8 rounded-tl-lg border-l-2 border-t-2 border-primary-400" />
            <span className="absolute right-4 top-4 h-8 w-8 rounded-tr-lg border-r-2 border-t-2 border-primary-400" />
            <span className="absolute bottom-4 left-4 h-8 w-8 rounded-bl-lg border-b-2 border-l-2 border-primary-400" />
            <span className="absolute bottom-4 right-4 h-8 w-8 rounded-br-lg border-b-2 border-r-2 border-primary-400" />
            <div className="flex flex-col items-center gap-2 text-background-100/80">
              <i className={`ri-qr-scan-2-line text-[38px] ${scanning ? "animate-pulse-soft" : ""}`} />
              <p className="text-[11px] font-medium">
                {scanning ? "Reading QR code…" : "Align the asset QR within the frame"}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleScan}
            disabled={scanning}
            className="mt-4 w-full cursor-pointer whitespace-nowrap rounded-md bg-primary-600 py-3 font-label text-sm font-semibold text-background-50 transition-colors hover:bg-primary-700 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {scanning ? "Scanning…" : "Scan QR Code"}
          </button>
        </div>

        <InfoBanner tone="neutral" icon="ri-information-line">
          Scanning opens the authorised asset record for the scanned QR code.
        </InfoBanner>

        <div className="glass-panel rounded-lg p-4">
          <p className="mb-2 font-heading text-[13px] font-semibold uppercase tracking-[0.12em] text-foreground-600">
            Manual entry
          </p>
          <div className="space-y-2">
            {samples.map((asset) => (
              <button
                key={asset.id}
                type="button"
                onClick={() => navigate(`/assets/detail/${asset.id}`)}
                className="glass-input flex w-full cursor-pointer items-center justify-between gap-3 rounded-md px-3 py-2.5 text-left transition-colors hover:bg-background-50/70"
              >
                <span className="min-w-0">
                  <span className="block text-[12.5px] font-medium text-foreground-900">
                    {asset.name}
                  </span>
                  <span className="block text-[10.5px] text-foreground-500">{asset.id}</span>
                </span>
                <i className="ri-arrow-right-s-line text-[18px] text-foreground-400" />
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}