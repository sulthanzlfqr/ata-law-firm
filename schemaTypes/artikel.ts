import { defineType, defineField } from "sanity";

export default defineType({
  name: "artikel",
  title: "Artikel",
  type: "document",
  fields: [
    defineField({
      name: "judul",
      title: "Judul",
      type: "string",
      validation: (Rule) => Rule.required().max(120),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "judul", maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "kategori",
      title: "Kategori",
      type: "reference",
      to: [{ type: "bidangPraktik" }],
      description: "Kategori artikel mengikuti daftar Bidang Praktik.",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "gambarSampul",
      title: "Gambar Sampul",
      type: "image",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          title: "Teks Alternatif",
          type: "string",
          description: "Penting untuk aksesibilitas dan SEO.",
        }),
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "ringkasan",
      title: "Ringkasan",
      type: "text",
      rows: 3,
      description:
        "Tampil di kartu listing artikel dan sebagai meta description bila SEO tidak diisi terpisah.",
      validation: (Rule) => Rule.required().max(220),
    }),
    defineField({
      name: "isi",
      title: "Isi Artikel",
      type: "array",
      of: [
        {
          type: "block",
          styles: [
            { title: "Normal", value: "normal" },
            { title: "Judul 2", value: "h2" },
            { title: "Judul 3", value: "h3" },
            { title: "Kutipan", value: "blockquote" },
          ],
          lists: [
            { title: "Bullet", value: "bullet" },
            { title: "Bernomor", value: "number" },
          ],
          marks: {
            decorators: [
              { title: "Tebal", value: "strong" },
              { title: "Miring", value: "em" },
            ],
            annotations: [
              {
                name: "tautan",
                title: "Tautan",
                type: "object",
                fields: [{ name: "href", title: "URL", type: "url" }],
              },
            ],
          },
        },
        {
          type: "image",
          options: { hotspot: true },
          fields: [
            defineField({
              name: "alt",
              title: "Teks Alternatif",
              type: "string",
            }),
          ],
        },
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "penulis",
      title: "Penulis",
      type: "reference",
      to: [{ type: "anggotaTim" }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "tanggalPublikasi",
      title: "Tanggal Publikasi",
      type: "datetime",
      initialValue: () => new Date().toISOString(),
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "unggulan",
      title: "Artikel Unggulan",
      type: "boolean",
      description: "Jika aktif, artikel ini disematkan di beranda.",
      initialValue: false,
    }),
    defineField({
      name: "seo",
      title: "SEO (opsional)",
      type: "object",
      fields: [
        defineField({ name: "title", title: "Meta Title", type: "string" }),
        defineField({
          name: "description",
          title: "Meta Description",
          type: "text",
          rows: 3,
        }),
      ],
    }),
  ],
  orderings: [
    {
      title: "Tanggal Publikasi, Terbaru",
      name: "tanggalDesc",
      by: [{ field: "tanggalPublikasi", direction: "desc" }],
    },
  ],
  preview: {
    select: { title: "judul", subtitle: "kategori.judul", media: "gambarSampul" },
  },
});
