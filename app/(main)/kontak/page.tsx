import type { Metadata } from "next";
import { client } from "@/sanity/lib/client";
import { bidangPraktikListQuery } from "@/lib/queries";
import ContactForm from "@/components/ContactForm";
import { Reveal } from "@/components/Reveal";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Kontak",
  description:
    "Hubungi ATA Law Firm untuk konsultasi hukum Anda.",
};

type BidangItem = {
  _id?: string;
  judul: string;
  slug: string;
};

async function getBidangPraktik(): Promise<BidangItem[]> {
  try {
    return (
      (await client.fetch<BidangItem[]>(
        `
      *[_type == "bidangPraktik"] | order(urutan asc){
        _id,
        judul,
        "slug": slug.current
      }
    `,
        {},
        { next: { tags: ["bidangPraktik"] } }
      )) ?? []
    );
  } catch {
    return [];
  }
}

export default async function KontakPage() {
  const bidangPraktikList = await getBidangPraktik();

  return (
    <>
      <section className="bg-navy-950 py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal duration={950} y={16}>
            <p className="font-label text-xs uppercase tracking-widest text-terracotta mb-4">
              Hubungi Kami
            </p>
            <h1 className="font-display text-ivory text-4xl md:text-5xl font-semibold leading-tight mb-4">
              Kami Siap Membantu
            </h1>
            <p className="font-body text-blue-pale text-lg max-w-xl">
              Ceritakan permasalahan hukum Anda. Tim kami akan menghubungi Anda
              dalam 1×24 jam kerja.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="bg-navy-950 pb-20 md:pb-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 pt-0">
            <Reveal as="div" className="lg:col-span-3" y={8} duration={580}>
              <div className="bg-navy-900/50 border border-white/5 rounded-xl p-6 md:p-8">
                <h2 className="font-display text-ivory text-xl font-semibold mb-6">
                  Kirim Pesan
                </h2>
                <ContactForm bidangPraktikList={bidangPraktikList} />
              </div>
            </Reveal>

            <Reveal as="div" className="lg:col-span-2 flex flex-col gap-8" y={8} duration={580} delay={120}>
              <div>
                <p className="font-label text-xs uppercase tracking-widest text-terracotta mb-5">
                  Informasi Kantor
                </p>
                <div className="flex flex-col gap-5">
                  {[
                    {
                      label: "Alamat",
                      value:
                        "Komplek Pasar Sindangkasih, Cigasong, Kabupaten Majalengka, Jawa Barat 45476",
                    },
                    {
                      label: "WhatsApp",
                      value: "+62 812-2384-0395",
                      href: "https://wa.me/6281223840395",
                    },
                    {
                      label: "Email",
                      value: "info@atalawfirm.org",
                      href: "mailto:info@atalawfirm.org",
                    },
                    {
                      label: "Jam Buka",
                      value: "Senin – Jumat\n09.00 – 17.00 WIB",
                    },
                  ].map((item) => (
                    <div key={item.label}>
                      <p className="font-label text-xs text-terracotta uppercase tracking-wide mb-1.5">
                        {item.label}
                      </p>
                      {item.href ? (
                        <a
                          href={item.href}
                          target={
                            item.href.startsWith("http") ? "_blank" : undefined
                          }
                          rel={
                            item.href.startsWith("http")
                              ? "noopener noreferrer"
                              : undefined
                          }
                          className="font-body text-sm text-blue-pale hover:text-ivory transition-colors"
                        >
                          {item.value}
                        </a>
                      ) : (
                        <p className="font-body text-sm text-blue-pale whitespace-pre-line">
                          {item.value}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <a
                href="https://wa.me/6281223840395"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 bg-terracotta text-white font-body font-medium px-6 py-4 rounded-lg hover:bg-terracotta/90 transition-colors"
              >
                <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                Hubungi via WhatsApp
              </a>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
