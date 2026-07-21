import Link from "next/link";
import Image from "next/image";
import { client } from "@/sanity/lib/client";
import { urlForImage } from "@/sanity/lib/image";
import {
  bidangPraktikListQuery,
  artikelUnggulanQuery,
  timListQuery,
} from "@/lib/queries";
import { getAreaIcon } from "@/lib/areaIcons";
import { HeroIllustration } from "@/components/HeroIllustration";
import { Reveal } from "@/components/Reveal";
import { staggerDelay } from "@/lib/stagger";

export const revalidate = 3600;

type BidangPraktik = {
  judul: string;
  slug: string;
  deskripsiSingkat: string;
};

type ArtikelUnggulan = {
  judul: string;
  slug: string;
  kategori: { judul: string; slug: string } | null;
  gambarSampul: { asset: { _ref: string }; alt?: string } | null;
  ringkasan: string;
  tanggalPublikasi: string;
};

type AnggotaTim = {
  nama: string;
  slug: string;
  jabatan: string;
  foto: { asset: { _ref: string } } | null;
};

async function getData() {
  try {
    const [bidangPraktik, artikelUnggulan, tim] = await Promise.all([
      client.fetch<BidangPraktik[]>(bidangPraktikListQuery, {}, { next: { tags: ["bidangPraktik"] } }),
      client.fetch<ArtikelUnggulan[]>(artikelUnggulanQuery, {}, { next: { tags: ["artikel"] } }),
      client.fetch<AnggotaTim[]>(timListQuery, {}, { next: { tags: ["anggotaTim"] } }),
    ]);
    return { bidangPraktik: bidangPraktik ?? [], artikelUnggulan: artikelUnggulan ?? [], tim: tim ?? [] };
  } catch {
    return { bidangPraktik: [], artikelUnggulan: [], tim: [] };
  }
}

export default async function BerandaPage() {
  const { bidangPraktik, artikelUnggulan, tim } = await getData();

  return (
    <>
      <section className="bg-maroon-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <Reveal duration={1250} y={20}>
              <p className="font-label text-xs uppercase tracking-widest text-gold mb-6">
                ATA Law Firm · Majalengka, Jawa Barat
              </p>
              <h1 className="font-display text-ivory text-4xl md:text-5xl lg:text-6xl font-semibold leading-tight mb-6">
                Solusi Hukum yang Andal dan Profesional
              </h1>
              <p className="font-body text-sand text-lg leading-relaxed mb-10">
                Kami hadir untuk mendampingi Anda menghadapi berbagai persoalan
                hukum dengan pendekatan yang cermat, transparan, dan berpihak pada
                keadilan. Berlokasi di Majalengka, Jawa Barat.
              </p>
              <div className="flex flex-wrap gap-4">
                <a
                  href="https://wa.me/6281223840395"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-gold text-white font-body font-medium px-6 py-3 rounded hover:bg-gold/90 transition-colors"
                >
                  Jadwalkan Konsultasi
                </a>
                <Link
                  href="/bidang-praktik"
                  className="inline-flex items-center gap-2 border border-white/20 text-ivory font-body font-medium px-6 py-3 rounded hover:border-white/40 hover:bg-white/5 transition-colors"
                >
                  Lihat Bidang Praktik
                </Link>
              </div>
            </Reveal>

            <Reveal
              className="flex justify-center lg:justify-end"
              duration={1150}
              delay={290}
              y={16}
              scale={0.96}
            >
              <HeroIllustration className="max-w-[220px] sm:max-w-xs lg:max-w-sm w-full" />
            </Reveal>
          </div>
        </div>
      </section>

      <section className="bg-ivory">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
            <Reveal duration={950} y={16}>
              <p className="font-label text-xs uppercase tracking-widest text-gold mb-4">
                Tentang Kami
              </p>
              <h2 className="font-display text-maroon-950 text-3xl md:text-4xl font-semibold leading-tight mb-6">
                Pengacara Berpengalaman, Solusi Nyata
              </h2>
              <p className="font-body text-maroon-900/70 text-base leading-relaxed mb-8">
                ATA Law Firm telah memberikan pelayanan hukum yang
                komprehensif kepada klien perorangan maupun korporat di
                wilayah Jawa Barat dan sekitarnya. Kepercayaan klien adalah
                fondasi utama praktik kami.
              </p>
              <Link
                href="/tentang"
                className="inline-flex items-center gap-2 font-body font-medium text-maroon-950 border-b border-maroon-950/30 pb-0.5 hover:border-gold hover:text-gold transition-colors"
              >
                Pelajari Lebih Lanjut
                <span aria-hidden>→</span>
              </Link>
            </Reveal>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { nilai: "11", label: "Bidang Praktik" },
                { nilai: "5", label: "Advokat & Profesional" },
                { nilai: "100%", label: "Transparansi Biaya" },
              ].map((stat, i) => (
                <Reveal
                  key={stat.label}
                  as="div"
                  className="bg-maroon-950 rounded-lg p-6 flex flex-col gap-2"
                  delay={staggerDelay(i)}
                >
                  <p className="font-label text-3xl font-medium text-gold">
                    {stat.nilai}
                  </p>
                  <p className="font-body text-sm text-sand">
                    {stat.label}
                  </p>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-maroon-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
          <Reveal
            as="div"
            className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14"
            duration={950}
            y={16}
          >
            <div>
              <p className="font-label text-xs uppercase tracking-widest text-gold mb-4">
                Layanan Kami
              </p>
              <h2 className="font-display text-ivory text-3xl md:text-4xl font-semibold leading-tight">
                Bidang Praktik
              </h2>
            </div>
            <Link
              href="/bidang-praktik"
              className="font-body text-sm text-sand hover:text-ivory transition-colors shrink-0"
            >
              Lihat semua →
            </Link>
          </Reveal>

          {bidangPraktik.length === 0 ? (
            <p className="font-body text-sand/60 text-center py-12">
              Konten bidang praktik belum tersedia.
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-white/5 rounded-lg overflow-hidden">
              {bidangPraktik.slice(0, 6).map((b, i) => {
                const Icon = getAreaIcon(b.slug);
                return (
                  <Reveal key={b.slug} delay={staggerDelay(i)}>
                    <Link
                      href={`/bidang-praktik/${b.slug}`}
                      className="group bg-maroon-900 hover:bg-maroon-950 transition-colors p-6 flex flex-col gap-4 h-full"
                    >
                      <div className="w-10 h-10 text-gold">
                        <Icon className="w-full h-full" />
                      </div>
                      <div>
                        <p className="font-display text-ivory font-medium mb-2 group-hover:text-gold transition-colors">
                          {b.judul}
                        </p>
                        <p className="font-body text-sm text-sand leading-relaxed line-clamp-2">
                          {b.deskripsiSingkat}
                        </p>
                      </div>
                    </Link>
                  </Reveal>
                );
              })}
            </div>
          )}
        </div>
      </section>

      <section className="bg-maroon-900 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
          <Reveal
            as="div"
            className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14"
          >
            <div className="max-w-xl">
              <p className="font-label text-xs uppercase tracking-widest text-wine mb-4">
                Edukasi Hukum
              </p>
              <h2 className="font-display text-ivory text-3xl md:text-4xl font-semibold leading-tight mb-4">
                Mengenal hak Anda di mata hukum
              </h2>
              <p className="font-body text-sand text-sm leading-relaxed">
                Kami percaya pengetahuan hukum bukan hanya untuk praktisi.
                Artikel berikut merangkum ketentuan yang berlaku di Indonesia
                agar masyarakat lebih memahami hak dan posisinya.
              </p>
            </div>
            <Link
              href="/artikel"
              className="font-body text-sm text-sand hover:text-ivory transition-colors shrink-0"
            >
              Lihat semua →
            </Link>
          </Reveal>

          {artikelUnggulan.length === 0 ? (
            <p className="font-label text-sm text-[#A8998A] text-center py-14">
              Artikel edukasi hukum akan segera hadir di sini.
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {artikelUnggulan.map((a, i) => (
                <Reveal key={a.slug} delay={staggerDelay(i)}>
                  <Link
                    href={`/artikel/${a.slug}`}
                    className="group bg-white/5 border border-white/10 rounded-lg p-6 flex flex-col gap-4 hover:bg-white/10 transition-colors h-full"
                  >
                    {a.kategori && (
                      <p className="font-label text-xs text-gold uppercase tracking-wide">
                        {a.kategori.judul}
                      </p>
                    )}
                    <h3 className="font-display text-ivory font-medium leading-snug group-hover:text-gold transition-colors line-clamp-2">
                      {a.judul}
                    </h3>
                    <p className="font-body text-sm text-[#A8998A] leading-relaxed line-clamp-3 flex-1">
                      {a.ringkasan}
                    </p>
                    <span className="font-label text-xs text-gold mt-auto">
                      Baca selengkapnya →
                    </span>
                  </Link>
                </Reveal>
              ))}
            </div>
          )}
        </div>
      </section>

      {tim.length > 0 && (
        <section className="bg-ivory border-t border-maroon-950/5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
            <Reveal
              as="div"
              className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14"
              duration={950}
              y={16}
            >
              <div>
                <p className="font-label text-xs uppercase tracking-widest text-gold mb-4">
                  Tim Kami
                </p>
                <h2 className="font-display text-maroon-950 text-3xl md:text-4xl font-semibold leading-tight">
                  Advokat &amp; Profesional
                </h2>
              </div>
              <Link
                href="/tim"
                className="font-body text-sm text-maroon-900/60 hover:text-maroon-950 transition-colors shrink-0"
              >
                Kenali tim kami →
              </Link>
            </Reveal>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
              {tim.slice(0, 5).map((anggota, i) => (
                <Reveal
                  key={anggota.slug}
                  as="div"
                  className="flex flex-col gap-3 text-center"
                  delay={staggerDelay(i)}
                >
                  <div className="aspect-square rounded-lg overflow-hidden bg-maroon-900/10 mx-auto w-full max-w-36">
                    {anggota.foto ? (
                      <Image
                        src={urlForImage(anggota.foto).width(300).height(300).url()}
                        alt={anggota.nama}
                        width={300}
                        height={300}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-[#E8DCC8]" />
                    )}
                  </div>
                  <div>
                    <p className="font-display text-maroon-950 font-medium text-sm">
                      {anggota.nama}
                    </p>
                    <p className="font-label text-xs text-maroon-900/50 mt-0.5">
                      {anggota.jabatan}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="bg-maroon-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
            <Reveal duration={950} y={16}>
              <p className="font-label text-xs uppercase tracking-widest text-gold mb-4">
                Hubungi Kami
              </p>
              <h2 className="font-display text-ivory text-3xl md:text-4xl font-semibold leading-tight mb-6">
                Siap Membantu Anda
              </h2>
              <p className="font-body text-sand leading-relaxed mb-8">
                Dapatkan konsultasi hukum dari tim kami. Kami siap mendengar
                dan memberikan solusi terbaik untuk permasalahan hukum Anda.
              </p>
              <a
                href="https://wa.me/6281223840395"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-gold text-white font-body font-medium px-6 py-3 rounded hover:bg-gold/90 transition-colors"
              >
                Konsultasi Sekarang
              </a>
            </Reveal>

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
                  label: "Jam Operasional",
                  value: "Senin – Jumat, 09.00 – 17.00 WIB",
                },
              ].map((item, i) => (
                <Reveal
                  key={item.label}
                  as="div"
                  className="flex gap-4"
                  y={8}
                  duration={580}
                  delay={staggerDelay(i, 80)}
                >
                  <p className="font-label text-xs text-gold uppercase tracking-wide w-28 shrink-0 pt-0.5">
                    {item.label}
                  </p>
                  {item.href ? (
                    <a
                      href={item.href}
                      target={item.href.startsWith("http") ? "_blank" : undefined}
                      rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                      className="font-body text-sm text-sand hover:text-ivory transition-colors"
                    >
                      {item.value}
                    </a>
                  ) : (
                    <p className="font-body text-sm text-sand">{item.value}</p>
                  )}
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
