import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewfeedbackComponent } from './viewfeedback.component';

describe('ViewfeedbackComponent', () => {
  let component: ViewfeedbackComponent;
  let fixture: ComponentFixture<ViewfeedbackComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewfeedbackComponent]
    });
    fixture = TestBed.createComponent(ViewfeedbackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
