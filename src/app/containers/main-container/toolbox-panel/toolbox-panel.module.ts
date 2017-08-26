import { NgModule } from '@angular/core';
import { GlobalSharedModule } from '../../../shared/index';
import { ToolboxPanelComponent } from './toolbox-panel.component';
import { ToolboxPanelService } from './toolbox-panel.service';

@NgModule({
    imports: [
        GlobalSharedModule,
    ],
    exports: [
        ToolboxPanelComponent,
    ],
    declarations: [
        ToolboxPanelComponent,
    ],
    providers: [
        ToolboxPanelService,
    ],
})
export class ToolboxPanelModule { }
