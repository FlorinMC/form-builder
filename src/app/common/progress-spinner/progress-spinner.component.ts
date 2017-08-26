import { Component, OnInit } from '@angular/core';
import { ProgressSpinnerService } from '../../shared/services/progress-spinner.service';

@Component({
    selector: 'app-progress-spinner',
    templateUrl: 'progress-spinner.component.html',
    styleUrls: ['progress-spinner.component.scss'],
})
export class ProgressSpinnerComponent implements OnInit {

    public progressSpinner: boolean;

    constructor(private progressSpinnerService: ProgressSpinnerService) {
        this.progressSpinner = false;
    }

    public ngOnInit(): void {
        this.progressSpinnerService.progressSpinnerState.subscribe((state) => {
            this.progressSpinner = state;
        });
    }

}
