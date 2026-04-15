import { IUserPrimitive } from "./IUserPrimitive";

export interface ISelectUsersResponse {
  ok: boolean;
  message: string;
  users: {
    data: IUserPrimitive[];
    count: number;
  };
}
