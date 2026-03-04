import { ITaskMadeBy } from "./ITaskMadeBy";

export interface ISelectTasksResponse {
  ok: boolean;
  message: string;
  data: ITaskMadeBy[];
  count: number;
}
