import { Injectable } from '@angular/core';

import { ContaPagar } from '../models/conta-pagar.model';
import { Remessa } from "../models/remessa.model";
import { List } from 'linqts';
import { Lote } from '../models/lote.model';
import { HeaderLote } from '../models/header-lote.model';
import { Common } from '../shared/common';
import { Detalhe } from '../models/detalhe-lote.model';
import * as moment from 'moment';

@Injectable()
export class RemessaPagamentoCnabService {

  constructor() { }
  remessa: Remessa = new Remessa();

  generateRemessa(contas: ContaPagar[]) {

    let fileCNAB = "";
    let contasList = new List<ContaPagar>();

    for (let c of contas)
      contasList.Add(c);

    this.remessa.header.CODIGO_DO_BANCO = "341";
    this.remessa.header.INSCRICAO_NUMERO = "03775758000190";
    this.remessa.header.AGENCIA = "454";
    this.remessa.header.CONTA = "44072";
    this.remessa.header.DAC_DA_AGENCIA_CONTA_DEBITADA = "8";
    this.remessa.header.NOME_DA_EMPRESA = "FCAMARA CONSULTORIA E FORMACAO";
    this.remessa.header.NOME_DO_BANCO = "BCO ITAU S/A";
    fileCNAB = this.remessa.header.generateHeader();
    contasList = contasList.OrderBy(x => x.tipoDocumento);

    // let tiposDocumentos = contasList.Select(x => x.codigo_tipo_documento).Distinct().ToArray();

    let codigoLote = 1;

    var pagamentosSegmentoA = contasList.Where(x =>
      x.codigo_tipo_documento === "TRA"
      || x.codigo_tipo_documento === "NF").ToArray();

    if (pagamentosSegmentoA.length > 0) {
      fileCNAB += this.resolveSegmentoA(pagamentosSegmentoA, codigoLote);
      codigoLote++;
    }



    console.log('file concluído', fileCNAB);
    return fileCNAB;

  }

  resolveSegmentoA(contasSegmentoA: ContaPagar[], codigoLote: number) {
    console.log('resolvendo segmento A');
    let linesSegmentoA = "";
    let segmentoA = new Lote();
    segmentoA.header = new HeaderLote();
    segmentoA.header.CODIGO_DO_BANCO = this.remessa.header.CODIGO_DO_BANCO;
    segmentoA.header.CODIGO_DO_LOTE = Common.padLeft(this.getLengthLote().toString(), '0', 4);
    segmentoA.header.TIPO_DE_PAGAMENTO = "20"; //nos arquivos sempre usa o 20
    segmentoA.header.FORMA_DE_PAGAMENTO = "30";
    segmentoA.header.EMPRESA_INSCRICAO = this.remessa.header.EMPRESA_INSCRICAO;
    segmentoA.header.INSCRICAO_NUMERO = this.remessa.header.INSCRICAO_NUMERO;
    segmentoA.header.AGENCIA = this.remessa.header.AGENCIA;
    segmentoA.header.CONTA = this.remessa.header.CONTA;
    segmentoA.header.DAC = this.remessa.header.DAC_DA_AGENCIA_CONTA_DEBITADA;
    segmentoA.header.NOME_DA_EMPRESA = this.remessa.header.NOME_DA_EMPRESA;
    segmentoA.header.ENDEREÇO_DA_EMPRESA = "RUA PERNAMBUCO";
    segmentoA.header.NUMERO = "152";
    segmentoA.header.COMPLEMENTO = "CONJ 44";
    segmentoA.header.CIDADE = "SANTOS";
    segmentoA.header.CEP = "11065050";
    segmentoA.header.ESTADO = "SP";
    linesSegmentoA = segmentoA.header.generateHeaderSegmentoA();

    let numeroRegistro = 1;
    for (let currentConta of contasSegmentoA) {

      let detalhe = new Detalhe();
      detalhe.CODIGO_DO_BANCO = this.remessa.header.CODIGO_DO_BANCO;
      detalhe.CODIGO_DO_LOTE = codigoLote.toString();
      detalhe.TIPO_DE_REGISTRO = "3";
      detalhe.SEGMENTO = "A";
      detalhe.NUMERO_DO_REGISTRO = numeroRegistro.toString();
      detalhe.BANCO_FAVORECIDO = currentConta.fornecedor.banco;
      detalhe.AGENCIA_FAVORECIDO = currentConta.fornecedor.agencia;
      detalhe.CONTA_FAVORECIDO = currentConta.fornecedor.conta;
      detalhe.DAC_FAVORECIDO = currentConta.fornecedor.digitoConta.toString();
      detalhe.NOME_DO_FAVORECIDO = currentConta.fornecedor.nome;
      detalhe.SEU_NUMERO = currentConta.numero_documento_fiscal;
      detalhe.N_DE_INSCRICAO = currentConta.cpfCnpj;
      detalhe.DATA_DE_PAGTO = currentConta.data_previsao;
      detalhe.MOEDA_TIPO = "009";
      detalhe.VALOR_DO_PAGTO = currentConta.valorAPagar.toString();
      detalhe.AVISO = "0";

      linesSegmentoA += detalhe.generateDetalheSegmentoA();
      //detalhe.DATA_DE_PAGTO = currentConta.da
      segmentoA.detalhes.push(detalhe);

      //verificar se é A NF ou Transferência
      numeroRegistro++;
    }

    //generate trailer
    //this.remessa.lotes.push(segmentoA);

    return linesSegmentoA;
  }



  getLengthLote() {
    return this.remessa.lotes.length + 1;
  }
}
