import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminviewreserveComponent } from './adminviewreserve.component';

describe('AdminviewreserveComponent', () => {
  let component: AdminviewreserveComponent;
  let fixture: ComponentFixture<AdminviewreserveComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminviewreserveComponent]
    });
    fixture = TestBed.createComponent(AdminviewreserveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
