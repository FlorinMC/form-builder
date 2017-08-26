import { Component, OnInit } from '@angular/core';
import { TaskContainerService } from '../task-container/task-container.service';
import { WorkplanContainerPropertiesService } from './workplan-container-properties/index';
import { WorkplanContainerService } from './workplan-container.service';

@Component({
    selector: 'app-workplan-container',
    templateUrl: 'workplan-container.component.html',
    styleUrls: ['workplan-container.component.scss'],
})
export class WorkplanContainerComponent implements OnInit {
    public isMdCardSelected: boolean = true;
    public workplanTitle: string;
    public workplanDescription: string;

    constructor(
        private workplanContainerService: WorkplanContainerService,
        private workplanContainerPropertiesService: WorkplanContainerPropertiesService,
        private taskContainerService: TaskContainerService,
    ) { }

    public ngOnInit(): void {
        this.onTaskboxEventEmit();
        this.onWorkplanNameChange();
        this.onWorkplanDescriptionChange();
    }
    public onWorkplanContainerClick(): void {
        this.workplanContainerService.insertClickData(true);
        this.isMdCardSelected = true;
    }

    private onTaskboxEventEmit(): void {
        this.taskContainerService.isClickedEvent.subscribe(
            (isClickEvent: boolean) => {
                if (isClickEvent) {
                    this.isMdCardSelected = false;
                }
            });
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
