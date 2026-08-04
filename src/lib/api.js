const apiBaseUrl = (import.meta.env.VITE_API_BASE_URL || "").replace(/\/$/, "");

export const getApiUrl = (path) => (apiBaseUrl ? `${apiBaseUrl}${path}` : path);

export async function parseApiResponse(response, fallbackMessage) {
  const rawText = await response.text();
  const contentType = response.headers.get("content-type") || "";

  if (!rawText) {
    return {};
  }

  try {
    return JSON.parse(rawText);
  } catch {
    if (rawText.trim().startsWith("<") || /text\/html/i.test(contentType)) {
      throw new Error(
        "Checkout API is not reachable from this site. Set VITE_API_BASE_URL to your backend URL, or deploy the frontend and backend on the same host.",
      );
    }

    throw new Error(fallbackMessage);
  }
}

export async function apiRequest(path, options = {}, fallbackMessage = "Unable to complete the request.") {
  const response = await fetch(getApiUrl(path), options);
  const data = await parseApiResponse(response, fallbackMessage);

  if (!response.ok) {
    throw new Error(data.message || fallbackMessage);
  }

  return data;
}
