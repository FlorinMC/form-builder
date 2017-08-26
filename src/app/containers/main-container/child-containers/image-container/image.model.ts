import { DesignerProperty } from '../../main-container.model';
export interface Image {
    displayName: string;
    designerProperties: DesignerProperty[];
    src?: string;
    renderAsHtmlTag: string;
    renderedHtmlTagType: string;
    type: string;
    id: number;
}
