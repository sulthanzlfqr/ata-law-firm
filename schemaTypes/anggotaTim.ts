import { defineType, defineField } from "sanity";

export default defineType({
  name: "anggotaTim",
  title: "Anggota Tim",
  type: "document",
  fields: [
    defineField({
      name: "nama",
      title: "Nama Lengkap",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "nama", maxLength: 64 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "jabatan",
      title: "Jabatan",
      type: "string",
      options: {
        list: [
          { title: "Pendiri & Managing Partner", value: "Pendiri & Managing Partner" },
          { title: "Senior Partner", value: "Senior Partner" },
          { title: "Partner", value: "Partner" },
          { title: "Associate", value: "Associate" },
          { title: "Staf Administrasi", value: "Staf Administrasi" },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "foto",
      title: "Foto",
      type: "image",
      options: { hotspot: true },
      // Kembalikan validasi required() setelah semua foto asli terupload lewat Studio
    }),
    defineField({
      name: "pendidikan",
      title: "Riwayat Pendidikan",
      type: "array",
      of: [{ type: "string" }],
      description: "Contoh: 'S.H., Universitas Padjadjaran (2011)'",
    }),
    defineField({
      name: "nomorIzinAdvokat",
      title: "Nomor Izin Advokat",
      type: "string",
      description: "Opsional, ditampilkan untuk menambah kredibilitas.",
    }),
    defineField({
      name: "bio",
      title: "Bio Singkat",
      type: "text",
      rows: 4,
    }),
    defineField({
      name: "urutan",
      title: "Urutan Tampil",
      type: "number",
      description:
        "Angka lebih kecil tampil lebih dulu, biasanya berdasarkan senioritas.",
      validation: (Rule) => Rule.required().integer(),
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
    select: { title: "nama", subtitle: "jabatan", media: "foto" },
  },
});
