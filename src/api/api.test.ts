import { ok } from "result-async";
import * as Api from ".";
import "./mock-server";

describe("Api", () => {
  beforeEach(() => {
    window.fetch = jest.fn();
    process.env.BASE_URL = "example.com";
  });

  afterEach(() => {
    delete process.env.BASE_URL;
  });

  describe("get", () => {
    it("gets with query params", async () => {
      const todos = await Api.get("/");
      expect(todos).toEqual(
        ok([
          { createdAt: "2019-08-12", done: false, id: 0, title: "Get Milk" },
          { createdAt: "2019-08-12", done: true, id: 1, title: "Learn Svelte" }
        ])
      );
    });
  });
});
