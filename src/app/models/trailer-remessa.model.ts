import { Common } from "../shared/common";

export class TrailerRemessa {

    private trailerRemessaText: string = "";
    CODIGO_DO_BANCO: string;
    CODIGO_DO_LOTE: string;
    TIPO_DE_REGISTRO: string;
    TOTAL_QTDE_DE_LOTES: number;
    TOTAL_QTDE_REGISTROS: number;

    private build_CODIGO_DO_BANCO() {
        this.trailerRemessaText = this.CODIGO_DO_BANCO;
    }

    private build_CODIGO_DO_LOTE() {
        this.trailerRemessaText += Common.padLeft(this.CODIGO_DO_LOTE, '0', 4);
    }
    private build_TIPO_DE_REGISTRO() {
        this.trailerRemessaText += this.TIPO_DE_REGISTRO;
        this.trailerRemessaText += Common.buildCharacters(9, ' ');
    }
    private build_TOTAL_QTDE_DE_LOTES() {
        this.trailerRemessaText += Common.padLeft(this.TOTAL_QTDE_DE_LOTES.toString(), '0', 6);
    }
    private build_TOTAL_QTDE_REGISTROS() {
        this.trailerRemessaText += Common.padLeft(this.TOTAL_QTDE_REGISTROS.toString(), '0', 6);
        this.trailerRemessaText += Common.buildCharacters(211, ' ');
    }

    generateTrailerRemessa() {

        this.trailerRemessaText = "";
        this.build_CODIGO_DO_BANCO();
        this.build_CODIGO_DO_LOTE();
        this.build_TIPO_DE_REGISTRO();
        this.build_TOTAL_QTDE_DE_LOTES();
        this.build_TOTAL_QTDE_REGISTROS();
        console.log('TRAILER ARQUIVO',this.trailerRemessaText.length)
        this.trailerRemessaText += '\r\n';
        return this.trailerRemessaText;
    }
}

