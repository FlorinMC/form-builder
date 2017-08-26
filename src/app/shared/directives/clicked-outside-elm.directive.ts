import { Directive, ElementRef, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/do';

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[click-outside]',
})

export class ClickOutsideDirective implements OnInit, OnDestroy {
  private listening: boolean;
  private globalClick: Subscription;
  @Output('clickOutside') public clickOutside: EventEmitter<object>;

  constructor(private elRef: ElementRef) {
    this.listening = false;
    this.clickOutside = new EventEmitter();
  }

  public ngOnInit(): void {
    this.globalClick = Observable
      .fromEvent(document, 'click')
      .delay(1)
      .do(() => {
        this.listening = true;
      }).subscribe((event: MouseEvent) => {
        event.stopPropagation();
        this.onGlobalClick(event);
      });
  }

  public ngOnDestroy(): void {
    this.globalClick.unsubscribe();
  }

  public onGlobalClick(event: MouseEvent): void {
    if (event instanceof MouseEvent && this.listening) {
      if (this.isDescendant(this.elRef.nativeElement, event.target)) {
        // Is inside
        this.clickOutside.emit({
          target: (event.target || null),
          value: false,
        });
      } else {
        // Is outside
        this.clickOutside.emit({
          target: (event.target || null),
          value: true,
        });
      }
    }
  }

  public isDescendant(parent, child): boolean {
    const specialElementClasses = ['cdk-overlay-container', 'mat-dialog-actions'];
    let node = child;
    while (node !== null) {
      if (node === parent) {
        return true;
      } else {
        if (this.anyMatchInArray(node.classList, specialElementClasses)) {
          return true;
        }
        node = node.parentNode;
      }
    }
    return false;
  }

  public anyMatchInArray(classList: Array<{}>, toMatch: string[]): boolean {
    let found: boolean;
    let targetMap;
    let i;
    let j;
    let cur;
    let target;

    if (classList === undefined) {
      target = new Array<{}>();
    } else {
      target = classList;
    }

    found = false;
    targetMap = {};

    for (i = 0, j = target.length; i < j; i++) {
      cur = target[i];
      targetMap[cur] = true;
    }

    for (i = 0, j = toMatch.length; !found && (i < j); i++) {
      cur = toMatch[i];
      found = !!targetMap[cur];
    }
    return found;
  }
}
