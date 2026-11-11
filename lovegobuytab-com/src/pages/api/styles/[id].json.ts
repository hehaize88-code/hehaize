import { sellerStyles } from "../../../lib/seller";
export async function GET({ params }: any) {
  if (!/^\d{5,20}$/.test(params.id || ""))
    return new Response("Invalid item", { status: 400 });
  const styles = await sellerStyles(params.id);
  return Response.json(
    { styles },
    {
      headers: {
        "Cache-Control": styles.length
          ? "public, max-age=600, s-maxage=600"
          : "public, max-age=30",
        "X-Robots-Tag": "noindex",
      },
    },
  );
}
