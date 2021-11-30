import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { HolderComponent } from './holder/holder.component';
import { ColumnComponent } from './holder/column/column.component';
import { CardComponent } from './holder/column/card/card.component';

import { APIService } from './services/api.service';
import { AppRoutingModule } from './app-routing.module';
import { LoginComponent } from './login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HolderComponent,
    ColumnComponent,
    CardComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
  ],
  providers: [APIService],
  bootstrap: [AppComponent],
})
export class AppModule {}
