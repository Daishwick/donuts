import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

//components
import { DonutCardComponent } from './components/donut-card/donut-card.component';
import { DonutFormComponent } from './component/donut-form/donut-form.component';

//containers
import { DonutListComponent } from './containers/donut-list/donut-list.component';
import { DonutSingleComponent } from './containers/donut-single/donut-single.component';

@NgModule({
  declarations: [
    DonutCardComponent,
    DonutListComponent,
    DonutSingleComponent,
    DonutFormComponent,
  ],
  imports: [CommonModule, FormsModule],
  exports: [DonutListComponent, DonutSingleComponent],
})
export class AdminModule {}
