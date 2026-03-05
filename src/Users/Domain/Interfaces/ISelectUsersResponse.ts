import { IUserPrimitive } from "./IUserPrimitive";

export interface ISelectUsersResponse {
  ok: boolean;
  message: string;
  data: IUserPrimitive[];
  count: number;
}
