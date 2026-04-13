import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Joblistings } from './joblistings';

describe('Joblistings', () => {
  let component: Joblistings;
  let fixture: ComponentFixture<Joblistings>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Joblistings]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Joblistings);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  
});
