import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MechanicregisterComponent } from './mechanicregister.component';

describe('MechanicregisterComponent', () => {
  let component: MechanicregisterComponent;
  let fixture: ComponentFixture<MechanicregisterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MechanicregisterComponent]
    });
    fixture = TestBed.createComponent(MechanicregisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
