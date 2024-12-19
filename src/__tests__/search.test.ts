import { search } from "../api/apiMethods/methods";
import axiosInstance from "../api/axios";
import { vi } from "vitest";

vi.mock("../api/axios", () => ({
  default: {
    get: vi.fn(),
  },
}));

describe("Search API", () => {
  it("should return search results for folders and files", async () => {
    (axiosInstance.get as vi.Mock).mockResolvedValue({
      data: {
        folders: [{ id: "1", name: "Folder 1" }],
        files: [{ id: "1", name: "File 1" }],
      },
    });

    const response = await search("test");

    expect(response).toEqual({
      folders: [{ id: "1", name: "Folder 1" }],
      files: [{ id: "1", name: "File 1" }],
    });
    expect(axiosInstance.get).toHaveBeenCalledWith("/search", {
      params: { q: "test" },
    });
  });
});
