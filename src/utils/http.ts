export async function get(url: string, headers: any = {}) {
  const requestOptions = {
    method: "GET",
    headers,
    // redirect: "follow",
  };
  console.log("performing GET request at URL:", url, requestOptions);
  const res = await fetch(url, requestOptions);
  console.log("res:", res);

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}
