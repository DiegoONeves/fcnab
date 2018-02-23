import { Common } from "../shared/common";

export class TrailerLote {
    private trailerLoteText: string;
    CODIGO_DO_BANCO: string;
    CODIGO_DO_LOTE: string;
    TIPO_REGISTRO: string;
    TOTAL_QTDE_REGISTROS: number;
    TOTAL_VALOR_PAGTOS: string;
    TOTAL_QTDE_MOEDA: string;
    OCORRENCIAS: string;


    private build_CODIGO_DO_BANCO() {
        this.trailerLoteText = this.CODIGO_DO_BANCO;
    }
    private build_CODIGO_DO_LOTE() {
        this.trailerLoteText += Common.padLeft(this.CODIGO_DO_LOTE, '0', 4);
    }
    private build_TIPO_REGISTRO() {
        this.trailerLoteText += this.TIPO_REGISTRO;
        this.trailerLoteText += Common.buildCharacters(9, ' ');
    }
    private build_TOTAL_QTDE_REGISTROS() {
        this.TOTAL_QTDE_REGISTROS += 2;
        this.trailerLoteText += Common.padLeft(this.TOTAL_QTDE_REGISTROS.toString(), '0', 6);
    }
    private build_TOTAL_VALOR_PAGTOS() {
        if (!this.TOTAL_VALOR_PAGTOS)
            this.TOTAL_VALOR_PAGTOS = "";

        this.trailerLoteText += Common.normalizeValues(this.TOTAL_VALOR_PAGTOS, 16, 2);
        this.trailerLoteText += Common.buildCharacters(18, '0');//ZEROS
        this.trailerLoteText += Common.buildCharacters(171, ' ');//BRANCOS
    }
    private build_TOTAL_VALOR_PAGTOS_SEG_O() {
        if (!this.TOTAL_VALOR_PAGTOS)
            this.TOTAL_VALOR_PAGTOS = "";

        this.trailerLoteText += Common.normalizeValues(this.TOTAL_VALOR_PAGTOS, 16, 2);
    }
    private build_OCORRENCIAS() {
        //somente no arquivo retorno
        this.trailerLoteText += Common.buildCharacters(10, ' ');
        console.log(this.trailerLoteText.length)
        this.trailerLoteText += '\r\n';
        
    }

    private build_TOTAL_QTDE_MOEDA() {
        if (!this.TOTAL_QTDE_MOEDA)
            this.TOTAL_QTDE_MOEDA = "";

        this.trailerLoteText += Common.normalizeValues(this.TOTAL_QTDE_MOEDA, 7, 8);
        this.trailerLoteText += Common.buildCharacters(174, ' ');
    }

    generateTrailerSegmentoA() {
        this.trailerLoteText = "";

        this.build_CODIGO_DO_BANCO();
        this.build_CODIGO_DO_LOTE();
        this.build_TIPO_REGISTRO();
        this.build_TOTAL_QTDE_REGISTROS();
        this.build_TOTAL_VALOR_PAGTOS();
        this.build_OCORRENCIAS();

        return this.trailerLoteText;
    }

    generateTrailerSegmentoJ() {
        this.trailerLoteText = "";

        this.build_CODIGO_DO_BANCO();
        this.build_CODIGO_DO_LOTE();
        this.build_TIPO_REGISTRO();
        this.build_TOTAL_QTDE_REGISTROS();
        this.build_TOTAL_VALOR_PAGTOS();
        this.build_OCORRENCIAS();

        return this.trailerLoteText;
    }

    generateTrailerSegmentoO() {
        this.trailerLoteText = "";

        this.build_CODIGO_DO_BANCO();
        this.build_CODIGO_DO_LOTE();
        this.build_TIPO_REGISTRO();
        this.build_TOTAL_QTDE_REGISTROS();
        this.build_TOTAL_VALOR_PAGTOS_SEG_O();
        this.build_TOTAL_QTDE_MOEDA();
        this.build_OCORRENCIAS();

        return this.trailerLoteText;
    }

    generateTrailerSegmentoN() {
        this.trailerLoteText = "";

        this.build_CODIGO_DO_BANCO();
        this.build_CODIGO_DO_LOTE();
        this.build_TIPO_REGISTRO();
        this.build_TOTAL_QTDE_REGISTROS();
        this.build_TOTAL_VALOR_PAGTOS();
        this.build_OCORRENCIAS();

        return this.trailerLoteText;
    }
}