export interface MediaItem {
  id: string;
  type: "photo" | "video" | "document";
  url?: string;
  label: string;
  state?: "Saved on device" | "Uploading" | "Uploaded";
}

interface MediaCaptureProps {
  items: MediaItem[];
  onAdd: (type: MediaItem["type"]) => void;
  onRemove: (id: string) => void;
  /**
   * Which capture actions to expose. Defaults to photo only — the standard
   * field action. Video is only shown where explicitly configured.
   */
  types?: MediaItem["type"][];
}

const typeLabel: Record<MediaItem["type"], string> = {
  photo: "Take Photo",
  video: "Take Video",
  document: "Attach Document",
};

const typeIcon: Record<MediaItem["type"], string> = {
  photo: "ri-camera-line",
  video: "ri-vidicon-line",
  document: "ri-attachment-2",
};

export default function MediaCapture({
  items,
  onAdd,
  onRemove,
  types = ["photo"],
}: MediaCaptureProps) {
  return (
    <div>
      <div className="grid grid-cols-3 gap-2">
        {types.map((type) => (
          <button
            key={type}
            type="button"
            onClick={() => onAdd(type)}
            className="glass-input flex cursor-pointer flex-col items-center gap-1.5 rounded-lg py-3 text-center transition-colors hover:bg-background-50/70"
          >
            <i className={`${typeIcon[type]} text-[20px] text-primary-800`} />
            <span className="text-[10.5px] font-medium text-foreground-700">{typeLabel[type]}</span>
          </button>
        ))}
      </div>

      {items.length > 0 ? (
        <div className="mt-3 grid grid-cols-3 gap-2">
          {items.map((item) => (
            <div key={item.id} className="overflow-hidden rounded-lg border border-background-50/60 bg-background-50/40">
              <div className="relative h-20 w-full bg-foreground-500/10">
                {item.type === "document" ? (
                  <div className="flex h-full w-full items-center justify-center text-foreground-500">
                    <i className="ri-file-text-line text-[26px]" />
                  </div>
                ) : (
                  <img
                    src={item.url}
                    alt={item.label}
                    title={item.label}
                    className="h-full w-full object-cover object-top"
                  />
                )}
                {item.type === "video" ? (
                  <span className="absolute inset-0 flex items-center justify-center">
                    <span className="flex h-7 w-7 items-center justify-center rounded-full bg-foreground-950/55 text-[14px] text-background-50">
                      <i className="ri-play-fill" />
                    </span>
                  </span>
                ) : null}
                <button
                  type="button"
                  onClick={() => onRemove(item.id)}
                  aria-label={`Remove ${item.label}`}
                  className="absolute right-1 top-1 flex h-6 w-6 cursor-pointer items-center justify-center rounded-full bg-foreground-950/60 text-[13px] text-background-50"
                >
                  <i className="ri-close-line" />
                </button>
              </div>
              <div className="px-1.5 py-1">
                <p className="truncate text-[10px] font-medium text-foreground-700">{item.label}</p>
                {item.state ? (
                  <p
                    className={`truncate text-[9.5px] ${
                      item.state === "Uploaded"
                        ? "text-primary-700"
                        : item.state === "Uploading"
                          ? "text-accent-800"
                          : "text-foreground-500"
                    }`}
                  >
                    {item.state}
                  </p>
                ) : null}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="mt-2 text-[11px] text-foreground-500">No media added yet.</p>
      )}
    </div>
  );
}