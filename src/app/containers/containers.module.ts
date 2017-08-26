import { NgModule } from '@angular/core';
import { MainContainerModule } from './main-container/main-container.module';

@NgModule({
    imports: [
        MainContainerModule,
    ],
    exports: [
        MainContainerModule,
    ],
    declarations: [],
    providers: [],
})

export class ContainersModule {
}
