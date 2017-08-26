import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { NoContentComponent } from './no-content.component';

describe('NoContentComponent', () => {
    let comp: NoContentComponent;
    let fixture: ComponentFixture<NoContentComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [ NoContentComponent ],
            schemas: [ NO_ERRORS_SCHEMA ]
        });
        fixture = TestBed.createComponent(NoContentComponent);
        comp = fixture.componentInstance;
    });

    it('can load instance', () => {
        expect(comp).toBeTruthy();
    });

    it('portalAppUrl defaults to: environment.portalAppUrl', () => {
        expect(comp.portalAppUrl).toEqual(environment.portalAppUrl);
    });

});
