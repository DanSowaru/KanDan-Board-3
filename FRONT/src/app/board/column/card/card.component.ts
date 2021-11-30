import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Card } from 'src/app/models/card.model';
import { columns } from 'src/app/models/columns';
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

  columns = columns;
  firstColumn?: boolean;
  lastColumn?: boolean;

  id: string = '';
  titulo: string = '';
  conteudo: string = '';
  lista: string = '';

  editMode: boolean = false;

  constructor(private api: APIService) {}

  ngOnInit(): void {
    this.getCardData();
  }

  

  toggleEditMode() {
    this.editMode = !this.editMode;
  }

  rewindCard() {
    if (this.firstColumn) {
      return;
    }
    const index = this.columns.indexOf(this.card.lista);
    this.card.lista = this.columns[index - 1];
    this.api.modifyCardDataById(this.card.id,this.titulo,this.conteudo,this.card.lista).subscribe((card) => {this.api.cardsChanged.next(card)});
  }

  advanceCard() {
    if (this.lastColumn) {
      return;
    }
    const index = this.columns.indexOf(this.card.lista);
    this.card.lista = this.columns[index + 1];
    this.api.modifyCardDataById(this.card.id,this.titulo,this.conteudo,this.card.lista).subscribe((card) => {this.api.cardsChanged.next(card)});
  }

  saveCard() { //salvar o card
    if (this.card.id) {
      this.api.modifyCardDataById(this.card.id, this.titulo, this.conteudo, this.lista).subscribe((card) => {});
    } else {
      this.api.createCard(this.titulo, this.conteudo, this.lista).subscribe((card) => {this.api.cardsChanged.next(card)});
    }
    this.toggleEditMode();
  }


  getCardData(): void {
    this.firstColumn = this.columns.indexOf(this.card.lista) == 0;
    this.lastColumn =
    this.columns.indexOf(this.card.lista) == this.columns.length - 1;

    this.id = this.card.id;
    this.titulo = this.card.titulo;
    this.conteudo = this.card.conteudo;
    this.lista = this.card.lista;

    if (!this.id) {
      this.toggleEditMode();
    }
  }



  cancelEdit() {
    this.titulo = this.card.titulo;
    this.conteudo = this.card.conteudo;
    this.lista = this.card.lista;
    this.toggleEditMode();
  }

  deleteCard() {
    this.api.eraseCardById(this.card.id).subscribe((card) => {
      this.api.cardsChanged.next(card);
    });
  }


  getBackgroundColor() {
    switch (this.lista) {
     
      case "ToDo": {
        return "rgb(255, 240, 240)";

      }

      case "Doing": {
        return "rgb(255, 255, 240)";
      }

      case "Done": {
        return "rgb(240, 255, 255)";
      }

      default: {
        return "white";
      }
    }
  }


}
