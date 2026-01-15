const API_KEYS = [
  process.env.API_KEY_1!,
  process.env.API_KEY_2!,
  process.env.API_KEY_3!,
  process.env.API_KEY_4!,
  process.env.API_KEY_5!,
  process.env.API_KEY_6!,
  process.env.API_KEY_7!,
  process.env.API_KEY_8!,
  process.env.API_KEY_9!,
  process.env.API_KEY_10!,
];
export async function fetchWithApiKeyRotation(
  buildUrl: (apiKey: string) => string,
  options?: RequestInit
) {
  let lastError: any = null;
  for (const apiKey of API_KEYS) {
    const url = buildUrl(apiKey);

    const res = await fetch(url, options);

    if (res.ok) {
      return res;
    }
    if (res.status === 402 || res.status === 429) {
      lastError = res;
      continue; 
    }
    throw new Error(`Request failed with status ${res.status}`);
  }
  throw new Error("All API keys are exhausted");
}
