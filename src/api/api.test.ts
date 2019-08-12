import * as Api from ".";

describe("Api", () => {
  beforeEach(() => {
    window.fetch = jest.fn();
    process.env.BASE_URL = "example.com";
  });

  afterEach(() => {
    delete process.env.BASE_URL;
  });

  describe("get", () => {
    it("gets with query params", () => {
      Api.get("/path", { foo: "bar" });
      expect(window.fetch).toHaveBeenCalledWith("example.com/path?foo=bar", {
        method: "get",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        }
      });
    });
  });

  describe("post", () => {
    it("posts with body", () => {
      Api.post("/path", { foo: "bar" });
      expect(window.fetch).toHaveBeenCalledWith("example.com/path", {
        method: "post",
        body: '{"foo":"bar"}',
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        }
      });
    });
  });
});
