import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EmployerService } from '../../services/employer-service';
import { CreditCard } from '../../../shared/models/creditCard.model';
import { PlanAdmin } from '../../../shared/models/planAdmin.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-buy-plan',
  standalone: false,
  templateUrl: './buy-plan.html',
  styleUrl: './buy-plan.scss'
})
export class BuyPlan implements OnInit{

  // selectedTab: 'card' | 'netbanking' = 'card'; // default tab

  // savedCards: CreditCard[] = [];
  // banks: string[] = [];
  // otherBanks: string[] = [];

  // selectedCard: string = '';
  // selectedBank: string = '';

  // plan!: PlanAdmin;
  // taxValue: number = 0;
  // totalAmount: number = 0;


  // constructor(
  //   private snackBar: MatSnackBar, 
  //   private employerService: EmployerService,
  // ) {}

  // ngOnInit(): void {
  //    const userId = Number(localStorage.getItem('userId'));

  //   // Fetch saved cards
  //   this.employerService.getSavedCards(userId).subscribe({
  //     next: (cards) => {
  //       this.savedCards = cards;
  //       if (cards.length > 0) {
  //         this.selectedCard = cards[0].number;
  //       }
  //     },
  //     error: () => {
  //       this.snackBar.open('Failed to fetch saved cards', 'Close', { duration: 3000 });
  //     }
  //   });

  //   // Fetch banks
  //   this.employerService.getBanks(userId).subscribe({
  //     next: (bankList) => {
  //       this.banks = bankList.map(b => b.name);
  //       if (this.banks.length > 0) {
  //         this.selectedBank = this.banks[0];
  //       }
  //       // Suppose otherBanks are the ones not marked popular (you can change backend for this)
  //       this.otherBanks = ['HDFC Bank', 'ICICI Bank', 'Yes Bank', 'Kotak Mahindra'];
  //     },
  //     error: () => {
  //       this.snackBar.open('Failed to fetch banks', 'Close', { duration: 3000 });
  //     }
  //   });
  // }

  // onProceed() {
  //   this.snackBar.open('You can make the payment now!', 'Close', {
  //     duration: 3000,
  //     panelClass: ['snackbar-success'],
  //     verticalPosition: 'top',
  //   });
  // }

  selectedTab: 'card' | 'netbanking' = 'card'; // default tab

  savedCards: CreditCard[] = [];
  banks: string[] = [];
  otherBanks: string[] = [];

  selectedCard: string = '';
  selectedBank: string = '';

  plan!: PlanAdmin;
  taxValue: number = 0;
  totalAmount: number = 0;

  userId!: number;
  planId!: number;

  constructor(
    private snackBar: MatSnackBar,
    private employerService: EmployerService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.userId = Number(localStorage.getItem('userId'));
    this.planId = Number(this.route.snapshot.paramMap.get('id'));

    if (!this.userId) {
      this.snackBar.open('User not logged in', 'Close', { duration: 3000 });
      return;
    }

    if (this.planId) {
      this.employerService.getPlanById(this.planId).subscribe({
        next: (data: PlanAdmin) => {
          this.plan = data;
          this.calculateSummary();
        },
        error: () => {
          this.snackBar.open('Failed to fetch plan details', 'Close', { duration: 3000 });
        }
      });
    }

    // Fetch saved cards
    this.employerService.getSavedCards(this.userId).subscribe({
      next: (cards) => {
        this.savedCards = cards;
        if (cards.length > 0) {
          this.selectedCard = cards[0].number;
        }
      },
      error: () => {
        this.snackBar.open('Failed to fetch saved cards', 'Close', { duration: 3000 });
      }
    });

    // Fetch banks
    this.employerService.getBanks(this.userId).subscribe({
      next: (bankList) => {
        this.banks = bankList.map(b => b.name);
        if (this.banks.length > 0) {
          this.selectedBank = this.banks[0];
        }
        this.otherBanks = ['HDFC Bank', 'ICICI Bank', 'Yes Bank', 'Kotak Mahindra'];
      },
      error: () => {
        this.snackBar.open('Failed to fetch banks', 'Close', { duration: 3000 });
      }
    });
  }

  calculateSummary(): void {
    this.taxValue = this.plan.price * 0.05;  // 5% tax
    this.totalAmount = this.plan.price + this.taxValue;
  }

  onProceed() {
    if (this.selectedTab === 'card') {
      this.saveCardPayment();
    } else {
      this.saveBankPayment();
    }
  }

  private saveCardPayment() {
    const selectedCard = this.savedCards.find(c => c.number === this.selectedCard);
    if (!selectedCard) {
      this.snackBar.open('No card selected', 'Close', { duration: 3000 });
      return;
    }

    this.employerService.addCard(selectedCard, this.userId, this.planId).subscribe({
      next: () => {
        this.snackBar.open('Payment successful via Card 🎉', 'Close', { duration: 3000 });
      },
      error: () => {
        this.snackBar.open('Payment failed', 'Close', { duration: 3000 });
      }
    });
  }

  private saveBankPayment() {
    if (!this.selectedBank) {
      this.snackBar.open('No bank selected', 'Close', { duration: 3000 });
      return;
    }

    this.employerService.saveBank(this.selectedBank, this.userId, this.planId).subscribe({
      next: () => {
        this.snackBar.open('Payment successful via Bank 🎉', 'Close', { duration: 3000 });
      },
      error: () => {
        this.snackBar.open('Payment failed', 'Close', { duration: 3000 });
      }
    });
  }

}
