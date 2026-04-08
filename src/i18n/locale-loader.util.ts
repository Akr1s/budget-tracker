import i18n from "i18next";

export const NAMESPACES = [
  "onboarding",
  "transactions",
  "common",
  "dashboard",
  "settings",
] as const;

export type ILocaleNamespace = (typeof NAMESPACES)[number];

const localeJson = import.meta.glob<{ default: Record<string, unknown> }>(
  "./locales/*/*.json",
);

function createNamespacePath(lng: string, ns: ILocaleNamespace): string {
  return `./locales/${lng}/${ns}.json`;
}

async function loadNamespacesForLanguage(
  lng: string,
): Promise<[string, Record<ILocaleNamespace, Record<string, unknown>>]> {
  const namespaceEntries = await Promise.all(
    NAMESPACES.map(async (ns) => {
      const loader = localeJson[createNamespacePath(lng, ns)];

      if (!loader) {
        throw new Error(`Missing locale: ${lng}/${ns}`);
      }

      const module = await loader();
      return [ns, module.default] as const;
    }),
  );

  return [lng, Object.fromEntries(namespaceEntries) as Record<ILocaleNamespace, Record<string, unknown>>];
}

export async function buildResourcesForLanguages(
  languages: readonly string[],
): Promise<Record<string, Record<ILocaleNamespace, Record<string, unknown>>>> {
  const languageEntries = await Promise.all(
    languages.map(loadNamespacesForLanguage),
  );

  return Object.fromEntries(languageEntries) as Record<
    string,
    Record<ILocaleNamespace, Record<string, unknown>>
  >;
}

export async function ensureLanguageLoaded(lng: string): Promise<void> {
  const isAlreadyLoaded =
    NAMESPACES.length > 0 &&
    NAMESPACES.every((ns) => i18n.hasResourceBundle(lng, ns));

  if (!isAlreadyLoaded) {
    const resources = await buildResourcesForLanguages([lng]);
    for (const ns of NAMESPACES) {
      i18n.addResourceBundle(lng, ns, resources[lng][ns], true, true);
    }
  }
}
