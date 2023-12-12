import { Component, OnInit } from '@angular/core';
import { AssignmentService } from '../../services/assignment.service';
import { Router } from '@angular/router';
import {
  Assignment,
  Type,
  Cyclic,
  AssignmentType
} from '../../models/assignment.model';

@Component({
  selector: 'app-assignments',
  templateUrl: './assignments.component.html',
  styleUrl: './assignments.component.css',
  providers: [AssignmentService]
})
export class AssignmentsComponent implements OnInit {
  typeOptions: any;

  assignments: Assignment[] = [];
  showArchives: boolean = false;
  defaultSortField: string = 'startDate';
  defaultSortOrder: number = -1;
  selectedAssignments: Assignment[] = [];

  types: Type[] = [
    { label: 'Personal', value: 0 },
    { label: 'Work', value: 1 },
    { label: 'Studies', value: 2 }
  ];
  cyclic: Cyclic[] = [
    { label: 'No', value: false },
    { label: 'Yes', value: true }
  ];
  // assignments.component.ts
  cols: any[] = [
    { field: 'id', header: '#', sortable: true },
    { field: 'type', header: 'Type', sortable: true },
    { field: 'title', header: 'Title', sortable: true },
    { field: 'description', header: 'Description', sortable: true },
    { field: 'startDate', header: 'Start Date', sortable: true },
    { field: 'endDate', header: 'End Date', sortable: true },
    { field: 'cyclic', header: 'Cyclic', sortable: true },
    { field: 'checkbox', header: 'Completed', sortable: true }
  ];

  constructor(
    private assignmentService: AssignmentService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getAllAssignments();
  }

  toggleShowArchives() {
    this.showArchives = !this.showArchives;
    this.getAllAssignments();
  }

  checkArchiveStatus(): void {
    const currentDate = new Date();
    this.assignments.forEach((assignment) => {
      if (!assignment.isArchive && assignment.completeDate !== null) {
        const completeDateFormat = new Date(assignment.completeDate);
        assignment.isArchive =
          currentDate.getDate() - completeDateFormat.getDate() > 7;
        console.log(currentDate.getDate() - completeDateFormat.getDate());
        this.assignmentService
          .updateArchiveStatus(assignment.id, assignment)
          .subscribe({
            next: (response) => {}
          });
      }
    });
  }

  getAllAssignments() {
    this.checkArchiveStatus();
    this.assignmentService.getAllAssignments(this.showArchives).subscribe({
      next: (assignments) => {
        this.assignments = assignments;
      }
    });
  }

  // Use this function for programmatic navigation
  navigateToNewAssignment() {
    this.router.navigate(['/assignments/new-assignment-form']);
  }

  onCompletedChange(id: string, assignment: Assignment) {
    this.assignmentService.updateCompletedStatus(id, assignment).subscribe({
      next: (response) => {
        this.getAllAssignments();
      }
    });
  }

  onDelete(id: string): void {
    this.assignmentService.deleteAssignment(id).subscribe({
      next: (response) => {
        this.getAllAssignments();
      }
    });
  }

  onArchive(id: string, assignment: Assignment): void {
    assignment.isArchive = true;
    this.assignmentService.updateArchiveStatus(id, assignment).subscribe({
      next: (response) => {
        this.getAllAssignments();
      }
    });
  }

  onSort(event: any) {
    // Update the default sorting properties
    this.defaultSortField = event.field;
    this.defaultSortOrder = event.order;
  }

  getLabelForType(typeValue: number): string {
    switch (typeValue) {
      case AssignmentType.Personal:
        return 'Personal';
      case AssignmentType.Work:
        return 'Work';
      case AssignmentType.Studies:
        return 'Studies';
      default:
        return 'Unknown';
    }
  }

  onSelectionChange(rowData: Assignment) {
    rowData.isSelected = true;
    if (rowData.isSelected) {
      this.selectedAssignments.push(rowData);
    } else {
      this.selectedAssignments = this.selectedAssignments.filter(
        (assignment) => assignment.id !== rowData.id
      );
    }
  }

  onArchiveSelected() {
    for (const assignment of this.selectedAssignments) {
      this.onArchive(assignment.id, assignment);
    }
    // Clear the selectedAssignments array after archiving
    this.selectedAssignments = [];
  }

  onDeleteSelected() {
    for (const assignment of this.selectedAssignments) {
      this.onDelete(assignment.id);
    }
    // Clear the selectedAssignments array after archiving
    this.selectedAssignments = [];
  }
}
