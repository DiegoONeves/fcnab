import { Injectable } from '@angular/core';
import { ContaPagar } from '../models/conta-pagar.model';
import { Remessa, HeaderRemessa } from "../models/remessa.model";

@Injectable()
export class RemessaPagamentoCnabService {

  constructor() { }


  generateRemessa(contas: ContaPagar[]) {

    let arquivo = "";
    let registroHeaderArquivo = "";
    let lotes = "";
    let registroTrailerArquivo = "";

    registroHeaderArquivo = "34100000"

    let remessa = new Remessa();
    remessa.header.CODIGO_DO_BANCO = "341";
    remessa.header.INSCRICAO_NUMERO = "03775758000190";
    remessa.header.AGENCIA = "454";
    remessa.header.CONTA = "44072";
    remessa.header.DAC_DA_AGENCIA_CONTA_DEBITADA = "8";
    remessa.header.NOME_DA_EMPRESA = "FCAMARA CONSULTORIA E FORMACAO";
    remessa.header.NOME_DO_BANCO = "BCO ITAU S/A"

    console.log('!'+remessa.header.buildHeader()+'!');

  }

}
