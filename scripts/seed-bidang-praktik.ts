import { createClient } from "@sanity/client";
import { config } from "dotenv";
import { resolve } from "path";

config({ path: resolve(process.cwd(), ".env.local") });

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2025-01-01",
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
});

const data = [
  {
    urutan: 1,
    judul: "Pidana",
    slug: "pidana",
    deskripsiSingkat:
      "Pendampingan tersangka dan terdakwa, praperadilan, hingga kasasi.",
  },
  {
    urutan: 2,
    judul: "Perdata",
    slug: "perdata",
    deskripsiSingkat:
      "Sengketa kontrak, wanprestasi, dan perbuatan melawan hukum.",
  },
  {
    urutan: 3,
    judul: "Hukum Keluarga",
    slug: "hukum-keluarga",
    deskripsiSingkat: "Perceraian, hak asuh, harta bersama, dan warisan.",
  },
  {
    urutan: 4,
    judul: "Ketenagakerjaan",
    slug: "ketenagakerjaan",
    deskripsiSingkat:
      "Perselisihan hubungan industrial dan pemutusan hubungan kerja.",
  },
  {
    urutan: 5,
    judul: "Properti & Pertanahan",
    slug: "properti-pertanahan",
    deskripsiSingkat: "Sengketa tanah, jual beli properti, dan perizinan.",
  },
  {
    urutan: 6,
    judul: "Perbankan & Keuangan",
    slug: "perbankan-keuangan",
    deskripsiSingkat:
      "Perjanjian kredit dan sengketa antara bank dan nasabah.",
  },
  {
    urutan: 7,
    judul: "Kepailitan & PKPU",
    slug: "kepailitan-pkpu",
    deskripsiSingkat:
      "Restrukturisasi utang dan pendampingan di pengadilan niaga.",
  },
  {
    urutan: 8,
    judul: "Merger & Akuisisi",
    slug: "merger-akuisisi",
    deskripsiSingkat: "Uji tuntas, negosiasi, dan dokumentasi transaksi.",
  },
  {
    urutan: 9,
    judul: "Kekayaan Intelektual",
    slug: "kekayaan-intelektual",
    deskripsiSingkat:
      "Pendaftaran dan sengketa merek, cipta, serta paten.",
  },
  {
    urutan: 10,
    judul: "Tata Usaha Negara",
    slug: "tata-usaha-negara",
    deskripsiSingkat:
      "Sengketa dengan instansi pemerintah dan perizinan.",
  },
  {
    urutan: 11,
    judul: "Persaingan Usaha",
    slug: "persaingan-usaha",
    deskripsiSingkat:
      "Sengketa kemitraan dan dugaan praktik monopoli.",
  },
];

async function seed() {
  console.log(
    `Seeding ${data.length} dokumen bidangPraktik ke dataset "${process.env.NEXT_PUBLIC_SANITY_DATASET || "production"}"...\n`
  );

  for (const item of data) {
    const doc = {
      _id: `bidang-praktik-${item.slug}`,
      _type: "bidangPraktik",
      judul: item.judul,
      slug: { _type: "slug", current: item.slug },
      urutan: item.urutan,
      deskripsiSingkat: item.deskripsiSingkat,
    };

    const result = await client.createIfNotExists(doc);
    const isNew = result._createdAt === result._updatedAt;
    console.log(`${isNew ? "✓ Dibuat" : "→ Sudah ada"}  [${String(item.urutan).padStart(2, "0")}] ${item.judul}`);
  }

  const count = await client.fetch<number>(
    `count(*[_type == "bidangPraktik"])`
  );
  console.log(`\nTotal dokumen bidangPraktik di Sanity: ${count}`);
}

seed().catch((err) => {
  console.error("Seed gagal:", err.message);
  process.exit(1);
});
