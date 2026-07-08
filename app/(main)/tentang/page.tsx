import type { Metadata } from "next";
import { ProseContent } from "@/components/ProseContent";
import { client } from "@/sanity/lib/client";
import { halamanTentangQuery } from "@/lib/queries";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Tentang Kami",
  description:
    "Pelajari lebih lanjut tentang Kantor Hukum ATA & Rekan, visi misi, dan tim kami.",
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
    return await client.fetch<HalamanTentang>(halamanTentangQuery);
  } catch {
    return null;
  }
}

export default async function TentangPage() {
  const data = await getData();

  return (
    <>
      <section className="bg-navy-950 py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="font-label text-xs uppercase tracking-widest text-terracotta mb-4">
            {data?.labelEyebrow ?? "Tentang Kami"}
          </p>
          <h1 className="font-display text-ivory text-4xl md:text-5xl font-semibold leading-tight max-w-2xl">
            {data?.judul ?? "Kantor Hukum ATA & Rekan"}
          </h1>
        </div>
      </section>

      <section className="bg-ivory py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {data?.statistik && data.statistik.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
              {data.statistik.map((s) => (
                <div key={s.label} className="bg-navy-950 rounded-lg p-6">
                  <p className="font-label text-3xl font-medium text-terracotta mb-1">
                    {s.nilai}
                  </p>
                  <p className="font-body text-sm text-blue-pale">{s.label}</p>
                </div>
              ))}
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <h2 className="font-display text-navy-950 text-2xl font-semibold mb-6">
                Sejarah &amp; Cerita Kami
              </h2>
              {data?.narasi ? (
                <ProseContent value={data.narasi as Parameters<typeof ProseContent>[0]["value"]} />
              ) : (
                <p className="font-body text-navy-900/40">
                  Konten belum tersedia.
                </p>
              )}
            </div>

            <div className="flex flex-col gap-8">
              {data?.poinKredibilitas && data.poinKredibilitas.length > 0 && (
                <div>
                  <h3 className="font-display text-navy-950 text-lg font-semibold mb-4">
                    Mengapa Memilih Kami
                  </h3>
                  <ul className="flex flex-col gap-3">
                    {data.poinKredibilitas.map((poin) => (
                      <li key={poin} className="flex items-start gap-3">
                        <svg
                          viewBox="0 0 20 20"
                          fill="none"
                          className="w-5 h-5 text-terracotta shrink-0 mt-0.5"
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
                        <span className="font-body text-sm text-navy-900/70">
                          {poin}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {data?.visi && (
                <div>
                  <h3 className="font-display text-navy-950 text-lg font-semibold mb-3">
                    Visi
                  </h3>
                  <p className="font-body text-sm text-navy-900/70 leading-relaxed italic border-l-2 border-terracotta pl-4">
                    {data.visi}
                  </p>
                </div>
              )}

              {data?.misi && data.misi.length > 0 && (
                <div>
                  <h3 className="font-display text-navy-950 text-lg font-semibold mb-3">
                    Misi
                  </h3>
                  <ul className="flex flex-col gap-2">
                    {data.misi.map((m, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <span className="font-label text-xs text-terracotta w-5 shrink-0 pt-0.5">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span className="font-body text-sm text-navy-900/70">
                          {m}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
