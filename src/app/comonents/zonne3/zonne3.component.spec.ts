import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Zonne3Component } from './zonne3.component';

describe('Zonne3Component', () => {
  let component: Zonne3Component;
  let fixture: ComponentFixture<Zonne3Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Zonne3Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Zonne3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
