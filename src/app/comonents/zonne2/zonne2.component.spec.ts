import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Zonne2Component } from './zonne2.component';

describe('Zonne2Component', () => {
  let component: Zonne2Component;
  let fixture: ComponentFixture<Zonne2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Zonne2Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Zonne2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
