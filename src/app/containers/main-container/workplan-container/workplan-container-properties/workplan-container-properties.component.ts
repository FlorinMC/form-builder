import { Component } from '@angular/core';
import { WorkplanContainerPropertiesService } from './workplan-container-properties.service';

@Component({
    selector: 'app-default-container-properties',
    templateUrl: 'workplan-container-properties.component.html',
    styleUrls: ['workplan-container-properties.component.scss'],
})
export class WorkplanContainerPropertiesComponent {
    public workplanDescription: string;
    public workplanTitle: string;
    // tslint:disable:no-any

    constructor(
        private workplanContainerPropertiesService: WorkplanContainerPropertiesService,
    ) {
        this.onWorkplanNameChange();
        this.onWorkplanDescriptionChange();
    }
    public onInputChanged(event: any): void {
        const value: string = event && event.target.value;
        this.workplanContainerPropertiesService.insertInputData(value);
    }
    public onTextareaChanged(event: any): void {
        const value: string = event && event.target.value;
        this.workplanContainerPropertiesService.insertTextareaData(value);
    }

    public onInputClicked(): void {
        if (this.workplanTitle === WorkplanContainerPropertiesService.defaultWorkplanTitle) {
            this.workplanTitle = '';
        }
    }
    public onTextareaClicked(): void {
        if (this.workplanDescription === WorkplanContainerPropertiesService.defaultWorkplanDescription) {
            this.workplanDescription = '';
        }
    }

    private onWorkplanNameChange(): void {
        this.workplanContainerPropertiesService.inputData.subscribe(
            (inputData: string) => {
                this.workplanTitle = inputData;
            });
    }

    private onWorkplanDescriptionChange(): void {
        this.workplanContainerPropertiesService.textareaData.subscribe(
            (textareaData: string) => {
                this.workplanDescription = textareaData;
            });
    }
}
