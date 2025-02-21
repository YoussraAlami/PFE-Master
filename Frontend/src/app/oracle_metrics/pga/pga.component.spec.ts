import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PgaComponent } from './pga.component';

describe('PgaComponent', () => {
  let component: PgaComponent;
  let fixture: ComponentFixture<PgaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PgaComponent]
    });
    fixture = TestBed.createComponent(PgaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
