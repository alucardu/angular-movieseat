import {
  animate,
  group,
  query,
  style,
  transition,
  trigger,
} from '@angular/animations';

export const slideInAnimation = trigger('routeAnimations', [
  transition('watchList => movieDetail', [
    query(':enter, :leave', style({ position: 'fixed', width: '100%' }), {
      optional: true,
    }),
    group([
      query(
        ':enter',
        [
          style({ transform: 'translateX(100%)', opacity: 0 }),
          animate(
            '0.150s ease-out',
            style({ transform: 'translateX(0%)', opacity: 1 })
          ),
        ],
        { optional: true }
      ),
      query(
        ':leave',
        [
          style({ transform: 'translateX(0%)' }),
          animate('0.150s ease-out', style({ transform: 'translateX(-100%)' })),
        ],
        { optional: true }
      ),
    ]),
  ]),

  transition('movieDetail => watchList', [
    query(':enter, :leave', style({ position: 'fixed', width: '100%' }), {
      optional: true,
    }),
    group([
      query(
        ':enter',
        [
          style({ opacity: 0 }),
          animate('0.150s ease-out', style({ opacity: 1 })),
        ],
        { optional: true }
      ),
      query(
        ':leave',
        [
          style({ opacity: 1 }),
          animate('0.150s ease-out', style({ opacity: 0 })),
        ],
        { optional: true }
      ),
    ]),
  ]),
]);
