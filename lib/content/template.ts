import { LINKS } from "@/lib/constants";

export function replaceTemplateVariables(
  content: string,
  variables: Record<string, string> = {}
): string {
  const allVariables = { ...LINKS, ...variables };
  let result = content;

  for (const [key, value] of Object.entries(allVariables)) {
    result = result.replaceAll(`{{${key}}}`, value);
  }

  return result;
}
