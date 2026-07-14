import type { Metadata } from "next";
import Link from "next/link";
import { client } from "@/sanity/lib/client";
import { bidangPraktikListQuery } from "@/lib/queries";
import { getAreaIcon } from "@/lib/areaIcons";
import { Reveal } from "@/components/Reveal";
import { staggerDelay } from "@/lib/stagger";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Bidang Praktik",
  description:
    "Lihat semua bidang praktik yang ditangani ATA Law Firm.",
};

type BidangPraktik = {
  judul: string;
  slug: string;
  deskripsiSingkat: string;
};

async function getData(): Promise<BidangPraktik[]> {
  try {
    return (
      (await client.fetch<BidangPraktik[]>(
        bidangPraktikListQuery,
        {},
        { next: { tags: ["bidangPraktik"] } }
      )) ?? []
    );
  } catch {
    return [];
  }
}

export default async function BidangPraktikPage() {
  const list = await getData();

  return (
    <>
      <section className="bg-navy-950 py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal duration={650} y={16}>
            <p className="font-label text-xs uppercase tracking-widest text-terracotta mb-4">
              Layanan Kami
            </p>
            <h1 className="font-display text-ivory text-4xl md:text-5xl font-semibold leading-tight mb-4">
              Bidang Praktik
            </h1>
            <p className="font-body text-blue-pale text-lg max-w-xl">
              Kami menangani berbagai bidang hukum untuk memastikan setiap klien
              mendapatkan penanganan yang tepat dan kompeten.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="bg-ivory py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {list.length === 0 ? (
            <p className="font-body text-navy-900/40 text-center py-12">
              Konten bidang praktik belum tersedia. Silakan tambahkan melalui
              Sanity Studio.
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {list.map((b, i) => {
                const Icon = getAreaIcon(b.slug);
                return (
                  <Reveal key={b.slug} delay={staggerDelay(i)}>
                    <Link
                      href={`/bidang-praktik/${b.slug}`}
                      className="group bg-white border border-navy-950/10 hover:border-terracotta/30 rounded-xl p-6 flex flex-col gap-5 transition-all hover:shadow-lg hover:shadow-navy-950/5 h-full"
                    >
                      <div className="w-10 h-10 text-terracotta">
                        <Icon className="w-full h-full" />
                      </div>
                      <div className="flex flex-col gap-2">
                        <h2 className="font-display text-navy-950 font-medium group-hover:text-terracotta transition-colors">
                          {b.judul}
                        </h2>
                        <p className="font-body text-sm text-navy-900/60 leading-relaxed">
                          {b.deskripsiSingkat}
                        </p>
                      </div>
                      <span className="font-label text-xs text-terracotta mt-auto">
                        Selengkapnya →
                      </span>
                    </Link>
                  </Reveal>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
