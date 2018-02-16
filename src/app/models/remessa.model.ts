import { Common } from "../shared/common";
import * as moment from 'moment';

export class Remessa {
    header: HeaderRemessa = new HeaderRemessa();
    lotes: Lote[] = new Array<Lote>();
    trailer: TrailerRemessa = new TrailerRemessa();

    generateRemessa() {
        return this.header.buildHeader();
    };
}

export class HeaderRemessa {

    HeaderRemessa: string;
    CODIGO_DO_BANCO: string = "341";
    CODIGO_DO_LOTE: string = "0000";
    TIPO_DE_REGISTRO: string = "0";
    LAYOUT_DE_ARQUIVO: string = "081";
    EMPRESA_INSCRICAO: string;
    INSCRICAO_NUMERO: string;
    AGENCIA: string;
    CONTA: string;
    DAC_DA_AGENCIA_CONTA_DEBITADA: string;
    NOME_DA_EMPRESA: string;
    NOME_DO_BANCO: string;
    ARQUIVO: string = "1";
    DATA_DE_GERACAO: Date = new Date();

    private build_CODIGO_DO_BANCO() {
        this.HeaderRemessa = this.CODIGO_DO_BANCO;
    }

    private build_CODIGO_DO_LOTE() {
        this.HeaderRemessa += this.CODIGO_DO_LOTE;
    }

    private build_TIPO_DE_REGISTRO() {
        this.HeaderRemessa += this.TIPO_DE_REGISTRO;
    }

    private build_BRANCOS_TIPO_DE_REGISTRO() {
        this.HeaderRemessa += Common.buildCharacters(6, " ");
    }

    private build_LAYOUT_DE_ARQUIVO() {
        this.HeaderRemessa += this.LAYOUT_DE_ARQUIVO;
    }

    private build_EMPRESA_INSCRICAO() {
        this.HeaderRemessa += "2";
    }

    private build_INSCRICAO_NUMERO() {
        this.HeaderRemessa += this.INSCRICAO_NUMERO;
    }

    private build_BRANCOS_EMPRESA_INSCRICAO() {
        //20 espaços
        this.HeaderRemessa += Common.buildCharacters(20, " ");
    }


    private build_AGENCIA() {
        this.HeaderRemessa += Common.padLeft(this.AGENCIA, "0", 5);
    }

    private build_BRANCOS_AGENCIA() {
        this.HeaderRemessa += Common.buildCharacters(1, " ");
    }


    private build_CONTA() {
        this.HeaderRemessa += Common.padLeft(this.CONTA, "0", 12);
    }

    private build_BRANCOS_CONTA() {
        this.HeaderRemessa += Common.buildCharacters(1, " ");
    }

    private build_DAC_AGENCIA() {
        this.HeaderRemessa += Common.padLeft(this.DAC_DA_AGENCIA_CONTA_DEBITADA, "0", 1);
    }

    private build_NOME_DA_EMPRESA() {
        this.HeaderRemessa += Common.padRight(this.NOME_DA_EMPRESA, " ", 30);
    }

    private build_NOME_DO_BANCO() {
        this.HeaderRemessa += Common.padRight(this.NOME_DO_BANCO, " ", 30);
    }

    private build_BRANCOS_NOME_DO_BANCO() {
        this.HeaderRemessa += Common.buildCharacters(10, " ");
    }

    private build_ARQUIVO_CODIGO() {
        this.HeaderRemessa += this.ARQUIVO;
    }

    private build_DATA_DE_GERACAO() {
        this.HeaderRemessa += moment(this.DATA_DE_GERACAO).format('DDMMYYYY');
    }

    private build_HORA_DE_GERACAO() {
        this.HeaderRemessa += moment(this.DATA_DE_GERACAO).format('HHmmss');
    }

    private build_ZEROS() {
        this.HeaderRemessa += Common.buildCharacters(9, "0");
    }

    private build_UNIDADE_DE_DENSIDADE() {
        this.HeaderRemessa += Common.buildCharacters(5, "0");
    }

    private build_BRANCOS() {
        this.HeaderRemessa += Common.buildCharacters(69, " ");
    }

    buildHeader() {
        this.HeaderRemessa = "";
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

        return this.HeaderRemessa;
    }
}
export class TrailerRemessa {

}

export class HeaderLote {

}

export class TrailerLote {

}

export class Lote {
    header: HeaderLote = new HeaderLote();
    trailer: TrailerLote = new TrailerLote();
}