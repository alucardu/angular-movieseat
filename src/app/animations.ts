import {
  animate,
  group,
  query,
  style,
  transition,
  trigger,
} from '@angular/animations';

const animationTime = 0.125

export const slideInAnimation = trigger('routeAnimations', [
  transition('watchList => movieDetail', [
    style({ position: 'relative' }),
    query(':enter, :leave', [
      style({
        position: 'absolute',
        top: 0,
        right: 0,
        width: '100%'
      })
    ]),

    query(':enter', [style({ right: '-100%', opacity: 0, position: 'fixed' })]),

    group([
      query(':leave', [animate(`${animationTime}s ease-out`, style({ right: '100%', opacity: 0 }))]),
      query(':enter', [animate(`${animationTime}s ease-out`, style({ right: '0%', opacity: 1, }))])
     ]),
  ]),

  transition('movieDetail => watchList', [
    style({ position: 'relative' }),
    query(':enter, :leave', [
      style({
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%'
      })
    ]),

    query(':enter', [style({ left: '-100%', opacity: 0 })]),
    query(':leave', [style({ position: 'fixed' })]),

    group([
      query(':leave', [animate(`${animationTime}s ease-out`, style({ opacity: 0 }))]),
      query(':enter', [animate(`${animationTime}s ease-out`, style({ left: '0%', opacity: 1 }))])
     ]),
   ])
]);
