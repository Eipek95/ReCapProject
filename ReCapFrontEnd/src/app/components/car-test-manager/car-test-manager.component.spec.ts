import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarTestManagerComponent } from './car-test-manager.component';

describe('CarTestManagerComponent', () => {
  let component: CarTestManagerComponent;
  let fixture: ComponentFixture<CarTestManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CarTestManagerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CarTestManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
