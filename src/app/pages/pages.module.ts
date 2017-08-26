import { NgModule } from '@angular/core';
import { HomeModule } from './home/home.module';
import { NoContentModule } from './no-content/no-content.module';

@NgModule({
    imports: [
        HomeModule,
        NoContentModule,
    ],
    exports: [
        HomeModule,
        NoContentModule,
    ],
    declarations: [],
    providers: [],
})

export class PagesModule {
}
