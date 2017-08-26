export interface IToolbarContextModel {
    ToolbarContext: IToolbarContext[];
}

export interface IToolbarContext {
    id: string;
    displayName: string;
    type: string;
    label: string;
    labelValue: string;
    designerProperties?: IDesignerProperty[];
    src?: string;
}

export interface IDesignerProperty {
    displayInfo: string;
    value?: number | string;
    required?: boolean;
    maxLength?: number;
    minLength?: number;
    placeholder?: string;
    name?: string;
    step?: number;
    max?: number;
    min?: number;
}
