import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstanceStatusComponent } from './instance-status.component';

describe('InstanceStatusComponent', () => {
  let component: InstanceStatusComponent;
  let fixture: ComponentFixture<InstanceStatusComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InstanceStatusComponent]
    });
    fixture = TestBed.createComponent(InstanceStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
