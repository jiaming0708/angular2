import { Directive, ElementRef, Input } from '@angular/core';
@Directive({
  selector: '[myHighlight]',
  host: {
    '(mouseenter)': 'onMouseEnter()',
    '(mouseleave)': 'onMouseLeave()'
  }
})
export class HighlightDirective {
  constructor(el: ElementRef) {
     this.el = el.nativeElement;
  }
  @Input('myHighlight') highlightColor:string;

  private el:HTMLElement;
  private _defaultColor = 'red';

  onMouseEnter(){
    this.highlight(this.highlightColor || this._defaultColor);
  }

  onMouseLeave(){
    this.highlight(null);
  }

  private highlight(color: string) {
    this.el.style.backgroundColor = color;
  }
}
