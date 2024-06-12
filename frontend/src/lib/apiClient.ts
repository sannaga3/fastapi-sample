export const api = async (
  path: string,
  method: string,
  values: any | null = null,
  authToken: string | null = null,
  isLogin: boolean = false
) => {
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  const url = baseUrl + path;

  let urlAndQuery: string | undefined;
  let params: RequestInit | undefined;
  let contentType: string;
  let requestBody: BodyInit | null | undefined = null;

  if (isLogin) {
    // fastapi.securityのOAuth2PasswordRequestFormに合わせる
    contentType = "application/x-www-form-urlencoded";
    if (Object.values(values).length > 0)
      requestBody = new URLSearchParams(values);
  } else {
    contentType = "application/json";
    if (values && Object.values(values).length > 0)
      requestBody = JSON.stringify(values);
  }

  if (method === "GET" && values) {
    const query = new URLSearchParams(values);
    urlAndQuery = `${url}?${query}`;
  }

  params = {
    method: method,
    body: requestBody,
    headers: {
      "Content-Type": contentType,
    },
  };

  if (authToken) {
    params.headers!.Authorization = `Bearer ${authToken}`;
  }

  const res = await fetch(urlAndQuery ?? url, params);
  return res;
};
