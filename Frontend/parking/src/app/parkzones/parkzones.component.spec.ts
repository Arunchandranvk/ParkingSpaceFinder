import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParkzonesComponent } from './parkzones.component';

describe('ParkzonesComponent', () => {
  let component: ParkzonesComponent;
  let fixture: ComponentFixture<ParkzonesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ParkzonesComponent]
    });
    fixture = TestBed.createComponent(ParkzonesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
