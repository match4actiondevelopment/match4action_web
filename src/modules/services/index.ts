import axios from "axios";
import { http } from "../config/http";
import {
  GoalsInterface,
  InitiativeInterface,
  RequestInterface,
  TokensInterface,
  UpdatedProfileInterface,
  UpdateProfilePayload,
  UserI,
} from "../types/types";

export const fetchProfile = async (id?: string | null) => {
  try {
    const { data } = await http.post<RequestInterface<UserI>>(
      `/users/profile`,
      { id },
      { withCredentials: true }
    );

    if (data?.success) {
      return data?.data;
    } else {
      throw new Error("Error!");
    }
  } catch (error) {
    return (error as Error).message;
  }
};

export const logout = async () => {
  try {
    const { data } = await http.post<RequestInterface<undefined>>(
      `/auth/logout`,
      { withCredentials: true }
    );
    if (data?.success) {
      return data?.success;
    } else {
      throw new Error("Error!");
    }
  } catch (error) {
    return (error as Error).message;
  }
};

export const updateUserProfile = async ({ body, id }: UpdateProfilePayload) => {
  try {
    const { data } = await http.patch<
      RequestInterface<UpdatedProfileInterface>
    >(`/users/${id}`, body, {
      withCredentials: true,
    });
    if (data?.success) {
      return data?.data;
    } else {
      throw new Error("Error!");
    }
  } catch (error) {
    return (error as Error).message;
  }
};

export const login = async (payload: { email: string; password: string }) => {
  try {
    const { data } = await axios.post<
      RequestInterface<{ user: UserI } & TokensInterface>
    >(`${process.env.NEXT_PUBLIC_API_PATH}/auth/login`, payload);
    if (data?.success) {
      return data?.data;
    } else {
      throw new Error("Error!");
    }
  } catch (error) {
    return (error as Error).message;
  }
};

export const register = async (payload: {
  name: string;
  email: string;
  password: string;
  termsAndConditions: boolean;
  providerName: string;
}) => {
  try {
    const { data } = await axios.post<
      RequestInterface<{ user: UserI } & TokensInterface>
    >(`${process.env.NEXT_PUBLIC_API_PATH}/auth/register`, payload);
    if (data?.success) {
      return data?.data;
    } else {
      throw new Error("Error!");
    }
  } catch (error) {
    return (error as Error).message;
  }
};

export const updateImage = async (formData: FormData): Promise<string> => {
  try {
    const { data } = await http.post<RequestInterface<string>>(
      `/upload`,
      formData,
      {
        headers: { "Content-Type": undefined },
        withCredentials: true,
      }
    );
    if (data?.success) {
      return data?.data;
    } else {
      throw new Error("Error!");
    }
  } catch (error) {
    return (error as Error).message;
  }
};

export const fetchGoals = async (): Promise<string | GoalsInterface[]> => {
  try {
    const { data } = await http.get<RequestInterface<GoalsInterface[]>>(
      `/goals`
    );
    if (data?.success) {
      return data?.data;
    } else {
      throw new Error("Error!");
    }
  } catch (error) {
    return (error as Error).message;
  }
};

export const createOpportunity = async (formData: FormData) => {
  try {
    const { data } = await http.post<RequestInterface<InitiativeInterface>>(
      `/initiatives`,
      formData,
      {
        headers: { "Content-Type": undefined },
        withCredentials: true,
      }
    );
    if (data?.success) {
      return data?.data;
    } else {
      throw new Error("Error!");
    }
  } catch (error: any) {
    throw new Error(JSON.stringify(error?.response?.data));
  }
};

export const fetchOpportunities = async (): Promise<
  string | InitiativeInterface[]
> => {
  try {
    const { data } = await http.get<RequestInterface<InitiativeInterface[]>>(
      `/initiatives`
    );
    if (data?.success) {
      return data?.data;
    } else {
      throw new Error("Error!");
    }
  } catch (error) {
    return (error as Error).message;
  }
};
