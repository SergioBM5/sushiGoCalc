// animations.ts

import { trigger, transition, style, animate, animateChild, query, group } from '@angular/animations';

export const slideInAnimation =
  trigger('routeAnimations', [
    transition('LandingPage <=> PlayerConfigPage', [
      style({ position: 'relative' }),
      query(':enter, :leave', [
        style({
          position: 'absolute',
          top: 0,
          right: 0,
          width: '100%'
        })
      ]),
      query(':enter', [
        style({ right: '-100%' })
      ]),
      query(':leave', animateChild()),
      group([
        query(':leave', [
          animate('300ms ease-out', style({ right: '100%' }))
        ]),
        query(':enter', [
          animate('300ms ease-out', style({ right: '0%' }))
        ])
      ]),
      query(':enter', animateChild()),
    ]),
    transition('PlayerConfigPage <=> PuntuacionPage', [
      style({ position: 'relative' }),
      query(':enter, :leave', [
        style({
          position: 'absolute',
          top: 0,
          right: 0,
          width: '100%'
        })
      ]),
      query(':enter', [
        style({ right: '-100%' })
      ]),
      query(':leave', animateChild()),
      group([
        query(':leave', [
          animate('200ms ease-out', style({ right: '100%' }))
        ]),
        query(':enter', [
          animate('300ms ease-out', style({ right: '0%' }))
        ])
      ]),
      query(':enter', animateChild()),
    ])
  ]);
