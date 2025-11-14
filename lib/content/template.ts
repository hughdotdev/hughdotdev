export function replaceTemplateVariables(
  content: string,
  variables: Record<string, string>
): string {
  let result = content;

  Object.entries(variables).forEach(([key, value]) => {
    const pattern = new RegExp(`\\{\\{${key}\\}\\}`, "g");
    result = result.replace(pattern, value);
  });

  return result;
}
