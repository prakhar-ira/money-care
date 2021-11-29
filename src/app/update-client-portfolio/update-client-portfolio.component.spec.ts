import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateClientPortfolioComponent } from './update-client-portfolio.component';

describe('UpdateClientPortfolioComponent', () => {
  let component: UpdateClientPortfolioComponent;
  let fixture: ComponentFixture<UpdateClientPortfolioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateClientPortfolioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateClientPortfolioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
