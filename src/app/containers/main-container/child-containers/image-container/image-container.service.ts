import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Rx';
import { DesignerProperty } from '../../index';

@Injectable()
export class ImageContainerService {
    public designerProperty: BehaviorSubject<DesignerProperty[]> = new BehaviorSubject<DesignerProperty[]>([]);
    public imageContainerdesignerProperty: Observable<DesignerProperty[]> = this.designerProperty.asObservable();
    public static imageboxContainerPropertiesModel: Subject<string> = new Subject<string>();
    public static imageboxContainerPropertiesModelData: Observable<string> =
    ImageContainerService.imageboxContainerPropertiesModel.asObservable();

    public static insertTaskboxModel(data: string): void {
        ImageContainerService.imageboxContainerPropertiesModel.next(data);
    }

    public insertDesignerProperties(data: DesignerProperty[]): void {
        this.designerProperty.next(data);
    }
}
