import { HttpStatusCode } from "@angular/common/http";

export interface GenericResponse<T> {
  isSuccessful: boolean;
  responseCode: HttpStatusCode;
  message: string;
  data: any;
}