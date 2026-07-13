import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./schemaTypes";

const singletonTypes = new Set(["siteSettings", "halamanTentang"]);

export default defineConfig({
  name: "default",
  title: "ATA Law Firm CMS",

  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  basePath: "/studio",

  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title("Konten ATA Law Firm")
          .items([
            S.listItem()
              .title("Pengaturan Situs")
              .id("siteSettings")
              .child(
                S.document().schemaType("siteSettings").documentId("siteSettings")
              ),
            S.listItem()
              .title("Halaman Tentang")
              .id("halamanTentang")
              .child(
                S.document().schemaType("halamanTentang").documentId("halamanTentang")
              ),
            S.divider(),
            S.documentTypeListItem("bidangPraktik").title("Bidang Praktik"),
            S.documentTypeListItem("anggotaTim").title("Anggota Tim"),
            S.documentTypeListItem("artikel").title("Artikel"),
            S.divider(),
            S.documentTypeListItem("pesanKontak").title("Pesan Masuk"),
          ]),
    }),
    visionTool(),
  ],

  schema: {
    types: schemaTypes,
    templates: (templates) =>
      templates.filter(({ schemaType }) => !singletonTypes.has(schemaType)),
  },

  document: {
    actions: (input, context) =>
      singletonTypes.has(context.schemaType)
        ? input.filter(({ action }) => action && ["publish", "discardChanges"].includes(action))
        : input,
  },
});
