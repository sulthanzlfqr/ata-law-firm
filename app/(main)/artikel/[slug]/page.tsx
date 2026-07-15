import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PortableText } from "next-sanity";
import { client } from "@/sanity/lib/client";
import { artikelDetailQuery } from "@/lib/queries";
import { urlForImage } from "@/sanity/lib/image";
import { Reveal } from "@/components/Reveal";

export const revalidate = 3600;

type ArtikelDetail = {
  judul: string;
  kategori: { judul: string; slug: string } | null;
  gambarSampul: { asset: { _ref: string }; alt?: string } | null;
  ringkasan: string;
  isi: unknown[];
  penulis: {
    nama: string;
    jabatan: string;
    foto: { asset: { _ref: string } } | null;
    slug: string;
  } | null;
  tanggalPublikasi: string;
  seo?: { title?: string; description?: string };
};

async function getData(slug: string): Promise<ArtikelDetail | null> {
  try {
    return await client.fetch<ArtikelDetail>(
      artikelDetailQuery,
      { slug },
      { next: { tags: ["artikel"] } }
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
  if (!data) return { title: "Artikel" };
  return {
    title: data.seo?.title || data.judul,
    description: data.seo?.description || data.ringkasan,
  };
}

function formatTanggal(iso: string) {
  return new Date(iso).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

const portableTextComponents = {
  block: {
    h2: ({ children }: { children?: React.ReactNode }) => (
      <h2 className="font-display text-navy-950 text-2xl font-semibold mt-10 mb-4">
        {children}
      </h2>
    ),
    h3: ({ children }: { children?: React.ReactNode }) => (
      <h3 className="font-display text-navy-950 text-xl font-semibold mt-8 mb-3">
        {children}
      </h3>
    ),
    blockquote: ({ children }: { children?: React.ReactNode }) => (
      <blockquote className="border-l-4 border-terracotta pl-6 my-6 text-navy-900/70 italic font-body">
        {children}
      </blockquote>
    ),
    normal: ({ children }: { children?: React.ReactNode }) => (
      <p className="font-body text-navy-900/70 leading-relaxed mb-4">{children}</p>
    ),
  },
  list: {
    bullet: ({ children }: { children?: React.ReactNode }) => (
      <ul className="list-disc list-outside pl-6 mb-4 flex flex-col gap-1.5 font-body text-navy-900/70">
        {children}
      </ul>
    ),
    number: ({ children }: { children?: React.ReactNode }) => (
      <ol className="list-decimal list-outside pl-6 mb-4 flex flex-col gap-1.5 font-body text-navy-900/70">
        {children}
      </ol>
    ),
  },
  marks: {
    strong: ({ children }: { children?: React.ReactNode }) => (
      <strong className="font-semibold text-navy-950">{children}</strong>
    ),
    em: ({ children }: { children?: React.ReactNode }) => (
      <em className="italic">{children}</em>
    ),
    tautan: ({
      children,
      value,
    }: {
      children?: React.ReactNode;
      value?: { href: string };
    }) => (
      <a
        href={value?.href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-terracotta underline underline-offset-2 hover:text-terracotta/80 transition-colors"
      >
        {children}
      </a>
    ),
  },
  types: {
    image: ({
      value,
    }: {
      value: { asset: { _ref: string }; alt?: string };
    }) => (
      <figure className="my-8">
        <div className="rounded-lg overflow-hidden aspect-video relative">
          <Image
            src={urlForImage(value).width(800).height(450).url()}
            alt={value.alt || ""}
            fill
            className="object-cover"
          />
        </div>
        {value.alt && (
          <figcaption className="font-label text-xs text-navy-900/40 text-center mt-2">
            {value.alt}
          </figcaption>
        )}
      </figure>
    ),
  },
};

export default async function ArtikelDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const data = await getData(slug);

  if (!data) notFound();

  return (
    <>
      <section className="bg-ivory pt-12 pb-0">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal as="div" duration={950} y={16}>
            <Link
              href="/artikel"
              className="font-label text-xs text-navy-900/40 hover:text-navy-950 transition-colors inline-flex items-center gap-1 mb-8"
            >
              ← Kembali ke Artikel
            </Link>

            {data.kategori && (
              <Link
                href={`/artikel?kategori=${data.kategori.slug}`}
                className="font-label text-xs text-terracotta uppercase tracking-wide mb-4 block"
              >
                {data.kategori.judul}
              </Link>
            )}

            <h1 className="font-display text-navy-950 text-3xl md:text-4xl font-semibold leading-tight mb-6">
              {data.judul}
            </h1>

            <p className="font-body text-navy-900/60 text-lg leading-relaxed mb-8">
              {data.ringkasan}
            </p>

            <div className="flex items-center gap-4 pb-8 border-b border-navy-950/10">
              {data.penulis && (
                <div className="flex items-center gap-3">
                  {data.penulis.foto && (
                    <div className="w-10 h-10 rounded-full overflow-hidden bg-navy-900/10 shrink-0">
                      <Image
                        src={urlForImage(data.penulis.foto)
                          .width(80)
                          .height(80)
                          .url()}
                        alt={data.penulis.nama}
                        width={80}
                        height={80}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  <div>
                    <p className="font-body text-sm text-navy-950 font-medium">
                      {data.penulis.nama}
                    </p>
                    <p className="font-label text-xs text-navy-900/40">
                      {data.penulis.jabatan}
                    </p>
                  </div>
                </div>
              )}
              <p className="font-label text-xs text-navy-900/40 ml-auto">
                {formatTanggal(data.tanggalPublikasi)}
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {data.gambarSampul && (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
          <div className="aspect-video rounded-xl overflow-hidden relative">
            <Image
              src={urlForImage(data.gambarSampul).width(900).height(507).url()}
              alt={data.gambarSampul.alt || data.judul}
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
      )}

      <section className="bg-ivory py-10 pb-20 md:pb-28">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal as="div">
            <PortableText
              value={data.isi as Parameters<typeof PortableText>[0]["value"]}
              components={portableTextComponents}
            />
          </Reveal>

          <Reveal
            as="div"
            className="mt-14 pt-8 border-t border-navy-950/10 bg-navy-950 rounded-xl p-8"
            y={8}
            duration={580}
          >
            <p className="font-label text-xs uppercase tracking-widest text-terracotta mb-3">
              Butuh Konsultasi?
            </p>
            <p className="font-display text-ivory text-xl font-semibold mb-4">
              Kami Siap Membantu Anda
            </p>
            <a
              href="https://wa.me/6281223840395"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-terracotta text-white font-body font-medium px-5 py-2.5 rounded hover:bg-terracotta/90 transition-colors"
            >
              Hubungi via WhatsApp
            </a>
          </Reveal>
        </div>
      </section>
    </>
  );
}
