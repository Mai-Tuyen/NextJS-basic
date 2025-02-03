import { HTTP_STATUS_CODE } from "./enum";

/* eslint-disable @typescript-eslint/no-explicit-any */
export type EntityErrorPayload = {
  message: string;
  errors: {
    field: string;
    message: string;
  }[];
};
export class HttpError extends Error {
  status: number;
  payload: {
    message: string;
    [key: string]: any;
  };
  constructor({
    status,
    payload,
    message = "Lỗi HTTP",
  }: {
    status: number;
    payload: any;
    message?: string;
  }) {
    super(message);
    this.status = status;
    this.payload = payload;
  }
}

export class EntityError extends HttpError {
  status: HTTP_STATUS_CODE.ENTITY_ERROR;
  payload: EntityErrorPayload;
  constructor({
    status,
    payload,
  }: {
    status: HTTP_STATUS_CODE.ENTITY_ERROR;
    payload: EntityErrorPayload;
  }) {
    super({ status, payload, message: "Entity Error" });
    this.status = status;
    this.payload = payload;
  }
}