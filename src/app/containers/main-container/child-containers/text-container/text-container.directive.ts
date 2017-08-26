import { Directive, ElementRef, OnInit, Renderer } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { HtmlAttribute } from '../..';
import { DesignerProperty } from '../..';
import {
  TextToolBoxItem,
} from './text-container.model';
import { TextContainerService } from './text-container.service';

@Directive({
  selector: '[appTextContainerRenderer]',
})
export class TextContainerDirective implements OnInit {
  private nativeElement: Node;
  private static TextModel: TextToolBoxItem;
  private currentProperties: DesignerProperty[] = [];

  constructor(
    private renderer: Renderer,
    private element: ElementRef,
    private textContainerService: TextContainerService,

  ) {
    this.nativeElement = this.element.nativeElement;
  }

  public ngOnInit(): void {
    this.setDesignerProperties();
    // this.getTextModel();
  }

  private setDesignerProperties(): void {
    this.textContainerService.textContainerdesignerProperty
      .debounceTime(0)
      .subscribe(async (designerProperty: DesignerProperty[]) => {
        const currentProperties: DesignerProperty[] = await designerProperty;
        if (currentProperties && currentProperties.length > 0) {
          this.currentProperties = currentProperties;
        }
        console.log('this.currentProperties: ', this.currentProperties);

        this.currentProperties.forEach((property: DesignerProperty, index: number) => {
          const container: Renderer = this.renderer.createElement(this.nativeElement, 'div');
          this.renderer.setElementClass(container, 'container', true);

          const form: Renderer = this.renderer.createElement(this.nativeElement, 'form');
          this.renderer.projectNodes(container, [form]);

          const formGroup: Renderer = this.renderer.createElement(this.nativeElement, 'div');
          this.renderer.setElementClass(formGroup, 'form-group', true);
          this.renderer.projectNodes(form, [formGroup]);

          const input: Renderer = this.renderer.createElement(this.nativeElement, `${property.propertyHtmlTag}`);
          this.renderer.setElementAttribute(input, 'type', `${property.propertyHtmlTagType}`);
          this.renderer.setElementAttribute(input, 'id', property.id);

          this.renderer.setElementAttribute(input, 'data-index', `${index}`);
          this.renderer.createText(input, `${property.value}`);
          this.renderer.listen(input, 'input', this.onInput);

          const label: Renderer = this.renderer.createElement(this.nativeElement, 'label');
          this.renderer.setElementClass(label, 'control-label', true);
          this.renderer.createText(label, `${property.displayInfo}`);

          const bar: Renderer = this.renderer.createElement(this.nativeElement, 'i');
          this.renderer.setElementClass(bar, 'bar', true);

          this.renderer.projectNodes(formGroup, [input, label, bar]);

          if (property.htmlAttributes && property.htmlAttributes.length > 0) {
            property.htmlAttributes.forEach((htmlAttribute: HtmlAttribute) => {
              this.renderer.setElementAttribute(input, `${htmlAttribute.propertyName}`, `${htmlAttribute.propertyValue}`);
            });
          }
        });
      }, (error: Error) => {
        Observable.throw(new Error(`Timeout or error ${error}`));
      });
  }

  // private getTextModel(): void {
  //   TextContainerService.textboxContainerPropertiesModelData.subscribe(async (model: TextToolBoxItem) => {
  //     const textModel: TextToolBoxItem
  //       = await model;
  //     if (textModel) {
  //       TextContainerDirective.TextModel = { ...TextContainerDirective.TextModel, ...textModel };

  //     }
  //   }, (error: Error) => {
  //     Observable.throw(new Error(`Timeout or error ${error}`));
  //   });
  // }

  private onInput(event: Event): void {
    const target: HTMLTextAreaElement = event && (event.target as HTMLTextAreaElement);
    const { id, value }: HTMLTextAreaElement = target;
    console.log('id in directiva: ', id);

    if (TextContainerDirective.TextModel) {
      TextContainerDirective.TextModel.designerProperties.forEach((designerProperty: DesignerProperty) => {
        if (designerProperty.id === id) {
          designerProperty.value = value;
        }
      });
      TextContainerService.insertTextboxModel(TextContainerDirective.TextModel);
      console.log('TextContainerDirective.TextModel in diretiva: ', TextContainerDirective.TextModel);
    }
  }
}
