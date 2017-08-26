import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class ProgressBarService {

    private progressBarSource = new Subject<string>();
    public toggleProgressBar = this.progressBarSource.asObservable();

    public toggleOn(): void {
        this.progressBarSource.next('show');
    }

    public toggleOff(): void {
        this.progressBarSource.next('hide');
    }
}
