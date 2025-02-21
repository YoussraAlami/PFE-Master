import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArchiverStateComponent } from './archiver-state.component';

describe('ArchiverStateComponent', () => {
  let component: ArchiverStateComponent;
  let fixture: ComponentFixture<ArchiverStateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ArchiverStateComponent]
    });
    fixture = TestBed.createComponent(ArchiverStateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
