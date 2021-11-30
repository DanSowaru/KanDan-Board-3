import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Card } from 'src/app/models/card.model';
import { COLUMNS } from 'src/app/models/columns';
import { APIService } from 'src/app/services/api.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
})
export class CardComponent implements OnInit {
  @Input() column!: string;
  @Input() card!: Card;
  @Output() ChangedCard = new EventEmitter<Card[]>();

  columns = COLUMNS;
  firstColumn?: boolean;
  lastColumn?: boolean;

  id: string = '';
  title: string = '';
  description: string = '';
  lista: string = '';

  editMode: boolean = false;

  constructor(private api: APIService) {}

  ngOnInit(): void {
    this.getCardData();
  }

  

  toggleEditMode() {
    this.editMode = !this.editMode;
  }

  moveCardToLeft() {
    if (this.firstColumn) {
      return;
    }
    const index = this.columns.indexOf(this.card.lista);
    this.card.lista = this.columns[index - 1];
    this.api.modifyCardDataById(this.card.id,this.title,this.description,this.card.lista).subscribe((card) => {this.api.cardsChanged.next(card)});
  }

  moveCardToRight() {
    if (this.lastColumn) {
      return;
    }
    const index = this.columns.indexOf(this.card.lista);
    this.card.lista = this.columns[index + 1];
    this.api.modifyCardDataById(this.card.id,this.title,this.description,this.card.lista).subscribe((card) => {this.api.cardsChanged.next(card)});
  }

  saveCard() { //salvar o card
    if (this.card.id) {
      this.api.modifyCardDataById(this.card.id, this.title, this.description, this.lista).subscribe((card) => {});
    } else {
      this.api.createCard(this.title, this.description, this.lista).subscribe((card) => {this.api.cardsChanged.next(card)});
    }
    this.toggleEditMode();
  }


  getCardData(): void {
    this.firstColumn = this.columns.indexOf(this.card.lista) == 0;
    this.lastColumn =
    this.columns.indexOf(this.card.lista) == this.columns.length - 1;

    this.id = this.card.id;
    this.title = this.card.titulo;
    this.description = this.card.conteudo;
    this.lista = this.card.lista;

    if (!this.id) {
      this.toggleEditMode();
    }
  }



  EditModeOff() {
    this.title = this.card.titulo;
    this.description = this.card.conteudo;
    this.lista = this.card.lista;
    this.toggleEditMode();
  }

  eraseCard() {
    this.api.eraseCardById(this.card.id).subscribe((card) => {
      this.api.cardsChanged.next(card);
    });
  }
}
