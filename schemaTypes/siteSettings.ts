import { defineType, defineField } from "sanity";

export default defineType({
  name: "siteSettings",
  title: "Pengaturan Situs",
  type: "document",
  fields: [
    defineField({
      name: "namaFirma",
      title: "Nama Firma",
      type: "string",
      initialValue: "ATA Law Firm",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "tagline",
      title: "Tagline",
      type: "string",
      description:
        "Kalimat singkat pendukung nama firma, tampil di beberapa tempat.",
    }),
    defineField({
      name: "logo",
      title: "Logo",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "logoTerang",
      title: "Logo Versi Terang",
      description: "Dipakai di atas latar belakang gelap (nav bar, footer).",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "tahunBerdiri",
      title: "Tahun Berdiri",
      type: "number",
      validation: (Rule) => Rule.required().min(1900).max(2100),
    }),
    defineField({
      name: "alamat",
      title: "Alamat Kantor",
      type: "text",
      rows: 3,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "titikLokasi",
      title: "Titik Lokasi (Peta)",
      type: "geopoint",
    }),
    defineField({
      name: "email",
      title: "Email",
      type: "string",
      validation: (Rule) =>
        Rule.required().regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, {
          name: "email",
          invert: false,
        }),
    }),
    defineField({
      name: "whatsapp",
      title: "Nomor WhatsApp",
      type: "string",
      description:
        "Format internasional tanpa tanda plus, contoh: 6281223840395",
      validation: (Rule) =>
        Rule.required().regex(/^[0-9]+$/, { name: "nomor telepon" }),
    }),
    defineField({
      name: "teleponKantor",
      title: "Telepon Kantor (opsional)",
      type: "string",
    }),
    defineField({
      name: "jamOperasional",
      title: "Jam Operasional",
      type: "array",
      of: [
        {
          type: "object",
          name: "baris",
          fields: [
            defineField({ name: "hari", title: "Hari", type: "string" }),
            defineField({ name: "jam", title: "Jam", type: "string" }),
          ],
          preview: {
            select: { title: "hari", subtitle: "jam" },
          },
        },
      ],
      initialValue: [{ hari: "Senin – Jumat", jam: "09.00 – 17.00 WIB" }],
    }),
    defineField({
      name: "sosialMedia",
      title: "Tautan Sosial Media",
      type: "array",
      of: [
        {
          type: "object",
          name: "tautan",
          fields: [
            defineField({
              name: "platform",
              title: "Platform",
              type: "string",
              options: {
                list: [
                  { title: "Instagram", value: "instagram" },
                  { title: "LinkedIn", value: "linkedin" },
                  { title: "Facebook", value: "facebook" },
                  { title: "YouTube", value: "youtube" },
                  { title: "TikTok", value: "tiktok" },
                ],
              },
            }),
            defineField({ name: "url", title: "URL", type: "url" }),
          ],
          preview: {
            select: { title: "platform", subtitle: "url" },
          },
        },
      ],
    }),
    defineField({
      name: "seoDefault",
      title: "SEO Default Situs",
      type: "object",
      fields: [
        defineField({
          name: "title",
          title: "Meta Title Default",
          type: "string",
        }),
        defineField({
          name: "description",
          title: "Meta Description Default",
          type: "text",
          rows: 3,
        }),
      ],
    }),
  ],
  preview: {
    prepare() {
      return { title: "Pengaturan Situs" };
    },
  },
});
