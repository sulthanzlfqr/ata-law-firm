import { isValidSignature, SIGNATURE_HEADER_NAME } from "@sanity/webhook";
import { revalidatePath, revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

type WebhookPayload = {
  _type?: string;
  slug?: { current?: string };
};

// Tipe dokumen yang punya halaman detail dengan slug sendiri.
const DETAIL_PATH_BY_TYPE: Record<string, (slug: string) => string> = {
  artikel: (slug) => `/artikel/${slug}`,
  bidangPraktik: (slug) => `/bidang-praktik/${slug}`,
};

export async function POST(req: NextRequest) {
  const secret = process.env.SANITY_REVALIDATE_SECRET;
  if (!secret) {
    console.error("SANITY_REVALIDATE_SECRET belum diset di environment.");
    return NextResponse.json(
      { message: "Server belum dikonfigurasi untuk revalidate." },
      { status: 500 }
    );
  }

  const body = await req.text();
  const signature = req.headers.get(SIGNATURE_HEADER_NAME);

  if (!signature || !(await isValidSignature(body, signature, secret))) {
    return NextResponse.json(
      { message: "Signature tidak valid." },
      { status: 401 }
    );
  }

  let payload: WebhookPayload;
  try {
    payload = JSON.parse(body);
  } catch {
    return NextResponse.json(
      { message: "Body webhook bukan JSON yang valid." },
      { status: 400 }
    );
  }

  const { _type, slug } = payload;

  if (!_type) {
    return NextResponse.json(
      { message: "Payload webhook tidak menyertakan _type." },
      { status: 400 }
    );
  }

  // expire: 0 supaya data langsung dianggap kedaluwarsa saat request
  // berikutnya masuk, bukan menunggu siklus stale-while-revalidate.
  revalidateTag(_type, { expire: 0 });

  const buildPath = DETAIL_PATH_BY_TYPE[_type];
  if (buildPath && slug?.current) {
    revalidatePath(buildPath(slug.current));
  }

  return NextResponse.json({
    revalidated: true,
    type: _type,
    slug: slug?.current ?? null,
    now: Date.now(),
  });
}
