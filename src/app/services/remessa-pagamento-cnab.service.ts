import { Injectable } from '@angular/core';

import { ContaPagar } from '../models/conta-pagar.model';
import { Remessa } from "../models/remessa.model";
import { List } from 'linqts';
import { Lote } from '../models/lote.model';
import { HeaderLote } from '../models/header-lote.model';
import { Common } from '../shared/common';
import { Detalhe } from '../models/detalhe-lote.model';
import * as moment from 'moment';
import { ConfigurationHeader } from '../models/configuration-header.model';

@Injectable()
export class RemessaPagamentoCnabService {

  constructor() { }
  remessa: Remessa = new Remessa();

  generateRemessa(contas: ContaPagar[], configurationHeader: ConfigurationHeader) {

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
    var pagamentosSegmentoA = contasList.Where(x => x.codigo_tipo_documento === "TRA" || x.codigo_tipo_documento === "NF").ToArray();
    if (pagamentosSegmentoA.length > 0) {
      fileCNAB += this.resolveSegmentoA(pagamentosSegmentoA, codigoLote, configurationHeader);
      codigoLote++;
    }

    var pagamentosSegmentoJ = contasList.Where(x => x.codigo_tipo_documento === "BOL").ToArray();
    if (pagamentosSegmentoJ.length > 0) {
      fileCNAB += this.resolveSegmentoJ(pagamentosSegmentoJ, codigoLote, configurationHeader);
      codigoLote++;
    }

    var pagamentosSegmentoN = contasList.Where(x => x.codigo_tipo_documento === "BOL").ToArray();
    if (pagamentosSegmentoN.length > 0) {
      fileCNAB += this.resolveSegmentoN(pagamentosSegmentoN, codigoLote);
      codigoLote++;
    }

    var pagamentosSegmentoO = contasList.Where(x => x.codigo_tipo_documento === "BOL").ToArray();
    if (pagamentosSegmentoO.length > 0) {
      fileCNAB += this.resolveSegmentoO(pagamentosSegmentoO, codigoLote);
      codigoLote++;
    }

    this.remessa.trailer.CODIGO_DO_BANCO = this.remessa.header.CODIGO_DO_BANCO;
    this.remessa.trailer.CODIGO_DO_LOTE = "9999";
    this.remessa.trailer.TIPO_DE_REGISTRO = "9";
    this.remessa.trailer.TOTAL_QTDE_DE_LOTES = this.remessa.lotes.length;
    this.remessa.trailer.TOTAL_QTDE_REGISTROS = this.remessa.getQtdRegisters();
    fileCNAB += this.remessa.trailer.generateTrailerRemessa();

    console.log('CNAB concluído');
    return fileCNAB;

  }



  resolveSegmentoA(contasSegmentoA: ContaPagar[], codigoLote: number, configurationHeader: ConfigurationHeader) {
    console.log('resolvendo segmento A');
    let linesSegmentoA = "";
    let segmentoA = new Lote();
    segmentoA.header = new HeaderLote();
    segmentoA.header.CODIGO_DO_BANCO = this.remessa.header.CODIGO_DO_BANCO;
    segmentoA.header.CODIGO_DO_LOTE = Common.padLeft(this.remessa.getLengthLote().toString(), '0', 4);
    segmentoA.header.TIPO_DE_PAGAMENTO = "20"; //nos arquivos sempre usa o 20
    segmentoA.header.FORMA_DE_PAGAMENTO = configurationHeader.formaDePagamentoHeaderSegmentoA;
    segmentoA.header.EMPRESA_INSCRICAO = this.remessa.header.EMPRESA_INSCRICAO;
    segmentoA.header.INSCRICAO_NUMERO = this.remessa.header.INSCRICAO_NUMERO;
    segmentoA.header.AGENCIA = this.remessa.header.AGENCIA;
    segmentoA.header.CONTA = this.remessa.header.CONTA;
    segmentoA.header.DAC = this.remessa.header.DAC_DA_AGENCIA_CONTA_DEBITADA;
    segmentoA.header.NOME_DA_EMPRESA = this.remessa.header.NOME_DA_EMPRESA;
    segmentoA.header.ENDEREÇO_DA_EMPRESA = "RUA BELA CINTRA";
    segmentoA.header.NUMERO = "986";
    segmentoA.header.CIDADE = "SAO PAULO";
    segmentoA.header.CEP = "01415000";
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

    segmentoA.trailer.CODIGO_DO_BANCO = this.remessa.header.CODIGO_DO_BANCO;
    segmentoA.trailer.CODIGO_DO_LOTE = codigoLote.toString();
    segmentoA.trailer.TIPO_REGISTRO = "5";
    segmentoA.trailer.TOTAL_QTDE_REGISTROS = numeroRegistro;

    let sumValues = 0;
    segmentoA.detalhes.forEach(x => {
      sumValues += parseFloat(x.VALOR_DO_PAGTO);
    });

    segmentoA.trailer.TOTAL_VALOR_PAGTOS = sumValues.toString();

    //generate trailer
    //this.remessa.lotes.push(segmentoA);
    linesSegmentoA += segmentoA.trailer.generateTrailerSegmentoA();

    this.remessa.lotes.push(segmentoA);

    return linesSegmentoA;
  }

  resolveSegmentoJ(contasSegmentoJ: ContaPagar[], codigoLote: number, configurationHeader: ConfigurationHeader) {
    console.log('resolvendo segmento J');
    let linesSegmentoJ = "";
    let segmentoJ = new Lote();
    segmentoJ.header = new HeaderLote();
    segmentoJ.header.CODIGO_DO_BANCO = this.remessa.header.CODIGO_DO_BANCO;
    segmentoJ.header.CODIGO_DO_LOTE = Common.padLeft(this.remessa.getLengthLote().toString(), '0', 4);
    segmentoJ.header.TIPO_DE_PAGAMENTO = "20"; //nos arquivos sempre usa o 20
    segmentoJ.header.FORMA_DE_PAGAMENTO = configurationHeader.formaDePagamentoHeaderSegmentoJ;
    segmentoJ.header.EMPRESA_INSCRICAO = this.remessa.header.EMPRESA_INSCRICAO;
    segmentoJ.header.INSCRICAO_NUMERO = this.remessa.header.INSCRICAO_NUMERO;
    segmentoJ.header.AGENCIA = this.remessa.header.AGENCIA;
    segmentoJ.header.CONTA = this.remessa.header.CONTA;
    segmentoJ.header.DAC = this.remessa.header.DAC_DA_AGENCIA_CONTA_DEBITADA;
    segmentoJ.header.NOME_DA_EMPRESA = this.remessa.header.NOME_DA_EMPRESA;
    segmentoJ.header.ENDEREÇO_DA_EMPRESA = "RUA BELA CINTRA";
    segmentoJ.header.NUMERO = "986";
    segmentoJ.header.CIDADE = "SAO PAULO";
    segmentoJ.header.CEP = "01415000";
    segmentoJ.header.ESTADO = "SP";
    linesSegmentoJ = segmentoJ.header.generateHeaderSegmentoJ();

    let numeroRegistro = 1;
    for (let currentConta of contasSegmentoJ) {
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

      linesSegmentoJ += detalhe.generateDetalheSegmentoJ();
      segmentoJ.detalhes.push(detalhe);

      numeroRegistro++;
    }

    segmentoJ.trailer.CODIGO_DO_BANCO = this.remessa.header.CODIGO_DO_BANCO;
    segmentoJ.trailer.CODIGO_DO_LOTE = codigoLote.toString();
    segmentoJ.trailer.TIPO_REGISTRO = "5";
    segmentoJ.trailer.TOTAL_QTDE_REGISTROS = numeroRegistro;

    let sumValues = 0;
    segmentoJ.detalhes.forEach(x => {
      sumValues += parseFloat(x.VALOR_DO_PAGTO);
    });

    segmentoJ.trailer.TOTAL_VALOR_PAGTOS = sumValues.toString();

    //generate trailer
    //this.remessa.lotes.push(segmentoA);
    linesSegmentoJ += segmentoJ.trailer.generateTrailerSegmentoA();

    this.remessa.lotes.push(segmentoJ);

    return linesSegmentoJ;
  }

  resolveSegmentoO(contasSegmentoO: ContaPagar[], codigoLote: number) {
    console.log('resolvendo segmento O');
    let linesSegmentoO = "";
    let segmentoO = new Lote();
    segmentoO.header = new HeaderLote();

    this.remessa.lotes.push(segmentoO);

    return linesSegmentoO;
  }

  resolveSegmentoN(contasSegmentoN: ContaPagar[], codigoLote: number) {
    console.log('resolvendo segmento N');
    let linesSegmentoN = "";
    let segmentoN = new Lote();
    segmentoN.header = new HeaderLote();
    this.remessa.lotes.push(segmentoN);

    return linesSegmentoN;
  }

}
