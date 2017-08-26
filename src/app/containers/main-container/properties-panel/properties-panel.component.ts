import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'app-properties-panel',
    templateUrl: 'properties-panel.component.html',
    styleUrls: ['properties-panel.component.scss'],
})
export class PropertiesPanelComponent implements OnInit {
    // tslint:disable:no-any
    public showConfigPanel: boolean = false;
    @Input() public isComponentInserted: boolean = false;

    constructor() {
        ///
    }
    public ngOnInit(): void {
        ///

    }
}
