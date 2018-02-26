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

  dadosFC: any = {
    Nome: "FCAMARA CONSULTORIA E FORMACAO",
    CNPJ: "03775758000190",
    Bancario: {
      CodigoDoBanco: "341",
      NomeBanco: "BCO ITAU S/A",
      Agencia: "454",
      Conta: "44072",
      DAC: "8"
    },
    Endereco: {
      Logradouro: "RUA BELA CINTRA",
      Numero: "986",
      Cidade: "SAO PAULO",
      Estado: "SP",
      CEP: "01415000"
    }
  }

  constructor() { }

  remessa: Remessa = new Remessa();

  generateRemessa(contas: ContaPagar[], configurationHeader: ConfigurationHeader) {
    console.log('chegou', contas.length);
    let fileCNAB = "";
    let contasList = new List<ContaPagar>();

    for (let c of contas)
      contasList.Add(c);

    this.remessa.header.CODIGO_DO_BANCO = this.dadosFC.Bancario.CodigoDoBanco;
    this.remessa.header.INSCRICAO_NUMERO = this.dadosFC.CNPJ;
    this.remessa.header.AGENCIA = this.dadosFC.Bancario.Agencia;
    this.remessa.header.CONTA = this.dadosFC.Bancario.Conta;
    this.remessa.header.DAC_DA_AGENCIA_CONTA_DEBITADA = this.dadosFC.Bancario.DAC;
    this.remessa.header.NOME_DA_EMPRESA = this.dadosFC.Nome;
    this.remessa.header.NOME_DO_BANCO = this.dadosFC.Bancario.NomeBanco;
    fileCNAB = this.remessa.header.generateHeader();
    //contasList = contasList.OrderBy(x => x.tipoDocumento);

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

    var pagamentosSegmentoO = contasList.Where(x => x.codigo_tipo_documento === "BOL").ToArray();
    if (pagamentosSegmentoO.length > 0) {
      fileCNAB += this.resolveSegmentoO(pagamentosSegmentoO, codigoLote, configurationHeader);
      codigoLote++;
    }

    this.remessa.trailer.CODIGO_DO_BANCO = this.dadosFC.Bancario.CodigoDoBanco;
    this.remessa.trailer.CODIGO_DO_LOTE = "9999";
    this.remessa.trailer.TIPO_DE_REGISTRO = "9";
    this.remessa.trailer.TOTAL_QTDE_DE_LOTES = this.remessa.lotes.length;
    this.remessa.trailer.TOTAL_QTDE_REGISTROS = this.remessa.getQtdRegisters();
    fileCNAB += this.remessa.trailer.generateTrailerRemessa();

    console.log('CNAB concluído');
    this.remessa = new Remessa();
    return fileCNAB;
  }

  resolveSegmentoA(contasSegmentoA: ContaPagar[], codigoLote: number, configurationHeader: ConfigurationHeader) {
    console.log('resolvendo segmento A');
    let linesSegmentoA = "";
    let segmentoA = new Lote();
    segmentoA.header = new HeaderLote();
    segmentoA.header.CODIGO_DO_BANCO = this.dadosFC.Bancario.CodigoDoBanco;
    segmentoA.header.CODIGO_DO_LOTE = codigoLote;
    segmentoA.header.TIPO_DE_PAGAMENTO = configurationHeader.tipoDePagamentoHeaderSegmentoA; //nos arquivos sempre usa o 20
    segmentoA.header.FORMA_DE_PAGAMENTO = configurationHeader.formaDePagamentoHeaderSegmentoA;
    segmentoA.header.EMPRESA_INSCRICAO = this.remessa.header.EMPRESA_INSCRICAO;
    segmentoA.header.INSCRICAO_NUMERO = this.remessa.header.INSCRICAO_NUMERO;
    segmentoA.header.AGENCIA = this.remessa.header.AGENCIA;
    segmentoA.header.CONTA = this.remessa.header.CONTA;
    segmentoA.header.DAC = this.remessa.header.DAC_DA_AGENCIA_CONTA_DEBITADA;
    segmentoA.header.NOME_DA_EMPRESA = this.remessa.header.NOME_DA_EMPRESA;
    segmentoA.header.ENDEREÇO_DA_EMPRESA = this.dadosFC.Endereco.Logradouro;;
    segmentoA.header.NUMERO = this.dadosFC.Endereco.Numero;
    segmentoA.header.CIDADE = this.dadosFC.Endereco.Cidade;
    segmentoA.header.CEP = this.dadosFC.Endereco.CEP;
    segmentoA.header.ESTADO = this.dadosFC.Endereco.Estado;
    linesSegmentoA = segmentoA.header.generateHeaderSegmentoA();

    let numeroRegistro = 1;
    for (let currentConta of contasSegmentoA) {

      let detalhe = new Detalhe();
      detalhe.CODIGO_DO_BANCO = this.remessa.header.CODIGO_DO_BANCO;
      detalhe.CODIGO_DO_LOTE = codigoLote.toString();
      detalhe.TIPO_DE_REGISTRO = "3";
      detalhe.SEGMENTO = "A";
      detalhe.TIPO_DE_MOVIMENTO = currentConta.tipo_de_movimento;
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
      detalhe.NUMERO_NOTA_FISCAL_OU_CNPJ = currentConta.numero_documento_fiscal;

      if (currentConta.codigo_tipo_documento === "TRA") {
        linesSegmentoA += detalhe.generateDetalheSegmentoA();
      } else if (currentConta.codigo_tipo_documento === "NF") {
        linesSegmentoA += detalhe.generateDetalheSegmentoA_NF();
      }
      segmentoA.detalhes.push(detalhe);

      //verificar se é A NF ou Transferência
      numeroRegistro++;
    }

    segmentoA.trailer.CODIGO_DO_BANCO = this.remessa.header.CODIGO_DO_BANCO;
    segmentoA.trailer.CODIGO_DO_LOTE = codigoLote.toString();
    segmentoA.trailer.TIPO_REGISTRO = "5";
    segmentoA.trailer.TOTAL_QTDE_REGISTROS = segmentoA.detalhes.length;

    let sumValues = 0;
    segmentoA.detalhes.forEach(x => {
      sumValues += parseFloat(x.VALOR_DO_PAGTO);
    });

    segmentoA.trailer.TOTAL_VALOR_PAGTOS = sumValues.toString();

    linesSegmentoA += segmentoA.trailer.generateTrailerSegmentoA();

    this.remessa.lotes.push(segmentoA);

    return linesSegmentoA;
  }

  resolveSegmentoJ(contasSegmentoJ: ContaPagar[], codigoLote: number, configurationHeader: ConfigurationHeader) {
    console.log('resolvendo segmento J');

    let linesSegmentoJ = "";
    let segmentoJ = new Lote();
    segmentoJ.header = new HeaderLote();
    segmentoJ.header.CODIGO_DO_BANCO = this.dadosFC.Bancario.CodigoDoBanco;
    segmentoJ.header.CODIGO_DO_LOTE = codigoLote;
    segmentoJ.header.TIPO_DE_PAGAMENTO = configurationHeader.formaDePagamentoHeaderSegmentoJ; //nos arquivos sempre usa o 20
    segmentoJ.header.FORMA_DE_PAGAMENTO = configurationHeader.formaDePagamentoHeaderSegmentoJ;
    segmentoJ.header.EMPRESA_INSCRICAO = this.remessa.header.EMPRESA_INSCRICAO;
    segmentoJ.header.INSCRICAO_NUMERO = this.remessa.header.INSCRICAO_NUMERO;
    segmentoJ.header.AGENCIA = this.dadosFC.Bancario.Agencia;
    segmentoJ.header.CONTA = this.dadosFC.Bancario.Conta;
    segmentoJ.header.DAC = this.dadosFC.Bancario.DAC
    segmentoJ.header.NOME_DA_EMPRESA = this.remessa.header.NOME_DA_EMPRESA;
    segmentoJ.header.ENDEREÇO_DA_EMPRESA = this.dadosFC.Endereco.Logradouro;
    segmentoJ.header.NUMERO = this.dadosFC.Endereco.Numero;
    segmentoJ.header.CIDADE = this.dadosFC.Endereco.Cidade;
    segmentoJ.header.CEP = this.dadosFC.Endereco.CEP;
    segmentoJ.header.ESTADO = this.dadosFC.Endereco.Estado;

    linesSegmentoJ = segmentoJ.header.generateHeaderSegmentoJ();

    let numeroRegistro = 1;
    for (let currentConta of contasSegmentoJ) {

      let detalheJ = new Detalhe();
      detalheJ.CODIGO_DO_BANCO = this.dadosFC.Bancario.CodigoDoBanco;
      detalheJ.CODIGO_DO_LOTE = codigoLote.toString();
      detalheJ.TIPO_DE_REGISTRO = "3";
      detalheJ.NUMERO_DO_REGISTRO = numeroRegistro.toString();
      detalheJ.SEGMENTO = "J";
      detalheJ.TIPO_DE_MOVIMENTO = currentConta.tipo_de_movimento;
      detalheJ.build_CODIGO_DE_BARRAS(currentConta.codigo_de_barras);
      detalheJ.NOME_DO_FAVORECIDO = currentConta.fornecedor.nome;
      detalheJ.DATA_VENCTO = currentConta.data_vencimento;
      detalheJ.VALOR_DO_TITULO = currentConta.valor_documento.toString();
      detalheJ.DESCONTOS = currentConta.desconto.toString();
      let acrescimos = 0;
      //perguntar
      acrescimos = currentConta.juros + currentConta.multa;
      detalheJ.ACRESCIMOS = acrescimos.toString();
      detalheJ.DATA_PAGAMENTO = moment(new Date()).format('DD/MM/YYYY');
      detalheJ.VALOR_PAGAMENTO = currentConta.valorAPagar.toString();
      detalheJ.SEU_NUMERO = currentConta.numero_documento_fiscal;

      linesSegmentoJ += detalheJ.generateDetalheSegmentoJ();
      segmentoJ.detalhes.push(detalheJ);

      numeroRegistro++;

      let detalheJ52 = new Detalhe();
      detalheJ52.CODIGO_DO_BANCO = detalheJ.CODIGO_DO_BANCO;
      detalheJ52.CODIGO_DO_LOTE = detalheJ.CODIGO_DO_LOTE;
      detalheJ52.TIPO_DE_REGISTRO = "3";
      detalheJ52.NUMERO_DO_REGISTRO = numeroRegistro.toString();
      detalheJ52.SEGMENTO = "J";
      detalheJ52.TIPO_DE_MOVIMENTO = currentConta.tipo_de_movimento;
      detalheJ52.NOME_PAGADOR = this.dadosFC.Nome;
      detalheJ52.CODIGO_DO_REGISTRO = "52";
      detalheJ52.NOME_BENEFICIARIO = currentConta.fornecedor.nome;
      detalheJ52.NUMERO_INSCRICAO_PAGADOR = Common.formatCpfCnpj(this.dadosFC.CNPJ);
      detalheJ52.TIPO_DE_INSCRICAO_PAGADOR = Common.verifyInscricao(detalheJ52.NUMERO_INSCRICAO_PAGADOR);
      detalheJ52.NUMERO_INSCRICAO_BENEFICIARIO = Common.formatCpfCnpj(currentConta.fornecedor.cpfCnpj);
      detalheJ52.TIPO_DE_INSCRICAO_BENEFICIARIO = Common.verifyInscricao(detalheJ52.NUMERO_INSCRICAO_BENEFICIARIO);
      detalheJ52.NUMERO_INSCRICAO_SACADOR = Common.formatCpfCnpj(this.dadosFC.CNPJ);
      detalheJ52.TIPO_DE_INSCRICAO_SACADOR = detalheJ52.TIPO_DE_INSCRICAO_PAGADOR;
      detalheJ52.NOME_SACADOR = this.dadosFC.Nome;

      linesSegmentoJ += detalheJ52.generateDetalheSegmentoJ52();
      segmentoJ.detalhes.push(detalheJ52);
    }

    segmentoJ.trailer.CODIGO_DO_BANCO = this.dadosFC.Bancario.CodigoDoBanco;
    segmentoJ.trailer.CODIGO_DO_LOTE = codigoLote.toString();
    segmentoJ.trailer.TIPO_REGISTRO = "5";
    segmentoJ.trailer.TOTAL_QTDE_REGISTROS = segmentoJ.detalhes.length;

    let sumValues = 0;
    segmentoJ.detalhes.forEach(x => {
      if (x.VALOR_PAGAMENTO)
        sumValues += parseFloat(x.VALOR_PAGAMENTO);
    });

    segmentoJ.trailer.TOTAL_VALOR_PAGTOS = sumValues.toString();

    linesSegmentoJ += segmentoJ.trailer.generateTrailerSegmentoJ();

    this.remessa.lotes.push(segmentoJ);

    return linesSegmentoJ;
  }

  resolveSegmentoO(contasSegmentoO: ContaPagar[], codigoLote: number, configurationHeader: ConfigurationHeader) {
    console.log('resolvendo segmento O');
    let linesSegmentoO = "";
    let segmentoO = new Lote();
    segmentoO.header = new HeaderLote();
    segmentoO.header.CODIGO_DO_BANCO = this.dadosFC.Bancario.CodigoDoBanco;
    segmentoO.header.CODIGO_DO_LOTE = codigoLote;
    segmentoO.header.TIPO_DE_REGISTRO = "1";
    segmentoO.header.TIPO_DE_OPERACAO = "C";
    segmentoO.header.TIPO_DE_PAGAMENTO = configurationHeader.tipoDePagamentoHeaderSegmentoO;
    segmentoO.header.FORMA_DE_PAGAMENTO = configurationHeader.formaDePagamentoHeaderSegmentoO;
    segmentoO.header.INSCRICAO_NUMERO = this.dadosFC.CNPJ;
    segmentoO.header.EMPRESA_INSCRICAO = Common.verifyInscricao(segmentoO.header.INSCRICAO_NUMERO);
    segmentoO.header.AGENCIA = this.dadosFC.Bancario.Agencia;
    segmentoO.header.CONTA = this.dadosFC.Bancario.Conta;
    segmentoO.header.DAC = this.dadosFC.Bancario.DAC;
    segmentoO.header.NOME_DA_EMPRESA = this.dadosFC.Nome;
    segmentoO.header.ENDEREÇO_DA_EMPRESA = this.dadosFC.Endereco.Logradouro;
    segmentoO.header.NUMERO = this.dadosFC.Endereco.Numero;
    segmentoO.header.CIDADE = this.dadosFC.Endereco.Cidade;
    segmentoO.header.CEP = this.dadosFC.Endereco.CEP;
    segmentoO.header.ESTADO = this.dadosFC.Endereco.Estado;
    linesSegmentoO = segmentoO.header.generateHeaderSegmentoO();

    let numeroRegistro = 1;
    for (let currentConta of contasSegmentoO) {

      let detalheO = new Detalhe();
      detalheO.CODIGO_DO_BANCO = this.dadosFC.Bancario.CodigoDoBanco;
      detalheO.CODIGO_DO_LOTE = codigoLote.toString();
      detalheO.TIPO_DE_REGISTRO = "3";
      detalheO.NUMERO_DO_REGISTRO = numeroRegistro.toString();
      detalheO.SEGMENTO = "O";
      detalheO.MOEDA_TIPO = "REA";
      detalheO.TIPO_DE_MOVIMENTO = currentConta.tipo_de_movimento;
      detalheO.CODIGO_DE_BARRAS = currentConta.codigo_de_barras;
      detalheO.NOME_CONCESSIONARIA = currentConta.nome_fornecedor;
      detalheO.DATA_VENCTO = currentConta.data_vencimento;
      detalheO.QUANTIDADE_MOEDA = "0";
      detalheO.VALOR_A_PAGAR = currentConta.valorAPagar.toString();
      detalheO.DATA_PAGAMENTO = moment(new Date()).format('DD/MM/YYYY');
      detalheO.NOTA_FISCAL = currentConta.numero_documento_fiscal;
      detalheO.SEU_NUMERO = currentConta.numero_documento_fiscal;

      linesSegmentoO += detalheO.generateDetalheSegmentoO();
      segmentoO.detalhes.push(detalheO);

      numeroRegistro++;
    }

    segmentoO.trailer.CODIGO_DO_BANCO = this.dadosFC.Bancario.CodigoDoBanco;
    segmentoO.trailer.CODIGO_DO_LOTE = codigoLote.toString();
    segmentoO.trailer.TIPO_REGISTRO = "5";
    segmentoO.trailer.TOTAL_QTDE_REGISTROS = segmentoO.detalhes.length;

    let sumQUANTIDADE_MOEDA = 0;
    segmentoO.detalhes.forEach(x => {
      if (x.QUANTIDADE_MOEDA)
        sumQUANTIDADE_MOEDA += parseFloat(x.QUANTIDADE_MOEDA);
    });

    segmentoO.trailer.TOTAL_QTDE_MOEDA = sumQUANTIDADE_MOEDA.toString();

    let sumValoresAPagar = 0;
    segmentoO.detalhes.forEach(x => {
      if (x.VALOR_A_PAGAR)
        sumValoresAPagar += parseFloat(x.VALOR_A_PAGAR);
    });

    segmentoO.trailer.TOTAL_VALOR_PAGTOS = sumValoresAPagar.toString();

    linesSegmentoO += segmentoO.trailer.generateTrailerSegmentoO();

    this.remessa.lotes.push(segmentoO);

    return linesSegmentoO;
  }

  resolveSegmentoN(contasSegmentoN: ContaPagar[], codigoLote: number, configurationHeader: ConfigurationHeader) {
    console.log('resolvendo segmento N');

    let linesSegmentoN = "";

    let segmentoN = new Lote();
    segmentoN.header = new HeaderLote();
    segmentoN.header.CODIGO_DO_BANCO = this.dadosFC.Bancario.CodigoDoBanco;
    segmentoN.header.CODIGO_DO_LOTE = codigoLote;
    segmentoN.header.TIPO_DE_REGISTRO = "1";
    segmentoN.header.TIPO_DE_OPERACAO = "C";
    segmentoN.header.TIPO_DE_PAGAMENTO = configurationHeader.tipoDePagamentoHeaderSegmentoO;
    segmentoN.header.FORMA_DE_PAGAMENTO = configurationHeader.formaDePagamentoHeaderSegmentoO;
    segmentoN.header.INSCRICAO_NUMERO = this.dadosFC.CNPJ;
    segmentoN.header.EMPRESA_INSCRICAO = Common.verifyInscricao(segmentoN.header.INSCRICAO_NUMERO);
    segmentoN.header.AGENCIA = this.dadosFC.Bancario.Agencia;
    segmentoN.header.CONTA = this.dadosFC.Bancario.Conta;
    segmentoN.header.DAC = this.dadosFC.Bancario.DAC;
    segmentoN.header.NOME_DA_EMPRESA = this.dadosFC.Nome;
    segmentoN.header.ENDEREÇO_DA_EMPRESA = this.dadosFC.Endereco.Logradouro;
    segmentoN.header.NUMERO = this.dadosFC.Endereco.Numero;
    segmentoN.header.CIDADE = this.dadosFC.Endereco.Cidade;
    segmentoN.header.CEP = this.dadosFC.Endereco.CEP;
    segmentoN.header.ESTADO = this.dadosFC.Endereco.Estado;
    linesSegmentoN = segmentoN.header.generateHeaderSegmentoN();

    this.remessa.lotes.push(segmentoN);

    let numeroRegistro = 1;
    for (let currentConta of contasSegmentoN) {

      let detalheO = new Detalhe();
      detalheO.CODIGO_DO_BANCO = this.dadosFC.Bancario.CodigoDoBanco;
      detalheO.CODIGO_DO_LOTE = codigoLote.toString();
      detalheO.TIPO_DE_REGISTRO = "3";
      detalheO.NUMERO_DO_REGISTRO = numeroRegistro.toString();
      detalheO.SEGMENTO = "N";
      detalheO.TIPO_DE_MOVIMENTO = currentConta.tipo_de_movimento;
      detalheO.DADOS_DO_TRIBUTO = "";
      detalheO.SEU_NUMERO = "";


      linesSegmentoN += detalheO.generateDetalheSegmentoN();
      segmentoN.detalhes.push(detalheO);

      numeroRegistro++;
    }

    segmentoN.trailer.CODIGO_DO_BANCO = this.dadosFC.Bancario.CodigoDoBanco;
    segmentoN.trailer.CODIGO_DO_LOTE = codigoLote.toString();
    segmentoN.trailer.TIPO_REGISTRO = "5";
    segmentoN.trailer.TOTAL_QTDE_REGISTROS = segmentoN.detalhes.length;


    let sumValoresAPagar = 0;
    segmentoN.detalhes.forEach(x => {
      if (x.VALOR_A_PAGAR)
        sumValoresAPagar += parseFloat(x.VALOR_A_PAGAR);
    });

    segmentoN.trailer.TOTAL_VALOR_PAGTOS = sumValoresAPagar.toString();

    linesSegmentoN += segmentoN.trailer.generateTrailerSegmentoO();

    this.remessa.lotes.push(segmentoN);

    return linesSegmentoN;
  }

}
