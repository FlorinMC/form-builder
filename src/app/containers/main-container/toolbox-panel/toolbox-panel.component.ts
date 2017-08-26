import { HttpResponse } from '@angular/common/http/src/response';
import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import { WebApiService } from '../../../shared/services/web-api.service';
import { MainContainerModel } from '../main-container.model';
import { MainContainerService } from '../main-container.service';
import { ToolboxItem, Widget, WidgetsIcons, WidgetsNames } from './toolbox-panel.model';
import { ToolboxPanelService } from './toolbox-panel.service';

@Component({
  selector: 'app-toolbox-panel',
  templateUrl: 'toolbox-panel.component.html',
  styleUrls: ['toolbox-panel.component.scss'],
})
export class ToolboxPanelComponent implements OnInit {
  public taskBoxWidget: Widget = {
    icon: WidgetsIcons.Task,
    title: WidgetsNames.Task,
  };

  public widgets: Widget[] = [];
  private toolboxItems: ToolboxItem[] = [];

  @Input() public isComponentInserted: boolean = false;

  constructor(
    private mainContainerService: MainContainerService,
    private toolboxPanelService: ToolboxPanelService,
    private webApiService: WebApiService,
  ) { }

  public ngOnInit(): void {
    // this.setHtmlWidgetElements();
  }

  private setHtmlWidgetElements(): void {
    console.log('setHtmlWidgetElements: ', this.setHtmlWidgetElements);
    const widgets: Observable<HttpResponse<MainContainerModel>>
      = Observable.fromPromise(this.mainContainerService.getToolbarContextModel());
    widgets.subscribe(async (resp: HttpResponse<MainContainerModel>) => {
      const response: HttpResponse<MainContainerModel> = await resp;
      if (response) {

        const toolboxItems: ToolboxItem[] = response.body && response.body.toolboxItems;
        this.toolboxItems = [...this.toolboxItems, ...toolboxItems];
        this.toolboxPanelService.insertToolbarContextItems(this.toolboxItems);
        this.getToolboxItemsWidgetsIcons(this.toolboxItems);
      }
    }, (err: Error) => {
      this.webApiService.checkErrorFault(err);
    });
  }

  private getToolboxItemsWidgetsIcons(toolboxItems: ToolboxItem[]): void {
    this.widgets = toolboxItems.map((toolboxItem: ToolboxItem) => {
      const widget: Widget = { title: toolboxItem.displayName };
      if (toolboxItem.displayName === WidgetsNames.Text) {
        return { ...widget, ...{ icon: WidgetsIcons.Text } };
      }
      if (toolboxItem.displayName === WidgetsNames.Checkbox) {
        return { ...widget, ...{ icon: WidgetsIcons.Checkbox } };
      }
      if (toolboxItem.displayName === WidgetsNames.Picture) {
        return { ...widget, ...{ icon: WidgetsIcons.Picture } };
      }
      return { ...widget, ...{ icon: WidgetsIcons.Default } };
    });
  }
}
