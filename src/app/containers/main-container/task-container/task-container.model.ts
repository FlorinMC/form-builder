import { ToolboxItem } from '../toolbox-panel/toolbox-panel.model';
import { SparePart } from './spare-part.interface';
import { Tool } from './task-container-properties/task-container-properties.model';
export interface Task {
  level: number;
  name?: string;
  description?: string;
  duration: number;
  taskBlocks: ToolboxItem[];
  descriptionFiles: {}[];
  tools: Tool[];
  spareParts: SparePart[];
  id?: string;
}
