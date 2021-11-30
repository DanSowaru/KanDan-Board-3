import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Card } from 'src/app/models/card.model';

@Injectable({
  providedIn: 'root',
})
export class APIService {
  private baseUrl = 'http://localhost:5000';

  constructor(private httpClient: HttpClient) {}

  cards!: Card[];


  //pega e captura o token JWT
  getToken(login: string, senha: string) {
    const url = this.baseUrl + '/login/';
    const msgBody = { login: login, senha: senha };
    const headers = { 'Content-Type': 'application/json' };
    const options = { headers: headers };
    const response = this.httpClient.post<string>(url, msgBody, options);
    return response;
  }


  authorization: string = localStorage.getItem('auth') || '';
  headers = {'Content-Type': 'application/json',Authorization: this.authorization,};

  cardsChanged = new Subject();
  isLogged = new Subject();

  


  //seta a autorização 
  setAuthorization(auth: string) {
    this.authorization = 'Bearer ' + auth;
    localStorage.setItem('auth', this.authorization);
    this.isLogged.next(true);
  }


  //reseta a autorização
  clearAuthorization() {
    this.authorization = '';
    localStorage.removeItem('auth');
    this.isLogged.next(true);
  }

  getAllCards() {
    const url = this.baseUrl + '/cards/';
    const options = { headers: this.headers };
    const res = this.httpClient.get<Card[]>(url, options);
    return res;
  }

  createCard(titulo: string, conteudo: string, lista: string) {
    let card = new Card(titulo, conteudo, lista, '');
    const url = this.baseUrl + '/cards/';
    const options = { headers: this.headers };
    const response = this.httpClient.post<Card[]>(url, card, options);
    return response;
  }

  modifyCardDataById(id: string, titulo: string, conteudo: string, lista: string) {
    const url = this.baseUrl + '/cards/' + id;
    const options = { headers: this.headers };
    const response = this.httpClient.put<Card[]>(url,{ id, titulo, conteudo, lista },options);
    return response;
  }

  eraseCardById(id: string) {
    const url = this.baseUrl + '/cards/' + id;
    const options = { headers: this.headers };
    const response = this.httpClient.delete(url, options);
    return response;
  }
}
