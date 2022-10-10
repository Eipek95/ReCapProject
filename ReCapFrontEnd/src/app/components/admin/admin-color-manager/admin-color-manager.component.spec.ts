import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminColorManagerComponent } from './admin-color-manager.component';

describe('AdminColorManagerComponent', () => {
  let component: AdminColorManagerComponent;
  let fixture: ComponentFixture<AdminColorManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminColorManagerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminColorManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
