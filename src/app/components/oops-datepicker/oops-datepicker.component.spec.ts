import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OopsDatepickerComponent } from './oops-datepicker.component';

describe('OopsDatepickerComponent', () => {
  let component: OopsDatepickerComponent;
  let fixture: ComponentFixture<OopsDatepickerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OopsDatepickerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OopsDatepickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
