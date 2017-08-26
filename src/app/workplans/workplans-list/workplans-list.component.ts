import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import { WebApiService } from '../../shared/services/web-api.service';
import { Workplan } from '../workplan/workplan.model';
import { WorkplansListService } from './workplans-list.service';

@Component({
  selector: 'app-workplans-list',
  templateUrl: 'workplans-list.component.html',
  styleUrls: ['./workplans-list.component.scss'],
})

export class WorkplansListComponent implements OnInit {
  public workplansList: Workplan[];
  public workplans: Observable<HttpResponse<Workplan[]>> = null;

  constructor(
    private workplansListService: WorkplansListService,
    private webApiService: WebApiService,
  ) { }

  public ngOnInit(): void {
    this.getWorkplansListItems();
  }

  private getWorkplansListItems(): void {
    this.workplans = Observable.fromPromise(this.workplansListService.getWorkplansList());
    this.workplans.subscribe(async (resp: HttpResponse<Workplan[]>) => {
      const response: HttpResponse<Workplan[]> = await resp;
      if (response) {
        const workplansList: Workplan[] = response && response.body;
        this.workplansList = workplansList.map((workplan: Workplan): Workplan => {
          return workplan;
        });
      }
    }, (err: Error) => {
      this.webApiService.checkErrorFault(err);
    });
  }
}
