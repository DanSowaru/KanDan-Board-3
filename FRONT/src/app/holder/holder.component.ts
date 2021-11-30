import { Component, OnInit } from '@angular/core';
import { COLUMNS } from 'src/app/models/columns';
import { APIService } from 'src/app/services/api.service';
import { Router } from '@angular/router';
import { Card } from 'src/app/models/card.model';


@Component({
  selector: 'app-holder',
  templateUrl: './holder.component.html',
  styleUrls: ['./holder.component.css'],
})
export class HolderComponent implements OnInit {
  columns = COLUMNS;
  logedIn!: boolean;

  getCardsFromURL() {
    this.api.getAllCards().subscribe((cards) => {
      if (!cards) {
        return;
      } else {
        this.cards = cards;
      }
    });
  }

  cards!: Card[];
  constructor(private api: APIService, private router: Router) {}

  ngOnInit(): void {
     this.getCardsFromURL();

     this.api.cardsChanged.subscribe((card) => {
       this.getCardsFromURL();
     });
  }

  
}
