import { group, trigger, state, style, transition, animate } from '@angular/animations';
import { query } from '@angular/animations';

export const slideUpDown = trigger('slideUpDown', [
    state('in', style({ height: '*' })),
    transition('* => void', [
        style({ height: '*', overflow: 'hidden' }),
        animate(250, style({ height: 0 }))
    ]),
    transition('void => *', [
        style({ height: '0', overflow: 'hidden' }),
        animate(250, style({ height: '*' }))
    ])
]);

export const slideDown = trigger('slideDown', [
    state('in', style({ height: '*' })),
    transition('void => *', [
        style({ height: '0', overflow: 'hidden' }),
        animate('1s ease-in-out', style({ height: '*' }))
    ])
]);

export const routerTransition = trigger('routerTransition', [
    state('void', style({position:'absolute', width:'100%'}) ),
    state('*', style({position:'absolute', width:'100%'}) ),
    transition(':enter', [  
      style({transform: 'translateX(100%)'}),
      animate('0.5s ease-in-out', style({transform: 'translateX(0%)'}))
    ]),
    transition(':leave', [  
      style({transform: 'translateX(0%)'}),
      animate('0.4s ease-in-out', style({transform: 'translateX(-100%)'}))
    ])
  ]);
