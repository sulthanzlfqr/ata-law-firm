import { defineType, defineField } from "sanity";

export default defineType({
  name: "pesanKontak",
  title: "Pesan Masuk",
  type: "document",
  fields: [
    defineField({
      name: "nama",
      title: "Nama",
      type: "string",
      readOnly: true,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "email",
      title: "Email",
      type: "string",
      readOnly: true,
    }),
    defineField({
      name: "telepon",
      title: "Telepon",
      type: "string",
      readOnly: true,
    }),
    defineField({
      name: "bidangHukum",
      title: "Bidang Hukum yang Dibutuhkan",
      type: "reference",
      to: [{ type: "bidangPraktik" }],
      readOnly: true,
    }),
    defineField({
      name: "pesan",
      title: "Pesan",
      type: "text",
      rows: 5,
      readOnly: true,
    }),
    defineField({
      name: "status",
      title: "Status Tindak Lanjut",
      type: "string",
      options: {
        list: [
          { title: "Baru", value: "baru" },
          { title: "Sudah Dihubungi", value: "dihubungi" },
          { title: "Selesai", value: "selesai" },
        ],
      },
      initialValue: "baru",
    }),
    defineField({
      name: "dikirimPada",
      title: "Dikirim Pada",
      type: "datetime",
      readOnly: true,
    }),
  ],
  orderings: [
    {
      title: "Terbaru",
      name: "dikirimDesc",
      by: [{ field: "dikirimPada", direction: "desc" }],
    },
  ],
  preview: {
    select: { title: "nama", subtitle: "status" },
    prepare(selection) {
      const { title, subtitle } = selection as {
        title?: string;
        subtitle?: string;
      };
      return { title, subtitle: `Status: ${subtitle ?? ""}` };
    },
  },
});
