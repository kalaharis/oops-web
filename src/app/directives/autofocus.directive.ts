import { Directive, ElementRef, AfterViewInit } from '@angular/core';

@Directive({
    selector: '[ngAutofocus]'
})
export class AutofocusDirective implements AfterViewInit {
    constructor(private elementRef: ElementRef) { };

    ngAfterViewInit() {
        this.elementRef.nativeElement.focus();
    }
}