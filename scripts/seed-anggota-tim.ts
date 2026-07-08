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

function toSlug(nama: string): string {
  return nama
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");
}

const data = [
  { urutan: 1, nama: "Toni Sultoni, S.H.", jabatan: "Owner & Managing Partner" },
  { urutan: 2, nama: "Rania Kusumawardhani", jabatan: "Partner" },
  { urutan: 3, nama: "Bagas Prasetyo", jabatan: "Partner" },
  { urutan: 4, nama: "sdaios", jabatan: "Partner" },
  { urutan: 5, nama: "Rafli Sulthan Z., S.H.", jabatan: "Legal Staff" },
];

async function seed() {
  console.log(
    `Seeding ${data.length} dokumen anggotaTim ke dataset "${process.env.NEXT_PUBLIC_SANITY_DATASET || "production"}"...\n`
  );

  for (const item of data) {
    const slug = toSlug(item.nama);
    const doc = {
      _id: `anggota-tim-${slug}`,
      _type: "anggotaTim",
      nama: item.nama,
      slug: { _type: "slug", current: slug },
      jabatan: item.jabatan,
      urutan: item.urutan,
    };

    const result = await client.createIfNotExists(doc);
    const isNew = result._createdAt === result._updatedAt;
    console.log(
      `${isNew ? "✓ Dibuat" : "→ Sudah ada"}  [${String(item.urutan).padStart(2, "0")}] ${item.nama} — ${item.jabatan}`
    );
  }

  const count = await client.fetch<number>(`count(*[_type == "anggotaTim"])`);
  console.log(`\nTotal dokumen anggotaTim di Sanity: ${count}`);
  console.log(
    "\nCatatan: field foto masih kosong. Upload foto asli lewat /studio → Anggota Tim,\nlalu kembalikan validasi required() di schemaTypes/anggotaTim.ts."
  );
}

seed().catch((err) => {
  console.error("Seed gagal:", err.message);
  process.exit(1);
});
