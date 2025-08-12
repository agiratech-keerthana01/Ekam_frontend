import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-hero',
  imports: [CommonModule, MatFormFieldModule, MatIconModule],
  templateUrl: './hero.html',
  styleUrl: './hero.scss'
})
export class Hero {

  trustedCompanies = [
    { name: 'TCS', logo: 'uploaded:image 14.png-20d2e14c-0aa5-4fc8-b15b-708379f5e5d7' },
    { name: 'Wipro', logo: 'uploaded:image 16.png-7ceed714-0f7a-43b5-b3b7-1c48098c6341' },
    { name: 'Facebook', logo: 'https://placehold.co/100x40/000/fff?text=Facebook' },
    { name: 'IBM', logo: 'uploaded:image 17.png-0914876f-4f68-4f91-899f-5a31f6ff221c' },
    { name: 'Bosch', logo: 'https://placehold.co/100x40/000/fff?text=Bosch' },
    { name: 'Airtel', logo: 'https://placehold.co/100x40/000/fff?text=Airtel' },
    { name: 'Tech Mahindra', logo: 'https://placehold.co/100x40/000/fff?text=TM' },
  ];

}
