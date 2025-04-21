"use server";

import yaml from "js-yaml";

export async function convertFormat(
  input: string,
  format: "json-to-yaml" | "yaml-to-json"
) {
  if (!input) {
    throw new Error("No input provided");
  }

  try {
    if (format === "json-to-yaml") {
      const jsonData = JSON.parse(input);
      return yaml.dump(jsonData);
    }
    const jsonData = yaml.load(input);
    return JSON.stringify(jsonData, null, 2);
  } catch (error) {
    console.error("Conversion error:", error);
    throw new Error(`Failed to convert format (${format}): ${error instanceof Error ? error.message : String(error)}`);
  }
}
