/**
 * Generates a Bible Gateway URL for a given Bible reference
 * @param reference The Bible reference (e.g., "John 3:16", "Matthew 5:3-12")
 * @returns A URL to the Bible Gateway page for the reference
 */
export function getBibleGatewayUrl(reference: string): string {
  // Clean up the reference for URL encoding
  const cleanReference = reference.trim().replace(/\s+/g, "+")

  // Return the Bible Gateway URL (using NIV version as default)
  return `https://www.biblegateway.com/passage/?search=${cleanReference}&version=NIV`
}
