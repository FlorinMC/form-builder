import { NgModule } from '@angular/core';
import { GlobalSharedModule } from '../../../shared/index';
import { PropertiesPanelComponent } from './properties-panel.component';
import { PropertiesPanelService } from './properties-panel.service';

@NgModule({
    imports: [
        GlobalSharedModule,
    ],
    exports: [
        PropertiesPanelComponent,
    ],
    declarations: [
        PropertiesPanelComponent,
    ],
    providers: [
        PropertiesPanelService,
    ],
})
export class PropertiesPanelModule { }
