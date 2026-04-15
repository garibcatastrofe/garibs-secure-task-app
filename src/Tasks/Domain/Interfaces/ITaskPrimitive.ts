export interface ITaskPrimitive {
  id?: number;
  title: string;
  description: string;
  creation_date: string;
  expiration_date: string;
  state: string;
  user_id: number;
}
