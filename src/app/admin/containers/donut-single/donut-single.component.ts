import { Component, OnInit } from '@angular/core';
import { Donut } from '../../models/donut.model';
import { DonutService } from '../../service/donut.service';

@Component({
  selector: 'app-donut-single',
  template: `
    <div>
      <app-donut-form
        [donut]="donut"
        (create)="onCreate($event)"
        (update)="onUpdate($event)"
        (delete)="onDelete($event)"
      ></app-donut-form>
    </div>
  `,
  styles: [],
})
export class DonutSingleComponent implements OnInit {
  public donut!: Donut;

  constructor(private donutService: DonutService) {}

  public ngOnInit(): void {
    const id = '0W1DgCT';

    this.donutService
      .readOne('lcrHgQV')
      .subscribe((donut: Donut) => (this.donut = donut));
  }

  public onCreate(donut: Donut): void {
    this.donutService
      .create(donut)
      .subscribe(() => console.log('created successfully'));
  }

  public onUpdate(donut: Donut): void {
    this.donutService.update(donut).subscribe({
      next: () => console.log('updated successfully!'),
      error: (err) => console.log('onUpdate error', err),
    });
  }

  public onDelete(donut: Donut): void {
    this.donutService
      .delete(donut)
      .subscribe(() => console.log('deleted successfully'));
  }
}
