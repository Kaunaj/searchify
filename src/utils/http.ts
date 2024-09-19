export async function get(url: string, headers: any = {}) {
  const requestOptions = {
    method: "GET",
    headers,
  };
  const res = await fetch(url, requestOptions);

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}
