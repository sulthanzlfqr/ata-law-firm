import type { Metadata } from "next";
import { ProseContent } from "@/components/ProseContent";
import { client } from "@/sanity/lib/client";
import { halamanTentangQuery } from "@/lib/queries";
import { Reveal } from "@/components/Reveal";
import { staggerDelay } from "@/lib/stagger";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Tentang Kami",
  description:
    "Pelajari lebih lanjut tentang ATA Law Firm, visi misi, dan tim kami.",
};

type HalamanTentang = {
  labelEyebrow?: string;
  judul: string;
  narasi: unknown[];
  visi?: string;
  misi?: string[];
  poinKredibilitas?: string[];
  statistik?: { nilai: string; label: string }[];
};

async function getData(): Promise<HalamanTentang | null> {
  try {
    return await client.fetch<HalamanTentang>(
      halamanTentangQuery,
      {},
      { next: { tags: ["halamanTentang"] } }
    );
  } catch {
    return null;
  }
}

export default async function TentangPage() {
  const data = await getData();

  return (
    <>
      <section className="bg-maroon-950 py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal duration={950} y={16}>
            <p className="font-label text-xs uppercase tracking-widest text-gold mb-4">
              {data?.labelEyebrow ?? "Tentang Kami"}
            </p>
            <h1 className="font-display text-ivory text-4xl md:text-5xl font-semibold leading-tight max-w-2xl">
              {data?.judul ?? "ATA Law Firm"}
            </h1>
          </Reveal>
        </div>
      </section>

      <section className="bg-ivory py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {data?.statistik && data.statistik.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
              {data.statistik.map((s, i) => (
                <Reveal
                  key={s.label}
                  as="div"
                  className="bg-maroon-950 rounded-lg p-6"
                  delay={staggerDelay(i)}
                >
                  <p className="font-label text-3xl font-medium text-gold mb-1">
                    {s.nilai}
                  </p>
                  <p className="font-body text-sm text-sand">{s.label}</p>
                </Reveal>
              ))}
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <Reveal as="div" className="lg:col-span-2" threshold={0}>
              <h2 className="font-display text-maroon-950 text-2xl font-semibold mb-6">
                Sejarah &amp; Cerita Kami
              </h2>
              {data?.narasi ? (
                <ProseContent value={data.narasi as Parameters<typeof ProseContent>[0]["value"]} />
              ) : (
                <p className="font-body text-maroon-900/40">
                  Konten belum tersedia.
                </p>
              )}
            </Reveal>

            <div className="flex flex-col gap-8">
              {data?.poinKredibilitas && data.poinKredibilitas.length > 0 && (
                <Reveal as="div" delay={120}>
                  <h3 className="font-display text-maroon-950 text-lg font-semibold mb-4">
                    Mengapa Memilih Kami
                  </h3>
                  <ul className="flex flex-col gap-3">
                    {data.poinKredibilitas.map((poin) => (
                      <li key={poin} className="flex items-start gap-3">
                        <svg
                          viewBox="0 0 20 20"
                          fill="none"
                          className="w-5 h-5 text-gold shrink-0 mt-0.5"
                        >
                          <circle
                            cx="10"
                            cy="10"
                            r="8"
                            stroke="currentColor"
                            strokeWidth="1.4"
                          />
                          <path
                            d="M7 10l2 2 4-4"
                            stroke="currentColor"
                            strokeWidth="1.4"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        <span className="font-body text-sm text-maroon-900/70">
                          {poin}
                        </span>
                      </li>
                    ))}
                  </ul>
                </Reveal>
              )}

              {data?.visi && (
                <Reveal as="div" delay={210}>
                  <h3 className="font-display text-maroon-950 text-lg font-semibold mb-3">
                    Visi
                  </h3>
                  <p className="font-body text-sm text-maroon-900/70 leading-relaxed italic border-l-2 border-gold pl-4">
                    {data.visi}
                  </p>
                </Reveal>
              )}

              {data?.misi && data.misi.length > 0 && (
                <Reveal as="div" delay={300}>
                  <h3 className="font-display text-maroon-950 text-lg font-semibold mb-3">
                    Misi
                  </h3>
                  <ul className="flex flex-col gap-2">
                    {data.misi.map((m, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <span className="font-label text-xs text-gold w-5 shrink-0 pt-0.5">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span className="font-body text-sm text-maroon-900/70">
                          {m}
                        </span>
                      </li>
                    ))}
                  </ul>
                </Reveal>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
