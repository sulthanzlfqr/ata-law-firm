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

// Placeholder sementara, sampai data tim asli dikonfirmasi.
const placeholder = [
  { urutan: 1, nama: "Toni Sultoni", jabatan: "Pendiri & Managing Partner" },
  { urutan: 2, nama: "Agus", jabatan: "Senior Partner" },
  { urutan: 3, nama: "Ahmad", jabatan: "Partner" },
  { urutan: 4, nama: "Ence", jabatan: "Associate" },
  { urutan: 5, nama: "Rafli", jabatan: "Associate" },
];

type AnggotaTimDoc = {
  _id: string;
  nama: string;
  slug?: { current: string };
  jabatan: string;
  urutan: number;
  foto?: unknown;
};

async function run() {
  const existing = await client.fetch<AnggotaTimDoc[]>(
    `*[_type == "anggotaTim"] | order(urutan asc){_id, nama, slug, jabatan, urutan, foto}`
  );

  if (existing.length !== placeholder.length) {
    console.warn(
      `Peringatan: ditemukan ${existing.length} dokumen anggotaTim di Sanity, tapi daftar placeholder berjumlah ${placeholder.length}. Skrip tetap jalan untuk sebanyak yang bisa dipasangkan (posisi ke posisi berdasarkan urutan asc), tapi cek manual dulu sebelum lanjut.`
    );
  }

  const pairs = existing.map((doc, i) => ({ doc, target: placeholder[i] }))
    .filter((p) => p.target);

  console.log(`Akan mem-patch ${pairs.length} dokumen (tidak membuat dokumen baru, slug & foto tidak disentuh):\n`);

  for (const { doc, target } of pairs) {
    await client
      .patch(doc._id)
      .set({ nama: target.nama, jabatan: target.jabatan, urutan: target.urutan })
      .commit();

    console.log(
      `✓ [${String(target.urutan).padStart(2, "0")}] "${doc.nama}" -> "${target.nama}" (${target.jabatan})  ` +
        `slug: ${doc.slug?.current ?? "(kosong)"}  foto: ${doc.foto ? "ADA" : "kosong"}`
    );
  }

  console.log("\nSelesai. Field slug dan foto (kalau ada) tetap menempel di dokumen yang sama seperti sebelumnya.");
}

run().catch((err) => {
  console.error("Update gagal:", err.message);
  process.exit(1);
});
