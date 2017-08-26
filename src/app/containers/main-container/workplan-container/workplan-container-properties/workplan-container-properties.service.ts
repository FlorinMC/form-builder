import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class WorkplanContainerPropertiesService {

    public static defaultWorkplanTitle: string = 'New workplan name';
    public static defaultWorkplanDescription: string = 'Workplan content description';
    public input: BehaviorSubject<string> =
    new BehaviorSubject<string>(WorkplanContainerPropertiesService.defaultWorkplanTitle);
    public inputData: Observable<string> = this.input.asObservable();
    public textarea: BehaviorSubject<string> =
    new BehaviorSubject<string>(WorkplanContainerPropertiesService.defaultWorkplanDescription);
    public textareaData: Observable<string> = this.textarea.asObservable();

    public insertInputData(data: string): void {
        const title: string = data !== '' ? data : WorkplanContainerPropertiesService.defaultWorkplanTitle;
        this.input.next(title);
    }

    public insertTextareaData(data: string): void {
        const description: string = data !== '' ? data : WorkplanContainerPropertiesService.defaultWorkplanDescription;

        this.textarea.next(description);
    }
}
