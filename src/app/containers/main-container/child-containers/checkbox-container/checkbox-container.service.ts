import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject, Subject } from 'rxjs/Rx';
import { DesignerProperty } from '../..';

@Injectable()
export class CheckboxContainerService {
    public designerProperty: BehaviorSubject<DesignerProperty[]> = new BehaviorSubject<DesignerProperty[]>([]);
    public checkboxContainerdesignerProperty: Observable<DesignerProperty[]> = this.designerProperty.asObservable();
    public static checkboxboxContainerPropertiesModel: Subject<string> = new Subject<string>();
    public static checkboxboxContainerPropertiesModelData: Observable<string> =
    CheckboxContainerService.checkboxboxContainerPropertiesModel.asObservable();

    public static insertTaskboxModel(data: string): void {
        CheckboxContainerService.checkboxboxContainerPropertiesModel.next(data);
    }

    public insertDesignerProperties(data: DesignerProperty[]): void {
        this.designerProperty.next(data);
    }
}
