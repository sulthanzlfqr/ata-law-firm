import Link from "next/link";

const navLinks = [
  { label: "Beranda", href: "/" },
  { label: "Tentang", href: "/tentang" },
  { label: "Bidang Praktik", href: "/bidang-praktik" },
  { label: "Tim", href: "/tim" },
  { label: "Artikel", href: "/artikel" },
  { label: "Kontak", href: "/kontak" },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-navy-950 text-blue-pale">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div>
            <p className="font-display text-ivory text-xl font-semibold mb-3">
              ATA &amp; Rekan
            </p>
            <p className="text-sm leading-relaxed font-body mb-4">
              Kantor Hukum ATA &amp; Rekan memberikan layanan hukum profesional
              dengan pendekatan yang cermat dan berpihak pada keadilan.
            </p>
            <p className="font-label text-xs text-blue-light">Berdiri sejak 2013</p>
          </div>

          <div>
            <p className="font-label text-xs uppercase tracking-widest text-terracotta mb-4">
              Navigasi
            </p>
            <ul className="flex flex-col gap-2">
              {navLinks.map(({ label, href }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-sm font-body hover:text-ivory transition-colors"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="font-label text-xs uppercase tracking-widest text-terracotta mb-4">
              Kontak
            </p>
            <address className="not-italic flex flex-col gap-2 text-sm font-body">
              <p>
                Komplek Pasar Sindangkasih, Cigasong,
                <br />
                Kabupaten Majalengka, Jawa Barat 45476
              </p>
              <a
                href="mailto:info@ataandrekan.co.id"
                className="hover:text-ivory transition-colors"
              >
                info@ataandrekan.co.id
              </a>
              <a
                href="https://wa.me/6281320722147"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-ivory transition-colors"
              >
                +62 813-2072-2147
              </a>
            </address>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-2">
          <p className="text-xs font-label text-blue-pale/60">
            &copy; {year} Kantor Hukum ATA &amp; Rekan. Hak cipta dilindungi.
          </p>
          <p className="text-xs font-label text-blue-pale/40">
            Senin – Jumat, 09.00 – 17.00 WIB
          </p>
        </div>
      </div>
    </footer>
  );
}
