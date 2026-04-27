/** Deduplicate primary + gallery URLs for the carousel (backend may repeat primary in `images`). */
export function buildServiceImageSlideUris(
  primaryImage: string | undefined,
  images: string[] | undefined,
): string[] {
  const seen = new Set<string>();
  const out: string[] = [];
  for (const uri of [
    primaryImage,
    ...((images as string[] | undefined) || []),
  ].filter(Boolean) as string[]) {
    if (seen.has(uri)) continue;
    seen.add(uri);
    out.push(uri);
  }
  return out;
}
