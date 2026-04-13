import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Myapplications } from './myapplications';

describe('Myapplications', () => {
  let component: Myapplications;
  let fixture: ComponentFixture<Myapplications>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Myapplications]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Myapplications);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
