import { NgModule } from '@angular/core';
import { GlobalSharedModule } from '../../../../shared';
import { CheckboxContainerComponent } from './checkbox-container.component';
import { CheckboxContainerDirective } from './checkbox-container.directive';
import { CheckboxContainerService } from './checkbox-container.service';

@NgModule({
    imports: [
        GlobalSharedModule,
    ],
    exports: [
        CheckboxContainerComponent,
    ],
    declarations: [
        CheckboxContainerComponent,
        CheckboxContainerDirective,
    ],
    providers: [
        CheckboxContainerService,
    ],
})
export class CheckboxContainerModule { }
