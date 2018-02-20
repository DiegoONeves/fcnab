import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable, FirebaseListFactory } from 'angularfire2/database';
import { Fornecedor } from '../models/fornecedor.model';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class FornecedorService {

  constructor(private angularFire: AngularFireDatabase) { }

  getAll() {
    return this.angularFire.list('fornecedores');
  }

  getByCpfCnpj(cpfCnpj: string) {
    return this.angularFire.list('fornecedores', {
      query: {
        indexOn: "cpfCnpj",
        orderByChild: 'cpfCnpj',
        equalTo: cpfCnpj
      }
    });
  }

}
