import { defineType, defineField } from "sanity";

export default defineType({
  name: "bidangPraktik",
  title: "Bidang Praktik",
  type: "document",
  fields: [
    defineField({
      name: "judul",
      title: "Judul Bidang",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      description:
        "Dipakai untuk mencocokkan ikon di kode dan sebagai URL halaman detail. Jangan diubah setelah dipublikasikan kecuali tahu konsekuensinya.",
      options: { source: "judul", maxLength: 64 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "urutan",
      title: "Urutan Tampil",
      type: "number",
      description:
        "Angka lebih kecil tampil lebih dulu. Digunakan untuk mengatur urutan sesuai keumuman kasus, bukan alfabetis.",
      validation: (Rule) => Rule.required().integer(),
    }),
    defineField({
      name: "deskripsiSingkat",
      title: "Deskripsi Singkat",
      type: "text",
      rows: 2,
      description: "Tampil di kartu listing bidang praktik pada beranda.",
      validation: (Rule) => Rule.required().max(160),
    }),
    defineField({
      name: "deskripsiLengkap",
      title: "Deskripsi Lengkap",
      type: "array",
      of: [{ type: "block" }],
      description:
        "Opsional. Untuk halaman detail bidang praktik jika dibuat pada fase berikutnya.",
    }),
  ],
  orderings: [
    {
      title: "Urutan Tampil",
      name: "urutanAsc",
      by: [{ field: "urutan", direction: "asc" }],
    },
  ],
  preview: {
    select: { title: "judul", subtitle: "deskripsiSingkat", order: "urutan" },
    prepare(selection) {
      const { title, subtitle, order } = selection as {
        title?: string;
        subtitle?: string;
        order?: number;
      };
      return {
        title: `${String(order ?? "").padStart(2, "0")} — ${title ?? ""}`,
        subtitle,
      };
    },
  },
});
