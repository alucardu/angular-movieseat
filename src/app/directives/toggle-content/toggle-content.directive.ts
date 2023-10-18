import { animate,  AnimationBuilder,  AnimationMetadata, style } from '@angular/animations';
import { AfterViewInit, ContentChild, Directive, ElementRef, HostListener, inject, Input, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appToggleContent]',
  standalone: true,
})
export class ToggleDirective implements OnInit, AfterViewInit {
  private builder = inject(AnimationBuilder)
  private el = inject(ElementRef)
  private renderer = inject(Renderer2)

  @Input() public initialHeight = 0;
  @Input() public hasEllipsis = false;

  @ContentChild('chevron', { read: ElementRef }) private chevronElement?: ElementRef<HTMLElement>
  @ContentChild('list', { read: ElementRef }) private listElement?: ElementRef<HTMLElement>

  private elHeight?: number;
  public collapsed = true;

  public ngOnInit(): void {
    this.renderer.setStyle(this.el.nativeElement, 'overflow', 'hidden');
  }

  public ngAfterViewInit(): void {
    this.toggleEllipsis();

    setTimeout(() => {
      this.elHeight = this.el.nativeElement.offsetHeight;
      this.renderer.setStyle(
        this.el.nativeElement,
        'height',
        this.initialHeight + 'px' ?? '10px'
      );
    }, 250)
  }

  @HostListener('click') public click(): void {
    this.playAnimation(
      this.collapsed ? this.getExpandedAnimation() : this.getCollapseAnimation()
    );
    this.collapsed = !this.collapsed;
    this.toggleExpandedState();
    this.toggleEllipsis();

    if (this.chevronElement) {
      this.renderer.addClass(this.chevronElement?.nativeElement, ('chevron-toggle'))
      this.toggleChevronState();
    }
  }

  private playAnimation(animationMetaData: AnimationMetadata[]): void {
    const animation = this.builder.build(animationMetaData);
    const player = animation.create(this.el.nativeElement);
    player.play();
  }

  private getCollapseAnimation(): AnimationMetadata[] {
    return [
      animate(
        '250ms ease-in',
        style({ height: this.initialHeight + 'px' ?? '10px' })
      ),
    ];
  }

  private getExpandedAnimation(): AnimationMetadata[] {
    return [animate('250ms ease-in', style({ height: this.elHeight + 'px' }))];
  }

  private toggleEllipsis(): void {
    if (!this.hasEllipsis) return
    this.collapsed ? this.renderer.addClass(this.el.nativeElement, ('ellipsis')) : this.renderer.removeClass(this.el.nativeElement, ('ellipsis'));
  }

  private toggleExpandedState(): void {
    if (this.listElement) this.renderer.removeClass(this.listElement?.nativeElement, ('hide'))
  }

  private toggleChevronState(): void {
    !this.collapsed ? this.renderer.addClass(this.chevronElement?.nativeElement, ('expanded')) : this.renderer.removeClass(this.chevronElement?.nativeElement, ('expanded'));
  }
}
