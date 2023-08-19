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

    group([
      query(':enter', [animate(`${animationTime}ms ease-out`, style({ transform: 'translateX(0%)', opacity: 1 }))]),
      query(':leave', [animate(`${animationTime}ms ease-out`, style({ transform: 'translateX(100%)', opacity: 0 }))]),
    ]),
  ]),


  transition('* => notifications', [
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

  transition('notifications => *', [
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
      query(':enter', [animate(`${animationTime}ms ease-out`, style({ transform: 'translateX(0%)', opacity: 1, }))], {optional: true}),
      query(':leave', [animate(`${animationTime}ms ease-out`, style({ transform: 'translateX(-100%)', opacity: 1 }))], {optional: true}),
    ]),
  ]),

  transition('* => movieSearch', [
    style({ position: 'relative' }),
    query(':enter, :leave', [
      style({
        position: 'absolute',
        top: 0,
        width: '100%'
      })
    ]),

    query(':enter', [style({ transform: 'translateY(100%)', opacity: 1, position: 'fixed' })]),

    group([
      query(':enter', [animate(`${animationTime}ms ease-out`, style({ transform: 'translateY(0%)', opacity: 1, }))], {optional: true}),
      query(':leave', [animate(`${animationTime}ms ease-out`, style({ transform: 'translateY(-100%)', opacity: 1 }))], {optional: true}),
    ]),
  ]),

  transition('movieSearch => *', [
    style({ position: 'relative' }),
    query(':enter, :leave', [
      style({
        position: 'absolute',
        top: 0,
        width: '100%'
      })
    ]),

    query(':enter', [style({ transform: 'translateY(-100%)', opacity: 1, position: 'fixed' })]),

    group([
      query(':enter', [animate(`${animationTime}ms ease-out`, style({ transform: 'translateY(0%)', opacity: 1, }))], {optional: true}),
      query(':leave', [animate(`${animationTime}ms ease-out`, style({ transform: 'translateY(100%)', opacity: 1 }))], {optional: true}),
    ]),
  ]),

  transition('* => profile', [
    style({ position: 'relative' }),
    query(':enter, :leave', [
      style({
        position: 'absolute',
        top: 0,
        width: '100%'
      })
    ]),

    query(':enter', [style({ transform: 'translateY(-100%)', opacity: 1, position: 'fixed' })]),

    group([
      query(':enter', [animate(`${animationTime}ms ease-out`, style({ transform: 'translateY(0%)', opacity: 1, }))], {optional: true}),
      query(':leave', [animate(`${animationTime}ms ease-out`, style({ transform: 'translateY(100%)', opacity: 1 }))], {optional: true}),
    ]),
  ]),

  transition('profile => *', [
    style({ position: 'relative' }),
    query(':enter, :leave', [
      style({
        position: 'absolute',
        top: 0,
        width: '100%'
      })
    ]),

    query(':enter', [style({ transform: 'translateY(100%)', opacity: 1, position: 'fixed' })]),

    group([
      query(':enter', [animate(`${animationTime}ms ease-out`, style({ transform: 'translateY(0%)', opacity: 1, }))], {optional: true}),
      query(':leave', [animate(`${animationTime}ms ease-out`, style({ transform: 'translateY(-100%)', opacity: 1 }))], {optional: true}),
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
]);

export const toggleSearchResult = trigger('toggleSearchResult', [
  state('collapsed', style({ height: '0px', visibility: 'hidden' })),
  state('expanded', style({ height: '*', visibility: 'visible' })),
  transition('expanded <=> collapsed', [
    animate('225ms ease-in-out'),
  ]),
])
