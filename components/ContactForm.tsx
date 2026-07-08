"use client";

import { useActionState } from "react";
import { submitKontak } from "@/app/(main)/kontak/actions";

type BidangItem = { judul: string; slug: string; _id?: string };

type Props = {
  bidangPraktikList: BidangItem[];
};

const initialState = null;

export default function ContactForm({ bidangPraktikList }: Props) {
  const [state, formAction, isPending] = useActionState(
    submitKontak,
    initialState
  );

  if (state?.success) {
    return (
      <div className="bg-navy-900/40 border border-terracotta/30 rounded-lg p-8 text-center">
        <svg
          viewBox="0 0 40 40"
          fill="none"
          className="w-12 h-12 text-terracotta mx-auto mb-4"
        >
          <circle cx="20" cy="20" r="13" stroke="currentColor" strokeWidth="1.4" />
          <path
            d="M14 20l4 4 8-8"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <p className="font-display text-ivory text-xl mb-2">
          Pesan Terkirim!
        </p>
        <p className="font-body text-blue-pale text-sm">
          Kami akan menghubungi Anda dalam waktu 1×24 jam kerja.
        </p>
      </div>
    );
  }

  return (
    <form action={formAction} className="flex flex-col gap-5">
      {state?.error && (
        <div className="bg-crimson/20 border border-crimson/40 text-ivory text-sm font-body rounded px-4 py-3">
          {state.error}
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="nama" className="font-label text-xs text-blue-light uppercase tracking-wide">
            Nama <span className="text-terracotta">*</span>
          </label>
          <input
            id="nama"
            name="nama"
            type="text"
            required
            placeholder="Nama lengkap Anda"
            className="bg-navy-900/40 border border-white/10 rounded px-4 py-2.5 text-sm font-body text-ivory placeholder:text-blue-pale/40 focus:outline-none focus:border-terracotta/60 transition-colors"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="telepon" className="font-label text-xs text-blue-light uppercase tracking-wide">
            Nomor Telepon
          </label>
          <input
            id="telepon"
            name="telepon"
            type="tel"
            placeholder="0812-xxxx-xxxx"
            className="bg-navy-900/40 border border-white/10 rounded px-4 py-2.5 text-sm font-body text-ivory placeholder:text-blue-pale/40 focus:outline-none focus:border-terracotta/60 transition-colors"
          />
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="email" className="font-label text-xs text-blue-light uppercase tracking-wide">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          placeholder="email@contoh.com"
          className="bg-navy-900/40 border border-white/10 rounded px-4 py-2.5 text-sm font-body text-ivory placeholder:text-blue-pale/40 focus:outline-none focus:border-terracotta/60 transition-colors"
        />
      </div>

      {bidangPraktikList.length > 0 && (
        <div className="flex flex-col gap-1.5">
          <label htmlFor="bidangHukumId" className="font-label text-xs text-blue-light uppercase tracking-wide">
            Bidang Hukum yang Dibutuhkan
          </label>
          <div className="relative">
            <select
              id="bidangHukumId"
              name="bidangHukumId"
              defaultValue=""
              className="w-full bg-navy-900/40 border border-white/10 rounded px-4 py-2.5 pr-10 text-sm font-body text-ivory focus:outline-none focus:border-terracotta/60 transition-colors appearance-none"
            >
              <option value="" className="bg-navy-950 text-blue-pale">
                Pilih bidang hukum (opsional)
              </option>
              {bidangPraktikList.map((b) => (
                <option key={b.slug} value={b._id || b.slug} className="bg-navy-950 text-ivory">
                  {b.judul}
                </option>
              ))}
            </select>
            <svg
              className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-blue-pale"
              viewBox="0 0 16 16"
              fill="none"
            >
              <path
                d="M4 6l4 4 4-4"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>
      )}

      <div className="flex flex-col gap-1.5">
        <label htmlFor="pesan" className="font-label text-xs text-blue-light uppercase tracking-wide">
          Pesan <span className="text-terracotta">*</span>
        </label>
        <textarea
          id="pesan"
          name="pesan"
          required
          rows={5}
          placeholder="Ceritakan permasalahan hukum Anda secara singkat..."
          className="bg-navy-900/40 border border-white/10 rounded px-4 py-2.5 text-sm font-body text-ivory placeholder:text-blue-pale/40 focus:outline-none focus:border-terracotta/60 transition-colors resize-none"
        />
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="self-start bg-terracotta text-white font-body font-medium text-sm px-6 py-3 rounded hover:bg-terracotta/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        {isPending ? "Mengirim..." : "Kirim Pesan"}
      </button>
    </form>
  );
}
