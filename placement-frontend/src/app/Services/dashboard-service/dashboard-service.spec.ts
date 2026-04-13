import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardService } from './dashboard-service';


describe('DashboardService', () => {
  let component: DashboardService;
  let fixture: ComponentFixture<DashboardService>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardService]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardService);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
