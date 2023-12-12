import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { CardModule } from 'primeng/card';
import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TableModule } from 'primeng/table';
import { CheckboxModule } from 'primeng/checkbox';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { HttpClientModule } from '@angular/common/http';
import { MenubarModule } from 'primeng/menubar';
import { AppRoutingModule } from './app-routing.module';
import { AssignmentsModule } from './components/assignments/assignments.module';
import { TabMenuModule } from 'primeng/tabmenu';
import { NewAssignmentsModule } from './components/new-assignment/new-assignment.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    CardModule,
    TableModule,
    CheckboxModule,
    FormsModule,
    ButtonModule,
    InputTextModule,
    HttpClientModule,
    DropdownModule,
    CalendarModule,
    BrowserAnimationsModule,
    MenubarModule,
    AppRoutingModule,
    AssignmentsModule,
    TabMenuModule,
    NewAssignmentsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
