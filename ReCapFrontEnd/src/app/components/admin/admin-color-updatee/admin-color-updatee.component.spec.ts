import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminColorUpdateeComponent } from './admin-color-updatee.component';

describe('AdminColorUpdateeComponent', () => {
  let component: AdminColorUpdateeComponent;
  let fixture: ComponentFixture<AdminColorUpdateeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminColorUpdateeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminColorUpdateeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
