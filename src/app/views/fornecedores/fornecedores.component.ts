import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { Fornecedor } from '../../models/fornecedor.model';


@Component({
  selector: 'app-fornecedores',
  templateUrl: './fornecedores.component.html',
  styleUrls: ['./fornecedores.component.css']
})
export class FornecedoresComponent implements OnInit {

  constructor(private angularFire: AngularFireDatabase) { }
  fornecedores: FirebaseListObservable<any[]>;
  fornecedor: Fornecedor = new Fornecedor();
  fornecedorToUpdate: any = null;
  ngOnInit() {
    this.listAll();
  }

  createOrEdit() {
    if (!this.fornecedorToUpdate) {
      this.angularFire.list('fornecedores').push(this.fornecedor);
    } else {
      this.angularFire.object('/fornecedores/' + this.fornecedorToUpdate.$key)
        .update(this.fornecedor);
    }
    this.fornecedor = new Fornecedor();
    this.fornecedorToUpdate = null;
  }

  listAll() {
    this.fornecedores = this.angularFire.list('fornecedores');
    console.log(this.fornecedores);
  }

  setCurrentFornecedor(fornecedor: any) {
    this.fornecedor = new Fornecedor();
    this.fornecedorToUpdate = fornecedor;
    this.fornecedor.nome = fornecedor.nome;
    this.fornecedor.cpfCnpj = fornecedor.cpfCnpj;
    this.fornecedor.agencia = fornecedor.agencia;
    this.fornecedor.conta = fornecedor.conta;
    this.fornecedor.banco = fornecedor.banco;
    this.fornecedor.digitoConta = fornecedor.digitoConta;
  }

}
