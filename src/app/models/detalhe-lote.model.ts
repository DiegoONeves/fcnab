import { Common } from "../shared/common";

export class Detalhe {

    detalheText: string = "";
    CODIGO_DO_BANCO: string;
    CODIGO_DO_LOTE: string;
    TIPO_DE_REGISTRO: string;
    NUMERO_DO_REGISTRO: string;
    SEGMENTO: string;
    TIPO_DE_MOVIMENTO: string;
    CAMARA: string;
    BANCO_FAVORECIDO: string;
    AGENCIA_FAVORECIDO: string;
    CONTA_FAVORECIDO: string;
    DAC_FAVORECIDO: string;
    AGENCIA_CONTA: string;
    NOME_DO_FAVORECIDO: string;
    SEU_NUMERO: string;
    DATA_DE_PAGTO: string;
    MOEDA_TIPO: string;
    CODIGO_ISPB: string;
    VALOR_DO_PAGTO: string;
    NOSSO_NUMERO: string;
    DATA_EFETIVA: string;
    VALOR_EFETIVO: string;
    FINALIDADE_DETALHE: string;
    N_DO_DOCUMENTO: string;
    N_DE_INSCRICAO: string;
    FINALIDADE_DOC_E_STATUS_FUNCIONARIO: string;
    FINALIDADE_TED: string;
    AVISO: string;
    OCORRENCIAS: string;

    BANCO_FAVORECIDO_COD_DE_BARRAS: string;
    DV_COD_DE_BARRAS: string;
    VENCIMENTO_COD_DE_BARRAS: string;
    MOEDA_COD_DE_BARRAS: string;
    VALOR_COD_DE_BARRAS: string;
    CAMPO_LIVRE_COD_DE_BARRAS: string;
    DATA_VENCTO: string;
    VALOR_DO_TITULO: string;
    DESCONTOS: string;
    ACRESCIMOS: string;
    DATA_PAGAMENTO: string;
    VALOR_PAGAMENTO: string;

    private build_CODIGO_DO_BANCO() {
        this.detalheText = this.CODIGO_DO_BANCO;
    }
    private build_CODIGO_DO_LOTE() {
        this.detalheText += Common.padLeft(this.CODIGO_DO_LOTE, '0', 4);
    }
    private build_TIPO_DE_REGISTRO() {
        this.detalheText += this.TIPO_DE_REGISTRO;
    }
    private build_NUMERO_DO_REGISTRO() {
        this.detalheText += Common.padLeft(this.NUMERO_DO_REGISTRO, '0', 5);
    }
    private build_SEGMENTO() {
        this.detalheText += this.SEGMENTO;
    }
    private build_TIPO_DE_MOVIMENTO() {
        this.detalheText += Common.padLeft(this.TIPO_DE_MOVIMENTO, '0', 3);
    }

    private build_CAMARA() {
        this.detalheText += Common.padLeft(this.CAMARA, '0', 3);
    }
    private build_BANCO_FAVORECIDO() {
        this.detalheText += Common.padLeft(this.BANCO_FAVORECIDO, '0', 3);
    }
    private build_AGENCIA_CONTA() {
        this.detalheText += Common.buildCharacters(1, '0'); //ZEROS
        this.detalheText += Common.padLeft(this.AGENCIA_FAVORECIDO, '0', 4); //AGÊNCIA
        this.detalheText += Common.buildCharacters(1, ' '); //BRANCOS
        this.detalheText += Common.buildCharacters(6, '0'); //ZEROS
        this.detalheText += Common.padLeft(this.CONTA_FAVORECIDO, '0', 6); //CONTA
        this.detalheText += Common.buildCharacters(1, ' '); //BRANCOS
        this.detalheText += Common.padLeft(this.DAC_FAVORECIDO, '0', 1); //CONTA
    }
    private build_NOME_DO_FAVORECIDO() {
        this.detalheText += Common.padRight(this.NOME_DO_FAVORECIDO, ' ', 30);
    }
    private build_SEU_NUMERO() {
        this.detalheText += Common.padRight(this.SEU_NUMERO, ' ', 20);
    }
    private build_DATA_DE_PAGTO() {
        this.detalheText += Common.padRight(this.DATA_DE_PAGTO.replace(/[//"]/g, ''), '0', 8);
    }
    private build_MOEDA_TIPO() {
        this.detalheText += this.MOEDA_TIPO;
    }
    private build_CODIGO_ISPB() {
        this.detalheText += Common.padLeft(this.CODIGO_ISPB, '0', 8);
        this.detalheText += Common.buildCharacters(7, '0');
    }
    private build_VALOR_DO_PAGTO() {

        if (!this.VALOR_DO_PAGTO)
            this.VALOR_DO_PAGTO = "";

        this.detalheText += Common.padLeft(this.VALOR_DO_PAGTO.replace('.', ''), '0', 15);
    }
    private build_NOSSO_NUMERO() {

        this.detalheText += Common.padRight(this.NOSSO_NUMERO, ' ', 15);
        this.detalheText += Common.buildCharacters(5, ' ');
    }
    private build_DATA_EFETIVA() {
        this.detalheText += Common.padRight(this.DATA_EFETIVA, '0', 8);
    }
    private build_VALOR_EFETIVO() {
        if (!this.VALOR_EFETIVO)
            this.VALOR_EFETIVO = "";

        this.detalheText += Common.padLeft(this.VALOR_EFETIVO.replace('.', ''), '0', 15);
    }
    private build_FINALIDADE_DETALHE() {
        this.detalheText += Common.padRight(this.FINALIDADE_DETALHE, ' ', 18);
        this.detalheText += Common.buildCharacters(2, ' ');
    }
    private build_N_DO_DOCUMENTO() {
        this.detalheText += Common.padRight(this.N_DO_DOCUMENTO, '0', 6);
    }
    private build_N_DE_INSCRICAO() {
        this.detalheText += Common.padLeft(this.N_DE_INSCRICAO.replace(/[-]/g, '').replace(/[.]/g, '').replace(/[//"]/g, ''), '0', 14);
    }
    private build_FINALIDADE_DOC_E_STATUS_FUNCIONARIO() {
        this.detalheText += Common.padRight(this.FINALIDADE_DOC_E_STATUS_FUNCIONARIO, ' ', 2);
    }
    private build_FINALIDADE_TED() {
        this.detalheText += Common.padRight(this.FINALIDADE_TED, ' ', 5);
        this.detalheText += Common.buildCharacters(5, ' ');
    }
    private build_AVISO() {
        this.detalheText += Common.padRight(this.AVISO, ' ', 1);
    }
    private build_OCORRENCIAS() {
        this.detalheText += Common.padRight(this.OCORRENCIAS, ' ', 10);
        this.detalheText += '\r\n';
    }

    public build_CODIGO_DE_BARRAS(codigo: string) {
        if (codigo && codigo.length === 44) {
            //34196166700000123451101234567880057123457000
            this.BANCO_FAVORECIDO_COD_DE_BARRAS = codigo.substring(0, 3);
            this.MOEDA_COD_DE_BARRAS = codigo.substring(3, 4);
            this.DV_COD_DE_BARRAS = codigo.substring(4, 5);
            this.VENCIMENTO_COD_DE_BARRAS = codigo.substring(5, 9);
            this.VALOR_COD_DE_BARRAS = codigo.substring(9, 19);
            this.CAMPO_LIVRE_COD_DE_BARRAS = codigo.substring(19, 45);
        }
    }

    private build_BANCO_FAVORECIDO_COD_DE_BARRAS() {
        this.detalheText += this.BANCO_FAVORECIDO_COD_DE_BARRAS;
    }
    private build_DV_COD_DE_BARRAS() {
        this.detalheText += this.DV_COD_DE_BARRAS;
    }
    private build_VENCIMENTO_COD_DE_BARRAS() {
        this.detalheText += this.VENCIMENTO_COD_DE_BARRAS;
    }
    private build_MOEDA_COD_DE_BARRAS() {
        this.detalheText += this.MOEDA_COD_DE_BARRAS;
    }
    private build_VALOR_COD_DE_BARRAS() {
        this.detalheText += this.VALOR_COD_DE_BARRAS;
    }
    private build_CAMPO_LIVRE_COD_DE_BARRAS() {
        this.detalheText += this.CAMPO_LIVRE_COD_DE_BARRAS;
    }
    private build_DATA_VENCTO() {
        this.detalheText += this.BANCO_FAVORECIDO_COD_DE_BARRAS;
    }
    private build_VALOR_DO_TITULO() {
        this.detalheText += this.BANCO_FAVORECIDO_COD_DE_BARRAS;
    }
    private build_DESCONTOS() {
        this.detalheText += this.DESCONTOS;
    }
    private build_ACRESCIMOS() {
        this.detalheText += this.ACRESCIMOS;
    }
    private build_DATA_PAGAMENTO() {

    }
    private build_VALOR_PAGAMENTO() {

    }

    generateDetalheSegmentoA() {
        this.detalheText = "";
        this.build_CODIGO_DO_BANCO();
        this.build_CODIGO_DO_LOTE();
        this.build_TIPO_DE_REGISTRO();
        this.build_NUMERO_DO_REGISTRO();
        this.build_SEGMENTO();
        this.build_TIPO_DE_MOVIMENTO();
        this.build_CAMARA();
        this.build_BANCO_FAVORECIDO();
        this.build_AGENCIA_CONTA();
        this.build_NOME_DO_FAVORECIDO();
        this.build_SEU_NUMERO();
        this.build_DATA_DE_PAGTO();
        this.build_MOEDA_TIPO();
        this.build_CODIGO_ISPB();
        this.build_VALOR_DO_PAGTO();
        this.build_NOSSO_NUMERO();
        this.build_DATA_EFETIVA();
        this.build_VALOR_EFETIVO();
        this.build_FINALIDADE_DETALHE();
        this.build_N_DO_DOCUMENTO();
        this.build_N_DE_INSCRICAO();
        this.build_FINALIDADE_DOC_E_STATUS_FUNCIONARIO();
        this.build_FINALIDADE_TED();
        this.build_AVISO();
        this.build_OCORRENCIAS();

        return this.detalheText;
    }

    generateDetalheSegmentoJ() {
        this.detalheText = "";
        this.build_CODIGO_DO_BANCO();
        this.build_CODIGO_DO_LOTE();
        this.build_TIPO_DE_REGISTRO();
        this.build_NUMERO_DO_REGISTRO();
        this.build_SEGMENTO();
        this.build_TIPO_DE_MOVIMENTO();
        this.build_CAMARA();
        this.build_BANCO_FAVORECIDO();
        this.build_AGENCIA_CONTA();
        this.build_NOME_DO_FAVORECIDO();
        this.build_SEU_NUMERO();
        this.build_DATA_DE_PAGTO();
        this.build_MOEDA_TIPO();
        this.build_CODIGO_ISPB();
        this.build_VALOR_DO_PAGTO();
        this.build_NOSSO_NUMERO();
        this.build_DATA_EFETIVA();
        this.build_VALOR_EFETIVO();
        this.build_FINALIDADE_DETALHE();
        this.build_N_DO_DOCUMENTO();
        this.build_N_DE_INSCRICAO();
        this.build_FINALIDADE_DOC_E_STATUS_FUNCIONARIO();
        this.build_FINALIDADE_TED();
        this.build_AVISO();
        this.build_OCORRENCIAS();

        return this.detalheText;
    }

    generateDetalheSegmentoO() {
        this.detalheText = "";

        return this.detalheText;
    }

    generateDetalheSegmentoN() {
        this.detalheText = "";

        return this.detalheText;
    }

}