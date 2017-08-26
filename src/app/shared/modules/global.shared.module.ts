import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { DndModule } from 'ng2-dnd';
import { ClickOutsideDirective, DebounceClickDirective } from '../directives';
import {
  ErrorHandlingService,
  SnackbarService,
  ToastrAppService,
} from '../services/index';
import { WebApiService } from '../services/web-api.service';
import { MaterialDesignModule } from './material-design.module';

@NgModule(
  {
    imports: [
      RouterModule,
      BrowserModule,
      FlexLayoutModule,
      MaterialDesignModule,
      DndModule,
    ],
    exports: [
      RouterModule,
      BrowserModule,
      MaterialDesignModule,
      FlexLayoutModule,
      ClickOutsideDirective,
      DndModule,
    ],
    declarations: [
      ClickOutsideDirective,
      DebounceClickDirective,
    ],
    providers: [
      SnackbarService,
      ToastrAppService,
      ErrorHandlingService,
      WebApiService,
    ],
  })

export class GlobalSharedModule {
}
