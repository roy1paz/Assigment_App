import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Assignment } from '../models/assignment.model';

@Injectable({
  providedIn: 'root'
})

export class AssignmentService {
  baseApiUrl: string = 'http://localhost:5164';

  constructor(private http: HttpClient) {}

  getAllAssignments(showArchives: boolean = false): Observable<Assignment[]> {
    return this.http.get<Assignment[]>(this.baseApiUrl + '/api/assignment').pipe(
      map((assignments) =>
        showArchives ? assignments : assignments.filter((assignment) => !assignment.isArchive)
      )
    );
  }

  addAssignment(newAssignment: Assignment): Observable<Assignment> {
    newAssignment.id = "00000000-0000-0000-0000-000000000000"
    console.log(newAssignment.startDate,newAssignment.endDate)
    return this.http.post<Assignment>(this.baseApiUrl + '/api/assignment', newAssignment);
  }

  updateCompletedStatus(id: string, assignment: Assignment): Observable<Assignment> {
    return this.http.put<Assignment>(this.baseApiUrl + '/api/assignment/' + id + '/completed', assignment);
  }

  updateArchiveStatus(id: string, assignment: Assignment): Observable<Assignment> {
    return this.http.put<Assignment>(this.baseApiUrl + '/api/assignment/' + id + '/archive', assignment);
  }

  deleteAssignment(id: string): Observable<Assignment> {
    return this.http.delete<Assignment>(this.baseApiUrl + '/api/assignment/' + id);
  }

}
