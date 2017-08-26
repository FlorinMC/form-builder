import { Task } from './task-container/task-container.model';
import { ToolboxItem } from './toolbox-panel/toolbox-panel.model';
export interface MainContainerModel {
  id: string;
  toolboxItems: ToolboxItem[];
  task: Task;
}

export interface DesignerProperty {
  id?: string; // added in client
  displayInfo?: string;
  value: string;
  propertyHtmlTag?: string;
  propertyHtmlTagType?: string;
  htmlAttributes?: HtmlAttribute[];
}

export interface HtmlAttribute {
  propertyName: string;
  propertyValue: string;
}
