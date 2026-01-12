import { auth } from "@/lib/auth";

export type sessionType = Awaited<ReturnType<typeof auth.api.getSession>>;
