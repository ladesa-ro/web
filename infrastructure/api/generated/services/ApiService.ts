/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CancelablePromise } from "../core/CancelablePromise";
import { OpenAPI } from "../core/OpenAPI";
import { request as __request } from "../core/request";
export class ApiService {
  /**
   * @returns any Olá, Mundo!
   * @throws ApiError
   */
  public static appControllerGetHello(): CancelablePromise<{
    /**
     * O nome desta aplicação.
     */
    service: "sisgea-luna-backend";
    /**
     * Status desta aplicação.
     */
    status: "up";
  }> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/",
    });
  }
}
