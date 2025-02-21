import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DbStateComponent } from './db-state.component';

describe('DbStateComponent', () => {
  let component: DbStateComponent;
  let fixture: ComponentFixture<DbStateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DbStateComponent]
    });
    fixture = TestBed.createComponent(DbStateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
