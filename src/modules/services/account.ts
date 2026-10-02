import axios from "axios";
import { http } from "../config/http";
import {
  ProfileFormInterface,
  UserI,
} from "../types/types";

export type PublicRole =
  | "volunteer"
  | "organization";

async function accountRequest(
  method: "POST" | "PATCH",
  url: string,
  body: unknown,
  signal?: AbortSignal
): Promise<UserI> {
  try {
    // Handle errors here instead of using the shared
    // interceptor, which redirects 403s to the homepage.
    const { data } = await axios.request({
      baseURL: http.defaults.baseURL,
      url,
      method,
      data: body,
      withCredentials: true,
      signal,
    });

    if (!data?.success || !data.data?._id) {
      throw new Error(
        "The server did not return an account."
      );
    }

    return data.data as UserI;
  } catch (error) {
    if (axios.isCancel(error)) {
      throw error;
    }

    if (axios.isAxiosError(error)) {
      const message =
        error.response?.data?.message;

      throw new Error(
        typeof message === "string"
          ? message
          : "Unable to contact the server."
      );
    }

    throw error;
  }
}

export const getCurrentAccount = (
  signal?: AbortSignal
) =>
  accountRequest(
    "POST",
    "/users/profile",
    {},
    signal
  );

export const saveAccountRole = (
  role: PublicRole
) =>
  accountRequest(
    "PATCH",
    "/users/role",
    { role }
  );

export const saveAccountProfile = (
  id: string,
  body: ProfileFormInterface
) => {
  // Profile updates never submit an account role.
  const { role: _role, ...profile } = body;

  return accountRequest(
    "PATCH",
    `/users/${encodeURIComponent(id)}`,
    profile
  );
};