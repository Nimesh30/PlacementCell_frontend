import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Allapplications } from './allapplications';

describe('Allapplications', () => {
  let component: Allapplications;
  let fixture: ComponentFixture<Allapplications>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Allapplications]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Allapplications);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
