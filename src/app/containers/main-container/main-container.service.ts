import { HttpResponse } from '@angular/common/http/src/response';
import { ComponentFactoryResolver, Inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs/Rx';
import { WebApiService } from '../../shared/services/web-api.service';
import { Workplan } from '../../workplans/workplan/workplan.model';
import { Task } from '../main-container/task-container/task-container.model';
import { MainContainerModel } from './main-container.model';

@Injectable()
export class MainContainerService {
  // tslint:disable:no-any
  private rootViewContainer: any;
  public workplan: BehaviorSubject<Workplan> = new BehaviorSubject<Workplan>(null);
  public workplanToEdit: Observable<Workplan> = this.workplan.asObservable();

  constructor(
    @Inject(ComponentFactoryResolver) private factoryResolver: any,
    private webApiService: WebApiService,
  ) {
    this.factoryResolver = factoryResolver;
  }

  public setRootViewContainerRef(viewContainerRef: any): void {
    this.rootViewContainer = viewContainerRef;
  }

  public removePreviousComponent(): void {
    this.rootViewContainer.remove();
  }
  public addDynamicComponent(componentToBeInserted: any, task?: Task): void {
    if (!componentToBeInserted) {
      return;
    }
    const factory: any = this.factoryResolver.resolveComponentFactory(componentToBeInserted);
    const component: any = factory.create(this.rootViewContainer.parentInjector);
    if (task) {
      component.instance.currentTask = task;
    }
    this.rootViewContainer.insert(component.hostView);
  }
  public async getToolbarContextModel(): Promise<HttpResponse<MainContainerModel>> {
    const url: string = 'assets/toolbox.json';
    // const url: string = 'http://localhost:3000/db';
    return await <Promise<HttpResponse<MainContainerModel>>>this.webApiService.getService(url);
  }

  public insertWorkplanToEdit(workplan: Workplan): void {
    this.workplan.next(workplan);
  }
}
