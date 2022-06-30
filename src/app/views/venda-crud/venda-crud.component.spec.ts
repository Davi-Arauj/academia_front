import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VendaCrudComponent } from './venda-crud.component';

describe('VendaCrudComponent', () => {
  let component: VendaCrudComponent;
  let fixture: ComponentFixture<VendaCrudComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VendaCrudComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VendaCrudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
