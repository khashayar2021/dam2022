import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotebookviewComponent } from './notebookview.component';

describe('NotebookviewComponent', () => {
  let component: NotebookviewComponent;
  let fixture: ComponentFixture<NotebookviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NotebookviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NotebookviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
