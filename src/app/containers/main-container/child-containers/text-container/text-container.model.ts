import { DesignerProperty } from '../../main-container.model';
export interface TextToolBoxItem {
    displayName?: string;
    designerProperties?: DesignerProperty[];
    renderAsHtmlTag?: string;
    renderedHtmlTagType?: string;
    type?: number | string;
    id?: string;
}
