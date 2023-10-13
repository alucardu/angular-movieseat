export function StripTitle(title: string): string {
  return title.replace(/ /g, "-").toLowerCase()
}

export function ReplaceSpaces(title: string): string {
  return title.replace(/\s/g, '-')
}
