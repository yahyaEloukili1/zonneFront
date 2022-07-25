import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZonneComponent } from './zonne.component';

describe('ZonneComponent', () => {
  let component: ZonneComponent;
  let fixture: ComponentFixture<ZonneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ZonneComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ZonneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
