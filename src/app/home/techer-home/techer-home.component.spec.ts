import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TecherHomeComponent } from './techer-home.component';

describe('TecherHomeComponent', () => {
  let component: TecherHomeComponent;
  let fixture: ComponentFixture<TecherHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TecherHomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TecherHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
