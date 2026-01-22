import { MapPin, ExternalLink } from "lucide-react";
import { OFFICE } from "@/lib/office";

type Props = {
  title?: string;
  className?: string;
};

export function OfficeLocationSection({
  title = "Office Location",
  className,
}: Props) {
  const mapsHref = OFFICE.googleMapsShareUrl || OFFICE.googleMapsQueryUrl;

  return (
    <section className={className}>
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <div className="flex items-end justify-between gap-4 mb-8">
          <div>
            <p className="text-primary font-medium tracking-wide mb-2">Find Us</p>
            <h2 className="font-display text-3xl md:text-4xl font-semibold">{title}</h2>
          </div>
          <a
            href={mapsHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-primary font-medium hover:gap-3 transition-all"
            data-testid="link-office-maps"
          >
            View on Google Maps
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          <div className="rounded-2xl overflow-hidden border bg-card">
            <iframe
              title="Office map"
              src={OFFICE.googleMapsEmbedUrl}
              className="w-full h-[320px] md:h-[360px]"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>

          <div className="rounded-2xl border bg-card p-6 md:p-8">
            <div className="flex items-start gap-3 mb-4">
              <MapPin className="w-5 h-5 text-primary mt-0.5" />
              <div>
                <div className="font-display text-xl font-semibold">{OFFICE.name}</div>
                <div className="text-sm text-muted-foreground">
                  {OFFICE.addressLines.map((line) => (
                    <div key={line}>{line}</div>
                  ))}
                </div>
              </div>
            </div>

            {OFFICE.hours.length > 0 ? (
              <div className="mt-6">
                <div className="font-medium mb-2">Hours</div>
                <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-sm text-muted-foreground">
                  {OFFICE.hours.map((h) => (
                    <div key={h.day} className="contents">
                      <div className="font-medium text-foreground/80">{h.day}</div>
                      <div>{h.hours}</div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <p className="mt-6 text-sm text-muted-foreground">
                For current open hours, see the Google listing.
              </p>
            )}

            <div className="mt-6">
              <a
                href={mapsHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center w-full rounded-lg bg-primary px-4 py-2 font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
                data-testid="button-office-directions"
              >
                Get directions
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
