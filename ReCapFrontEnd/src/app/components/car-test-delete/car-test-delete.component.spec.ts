import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarTestDeleteComponent } from './car-test-delete.component';

describe('CarTestDeleteComponent', () => {
  let component: CarTestDeleteComponent;
  let fixture: ComponentFixture<CarTestDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CarTestDeleteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CarTestDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
