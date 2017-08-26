import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { ToolboxItem, ToolboxPanelService } from '../../toolbox-panel';
import { ChildContainerModel } from '../child-container.model';
import { CheckboxContainerService } from './checkbox-container.service';

@Component({
  selector: 'app-checkbox-container',
  templateUrl: 'checkbox-container.component.html',
  styleUrls: ['checkbox-container.component.scss'],
})
export class CheckboxContainerComponent implements OnInit {
  public childContainerModel: ChildContainerModel = new ChildContainerModel();
  public showConfigPanel: boolean = false;

  constructor(
    private toolboxPanelService: ToolboxPanelService,
    private checkboxContainerService: CheckboxContainerService,
  ) { }
  public ngOnInit(): void {
    this.toolboxPanelService.toolbarContextItems.subscribe((toolbarContextItems: ToolboxItem[]) => {
      if (toolbarContextItems) {
        const toolbarContextItem: ToolboxItem = this.getCheckboxboxDesignerProperties(toolbarContextItems);
        if (toolbarContextItem) {
          if (toolbarContextItem.designerProperties.length > 0) {
            this.checkboxContainerService.insertDesignerProperties(toolbarContextItem.designerProperties);
          }
        }
      }
    }, (error: Error) => {
      Observable.throw(new Error(`Timeout or error ${error}`));
    });
  }

  private getCheckboxboxDesignerProperties(toolbarContextItems: ToolboxItem[]): ToolboxItem {
    return toolbarContextItems.find((toolbarContextItem: ToolboxItem) => {
      return toolbarContextItem.displayName === this.childContainerModel.checkbox;
    });
  }
}
