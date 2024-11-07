import { env } from "@/env";
import { type NextRequest, NextResponse } from "next/server";

export async function POST(
  request: NextRequest,
  {
    params,
  }: {
    params: Promise<{ appSlug: string }>;
  },
) {
  try {
    const appSlug = (await params).appSlug;
    const WORDWARE_API_URL = `https://api.wordware.ai/v1alpha/apps/isaac-dyor-d74b42/${appSlug}/latest/runs/stream`;

    const body = (await request.json()) as unknown;
    const { inputs } = body as { inputs: Record<string, unknown> };

    const response = await fetch(WORDWARE_API_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${env.WORDWARE_API_KEY}`,
      },
      body: JSON.stringify({
        inputs: inputs,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      return NextResponse.json(
        {
          error: `Wordware API responded with status ${response.status}: ${errorText}`,
        },
        { status: response.status },
      );
    }

    // Transform the response into a readable stream
    const stream = new ReadableStream({
      async start(controller) {
        const reader = response.body?.getReader();
        if (!reader) throw new Error("Response body is null");

        try {
          while (true) {
            const { done, value } = await reader.read();
            if (done) break;

            // Forward the raw chunks directly to the client
            controller.enqueue(value);
          }
        } catch (e) {
          console.error("Stream processing error:", e);
          controller.error(e);
        }

        controller.close();
      },
    });

    return new NextResponse(stream, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
      },
    });
  } catch (error) {
    console.error("Error in API route:", error);
    return NextResponse.json(
      { error: `An error occurred: ${String(error)}` },
      { status: 500 },
    );
  }
}
