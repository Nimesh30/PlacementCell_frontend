import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Applymodal } from './applymodal';

describe('Applymodal', () => {
  let component: Applymodal;
  let fixture: ComponentFixture<Applymodal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Applymodal]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Applymodal);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
