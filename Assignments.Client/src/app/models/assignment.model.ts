export interface Assignment {
  id: string;
  type: any;
  title: string;
  description: string;
  startDate: string;
  endDate: string | null;
  cyclic: boolean;
  isCompleted: boolean;
  completeDate: Date | null;
  isArchive: boolean;
  isSelected: boolean;
}

export interface Type {
    label: string;
    value: number;
}
  
export interface Cyclic {
    label: string;
    value: boolean;
}
  
export enum AssignmentType {
    Personal = 0,
    Studies = 1,
    Work = 2
}
