import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BriandComponent } from './briand.component';

describe('BriandComponent', () => {
  let component: BriandComponent;
  let fixture: ComponentFixture<BriandComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BriandComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BriandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
