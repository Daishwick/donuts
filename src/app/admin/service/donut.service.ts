import { Injectable } from '@angular/core';
import { Donut } from '../models/donut.model';

@Injectable({
  providedIn: 'root',
})
export class DonutService {
  donuts: Donut[] = [
    {
      id: 'y8z0As',
      name: 'Just Chocolate',
      icon: 'just-chocolate',
      price: 199,
      promo: 'limited',
      description: 'For the pure chocoholic.',
    },
    {
      id: '3a981Kl',
      name: 'Glazed Fudge',
      icon: 'glazed-fudge',
      price: 129,
      description: 'Sticky perfection',
    },
    {
      id: '12A2Bs',
      name: 'Caramel Swirl',
      icon: 'caramel-swirl',
      price: 129,
      promo: 'new',
      description: 'Chocolate drizzled with caramel',
    },
    {
      id: '8ankz9',
      name: 'Sour Supreme',
      icon: 'sour-supreme',
      price: 139,
      description: 'For the sour advocate',
    },
    {
      id: '12A2Bs',
      name: 'Zesty Lemon',
      icon: 'zesty-lemon',
      price: 129,
      description: 'Delicious lucious lemon',
    },
  ];

  constructor() {}
}