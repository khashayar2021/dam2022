import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddnotebookComponent } from './addnotebook.component';

describe('AddnotebookComponent', () => {
  let component: AddnotebookComponent;
  let fixture: ComponentFixture<AddnotebookComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddnotebookComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddnotebookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
