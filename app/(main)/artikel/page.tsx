import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { client } from "@/sanity/lib/client";
import {
  artikelListQuery,
  artikelByKategoriQuery,
  bidangPraktikListQuery,
} from "@/lib/queries";
import { urlForImage } from "@/sanity/lib/image";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Artikel",
  description:
    "Wawasan dan informasi hukum terkini dari Kantor Hukum ATA & Rekan.",
};

type Artikel = {
  judul: string;
  slug: string;
  kategori: { judul: string; slug: string } | null;
  gambarSampul: { asset: { _ref: string }; alt?: string } | null;
  ringkasan: string;
  penulis: { nama: string; slug: string } | null;
  tanggalPublikasi: string;
  unggulan: boolean;
};

type Kategori = {
  judul: string;
  slug: string;
};

function formatTanggal(iso: string) {
  return new Date(iso).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default async function ArtikelPage({
  searchParams,
}: {
  searchParams: Promise<{ kategori?: string }>;
}) {
  const { kategori: kategoriFilter } = await searchParams;

  let artikel: Artikel[] = [];
  let kategoriList: Kategori[] = [];

  try {
    [artikel, kategoriList] = await Promise.all([
      kategoriFilter
        ? client.fetch<Artikel[]>(artikelByKategoriQuery, {
            kategoriSlug: kategoriFilter,
          })
        : client.fetch<Artikel[]>(artikelListQuery),
      client.fetch<Kategori[]>(bidangPraktikListQuery),
    ]);
    artikel = artikel ?? [];
    kategoriList = kategoriList ?? [];
  } catch {
    artikel = [];
    kategoriList = [];
  }

  return (
    <>
      <section className="bg-ivory py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="font-label text-xs uppercase tracking-widest text-terracotta mb-4">
            Wawasan Hukum
          </p>
          <h1 className="font-display text-navy-950 text-4xl md:text-5xl font-semibold leading-tight">
            Artikel &amp; Insight
          </h1>
        </div>
      </section>

      <section className="bg-ivory border-t border-navy-950/5 pb-20 md:pb-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {kategoriList.length > 0 && (
            <div className="flex flex-wrap gap-2 pt-8 pb-10">
              <Link
                href="/artikel"
                className={`font-label text-xs px-3 py-1.5 rounded-full border transition-colors ${
                  !kategoriFilter
                    ? "bg-navy-950 text-ivory border-navy-950"
                    : "border-navy-950/20 text-navy-900/60 hover:border-navy-950/40"
                }`}
              >
                Semua
              </Link>
              {kategoriList.map((k) => (
                <Link
                  key={k.slug}
                  href={`/artikel?kategori=${k.slug}`}
                  className={`font-label text-xs px-3 py-1.5 rounded-full border transition-colors ${
                    kategoriFilter === k.slug
                      ? "bg-navy-950 text-ivory border-navy-950"
                      : "border-navy-950/20 text-navy-900/60 hover:border-navy-950/40"
                  }`}
                >
                  {k.judul}
                </Link>
              ))}
            </div>
          )}

          {artikel.length === 0 ? (
            <p className="font-body text-navy-900/40 text-center py-12">
              Belum ada artikel yang diterbitkan.
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {artikel.map((a) => (
                <Link
                  key={a.slug}
                  href={`/artikel/${a.slug}`}
                  className="group flex flex-col gap-4"
                >
                  <div className="aspect-video rounded-lg overflow-hidden bg-navy-900/10">
                    {a.gambarSampul ? (
                      <Image
                        src={urlForImage(a.gambarSampul)
                          .width(600)
                          .height(340)
                          .url()}
                        alt={a.gambarSampul.alt || a.judul}
                        width={600}
                        height={340}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full bg-navy-900/15" />
                    )}
                  </div>

                  {a.kategori && (
                    <p className="font-label text-xs text-terracotta uppercase tracking-wide">
                      {a.kategori.judul}
                    </p>
                  )}

                  <h2 className="font-display text-navy-950 font-medium leading-snug group-hover:text-terracotta transition-colors line-clamp-2">
                    {a.judul}
                  </h2>

                  <p className="font-body text-sm text-navy-900/60 leading-relaxed line-clamp-3">
                    {a.ringkasan}
                  </p>

                  <div className="flex items-center justify-between mt-auto">
                    {a.penulis && (
                      <p className="font-label text-xs text-navy-900/40">
                        {a.penulis.nama}
                      </p>
                    )}
                    <p className="font-label text-xs text-navy-900/40">
                      {formatTanggal(a.tanggalPublikasi)}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
