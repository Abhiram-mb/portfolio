let cachedKey: CryptoKey | null = null;

/* ---------------- AES KEY ---------------- */
async function generateAESKey(password: string): Promise<CryptoKey> {
  // reuse key (prevents lag on repeated loads)
  if (cachedKey) return cachedKey;

  const passwordBuffer = new TextEncoder().encode(password);

  const hashedPassword = await crypto.subtle.digest(
    "SHA-256",
    passwordBuffer
  );

  cachedKey = await crypto.subtle.importKey(
    "raw",
    hashedPassword,
    { name: "AES-CBC" },
    false,
    ["decrypt"]
  );

  return cachedKey;
}

/* ---------------- FILE DECRYPT ---------------- */
export const decryptFile = async (
  url: string,
  password: string
): Promise<ArrayBuffer> => {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Failed to fetch encrypted file");
  }

  const encryptedData = await response.arrayBuffer();

  // ✅ avoid extra allocations
  const iv = new Uint8Array(encryptedData, 0, 16);
  const data = encryptedData.slice(16);

  const key = await generateAESKey(password);

  return crypto.subtle.decrypt(
    {
      name: "AES-CBC",
      iv,
    },
    key,
    data
  );
};
