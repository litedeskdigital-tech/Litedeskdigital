import { createCipheriv, createDecipheriv, createHash, randomBytes } from "node:crypto";
import type { SrStore } from "../src/data/sportradar";

/**
 * The store is encrypted (AES-256-GCM, key derived from the API key) before it goes into the Actions cache: on a
 * public repo a fork's pull-request workflow can restore caches, but it never sees secrets.
 */
export function sealStore(store: SrStore, secret: string): string {
  const key = createHash("sha256").update(`sportradar-store:${secret}`).digest();
  const iv = randomBytes(12);
  const c = createCipheriv("aes-256-gcm", key, iv);
  const body = Buffer.concat([c.update(JSON.stringify(store), "utf8"), c.final()]);
  return [iv, c.getAuthTag(), body].map((b) => b.toString("base64")).join(".");
}

/** The decrypted store, or null when it was sealed with another key or is damaged. */
export function openStore(sealed: string, secret: string): SrStore | null {
  try {
    const [iv, tag, body] = sealed.trim().split(".").map((x) => Buffer.from(x, "base64"));
    const key = createHash("sha256").update(`sportradar-store:${secret}`).digest();
    const d = createDecipheriv("aes-256-gcm", key, iv!);
    d.setAuthTag(tag!);
    return JSON.parse(Buffer.concat([d.update(body!), d.final()]).toString("utf8")) as SrStore;
  } catch {
    return null;
  }
}
