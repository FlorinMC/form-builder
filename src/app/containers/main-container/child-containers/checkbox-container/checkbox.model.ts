import { DesignerProperty } from '../../main-container.model';

export interface Checkbox {
    displayName: string;
    designerProperties: DesignerProperty[];
    renderAsHtmlTag: string;
    renderedHtmlTagType: string;
    type: string;
    id: number;
}
