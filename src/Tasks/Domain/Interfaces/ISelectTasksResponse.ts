import { ITaskPrimitive } from "./ITaskPrimitive";

export interface ISelectTasksResponse {
  ok: boolean;
  message: string;
  tasks: {
    data: ITaskPrimitive[];
    count: number;
  };
}
