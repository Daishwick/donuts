import { Component, Input, OnInit } from '@angular/core';
import { Donut } from '../../models/donut.model';
import { DonutService } from '../../service/donut.service';
import { NgFor, NgIf } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DonutCardComponent } from '../../components/donut-card/donut-card.component';

@Component({
  standalone: true,
  imports: [RouterModule, NgFor, DonutCardComponent, NgIf],
  providers: [DonutService],
  selector: 'app-donut-list',
  template: `
    <div>
      <div class="donut-list-actions">
        <a routerLink="new" class="btn btn--green">
          New donut
          <img src="/assets/img/icon/plus.svg" />
        </a>
      </div>
      <ng-container *ngIf="donuts?.length; else nothing">
        <app-donut-card
          *ngFor="let donut of donuts; trackBy: trackById"
          [donut]="donut"
        ></app-donut-card>
      </ng-container>

      <ng-template #nothing>
        <p>No donuts here...</p>
      </ng-template>
    </div>
  `,
  styles: [
    `
      .donut-list {
        &-actions {
          margin-bottom: 10px;
        }
      }
    `,
  ],
})
export class DonutListComponent implements OnInit {
  donut!: Donut;
  donuts!: Donut[];

  constructor(private donutService: DonutService) {}

  ngOnInit(): void {
    this.donutService
      .read()
      .subscribe((donuts: Donut[]) => (this.donuts = donuts));
  }

  trackById(index: number, value: Donut) {
    return value.id;
  }
}
