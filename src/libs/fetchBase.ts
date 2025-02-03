/* eslint-disable @typescript-eslint/no-explicit-any */
import { notFound } from "next/navigation";
import { auth } from "@/auth";
import { HTTP_STATUS_CODE } from "@/feature/global/enum";
import { EntityError, EntityErrorPayload, HttpError } from "@/feature/global/type";
const isClient = typeof window !== "undefined";
type CustomOptions = Omit<RequestInit, "method">;


const request = async <Response>(
  method: "GET" | "POST" | "PUT" | "DELETE",
  url: string,
  options?: CustomOptions | undefined
) => {
  let body: FormData | string | undefined = undefined;
  if (options?.body instanceof FormData) {
    body = options.body;
  } else if (options?.body) {
    body = JSON.stringify(options.body);
  }
  const baseHeaders: {
    [key: string]: string;
  } = {
    "Content-Type": "application/json",
  };
  //add accessToken from next auth
  const session: any = await auth();
  if (session?.accessToken) {
    baseHeaders.Authorization = `Bearer ${session?.accessToken}`;
  }
  const res = await fetch(url, {
    ...options,
    headers: {
      ...baseHeaders,
      ...options?.headers,
    },
    body,
    method,
  });
  if (res?.status === 404) {
    notFound();
  }
  const payload: Response = await res.json();
  const data = {
    status: res.status,
    payload,
  };

  // Interceptor là nời chúng ta xử lý request và response trước khi trả về cho phía component
  if (!res.ok) {
    if (res.status === HTTP_STATUS_CODE.ENTITY_ERROR) {
      throw new EntityError(
        data as {
          status: 422;
          payload: EntityErrorPayload;
        }
      );
    } else if (res.status === HTTP_STATUS_CODE.AUTHENTICATION_ERROR) {
      if (isClient) {
      } else {
      }
    } else {
      throw new HttpError(data);
    }
  }
  return data;
};
const fetchBase = {
  get<Response>(
    url: string,
    options?: Omit<CustomOptions, "body"> | undefined
  ) {
    return request<Response>("GET", url, options);
  },
  post<Response>(
    url: string,
    body: any,
    options?: Omit<CustomOptions, "body"> | undefined
  ) {
    return request<Response>("POST", url, { ...options, body });
  },
  put<Response>(
    url: string,
    body: any,
    options?: Omit<CustomOptions, "body"> | undefined
  ) {
    return request<Response>("PUT", url, { ...options, body });
  },
  delete<Response>(
    url: string,
    options?: Omit<CustomOptions, "body"> | undefined
  ) {
    return request<Response>("DELETE", url, { ...options });
  },
};

export default fetchBase;
