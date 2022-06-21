import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IniciativausuarioComponent } from './iniciativausuario.component';

describe('IniciativausuarioComponent', () => {
  let component: IniciativausuarioComponent;
  let fixture: ComponentFixture<IniciativausuarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IniciativausuarioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IniciativausuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
