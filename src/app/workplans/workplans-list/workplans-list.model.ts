import { DesignerProperty } from '../../containers/main-container/main-container.model';
import { Workplan } from '../workplan/workplan.model';

export interface WorkplansList {
  workplans: Workplan[];
}

export interface TaskItem {
  level: number;
  name: string;
  description: string;
  duration: number;
  taskBlocks: TaskBlock[];
  descriptionFiles: {}[];
  tools: {}[];
  spareParts: {}[];
  id: string;
}

export interface TaskBlock {
  id?: string;
  displayName?: string;
  designerProperties?: DesignerProperty[];
  type: number;
  renderAsHtmlTag?: string;
  renderedHtmlTagType?: string;
}
