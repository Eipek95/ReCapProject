import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCarDeleteComponent } from './admin-car-delete.component';

describe('AdminCarDeleteComponent', () => {
  let component: AdminCarDeleteComponent;
  let fixture: ComponentFixture<AdminCarDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminCarDeleteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminCarDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
