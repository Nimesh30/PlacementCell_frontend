import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Noticeboard } from './noticeboard';

describe('Noticeboard', () => {
  let component: Noticeboard;
  let fixture: ComponentFixture<Noticeboard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Noticeboard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Noticeboard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
