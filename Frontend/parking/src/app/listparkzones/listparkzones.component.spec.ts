import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListparkzonesComponent } from './listparkzones.component';

describe('ListparkzonesComponent', () => {
  let component: ListparkzonesComponent;
  let fixture: ComponentFixture<ListparkzonesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListparkzonesComponent]
    });
    fixture = TestBed.createComponent(ListparkzonesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
