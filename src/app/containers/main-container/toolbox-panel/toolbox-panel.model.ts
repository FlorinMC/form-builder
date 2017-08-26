import { DesignerProperty } from '../main-container.model';

export class ToolboxItem {
  public id?: string;
  public displayName?: string;
  public designerProperties?: DesignerProperty[];
  public type?: number | string;
  public renderAsHtmlTag?: string;
  public renderedHtmlTagType?: string;
}

export interface Widget {
  id?: string;
  icon?: string;
  title?: string;
}

export enum WidgetsNames {
  Task = 'TaskBox',
  Checkbox = 'CheckBox',
  Picture = 'Picture',
  Text = 'Text',
}

export enum WidgetsIcons {
  Task = 'label',
  Checkbox = 'check_box',
  Picture = 'photo',
  Text = 'title',
  Default = 'lens',
}
