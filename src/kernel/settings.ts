// kernel/settings.ts — configuración validada al arrancar (build)
import { z } from "zod";

const SettingsSchema = z.object({
  siteUrl: z.string().url().default("https://davidperalta.github.io"),
  base: z.string().default("/MiniDts-Hub"),
  title: z.string().default("MiniDts-Hub"),
});

export type Settings = z.infer<typeof SettingsSchema>;

export function loadSettings(env: Record<string, string | undefined> = {}): Settings {
  return SettingsSchema.parse({
    siteUrl: env.SITE_URL,
    base: env.BASE_PATH,
    title: env.SITE_TITLE,
  });
}

export const settings: Settings = loadSettings(
  typeof globalThis.process !== "undefined" ? (globalThis.process.env as Record<string, string | undefined>) : {},
);