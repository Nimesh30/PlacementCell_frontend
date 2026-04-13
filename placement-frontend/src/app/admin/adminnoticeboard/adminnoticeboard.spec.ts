import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Adminnoticeboard } from './adminnoticeboard';

describe('Adminnoticeboard', () => {
  let component: Adminnoticeboard;
  let fixture: ComponentFixture<Adminnoticeboard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Adminnoticeboard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Adminnoticeboard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
