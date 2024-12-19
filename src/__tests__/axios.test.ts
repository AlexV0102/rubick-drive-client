import axiosInstance from "../api/axios";
import { vi } from "vitest";
import { useAuthStore } from "../store/authStore";
import { getItemLocalStorage } from "../utils/localStorage";

vi.mock("../utils/localStorage", () => ({
  getItemLocalStorage: vi.fn(),
  setItemLocalStorage: vi.fn(),
}));

vi.mock("../api/apiMethods/methods", () => ({
  refreshAccessToken: vi.fn(),
}));

vi.mock("../store/authStore", () => ({
  useAuthStore: {
    getState: vi.fn(),
  },
}));

describe("axiosInstance", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    axiosInstance.defaults.headers.common.Authorization = undefined;
  });

  it("should attach the access token to the Authorization header if user and token exist", async () => {
    (getItemLocalStorage as jest.Mock).mockReturnValue("mockAccessToken");
    (useAuthStore.getState as jest.Mock).mockReturnValue({ user: { id: 1 } });

    const config =
      await axiosInstance.interceptors.request.handlers[0].fulfilled({
        headers: {},
      });

    expect(config.headers.Authorization).toBe("Bearer mockAccessToken");
  });

  it("should not attach the Authorization header if no user exists", async () => {
    (getItemLocalStorage as jest.Mock).mockReturnValue("mockAccessToken");
    (useAuthStore.getState as jest.Mock).mockReturnValue({ user: null });

    const config =
      await axiosInstance.interceptors.request.handlers[0].fulfilled({
        headers: {},
      });

    expect(config.headers.Authorization).toBeUndefined();
  });
});
