import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminColorDeleteComponent } from './admin-color-delete.component';

describe('AdminColorDeleteComponent', () => {
  let component: AdminColorDeleteComponent;
  let fixture: ComponentFixture<AdminColorDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminColorDeleteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminColorDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
