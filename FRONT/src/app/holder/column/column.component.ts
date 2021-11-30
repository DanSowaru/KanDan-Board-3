import {
  Component,
  Input,
  OnInit,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { Card } from 'src/app/models/card.model';
import { APIService } from 'src/app/services/api.service';

@Component({
  selector: 'app-column',
  templateUrl: './column.component.html',
  styleUrls: ['./column.component.css'],
})
export class ColumnComponent implements OnInit {
  @Input() column!: string;
  @Input() cards!: Card[];

  constructor(private api: APIService) {}

  ngOnInit(): void {
  }

  onCardChanged(c: Card) {
    this.cards.forEach((card) => {
      if (card.id === c.id) {

        card.conteudo = c.conteudo;
        card.titulo = c.titulo;
        card.lista = c.lista;
      }
    })
    
  }

  createCard() {
    this.cards.push({ titulo: '', conteudo: '', lista: this.column, id: '' });
  }
}
