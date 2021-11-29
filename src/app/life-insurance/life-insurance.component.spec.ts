import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LifeInsuranceComponent } from './life-insurance.component';

describe('LifeInsuranceComponent', () => {
  let component: LifeInsuranceComponent;
  let fixture: ComponentFixture<LifeInsuranceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LifeInsuranceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LifeInsuranceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
