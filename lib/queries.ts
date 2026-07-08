import { groq } from "next-sanity";

export const siteSettingsQuery = groq`
  *[_type == "siteSettings"][0]{
    namaFirma,
    tagline,
    logo,
    logoTerang,
    tahunBerdiri,
    alamat,
    titikLokasi,
    email,
    whatsapp,
    teleponKantor,
    jamOperasional,
    sosialMedia,
    seoDefault
  }
`;

export const halamanTentangQuery = groq`
  *[_type == "halamanTentang"][0]{
    labelEyebrow,
    judul,
    narasi,
    visi,
    misi,
    poinKredibilitas,
    statistik
  }
`;

export const bidangPraktikListQuery = groq`
  *[_type == "bidangPraktik"] | order(urutan asc){
    judul,
    "slug": slug.current,
    urutan,
    deskripsiSingkat
  }
`;

export const bidangPraktikDetailQuery = groq`
  *[_type == "bidangPraktik" && slug.current == $slug][0]{
    judul,
    "slug": slug.current,
    deskripsiSingkat,
    deskripsiLengkap
  }
`;

export const timListQuery = groq`
  *[_type == "anggotaTim"] | order(urutan asc){
    nama,
    "slug": slug.current,
    jabatan,
    foto,
    pendidikan,
    nomorIzinAdvokat,
    bio,
    urutan
  }
`;

export const artikelListQuery = groq`
  *[_type == "artikel"] | order(tanggalPublikasi desc){
    judul,
    "slug": slug.current,
    "kategori": kategori->{judul, "slug": slug.current},
    gambarSampul,
    ringkasan,
    "penulis": penulis->{nama, "slug": slug.current},
    tanggalPublikasi,
    unggulan
  }
`;

export const artikelUnggulanQuery = groq`
  *[_type == "artikel" && unggulan == true] | order(tanggalPublikasi desc)[0...3]{
    judul,
    "slug": slug.current,
    "kategori": kategori->{judul, "slug": slug.current},
    gambarSampul,
    ringkasan,
    tanggalPublikasi
  }
`;

export const artikelDetailQuery = groq`
  *[_type == "artikel" && slug.current == $slug][0]{
    judul,
    "kategori": kategori->{judul, "slug": slug.current},
    gambarSampul,
    ringkasan,
    isi,
    "penulis": penulis->{nama, jabatan, foto, "slug": slug.current},
    tanggalPublikasi,
    seo
  }
`;

export const artikelByKategoriQuery = groq`
  *[_type == "artikel" && kategori->slug.current == $kategoriSlug] | order(tanggalPublikasi desc){
    judul,
    "slug": slug.current,
    "kategori": kategori->{judul, "slug": slug.current},
    gambarSampul,
    ringkasan,
    "penulis": penulis->{nama, "slug": slug.current},
    tanggalPublikasi,
    unggulan
  }
`;
