import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EvalTestCasesComponent } from './eval-test-cases.component';

describe('EvalTestCasesComponent', () => {
  let component: EvalTestCasesComponent;
  let fixture: ComponentFixture<EvalTestCasesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EvalTestCasesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EvalTestCasesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
