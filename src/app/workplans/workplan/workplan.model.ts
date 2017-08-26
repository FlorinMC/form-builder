import { Task } from '../../containers/main-container/task-container/task-container.model';
export interface Workplan {
  id: string;
  name: string;
  description: string;
  updatedOn: string;
  createdOn: string;
  userId: number;
  taskItems: Task[];
}
