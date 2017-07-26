import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListPollsComponent } from './list-polls.component';

describe('ListPollsComponent', () => {
  let component: ListPollsComponent;
  let fixture: ComponentFixture<ListPollsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListPollsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListPollsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
