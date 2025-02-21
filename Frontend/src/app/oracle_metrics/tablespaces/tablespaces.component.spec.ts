import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablespacesComponent } from './tablespaces.component';

describe('TablespacesComponent', () => {
  let component: TablespacesComponent;
  let fixture: ComponentFixture<TablespacesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TablespacesComponent]
    });
    fixture = TestBed.createComponent(TablespacesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
