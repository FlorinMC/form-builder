import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { ToolboxItem } from '../../toolbox-panel';
import { ToolboxPanelService } from '../../toolbox-panel';
import { ChildContainerModel } from '../child-container.model';
import { ImageContainerService } from './image-container.service';

@Component({
  selector: 'app-image-container',
  templateUrl: 'image-container.component.html',
  styleUrls: ['image-container.component.scss'],
})
export class ImageContainerComponent implements OnInit {
  public childContainerModel: ChildContainerModel = new ChildContainerModel();

  constructor(
    private toolboxPanelService: ToolboxPanelService,
    private imageContainerService: ImageContainerService,
  ) { }
  public ngOnInit(): void {
    this.toolboxPanelService.toolbarContextItems.subscribe((toolbarContextItems: ToolboxItem[]) => {
      if (toolbarContextItems) {
        const toolbarContextItem: ToolboxItem = this.getImageboxDesignerProperties(toolbarContextItems);
        if (toolbarContextItem) {
          if (toolbarContextItem.designerProperties.length > 0) {
            this.imageContainerService.insertDesignerProperties(toolbarContextItem.designerProperties);
          }
        }
      }
    }, (error: Error) => {
      Observable.throw(new Error(`Timeout or error ${error}`));
    });
  }
  private getImageboxDesignerProperties(toolbarContextItems: ToolboxItem[]): ToolboxItem {
    return toolbarContextItems.find((toolbarContextItem: ToolboxItem) => {
      return toolbarContextItem.displayName === this.childContainerModel.image;
    });
  }
}
