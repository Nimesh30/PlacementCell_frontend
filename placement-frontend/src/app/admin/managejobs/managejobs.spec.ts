import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Managejobs } from './managejobs';

describe('Managejobs', () => {
  let component: Managejobs;
  let fixture: ComponentFixture<Managejobs>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Managejobs]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Managejobs);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
