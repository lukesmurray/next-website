export function convertDatabaseSlugToArraySlug(slug: string): string[] {
  return slug.split("/").filter((v) => v);
}

export function convertArraySlugToRenderSlug(slug?: string[]): string {
  return `/${((slug ?? []) as string[]).join("/")}`;
}

export function convertDatabaseSlugToRenderSlug(slug: string): string {
  return convertArraySlugToRenderSlug(convertDatabaseSlugToArraySlug(slug));
}
