import { HttpStatusCode } from "@angular/common/http";

export interface GenericResponse<T> {
  code(arg0: string, message: string, code: any): unknown;
  isSuccessful: boolean;
  responseCode: HttpStatusCode;
  message: string;
  data: any;
}