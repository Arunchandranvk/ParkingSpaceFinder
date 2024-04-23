import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddparkzonesComponent } from './addparkzones.component';

describe('AddparkzonesComponent', () => {
  let component: AddparkzonesComponent;
  let fixture: ComponentFixture<AddparkzonesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddparkzonesComponent]
    });
    fixture = TestBed.createComponent(AddparkzonesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
