import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateparkzonesComponent } from './updateparkzones.component';

describe('UpdateparkzonesComponent', () => {
  let component: UpdateparkzonesComponent;
  let fixture: ComponentFixture<UpdateparkzonesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateparkzonesComponent]
    });
    fixture = TestBed.createComponent(UpdateparkzonesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
