import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Rx';
import { DesignerProperty } from '../../index';
import { ToolboxItem } from '../../toolbox-panel/toolbox-panel.model';
import { TextToolBoxItem } from './text-container.model';

@Injectable()
export class TextContainerService {
  public designerProperty: Subject<DesignerProperty[]> = new Subject<DesignerProperty[]>();
  public textContainerdesignerProperty: Observable<DesignerProperty[]> = this.designerProperty.asObservable();

  public taskBlock: BehaviorSubject<ToolboxItem> = new BehaviorSubject<ToolboxItem>(null);
  public clickedTaskBlock: Observable<ToolboxItem> = this.taskBlock.asObservable();
  public static textboxContainerPropertiesModel: Subject<TextToolBoxItem> = new Subject<TextToolBoxItem>();
  public static textboxContainerPropertiesModelData: Observable<TextToolBoxItem> =
  TextContainerService.textboxContainerPropertiesModel.asObservable();

  public static insertTextboxModel(textModel: TextToolBoxItem): void {
    TextContainerService.textboxContainerPropertiesModel.next(textModel);
  }

  public insertDesignerProperties(designerProperties: DesignerProperty[]): void {
    if (designerProperties.length !== 0) {
      this.designerProperty.next(designerProperties);
    }
  }
  public insertClickedTaskBlock(taskBlock: ToolboxItem): void {
    this.taskBlock.next(taskBlock);
  }
}
