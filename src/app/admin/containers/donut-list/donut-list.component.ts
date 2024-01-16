import { Component, Input, OnInit } from '@angular/core';
import { Donut } from '../../models/donut.model';

@Component({
  selector: 'app-donut-list',
  template: `
    <div>

      <ng-container *ngIf="donuts.length; else nothing">
        <app-donut-card *ngFor="let donut of donuts; trackBy : trackById"
        [donut]="donut"></app-donut-card>
      </ng-container>

      <ng-template #nothing>
        <p>No donuts here...</p>
      </ng-template>
    </div>
  `,
  styles: [],
})
export class DonutListComponent implements OnInit {
  donut!: Donut;
  donuts!: Donut[];

  ngOnInit(): void {
    this.donuts = [
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
  }

  trackById(index: number, value: Donut) {
    return value.id;
  }
}
