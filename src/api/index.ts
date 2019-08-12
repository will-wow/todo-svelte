import axios, { Method, AxiosRequestConfig } from "axios";
import { ok, error, ResultP } from "result-async";

const api = axios.create({
  baseURL: "http://localhost:3000/api/todos"
});
export { api as axios };

const wrapRequestInResult = async <Ok, Error>(
  options: AxiosRequestConfig
): ResultP<Ok, Error> => {
  try {
    const request = await api.request(options);
    return ok(request.data);
  } catch (e) {
    console.error(e.response);
    console.error(e.request);
    return error(e.response.data);
  }
};

const request = (method: Method, type: "data" | "params") => async <Ok, Error>(
  url: string,
  data?: any
): ResultP<Ok, Error> =>
  wrapRequestInResult<Ok, Error>({ url, method, [type]: data });

export const get = request("get", "params");
export const post = request("post", "data");
export const put = request("put", "data");
export const remove = request("delete", "params");
