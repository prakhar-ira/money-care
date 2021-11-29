import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MfEquityComponent } from './mf-equity.component';

describe('MfEquityComponent', () => {
  let component: MfEquityComponent;
  let fixture: ComponentFixture<MfEquityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MfEquityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MfEquityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
