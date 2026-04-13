import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewJobModal } from './addnewjobmodal';

describe('Addnewjobmodal', () => {
  let component: AddNewJobModal;
  let fixture: ComponentFixture<AddNewJobModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddNewJobModal]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddNewJobModal);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
