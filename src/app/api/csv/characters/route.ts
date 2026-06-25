import { NextRequest } from "next/server";
import { generateCharacterCSV } from "@features/character-selection";

export async function GET(request: NextRequest): Promise<Response> {
  const idsParam = request.nextUrl.searchParams.get("ids");
  if (!idsParam) {
    return new Response("Missing ids parameter", { status: 400 });
  }

  const ids = idsParam.split(",").map(Number);

  if (ids.length === 0) {
    return new Response("No ids provided", { status: 400 });
  }

  const csv = await generateCharacterCSV(ids);

  return new Response(csv, {
    headers: {
      "Content-Type": "text/csv",
      "Content-Disposition": `attachment; filename="${String(ids.length)}_characters.csv"`,
    },
  });
}
