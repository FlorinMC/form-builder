import { Component } from '@angular/core';
import { ProgressBarService } from '../../shared/services';

@Component({
    selector: 'app-progress-bar',
    templateUrl: 'progress-bar.component.html',
    styleUrls: ['progress-bar.component.scss'],
})
export class ProgressBarComponent {
    public hideProgressBar: boolean;

    constructor(private progressBarService: ProgressBarService) {
        this.hideProgressBar = true;
    }

    public ngOnInit(): void {
        this.progressBarService.toggleProgressBar.subscribe((action) => {
            if (action === 'show') {
                this.hideProgressBar = false;
            } else {
                this.hideProgressBar = true;
            }
        });
    }
}
