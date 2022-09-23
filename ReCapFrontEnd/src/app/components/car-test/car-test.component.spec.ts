import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarTestComponent } from './car-test.component';

describe('CarTestComponent', () => {
  let component: CarTestComponent;
  let fixture: ComponentFixture<CarTestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CarTestComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CarTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
