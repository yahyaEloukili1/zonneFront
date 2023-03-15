import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MokararinComponent } from './mokararin.component';

describe('MokararinComponent', () => {
  let component: MokararinComponent;
  let fixture: ComponentFixture<MokararinComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MokararinComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MokararinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
