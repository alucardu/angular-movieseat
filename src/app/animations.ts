import {
  animate,
  group,
  query,
  style,
  transition,
  trigger,
} from '@angular/animations';

const animationTime = 225

export const slideInAnimation = trigger('routeAnimations', [
  transition('watchList => movieDetail', [
    style({ position: 'relative' }),
    query(':enter, :leave', [
      style({
        position: 'absolute',
        top: 0,
        width: '100%'
      })
    ]),

    query(':enter', [style({ transform: 'translateX(100%)', opacity: 1, position: 'fixed' })]),

    group([
      query(':enter', [animate(`${animationTime}ms ease-out`, style({ transform: 'translateX(0%)', opacity: 1, }))]),
      query(':leave', [animate(`${animationTime}ms ease-out`, style({ transform: 'translateX(-100%)', opacity: 1 }))]),
     ]),
  ]),

  transition('movieDetail => watchList', [
    style({ position: 'relative' }),
    query(':enter, :leave', [
      style({
        position: 'absolute',
        top: 0,
        width: '100%'
      })
    ]),

    query(':enter', [style({ transform: 'translateX(-100%)', opacity: 0 })]),
    query(':leave', [style({ transform: 'translateX(0%)' })]),

    group([
      query(':enter', [animate(`${animationTime}ms ease-out`, style({ transform: 'translateX(0%)', opacity: 1 }))]),
      query(':leave', [animate(`${animationTime}ms ease-out`, style({ transform: 'translateX(100%)', opacity: 0 }))]),
     ]),
   ])
]);

export const fadeAnimation = trigger('fadeAnimation', [
  transition(':enter', [
    style({ opacity: 0 }),
    animate(`${animationTime}ms ease-out`, style({ opacity: 1 })),
  ]),
  transition(':leave', [
    animate(`${animationTime}ms ease-out`, style({ opacity: 0 }))
  ])
])
