import { http } from "../config/http";
import {
  GoalsInterface,
  InitiativeInterface,
  RequestInterface,
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

export const login = async (payload: {
  email: string;
  password: string;
}): Promise<{
  success: boolean;
  message: string;
  data?: UserI;
}> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_PATH}/auth/login`,
      {
        credentials: "include",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      }
    );

    return response.json();
  } catch (error) {
    return {
      success: false,
      message: (error as Error)?.message,
    };
  }
};

export const register = async (payload: {
  name: string;
  email: string;
  password: string;
  termsAndConditions: boolean;
  provider: {
    name: string;
  };
}): Promise<{
  success: boolean;
  message: string;
  data?: UserI;
}> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_PATH}/auth/register`,
      {
        credentials: "include",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      }
    );

    return response.json();
  } catch (error) {
    return {
      success: false,
      message: (error as Error)?.message,
    };
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

export const createInitiative = async (formData: FormData) => {
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

export const fetchInitiatives = async (): Promise<
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

export const fetchInitiative = async (
  id?: string
): Promise<InitiativeInterface> => {
  try {
    const { data } = await http.get<RequestInterface<InitiativeInterface>>(
      `/initiatives/${id}`
    );
    if (data?.success) {
      return data?.data;
    } else {
      throw new Error("Error!");
    }
  } catch (error: any) {
    return error;
    // return (error as Error).message;
  }
};

export const logout = async () => {
  try {
    await fetch(`${process.env.NEXT_PUBLIC_API_PATH}/auth/logout`, {
      credentials: "include",
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    return error;
  }
};
