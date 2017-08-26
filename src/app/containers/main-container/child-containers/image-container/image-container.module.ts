import { NgModule } from '@angular/core';
import { GlobalSharedModule } from '../../../../shared';
import { ImageContainerComponent } from './image-container.component';
import { ImageContainerDirective } from './image-container.directive';
import { ImageContainerService } from './image-container.service';

@NgModule({
    imports: [
        GlobalSharedModule,
    ],
    exports: [
        ImageContainerComponent,
    ],
    declarations: [
        ImageContainerComponent,
        ImageContainerDirective,
    ],
    providers: [
        ImageContainerService,
    ],
})
export class ImageContainerModule { }
