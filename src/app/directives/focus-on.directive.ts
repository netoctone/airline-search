import { Directive, Input, SimpleChanges, ElementRef, Renderer } from '@angular/core';

@Directive({
  selector: '[focusOn]'
})
export class FocusOnDirective {

  @Input() focusOn: boolean;

  constructor(private ref: ElementRef, private renderer: Renderer) { }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.focusOn && this.focusOn) {
      setTimeout(() => {
        this.renderer.invokeElementMethod(this.ref.nativeElement, 'focus');
      }, 0);
    }
  }

}
