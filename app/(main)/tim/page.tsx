import type { Metadata } from "next";
import Image from "next/image";
import { client } from "@/sanity/lib/client";
import { timListQuery } from "@/lib/queries";
import { urlForImage } from "@/sanity/lib/image";
import { Reveal } from "@/components/Reveal";
import { staggerDelay } from "@/lib/stagger";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Tim",
  description:
    "Kenali para advokat dan profesional di ATA Law Firm.",
};

type AnggotaTim = {
  nama: string;
  slug: string;
  jabatan: string;
  foto: { asset: { _ref: string } } | null;
  pendidikan?: string[];
  nomorIzinAdvokat?: string;
  bio?: string;
};

async function getData(): Promise<AnggotaTim[]> {
  try {
    return (
      (await client.fetch<AnggotaTim[]>(
        timListQuery,
        {},
        { next: { tags: ["anggotaTim"] } }
      )) ?? []
    );
  } catch {
    return [];
  }
}

export default async function TimPage() {
  const tim = await getData();

  return (
    <>
      <section className="bg-ivory py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal duration={650} y={16}>
            <p className="font-label text-xs uppercase tracking-widest text-terracotta mb-4">
              Tim Kami
            </p>
            <h1 className="font-display text-navy-950 text-4xl md:text-5xl font-semibold leading-tight mb-4">
              Advokat &amp; Profesional
            </h1>
            <p className="font-body text-navy-900/60 text-lg max-w-xl">
              Tim kami terdiri dari advokat berpengalaman yang berdedikasi untuk
              memberikan layanan hukum terbaik bagi setiap klien.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="bg-ivory border-t border-navy-950/5 pb-20 md:pb-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {tim.length === 0 ? (
            <p className="font-body text-navy-900/40 text-center py-12">
              Data tim belum tersedia. Silakan tambahkan melalui Sanity Studio.
            </p>
          ) : (
            <div className="flex flex-col divide-y divide-navy-950/5">
              {tim.map((anggota, i) => (
                <Reveal
                  key={anggota.slug}
                  as="div"
                  className={`flex flex-col md:flex-row gap-8 py-12 ${
                    i % 2 === 1 ? "md:flex-row-reverse" : ""
                  }`}
                  delay={staggerDelay(i, 60, 300)}
                >
                  <div className="md:w-56 lg:w-64 shrink-0">
                    <div className="aspect-square rounded-xl overflow-hidden bg-navy-900/10">
                      {anggota.foto ? (
                        <Image
                          src={urlForImage(anggota.foto)
                            .width(400)
                            .height(400)
                            .url()}
                          alt={anggota.nama}
                          width={400}
                          height={400}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-[#E3DFD3]" />
                      )}
                    </div>
                  </div>

                  <div className="flex flex-col gap-4 flex-1">
                    <div>
                      <h2 className="font-display text-navy-950 text-2xl font-semibold">
                        {anggota.nama}
                      </h2>
                      <p className="font-label text-sm text-terracotta mt-1">
                        {anggota.jabatan}
                      </p>
                    </div>

                    {anggota.bio && (
                      <p className="font-body text-navy-900/70 leading-relaxed">
                        {anggota.bio}
                      </p>
                    )}

                    <div className="flex flex-col gap-4 mt-2">
                      {anggota.pendidikan && anggota.pendidikan.length > 0 && (
                        <div>
                          <p className="font-label text-xs uppercase tracking-wide text-navy-900/40 mb-2">
                            Pendidikan
                          </p>
                          <ul className="flex flex-col gap-1">
                            {anggota.pendidikan.map((p) => (
                              <li
                                key={p}
                                className="font-body text-sm text-navy-900/70"
                              >
                                {p}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {anggota.nomorIzinAdvokat && (
                        <div>
                          <p className="font-label text-xs uppercase tracking-wide text-navy-900/40 mb-1">
                            No. Izin Advokat
                          </p>
                          <p className="font-label text-sm text-navy-950">
                            {anggota.nomorIzinAdvokat}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
