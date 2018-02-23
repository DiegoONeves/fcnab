import * as moment from 'moment';
import { Common } from '../shared/common';

export class HeaderRemessa {

    headerRemessa: string;
    CODIGO_DO_BANCO: string = "341";
    CODIGO_DO_LOTE: string = "0000";
    TIPO_DE_REGISTRO: string = "0";
    LAYOUT_DE_ARQUIVO: string = "081";
    EMPRESA_INSCRICAO: string = "2";
    INSCRICAO_NUMERO: string;
    AGENCIA: string;
    CONTA: string;
    DAC_DA_AGENCIA_CONTA_DEBITADA: string;
    NOME_DA_EMPRESA: string;
    NOME_DO_BANCO: string;
    ARQUIVO: string = "1";
    DATA_DE_GERACAO: Date = new Date();

    private build_CODIGO_DO_BANCO() {
        this.headerRemessa = this.CODIGO_DO_BANCO;
    }

    private build_CODIGO_DO_LOTE() {
        this.headerRemessa += this.CODIGO_DO_LOTE;
    }

    private build_TIPO_DE_REGISTRO() {
        this.headerRemessa += this.TIPO_DE_REGISTRO;
    }

    private build_BRANCOS_TIPO_DE_REGISTRO() {
        this.headerRemessa += Common.buildCharacters(6, " ");
    }

    private build_LAYOUT_DE_ARQUIVO() {
        this.headerRemessa += this.LAYOUT_DE_ARQUIVO;
    }

    private build_EMPRESA_INSCRICAO() {
        this.headerRemessa += this.EMPRESA_INSCRICAO;
    }

    private build_INSCRICAO_NUMERO() {
        this.headerRemessa += this.INSCRICAO_NUMERO;
    }

    private build_BRANCOS_EMPRESA_INSCRICAO() {
        //20 espaços
        this.headerRemessa += Common.buildCharacters(20, " ");
    }


    private build_AGENCIA() {
        this.headerRemessa += Common.padLeft(this.AGENCIA, "0", 5);
    }

    private build_BRANCOS_AGENCIA() {
        this.headerRemessa += Common.buildCharacters(1, " ");
    }


    private build_CONTA() {
        this.headerRemessa += Common.padLeft(this.CONTA, "0", 12);
    }

    private build_BRANCOS_CONTA() {
        this.headerRemessa += Common.buildCharacters(1, " ");
    }

    private build_DAC_AGENCIA() {
        this.headerRemessa += Common.padLeft(this.DAC_DA_AGENCIA_CONTA_DEBITADA, "0", 1);
    }

    private build_NOME_DA_EMPRESA() {
        this.headerRemessa += Common.padRight(this.NOME_DA_EMPRESA, " ", 30);
    }

    private build_NOME_DO_BANCO() {
        this.headerRemessa += Common.padRight(this.NOME_DO_BANCO, " ", 30);
    }

    private build_BRANCOS_NOME_DO_BANCO() {
        this.headerRemessa += Common.buildCharacters(10, " ");
    }

    private build_ARQUIVO_CODIGO() {
        this.headerRemessa += this.ARQUIVO;
    }

    private build_DATA_DE_GERACAO() {
        this.headerRemessa += moment(this.DATA_DE_GERACAO).format('DDMMYYYY');
    }

    private build_HORA_DE_GERACAO() {
        this.headerRemessa += moment(this.DATA_DE_GERACAO).format('HHmmss');
    }

    private build_ZEROS() {
        this.headerRemessa += Common.buildCharacters(9, "0");
    }

    private build_UNIDADE_DE_DENSIDADE() {
        this.headerRemessa += Common.buildCharacters(5, "0");
    }

    private build_BRANCOS() {
        this.headerRemessa += Common.buildCharacters(69, " ");
    }

    generateHeader() {
        this.headerRemessa = "";
        this.build_CODIGO_DO_BANCO();
        this.build_CODIGO_DO_LOTE();
        this.build_TIPO_DE_REGISTRO();
        this.build_BRANCOS_TIPO_DE_REGISTRO();
        this.build_LAYOUT_DE_ARQUIVO();
        this.build_EMPRESA_INSCRICAO();
        this.build_INSCRICAO_NUMERO();
        this.build_BRANCOS_EMPRESA_INSCRICAO();
        this.build_AGENCIA();
        this.build_BRANCOS_AGENCIA();
        this.build_CONTA();
        this.build_BRANCOS_CONTA();
        this.build_DAC_AGENCIA();
        this.build_NOME_DA_EMPRESA();
        this.build_NOME_DO_BANCO();
        this.build_BRANCOS_NOME_DO_BANCO();
        this.build_ARQUIVO_CODIGO();
        this.build_DATA_DE_GERACAO();
        this.build_HORA_DE_GERACAO();
        this.build_ZEROS();
        this.build_UNIDADE_DE_DENSIDADE();
        this.build_BRANCOS();
        console.log('header arquivo', this.headerRemessa.length);
        this.headerRemessa += '\r\n';
        return this.headerRemessa;
    }
}