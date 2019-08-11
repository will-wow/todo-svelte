import ResultAsync from "result-async";
import { stringify } from "query-string";
import humps from "humps";

console.log(ResultAsync);
const { camelizeKeys } = humps;

const { ok, error } = ResultAsync;

const fetchWithBody = method => async (url, body) => {
  const data = {
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

    return ok(camelizeKeys(json));
  } catch (e) {
    return error(e.message);
  }
};

const fetchWithParams = method => async (url, params) => {
  const fullUrl = params ? `${url}?${stringify(params)}` : url;

  return fetchWithBody(method)(fullUrl);
};

export const get = fetchWithParams("get");
export const post = fetchWithBody("post");
export const put = fetchWithBody("put");
export const patch = fetchWithBody("patch");
export const remove = fetchWithParams("delete");
