import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Studentmodal } from './studentmodal';

describe('Studentmodal', () => {
  let component: Studentmodal;
  let fixture: ComponentFixture<Studentmodal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Studentmodal]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Studentmodal);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
