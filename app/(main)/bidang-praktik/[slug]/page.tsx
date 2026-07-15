import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PortableText } from "next-sanity";
import { client } from "@/sanity/lib/client";
import { bidangPraktikDetailQuery } from "@/lib/queries";
import { getAreaIcon } from "@/lib/areaIcons";
import { ProseContent } from "@/components/ProseContent";
import { Reveal } from "@/components/Reveal";

export const revalidate = 3600;

type BidangPraktikDetail = {
  judul: string;
  slug: string;
  deskripsiSingkat: string;
  deskripsiLengkap?: unknown[];
};

async function getData(slug: string): Promise<BidangPraktikDetail | null> {
  try {
    return await client.fetch<BidangPraktikDetail>(
      bidangPraktikDetailQuery,
      { slug },
      { next: { tags: ["bidangPraktik"] } }
    );
  } catch {
    return null;
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const data = await getData(slug);
  if (!data) return { title: "Bidang Praktik" };
  return {
    title: data.judul,
    description: data.deskripsiSingkat,
  };
}

export default async function BidangPraktikDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const data = await getData(slug);

  if (!data) notFound();

  const Icon = getAreaIcon(data.slug);

  return (
    <>
      <section className="bg-navy-950 py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal duration={950} y={16}>
            <Link
              href="/bidang-praktik"
              className="font-label text-xs text-blue-pale hover:text-ivory transition-colors mb-8 inline-flex items-center gap-1"
            >
              ← Semua Bidang Praktik
            </Link>
            <div className="flex items-start gap-5 mt-6">
              <div className="w-12 h-12 text-terracotta shrink-0 mt-1">
                <Icon className="w-full h-full" />
              </div>
              <div>
                <h1 className="font-display text-ivory text-4xl md:text-5xl font-semibold leading-tight">
                  {data.judul}
                </h1>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-ivory py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal as="div">
            <p className="font-body text-navy-900/70 text-lg leading-relaxed mb-10 border-l-4 border-terracotta pl-6">
              {data.deskripsiSingkat}
            </p>

            {data.deskripsiLengkap && data.deskripsiLengkap.length > 0 ? (
              <ProseContent
                value={data.deskripsiLengkap as Parameters<typeof PortableText>[0]["value"]}
              />
            ) : (
              <p className="font-body text-navy-900/40 italic">
                Deskripsi lengkap belum tersedia.
              </p>
            )}
          </Reveal>

          <Reveal as="div" className="mt-14 pt-8 border-t border-navy-950/10" y={8} duration={580}>
            <p className="font-body text-navy-950 font-medium mb-4">
              Butuh bantuan di bidang {data.judul.toLowerCase()}?
            </p>
            <a
              href="https://wa.me/6281223840395"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-terracotta text-white font-body font-medium px-6 py-3 rounded hover:bg-terracotta/90 transition-colors"
            >
              Konsultasi via WhatsApp
            </a>
          </Reveal>
        </div>
      </section>
    </>
  );
}
