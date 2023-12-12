import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MenubarModule } from 'primeng/menubar';
import { AssignmentsComponent } from './assignments.component';
import { RouterModule } from '@angular/router';
import { CheckboxModule } from 'primeng/checkbox';

@NgModule({
  declarations: [AssignmentsComponent],
  imports: [
    CheckboxModule,
    CommonModule,
    FormsModule,
    TableModule,
    ButtonModule,
    InputTextModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MenubarModule,
    RouterModule.forChild([{ path: '', component: AssignmentsComponent }]),
  ],
})
export class AssignmentsModule {}
