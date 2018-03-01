import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpModule } from '@angular/http';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { ContasPagarComponent } from './views/contas-pagar/contas-pagar/contas-pagar.component';
import { AppRoutes } from "./app.routing";
import { OmieContaPagarService } from "./services/omie-conta-pagar.service";
import { OmieClienteService } from './services/omie-cliente.service';
import { HttpClient } from './shared/http-client';
import { NgDatepickerModule } from "ng2-datepicker";
import { RemessaPagamentoCnabService } from "./services/remessa-pagamento-cnab.service";
import { OmieDocumentoService } from "./services/omie-documento.service";
import { AngularFireModule } from 'angularfire2/index';
import { environment } from '../environments/environment';
import { NavbarComponent } from './views/navbar/navbar.component';
import { FornecedoresComponent } from './views/fornecedores/fornecedores.component';
import { AngularFireDatabase } from 'angularfire2/database';
import { FornecedorService } from './services/fornecedor.service';
import { CurrencyMaskModule } from "ng2-currency-mask";
import { ToastModule } from 'ng2-toastr/ng2-toastr';
import { LoadingModule } from 'ngx-loading';
import { PreLoadService } from './services/preload.service';



@NgModule({
  declarations: [
    AppComponent,
    ContasPagarComponent,
    NavbarComponent,
    FornecedoresComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    RouterModule.forRoot(AppRoutes, { useHash: true }),
    NgDatepickerModule,
    BrowserAnimationsModule,
    CurrencyMaskModule,
    AngularFireModule.initializeApp(environment.firebase),
    ToastModule.forRoot(),
    LoadingModule.forRoot({
      fullScreenBackdrop: true
    })
  ],
  providers: [
    OmieContaPagarService,
    OmieClienteService,
    FornecedorService,
    HttpClient,
    RemessaPagamentoCnabService,
    OmieDocumentoService,
    AngularFireDatabase,
    PreLoadService,
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    { provide: LOCALE_ID, useValue: 'pt-BR' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
