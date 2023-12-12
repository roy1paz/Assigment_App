import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MenubarModule } from 'primeng/menubar';
import { NewAssignmentComponent } from './new-assignment.component';
import { RouterModule } from '@angular/router';
import { CardModule } from 'primeng/card';
import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';

@NgModule({
  declarations: [NewAssignmentComponent],
  imports: [
    CalendarModule,
    DropdownModule,
    CommonModule,
    FormsModule,
    CardModule,
    ReactiveFormsModule,
    TableModule,
    ButtonModule,
    InputTextModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MenubarModule,
    RouterModule.forChild([
      {
        path: 'assignments/new-assignment-form',
        component: NewAssignmentComponent
      }
    ])
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class NewAssignmentsModule {}
