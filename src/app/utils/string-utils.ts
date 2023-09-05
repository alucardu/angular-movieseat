export function StripTitle(title: string): string {
  return title.replace(/ /g, "-").toLowerCase()
}
