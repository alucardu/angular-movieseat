import {
  animate,
  group,
  query,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';

const animationTime = 225

export const routeAnimations = trigger('routeAnimations', [
  transition('* => slideLeft', [
    style({ position: 'relative' }),
    query(':enter, :leave', [
      style({
        position: 'absolute',
        top: 0,
        width: '100%'
      })
    ]),

    query(':enter', [style({ transform: 'translateX(100%)', position: 'fixed' })]),

    group([
      query(':enter', [animate(`${animationTime}ms ease-out`, style({ transform: 'translateX(0%)' }))]),
      query(':leave', [animate(`${animationTime}ms ease-out`, style({ transform: 'translateX(-100%)' }))], { optional: true }),
    ]),
  ]),

  transition('slideLeft => *', [
    style({ position: 'relative' }),
    query(':enter, :leave', [
      style({
        position: 'absolute',
        top: 0,
        width: '100%'
      })
    ]),

    query(':enter', [style({ transform: 'translateX(-100%)', opacity: 0 })]),

    group([
      query(':enter', [animate(`${animationTime}ms ease-out`, style({ transform: 'translateX(0%)', opacity: 1 }))]),
      query(':leave', [animate(`${animationTime}ms ease-out`, style({ transform: 'translateX(100%)', opacity: 0 }))], { optional: true }),
    ]),
  ]),

  transition('* => slideRight', [
    style({ position: 'relative' }),
    query(':enter, :leave', [
      style({
        position: 'absolute',
        top: 0,
        width: '100%'
      })
    ]),

    query(':enter', [style({ transform: 'translateX(-100%)', opacity: 0 })]),

    group([
      query(':enter', [animate(`${animationTime}ms ease-out`, style({ transform: 'translateX(0%)', opacity: 1 }))], {optional: true}),
      query(':leave', [animate(`${animationTime}ms ease-out`, style({ transform: 'translateX(100%)', opacity: 0 }))], {optional: true}),
    ]),
  ]),

  transition('slideRight => *', [
    style({ position: 'relative' }),
    query(':enter, :leave', [
      style({
        position: 'absolute',
        top: 0,
        width: '100%'
      })
    ]),

    query(':enter', [style({ transform: 'translateX(100%)', position: 'fixed' })]),

    group([
      query(':enter', [animate(`${animationTime}ms ease-out`, style({ transform: 'translateX(0%)' }))], {optional: true}),
      query(':leave', [animate(`${animationTime}ms ease-out`, style({ transform: 'translateX(-100%)' }))], {optional: true}),
    ]),
  ]),

  transition('* => slideUp', [
    style({ position: 'relative' }),
    query(':enter, :leave', [
      style({
        position: 'absolute',
        top: 0,
        width: '100%'
      })
    ]),

    query(':enter', [style({ transform: 'translateY(100%)', position: 'fixed' })]),

    group([
      query(':enter', [animate(`${animationTime}ms ease-out`, style({ transform: 'translateY(0%)', }))], {optional: true}),
      query(':leave', [animate(`${animationTime}ms ease-out`, style({ transform: 'translateY(-100%)' }))], {optional: true}),
    ]),
  ]),

  transition('slideUp => *', [
    style({ position: 'relative' }),
    query(':enter, :leave', [
      style({
        position: 'absolute',
        top: 0,
        width: '100%'
      })
    ]),

    query(':enter', [style({ transform: 'translateY(-100%)', position: 'fixed' })]),

    group([
      query(':enter', [animate(`${animationTime}ms ease-out`, style({ transform: 'translateY(0%)' }))], {optional: true}),
      query(':leave', [animate(`${animationTime}ms ease-out`, style({ transform: 'translateY(100%)' }))], {optional: true}),
    ]),
  ]),

  transition('* => slideDown', [
    style({ position: 'relative' }),
    query(':enter, :leave', [
      style({
        position: 'absolute',
        top: 0,
        width: '100%'
      })
    ]),

    query(':enter', [style({ transform: 'translateY(-100%)', position: 'fixed' })]),

    group([
      query(':enter', [animate(`${animationTime}ms ease-out`, style({ transform: 'translateY(0%)' }))], {optional: true}),
      query(':leave', [animate(`${animationTime}ms ease-out`, style({ transform: 'translateY(100%)' }))], {optional: true}),
    ]),
  ]),

  transition('slideDown => *', [
    style({ position: 'relative' }),
    query(':enter, :leave', [
      style({
        position: 'absolute',
        top: 0,
        width: '100%'
      })
    ]),

    query(':enter', [style({ transform: 'translateY(100%)', position: 'fixed' })]),

    group([
      query(':enter', [animate(`${animationTime}ms ease-out`, style({ transform: 'translateY(0%)', }))], {optional: true}),
      query(':leave', [animate(`${animationTime}ms ease-out`, style({ transform: 'translateY(-100%)' }))], {optional: true}),
    ]),
  ]),

  transition('* => fade', [
    group([
      query(':enter', [animate(`${animationTime}ms ease-out`, style({ opacity: 1, }))], {optional: true}),
      query(':leave', [animate(`${animationTime}ms ease-out`, style({ opacity: 0 }))], {optional: true}),
    ]),
  ]),

  transition('fade => *', [
    group([
      query(':enter', [animate(`${animationTime}ms ease-out`, style({ opacity: 1 }))], {optional: true}),
      query(':leave', [animate(`${animationTime}ms ease-out`, style({ opacity: 0 }))], {optional: true}),
    ]),
  ]),
]);

export const fadeAnimation = trigger('fadeAnimation', [
  transition(':enter', [
    style({ opacity: 0 }),
    animate(`${animationTime}ms ease-out`, style({ opacity: 1 })),
  ]),
  transition(':leave', [
    animate(`${animationTime}ms ease-out`, style({ opacity: 0 }))
  ])
]);

export const toggleContent = trigger('toggleContent', [
  state('collapsed', style({ height: '0px', visibility: 'hidden' })),
  state('expanded', style({ height: '*', visibility: 'visible' })),
  transition('expanded <=> collapsed', [
    animate('225ms ease-in-out'),
  ]),
])

export const fadeToggle = trigger('fadeToggle', [
  state('in', style({ opacity: '1', zIndex: 1})),
  state('out', style({ opacity: '0', zIndex: -1 })),
  transition('in => out', animate(`${animationTime}ms ease-in-out`)),
  transition('out => in', animate(`${animationTime}ms ${animationTime}ms ease-in-out`))
])
