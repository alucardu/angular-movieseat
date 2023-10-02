import { AfterViewInit, DestroyRef, Directive, ElementRef, Renderer2, inject } from '@angular/core';
import { fromEvent,  } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Directive({
  selector: '[appTogglePassword]',
  standalone: true
})
export class TogglePasswordDirective implements AfterViewInit {
  private el = inject(ElementRef)
  private renderer = inject(Renderer2)
  private destroyRef = inject(DestroyRef)

  public ngAfterViewInit(): void {
    const icon = this.el.nativeElement.querySelector('mat-icon')
    const input = this.el.nativeElement.querySelector('input')

    fromEvent(icon, 'click').pipe(takeUntilDestroyed(this.destroyRef)).subscribe(() => {
      const currentType = input.getAttribute('type');
      const newType = currentType === 'password' ? 'text' : 'password';
      const newTextContent = currentType === 'password' ? 'visibility' : 'visibility_off';

      this.renderer.setAttribute(input, 'type', newType);
      this.renderer.setProperty(icon, 'textContent', newTextContent);
    });
  }
}
