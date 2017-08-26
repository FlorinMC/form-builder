import { NgModule } from '@angular/core';
import { GlobalSharedModule } from '../../../../shared';
import { TextContainerComponent } from './text-container.component';
import { TextContainerDirective } from './text-container.directive';
import { TextContainerService } from './text-container.service';

@NgModule({
    imports: [
        GlobalSharedModule,
    ],
    exports: [
        TextContainerComponent,
    ],
    declarations: [
        TextContainerComponent,
        TextContainerDirective,
    ],
    providers: [
        TextContainerService,
    ],
})
export class TextContainerModule { }
