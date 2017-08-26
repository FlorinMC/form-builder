import { Directive, EventEmitter, HostListener, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/debounceTime';

@Directive({
    selector: '[appDebounceClick]',
})
export class DebounceClickDirective implements OnInit, OnDestroy {
    @Input() public debounceTime: number = 500;
    @Output() public debounceClick: EventEmitter<MouseEvent> = new EventEmitter();
    private clicks: Subject<MouseEvent> = new Subject();
    private subscription: Subscription;

    public ngOnInit(): void {
        this.subscription = this.clicks.debounceTime(this.debounceTime)
            .subscribe((event: MouseEvent) => {
                this.debounceClick.emit(event);
            });
    }

    public ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }

    @HostListener('click', ['$event'])
    public clickEvent(event: MouseEvent): void {
        event.preventDefault();
        event.stopPropagation();
        this.clicks.next(event);
    }
}
