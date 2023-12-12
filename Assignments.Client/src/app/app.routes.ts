import { Routes } from '@angular/router';
import { AssignmentsComponent } from './components/assignments/assignments.component';
import { NewAssignmentComponent } from './components/new-assignment/new-assignment.component';

const routeConfig: Routes = [
  {
    path: '',
    component: AssignmentsComponent,
    title: 'Home page'
  },
  {
    path: 'assignments',
    component: AssignmentsComponent,
    title: 'assignments page'
  },
  {
    path: 'assignments/new-assignment-form',
    component: NewAssignmentComponent,
    title: 'New Assignment form'
  }
];

export default routeConfig;
