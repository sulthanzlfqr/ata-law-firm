"use server";

import { writeClient } from "@/sanity/lib/client";

type FormState = {
  success: boolean;
  error?: string;
};

export async function submitKontak(
  _prev: FormState | null,
  formData: FormData
): Promise<FormState> {
  const nama = formData.get("nama") as string;
  const email = formData.get("email") as string;
  const telepon = formData.get("telepon") as string;
  const pesan = formData.get("pesan") as string;
  const bidangHukumId = formData.get("bidangHukumId") as string;

  if (!nama?.trim() || !pesan?.trim()) {
    return { success: false, error: "Nama dan pesan wajib diisi." };
  }

  try {
    await writeClient.create({
      _type: "pesanKontak",
      nama: nama.trim(),
      email: email?.trim() || undefined,
      telepon: telepon?.trim() || undefined,
      pesan: pesan.trim(),
      bidangHukum: bidangHukumId
        ? { _type: "reference", _ref: bidangHukumId }
        : undefined,
      status: "baru",
      dikirimPada: new Date().toISOString(),
    });

    return { success: true };
  } catch {
    return {
      success: false,
      error: "Pesan gagal terkirim. Silakan coba lagi atau hubungi kami via WhatsApp.",
    };
  }
}
