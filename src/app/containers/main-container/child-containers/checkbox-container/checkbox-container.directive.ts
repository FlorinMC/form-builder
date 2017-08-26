import { Directive, ElementRef, OnInit, Renderer } from '@angular/core';
import { HtmlAttribute } from '../..';
import { DesignerProperty } from '../..';
import { CheckboxContainerService } from './checkbox-container.service';

@Directive({
  selector: '[appCheckboxContainerRenderer]',
})
export class CheckboxContainerDirective implements OnInit {
  private nativeElement: Node;

  constructor(
    private renderer: Renderer,
    private element: ElementRef,
    private checkboxContainerService: CheckboxContainerService,

  ) {
    this.nativeElement = this.element.nativeElement;
  }
  private onInput(event: Event): void {
    const data: string = event && (event.target as HTMLTextAreaElement).value;
    CheckboxContainerService.insertTaskboxModel(data);
  }

  public ngOnInit(): void {

    this.checkboxContainerService.checkboxContainerdesignerProperty.subscribe((designerProperty: DesignerProperty[]) => {

      designerProperty.forEach((property: DesignerProperty) => {

        const container: Renderer = this.renderer.createElement(this.nativeElement, 'div');
        this.renderer.setElementClass(container, 'container', true);

        const form: Renderer = this.renderer.createElement(this.nativeElement, 'form');
        this.renderer.projectNodes(container, [form]);

        const wrapper: Renderer = this.renderer.createElement(this.nativeElement, 'div');
        const wrapperClass: string = property.propertyHtmlTagType === 'checkbox' ? 'checkbox' : 'form-group';
        this.renderer.setElementClass(wrapper, `${wrapperClass}`, true);
        this.renderer.projectNodes(form, [wrapper]);

        const input: Renderer = this.renderer.createElement(this.nativeElement, `${property.propertyHtmlTag}`);
        this.renderer.setElementAttribute(input, 'type', `${property.propertyHtmlTagType}`);

        this.renderer.createText(input, `${property.value}`);
        this.renderer.listen(input, 'input', this.onInput);

        const label: Renderer = this.renderer.createElement(this.nativeElement, 'label');
        const labelClass: string = property.propertyHtmlTagType === 'checkbox' ? null : 'control-label';
        this.renderer.setElementClass(label, `${labelClass}`, true);
        this.renderer.createText(label, `${property.displayInfo}`);

        const underline: Renderer = this.renderer.createElement(this.nativeElement, 'i');
        const underlineClass: string = property.propertyHtmlTagType === 'checkbox' ? 'helper' : 'bar';
        this.renderer.setElementClass(underline, `${underlineClass}`, true);

        if (property.propertyHtmlTagType === 'checkbox') {
          this.renderer.projectNodes(wrapper, [label]);
          this.renderer.projectNodes(label, [input, underline]);
        } else {
          this.renderer.projectNodes(wrapper, [input, label, underline]);
        }

        property.htmlAttributes.forEach((htmlAttribute: HtmlAttribute) => {
          this.renderer.setElementAttribute(input, `${htmlAttribute.propertyName}`, `${htmlAttribute.propertyValue}`);

        });
      });
    });
  }
}
