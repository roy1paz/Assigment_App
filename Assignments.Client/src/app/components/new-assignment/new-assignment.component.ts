import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AssignmentService } from '../../services/assignment.service';
import {
  Assignment,
  Type,
  Cyclic,
  AssignmentType
} from '../../models/assignment.model';
import { Router } from '@angular/router';
import moment from 'moment';

@Component({
  selector: 'app-new-assignment',
  templateUrl: './new-assignment.component.html',
  styleUrls: ['./new-assignment.component.css']
})
export class NewAssignmentComponent implements OnInit {
  types: Type[] = [
    { label: 'Personal', value: 0 },
    { label: 'Work', value: 1 },
    { label: 'Studies', value: 2 }
  ];
  cyclic: Cyclic[] = [
    { label: 'No', value: false },
    { label: 'Yes', value: true }
  ];

  minStartDate: Date = new Date();
  minEndDate: Date = new Date();

  newAssignmentForm = this.fb.group({
    type: [0, Validators.required],
    title: ['', Validators.required],
    description: [''],
    startDate: [null, Validators.required],
    endDate: [null],
    cyclic: [false]
  });

  constructor(
    private fb: FormBuilder,
    private assignmentService: AssignmentService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  onStartDateChange(): void {
    // Update minEndDate based on the selected Start Date
    const selectedStartDate: Date | null | undefined =
      this.newAssignmentForm.get('startDate')?.value;
    this.minEndDate = selectedStartDate
      ? new Date(selectedStartDate)
      : new Date();
  }

  addAssignment() {
    if (this.newAssignmentForm.valid) {
      const assignmentData: Assignment = {
        id: '',
        type:
          this.newAssignmentForm.get('type')!.value || AssignmentType.Personal,
        title: this.newAssignmentForm.get('title')!.value || 'New Assignment',
        description: this.newAssignmentForm.get('description')!.value || '',
        startDate: moment(
          this.newAssignmentForm.get('startDate')!.value
        ).format('YYYY-MM-DDTHH:mm:ss.sssZ'),
        endDate: this.newAssignmentForm.get('endDate')?.value
          ? moment(this.newAssignmentForm.get('endDate')?.value).format(
              'YYYY-MM-DDTHH:mm:ss.sssZ'
            )
          : null,
        cyclic: this.newAssignmentForm.get('cyclic')!.value || false,
        isCompleted: false,
        completeDate: null,
        isArchive: false,
        isSelected: false
      };

      this.assignmentService.addAssignment(assignmentData).subscribe({
        next: (assignment) => {
          // Handle success
          this.router
            .navigate(['/assignments'], { skipLocationChange: true })
            .then(() => {
              this.assignmentService.getAllAssignments();
            });
        }
      });
    }
  }
}
