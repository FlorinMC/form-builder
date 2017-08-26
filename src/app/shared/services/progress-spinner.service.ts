import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class ProgressSpinnerService {
    private progressSpinnerState$ = new Subject<boolean>();
    public progressSpinnerState = this.progressSpinnerState$.asObservable();

    public show(): void {
        this.progressSpinnerState$.next(true);
    }

    public hide(): void {
        this.progressSpinnerState$.next(false);
    }
}
