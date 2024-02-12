import { Component, Output, EventEmitter, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Donut } from '../../models/donut.model';

@Component({
  selector: 'app-donut-form',
  template: `
    <form #form="ngForm" class="donut-form" *ngIf="donut; else loading">
      <label>
        <span>Name</span>
        <input
          type="text"
          name="name"
          class="input"
          required
          minlength="5"
          [ngModel]="donut.name"
          #name="ngModel"
        />
        <ng-container *ngIf="name.invalid && name.touched">
          <div class="donut-form-error" *ngIf="name.errors?.required">
            Name is required
          </div>
          <div class="donut-form-error" *ngIf="name.errors?.minlength">
            Minimum length is 5
          </div>
        </ng-container>
      </label>

      <label>
        <span>Icon</span>
        <select
          name="icon"
          class="input input--select"
          required
          [ngModel]="donut.icon"
          #icon="ngModel"
        >
          <option *ngFor="let icon of icons" [ngValue]="icon">
            {{ icon }}
          </option>
        </select>
        <ng-container *ngIf="icon.invalid && icon.touched">
          <div class="donut-form-error" *ngIf="icon.errors?.required">
            Icon is required
          </div>
        </ng-container>
      </label>

      <label>
        <span>Price</span>
        <input
          type="number"
          name="price"
          class="input"
          required
          [ngModel]="donut.price"
          #price="ngModel"
        />
        <ng-container *ngIf="price.invalid && price.touched">
          <div class="donut-form-error" *ngIf="price.errors?.required">
            Price is required
          </div>
        </ng-container>
      </label>

      <div class="donut-form-radios">
        <p class="donut-form-radios-label">Promo:</p>
        <label>
          <input
            type="radio"
            name="promo"
            [defaultChecked]="true"
            [value]="undefined"
            [ngModel]="donut.promo"
          />
          <span>None</span>
        </label>
        <label>
          <input
            type="radio"
            name="promo"
            value="new"
            [ngModel]="donut.promo"
          />
          <span>New</span>
        </label>
        <label>
          <input
            type="radio"
            name="promo"
            value="limited"
            [ngModel]="donut.promo"
          />
          <span>Limited</span>
        </label>
      </div>

      <label>
        <span>
          <textarea
            name="description"
            class="input input--textarea"
            required
            [ngModel]="donut.description"
            #description="ngModel"
          >
          </textarea>
        </span>
        <ng-container *ngIf="description.invalid && description.touched">
          <div class="donut-form-error" *ngIf="description.errors?.required">
            Description is required
          </div>
        </ng-container>
      </label>

      <button type="button" class="btn btn--green" (click)="handleCreate(form)">
        Create
      </button>
      <button
        type="button"
        class="btn btn--green"
        [disabled]="form.untouched"
        (click)="handleUpdate(form)"
      >
        Update
      </button>
      <button type="button" class="btn btn--green" (click)="handleDelete(form)">
        Delete
      </button>
      <button type="button" class="btn btn--grey" (click)="form.resetForm()">
        Reset Form
      </button>

      <div class="donut-form-working" *ngIf="form.valid && form.submitted">
        working...
      </div>
    </form>

    <ng-template #loading>Loading...</ng-template>
  `,
  styles: [
    `
      .donut-form {
        &-radios {
          display: flex;
          align-content: center;
          &-label {
            margin-right: 10px;
          }
          label {
            display: flex;
            align-items: center;
            span {
              color: #444;
              margin-bottom: 0;
            }
          }
        }
        &-working {
          font-size: 12px;
          font-style: italic;
          margin: 10px;
        }
        &-error {
          font-size: 12px;
          color: #e66262;
        }
      }
    `,
  ],
})
export class DonutFormComponent {
  public icons: string[] = [
    'caramel-swirl',
    'glazed-fudge',
    'just-chocolate',
    'sour-supreme',
    'strawberry-glaze',
    'vanilla-sundae',
    'zesty-lemon',
  ];

  @Input()
  public donut!: Donut;

  @Output()
  public create: EventEmitter<Donut> = new EventEmitter<Donut>();
  @Output()
  public update: EventEmitter<Donut> = new EventEmitter<Donut>();
  @Output()
  public delete: EventEmitter<Donut> = new EventEmitter<Donut>();

  constructor() {}

  public handleCreate(form: NgForm): void {
    if (form.valid) {
      this.create.emit(form.value);
    } else {
      form.form.markAllAsTouched();
    }
  }

  public handleUpdate(form: NgForm): void {
    if (form.valid) {
      this.update.emit({ id: this.donut.id, ...form.value });
    } else {
      form.form.markAllAsTouched();
    }
  }

  public handleDelete(form: NgForm): void {
    if (confirm(`Really delete ${this.donut.name}?`)) {
      this.delete.emit({ ...this.donut });
    } else {
      form.form.markAllAsTouched();
    }
  }
}
