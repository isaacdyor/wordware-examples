import { type NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { type EmailOtpType } from "@supabase/supabase-js";
import { api } from "@/trpc/server";

export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const token_hash = searchParams.get("token_hash");
  const type = searchParams.get("type") as EmailOtpType | null;
  const next = searchParams.get("next") ?? "/chat";

  const supabase = createClient();

  // Handle OAuth signin
  if (code) {
    const { data, error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error && data.user) {
      const existingUser = await api.users.getCurrent();

      if (!existingUser) {
        await api.users.create({
          id: data.user.id,
          email: data.user.email,
          name: data.user.user_metadata.full_name as string,
          image: data.user.user_metadata.avatar_url as string,
        });
      }

      const forwardedHost = request.headers.get("x-forwarded-host");
      const isLocalEnv = process.env.NODE_ENV === "development";

      if (isLocalEnv) {
        return NextResponse.redirect(`${origin}${next}`);
      } else if (forwardedHost) {
        return NextResponse.redirect(`https://${forwardedHost}${next}`);
      } else {
        return NextResponse.redirect(`${origin}${next}`);
      }
    }
    // If there's an error with OAuth, redirect to the error page
    return NextResponse.redirect(`${origin}/auth/auth-code-error`);
  }

  // Handle email confirmation
  if (token_hash && type) {
    const { error } = await supabase.auth.verifyOtp({
      type,
      token_hash,
    });
    if (!error) {
      return NextResponse.redirect(`${origin}${next}`);
    }
  }

  // If neither OAuth code nor email confirmation token is present, or if there's an error
  return NextResponse.redirect(`${origin}/error`);
}
