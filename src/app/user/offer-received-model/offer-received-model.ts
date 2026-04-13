import { Component,EventEmitter,signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Output } from '@angular/core';
import { JobService } from 'app/Services/jobservice/jobservice';
JobService
@Component({
  selector: 'app-offer-received-model',
  standalone:true,
  imports: [CommonModule],
  templateUrl: './offer-received-model.html',
  styleUrl: './offer-received-model.css',
})
export class OfferReceivedModel {
   @Output() closeModal = new EventEmitter<void>();

  offers = signal<any[]>([]);

  constructor(private jobService: JobService) {}

  ngOnInit(): void {
    const studentId = localStorage.getItem("studentId");

    if (studentId) {
      this.jobService.getSelectedOffers(studentId).subscribe({
        next: (res) => {
          console.log("res :  "+ res);
          
          this.offers.set(res);   //  store API data
        },
        error: (err) => console.error(err)
      });
    }
  }

  close() {
    this.closeModal.emit();
  }

  acceptOffer(offer: any) {
    console.log("Accepted", offer);
    this.close();
  }
//   acceptOffer(offer: any) {
//   this.jobService.respondToOffer(offer.applicationId, "ACCEPTED").subscribe(() => {
//     this.refreshOffers();
//   });
// }

  declineOffer(offer: any) {
    console.log("Declined", offer);
    this.close();
  }
 
}
