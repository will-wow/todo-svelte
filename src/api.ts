import { ok, error, ResultP } from "result-async";
import { camelizeKeys } from "humps";
import { stringify } from "query-string";

const fetchWithBody = (method: string) => async <Ok, Error>(
  url: string,
  body?: object
): ResultP<Ok, Error> => {
  const data: RequestInit = {
    method,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    }
  };

  if (body) {
    data.body = JSON.stringify(body);
  }

  try {
    const response = await fetch(
      `${process.env.REACT_APP_BASE_URL}${url}`,
      data
    );
    if (!response.ok) throw response.text;

    const json = await response.json();

    return ok(camelizeKeys(json) as Ok);
  } catch (e) {
    return error(e.message);
  }
};

const fetchWithParams = (method: string) => async <Ok, Error>(
  url: string,
  params?: object
): ResultP<Ok, Error> => {
  const fullUrl = params ? `${url}?${stringify(params)}` : url;

  return fetchWithBody(method)<Ok, Error>(fullUrl);
};

export const get = fetchWithParams("get");
export const post = fetchWithBody("post");
export const put = fetchWithBody("put");
export const patch = fetchWithBody("patch");
export const remove = fetchWithParams("delete");
