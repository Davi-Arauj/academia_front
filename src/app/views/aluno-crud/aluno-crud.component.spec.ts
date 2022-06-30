import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlunoCrudComponent } from './aluno-crud.component';

describe('AlunoCrudComponent', () => {
  let component: AlunoCrudComponent;
  let fixture: ComponentFixture<AlunoCrudComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlunoCrudComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AlunoCrudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
