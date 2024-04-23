import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyparkzoneComponent } from './myparkzone.component';

describe('MyparkzoneComponent', () => {
  let component: MyparkzoneComponent;
  let fixture: ComponentFixture<MyparkzoneComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MyparkzoneComponent]
    });
    fixture = TestBed.createComponent(MyparkzoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
