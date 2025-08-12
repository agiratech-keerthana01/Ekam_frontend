import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-featured-jobs',
  imports: [CommonModule, MatIconModule],
  templateUrl: './featured-jobs.html',
  styleUrl: './featured-jobs.scss'
})
export class FeaturedJobs {

  featuredJobs = [
    { title: 'Experienced system engineer', company: 'Virtusa', location: '3-7 years, Bengaluru +2 more', applicants: 100, logo: 'https://placehold.co/50x50/000/fff?text=V' },
    { title: 'Technical sales executive', company: 'Virtusa', location: '3-7 years, Bengaluru +2 more', applicants: 200, logo: 'https://placehold.co/50x50/000/fff?text=V' },
  ];

  featuredEmployers = [
    { name: 'Virtusa', logo: 'https://placehold.co/50x50/e8f0fe/1a237e?text=V' },
    { name: 'Tech Mahindra', logo: 'https://placehold.co/50x50/333/fff?text=TM' },
    { name: 'Airtel', logo: 'https://placehold.co/50x50/e01e2b/fff?text=A' },
    { name: 'J.P. Morgan & Co', logo: 'https://placehold.co/50x50/14357b/fff?text=JPM' },
  ];

  

}
