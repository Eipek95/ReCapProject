import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminColorAddComponent } from './admin-color-add.component';

describe('AdminColorAddComponent', () => {
  let component: AdminColorAddComponent;
  let fixture: ComponentFixture<AdminColorAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminColorAddComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminColorAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
