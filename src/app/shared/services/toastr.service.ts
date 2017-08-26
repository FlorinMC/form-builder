import { Injectable } from '@angular/core';
import { IndividualConfig, ToastrService } from 'ngx-toastr';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ToastrAppService {
    private toastrBooleanSource: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    public toastrBoolean: Observable<boolean> = this.toastrBooleanSource.asObservable();

    public insertToastrFlag(flag: boolean): void {
        this.toastrBooleanSource.next(flag);
    }

    constructor(private toastrService: ToastrService) { }

    public showSuccess(
        message: string = null,
        title: string = null,
        options: IndividualConfig = {
            positionClass: 'toast-top-center',
            timeOut: 5000,
            closeButton: false,
        },
    ): void {
        this.toastrService.success(message, title, options).onHidden.subscribe((): void => this.insertToastrFlag(true));
    }

    public showError(
        message: string = null,
        title: string = null,
        options: IndividualConfig = {
            positionClass: 'toast-top-center',
            timeOut: 5000,
            closeButton: false,
        },
    ): void {
        this.toastrService.error(message, title, options);
    }
}
