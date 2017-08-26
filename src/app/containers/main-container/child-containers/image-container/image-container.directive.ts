import { Directive, ElementRef, OnInit, Renderer } from '@angular/core';
import { HtmlAttribute } from '../..';
import { DesignerProperty } from '../..';
import { ImageContainerService } from './image-container.service';

@Directive({
  selector: '[appImageContainerRenderer]',
})
export class ImageContainerDirective implements OnInit {
  private nativeElement: Node;

  constructor(
    private renderer: Renderer,
    private element: ElementRef,
    private imageContainerService: ImageContainerService,

  ) {
    this.nativeElement = this.element.nativeElement;
  }
  private onInput(event: Event): void {
    const data: string = event && (event.target as HTMLTextAreaElement).value;
    ImageContainerService.insertTaskboxModel(data);
  }

  public ngOnInit(): void {

    this.imageContainerService.imageContainerdesignerProperty.subscribe((designerProperty: DesignerProperty[]) => {

      designerProperty.forEach((property: DesignerProperty) => {

        const container: Renderer = this.renderer.createElement(this.nativeElement, 'div');
        this.renderer.setElementClass(container, 'container', true);

        const form: Renderer = this.renderer.createElement(this.nativeElement, 'form');
        this.renderer.projectNodes(container, [form]);

        const formGroup: Renderer = this.renderer.createElement(this.nativeElement, 'div');
        this.renderer.setElementClass(formGroup, 'form-group', true);
        this.renderer.projectNodes(form, [formGroup]);

        const input: Renderer = this.renderer.createElement(this.nativeElement, `${property.propertyHtmlTag}`);
        this.renderer.setElementAttribute(input, 'type', `${property.propertyHtmlTagType}`);

        if (property.propertyHtmlTagType === 'file') {
          this.renderer.setElementAttribute(input, 'accept', 'image/x-png,image/jpeg,image/jpg');
          const image: Renderer = this.renderer.createElement(this.nativeElement, 'image');
          this.renderer.setElementAttribute(image, 'src', `${property.value}`);

          this.renderer.projectNodes(form, [image]);
        }
        this.renderer.createText(input, `${property.value}`);
        this.renderer.listen(input, 'input', this.onInput);

        const bar: Renderer = this.renderer.createElement(this.nativeElement, 'i');
        this.renderer.setElementClass(bar, 'bar', true);

        const label: Renderer = this.renderer.createElement(this.nativeElement, 'label');
        if (property.propertyHtmlTagType !== 'file') {
          this.renderer.setElementClass(label, 'control-label', true);
        }
        this.renderer.createText(label, `${property.displayInfo}`);

        this.renderer.projectNodes(formGroup, [input, label, bar]);

        property.htmlAttributes.forEach((htmlAttribute: HtmlAttribute) => {
          this.renderer.setElementAttribute(input, `${htmlAttribute.propertyName}`, `${htmlAttribute.propertyValue}`);

        });
      });
    });
  }
}
