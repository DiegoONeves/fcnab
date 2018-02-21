export class TrailerRemessa {

    CODIGO_DO_BANCO: string;
    CODIGO_DO_LOTE: string;
    TIPO_DE_REGISTRO: string;
    TOTAL_QTDE_DE_LOTES: number;
    TOTAL_QTDE_REGISTROS: number;

    private build_CODIGO_DO_BANCO() { }
    private build_CODIGO_DO_LOTE() { }
    private build_TIPO_DE_REGISTRO() { }
    private build_TOTAL_QTDE_DE_LOTES() { }
    private build_TOTAL_QTDE_REGISTROS() { }

    generateTrailerRemessa() {
        this.build_CODIGO_DO_BANCO();
        this.build_CODIGO_DO_LOTE();
        this.build_TIPO_DE_REGISTRO();
        this.build_TOTAL_QTDE_DE_LOTES();
        this.build_TOTAL_QTDE_REGISTROS();
    }
}