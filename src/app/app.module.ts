import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DndModule } from 'ng2-dnd';
import { ToastrModule } from 'ngx-toastr';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CommonModule } from './common/common.module';
import { ContainersModule } from './containers/containers.module';
import { PagesModule } from './pages/pages.module';
import { MaterialDesignModule } from './shared/modules/material-design.module';

// tslint:disable-next-line:no-any
const APP_PROVIDERS: any[] = [
];

@NgModule({
  bootstrap: [AppComponent],
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    ReactiveFormsModule,
    PagesModule,
    ContainersModule,
    CommonModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({ maxOpened: 1, autoDismiss: true }),
    FlexLayoutModule,
    AppRoutingModule,
    MaterialDesignModule,
    DndModule.forRoot(),
    HttpClientModule,
  ],
  providers: [
    APP_PROVIDERS,
  ],
})
export class AppModule {
}
