export const joinClass = (prefix: string, classes?: string) =>
  classes
    ?.replace(/\s+/g, " ")
    .trim()
    .split(" ")
    .map((c) => `${prefix}-${c}`)
    .join(" ") || "";
