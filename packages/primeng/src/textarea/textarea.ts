import { AfterViewInit, booleanAttribute, Directive, EventEmitter, HostListener, inject, Input, NgModule, OnDestroy, OnInit, Output } from '@angular/core';
import { NgControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { TextareaStyle } from './style/textareastyle';
import { BaseInput } from 'primeng/baseinput';

/**
 * Textarea adds styling and autoResize functionality to standard textarea element.
 * @group Components
 */
@Directive({
    selector: '[pTextarea], [pInputTextarea]',
    standalone: true,
    host: {
        '[class]': "cx('root')",
        '[attr.pattern]': 'pattern()',
        '[attr.min]': 'min()',
        '[attr.max]': 'max()',
        '[attr.maxlength]': 'maxlength()',
        '[attr.size]': 'size()',
        '[attr.required]': 'required()',
        '[attr.disabled]': 'disabled()',
        '[attr.name]': 'name()'
    },
    providers: [TextareaStyle]
})
export class Textarea extends BaseInput implements OnInit, AfterViewInit, OnDestroy {
    /**
     * When present, textarea size changes as being typed.
     * @group Props
     */
    @Input({ transform: booleanAttribute }) autoResize: boolean | undefined;
    /**
     * Defines the size of the component.
     * @group Props
     */
    @Input() pSize: 'large' | 'small';
    /**
     * Callback to invoke on textarea resize.
     * @param {(Event | {})} event - Custom resize event.
     * @group Emits
     */
    @Output() onResize: EventEmitter<Event | {}> = new EventEmitter<Event | {}>();

    ngModelSubscription: Subscription | undefined;

    ngControlSubscription: Subscription | undefined;

    _componentStyle = inject(TextareaStyle);

    ngControl = inject(NgControl, { optional: true, self: true });

    ngOnInit() {
        super.ngOnInit();
        if (this.ngControl) {
            this.ngControlSubscription = (this.ngControl as any).valueChanges.subscribe(() => {
                this.updateState();
            });
        }
    }

    ngAfterViewInit() {
        super.ngAfterViewInit();
        if (this.autoResize) this.resize();

        this.cd.detectChanges();
    }

    ngAfterViewChecked() {
        if (this.autoResize) this.resize();
    }

    @HostListener('input', ['$event'])
    onInput(e: Event) {
        this.writeModelValue(e.target['value']);
        this.updateState();
    }

    resize(event?: Event) {
        this.el.nativeElement.style.height = 'auto';
        this.el.nativeElement.style.height = this.el.nativeElement.scrollHeight + 'px';

        if (parseFloat(this.el.nativeElement.style.height) >= parseFloat(this.el.nativeElement.style.maxHeight)) {
            this.el.nativeElement.style.overflowY = 'scroll';
            this.el.nativeElement.style.height = this.el.nativeElement.style.maxHeight;
        } else {
            this.el.nativeElement.style.overflow = 'hidden';
        }

        this.onResize.emit(event || {});
    }

    updateState() {
        if (this.autoResize) {
            this.resize();
        }
    }

    ngOnDestroy() {
        if (this.ngModelSubscription) {
            this.ngModelSubscription.unsubscribe();
        }

        if (this.ngControlSubscription) {
            this.ngControlSubscription.unsubscribe();
        }

        super.ngOnDestroy();
    }
}

@NgModule({
    imports: [Textarea],
    exports: [Textarea]
})
export class TextareaModule {}
