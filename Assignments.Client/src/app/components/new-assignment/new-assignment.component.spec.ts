import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewAssignmentComponent } from './new-assignment.component';

describe('NewAssignmentsComponent', () => {
  let component: NewAssignmentComponent;
  let fixture: ComponentFixture<NewAssignmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewAssignmentComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(NewAssignmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
