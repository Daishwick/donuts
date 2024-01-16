import { Component, OnInit } from '@angular/core';
import { Donut } from '../../models/donut.model';

@Component({
  selector: 'app-donut-single',
  template: `
    <div>
      <app-donut-form [donut]="donut" (create)="onCreate($event)"></app-donut-form>
</div>
  `,
  styles: [
  ]
})
export class DonutSingleComponent implements OnInit {
public donut!: Donut;

  public ngOnInit(): void {
    this.donut = {
      id: 'y8z0As',
      name: 'Just Chocolate',
      icon: 'just-chocolate',
      price: 199,
      promo: 'limited',
      description: 'For the pure chocoholic.',
    };
  }

  public onCreate(donut: Donut): void {
    console.log('onCreate', donut);
   }

}
