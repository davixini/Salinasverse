import { createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";
const COOKIE = "sv_session";
function secret() { const s = process.env.SESSION_SECRET; if (!s || s.length < 32) throw new Error("SESSION_SECRET debe tener al menos 32 caracteres"); return s; }
export function sign(value: string) { return createHmac("sha256", secret()).update(value).digest("hex"); }
export async function issueSession(username: string) { const payload = Buffer.from(JSON.stringify({ username, exp: Date.now() + 1000 * 60 * 60 * 12 })).toString("base64url"); const jar = await cookies(); jar.set(COOKIE, `${payload}.${sign(payload)}`, { httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "strict", path: "/", maxAge: 60 * 60 * 12 }); }
export async function isAdmin() { const value = (await cookies()).get(COOKIE)?.value; if (!value) return false; const [payload, signature] = value.split("."); if (!payload || !signature) return false; const expected = sign(payload); const a = Buffer.from(signature), b = Buffer.from(expected); if (a.length !== b.length || !timingSafeEqual(a,b)) return false; try { const data = JSON.parse(Buffer.from(payload,"base64url").toString()); return data.exp > Date.now() && data.username === process.env.ADMIN_USERNAME; } catch { return false; } }
export async function requireAdmin() { if (!await isAdmin()) throw new Error("UNAUTHORIZED"); }
export async function clearSession() { (await cookies()).delete(COOKIE); }
