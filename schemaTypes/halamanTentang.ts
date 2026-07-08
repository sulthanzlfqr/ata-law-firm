import { defineType, defineField } from "sanity";

export default defineType({
  name: "halamanTentang",
  title: "Halaman Tentang",
  type: "document",
  fields: [
    defineField({
      name: "labelEyebrow",
      title: "Label Kecil (Eyebrow)",
      type: "string",
      initialValue: "Tentang Kami",
    }),
    defineField({
      name: "judul",
      title: "Judul Section",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "narasi",
      title: "Narasi / Cerita Firma",
      type: "array",
      of: [{ type: "block" }],
      description:
        "Cerita sejarah, latar belakang berdirinya firma. Bisa lebih dari satu paragraf.",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "visi",
      title: "Visi",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "misi",
      title: "Misi",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "poinKredibilitas",
      title: "Poin Kredibilitas",
      description:
        "Poin singkat yang ditampilkan dengan ikon centang, contoh: 'Biaya jasa disepakati di awal'.",
      type: "array",
      of: [{ type: "string" }],
      validation: (Rule) => Rule.max(6),
    }),
    defineField({
      name: "statistik",
      title: "Statistik",
      type: "array",
      of: [
        {
          type: "object",
          name: "angka",
          fields: [
            defineField({
              name: "nilai",
              title: "Nilai",
              type: "string",
              description: "Contoh: 12, 420+, 5",
            }),
            defineField({
              name: "label",
              title: "Label",
              type: "string",
              description: "Contoh: Tahun Beroperasi",
            }),
          ],
          preview: {
            select: { title: "nilai", subtitle: "label" },
          },
        },
      ],
    }),
  ],
  preview: {
    prepare() {
      return { title: "Halaman Tentang" };
    },
  },
});
