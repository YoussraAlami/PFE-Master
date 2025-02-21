import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LockRateComponent } from './lock-rate.component';

describe('LockRateComponent', () => {
  let component: LockRateComponent;
  let fixture: ComponentFixture<LockRateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LockRateComponent]
    });
    fixture = TestBed.createComponent(LockRateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
