import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OfferReceivedModel } from './offer-received-model';

describe('OfferReceivedModel', () => {
  let component: OfferReceivedModel;
  let fixture: ComponentFixture<OfferReceivedModel>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OfferReceivedModel]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OfferReceivedModel);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
