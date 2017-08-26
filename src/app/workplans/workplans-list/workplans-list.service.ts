import { HttpResponse } from '@angular/common/http/src/response';
import { Injectable } from '@angular/core';
import { WebApiService } from '../../shared/services';
import { Workplan } from '../workplan/workplan.model';

@Injectable()
export class WorkplansListService {

  constructor(
    private webApiService: WebApiService,
  ) { }

  public async getWorkplansList(): Promise<HttpResponse<Workplan[]>> {
    const url: string = 'assets/workplans.json';
    // const url: string = 'http://172.28.67.25:8080/Database.json';
    return await <Promise<HttpResponse<Workplan[]>>>this.webApiService.getService(url);
  }
}
