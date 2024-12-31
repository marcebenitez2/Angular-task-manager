import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TaskEditDialogComponent } from './task-edit-dialog.component';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';
import { Task } from '../../../core/models/task.model';

describe('TaskEditDialogComponent', () => {
  let component: TaskEditDialogComponent;
  let fixture: ComponentFixture<TaskEditDialogComponent>;
  let dialogRef: jasmine.SpyObj<MatDialogRef<TaskEditDialogComponent>>;

  const mockTask: Task = {
    _id: '1',
    title: 'Test Task',
    description: 'Test Description',
    status: 'pending',
    project: 'project1',
    assignedTo: ['user1'],
    dueDate: '2024-12-31',
    __v: 0
  };

  beforeEach(async () => {
    dialogRef = jasmine.createSpyObj('MatDialogRef', ['close']);

    await TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        TaskEditDialogComponent,
        ReactiveFormsModule
      ],
      providers: [
        { provide: MatDialogRef, useValue: dialogRef },
        { provide: MAT_DIALOG_DATA, useValue: mockTask }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(TaskEditDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form with task data', () => {
    expect(component.editForm.get('title')?.value).toBe(mockTask.title);
    expect(component.editForm.get('description')?.value).toBe(mockTask.description);
    expect(component.editForm.get('dueDate')?.value).toEqual(new Date(mockTask.dueDate));
  });

  it('should validate required fields', () => {
    const form = component.editForm;
    
    form.controls['title'].setValue('');
    expect(form.controls['title'].valid).toBeFalsy();
    
    form.controls['description'].setValue('');
    expect(form.controls['description'].valid).toBeFalsy();
    
    form.controls['dueDate'].setValue(null);
    expect(form.controls['dueDate'].valid).toBeFalsy();
  });

  it('should close dialog with form value on valid submit', () => {
    const formValue = {
      title: 'Updated Task',
      description: 'Updated Description',
      dueDate: new Date('2024-12-31')
    };
    
    component.editForm.setValue(formValue);
    component.onSubmit();
    
    expect(dialogRef.close).toHaveBeenCalledWith(formValue);
  });

  it('should not close dialog on invalid submit', () => {
    component.editForm.controls['title'].setValue('');
    component.onSubmit();
    
    expect(dialogRef.close).not.toHaveBeenCalled();
  });

  it('should close dialog without value on cancel', () => {
    component.onCancel();
    expect(dialogRef.close).toHaveBeenCalledWith();
  });
});