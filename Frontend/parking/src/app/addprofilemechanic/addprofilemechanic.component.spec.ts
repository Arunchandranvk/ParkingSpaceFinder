import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddprofilemechanicComponent } from './addprofilemechanic.component';

describe('AddprofilemechanicComponent', () => {
  let component: AddprofilemechanicComponent;
  let fixture: ComponentFixture<AddprofilemechanicComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddprofilemechanicComponent]
    });
    fixture = TestBed.createComponent(AddprofilemechanicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
