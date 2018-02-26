import { Common } from "../shared/common";

export class HeaderLote {
    headerLote: string;
    CODIGO_DO_BANCO: string;
    CODIGO_DO_LOTE: number;
    TIPO_DE_REGISTRO: string = "1";
    TIPO_DE_OPERACAO: string = "C";
    TIPO_DE_PAGAMENTO: string;
    FORMA_DE_PAGAMENTO: string;
    EMPRESA_INSCRICAO: string;
    INSCRICAO_NUMERO: string;
    IDENTIFICAÇAO_DO_LANCAMENTO: string = Common.buildCharacters(4, ' ');
    AGENCIA: string;
    CONTA: string;
    DAC: string;
    NOME_DA_EMPRESA: string;
    FINALIDADE_DO_LOTE: string;
    HISTORICO_DE_CC: string;
    ENDEREÇO_DA_EMPRESA: string;
    NUMERO: string;
    COMPLEMENTO: string;
    CIDADE: string;
    CEP: string;
    ESTADO: string;
    OCORRENCIAS: string;


    private build_CODIGO_DO_BANCO() {
        this.headerLote = this.CODIGO_DO_BANCO;
    }

    private build_CODIGO_DO_LOTE() {
        this.headerLote += Common.padLeft(this.CODIGO_DO_LOTE.toString(), '0', 4);
    }


    private build_TIPO_DE_REGISTRO() {
        this.headerLote += this.TIPO_DE_REGISTRO;
    }


    private build_TIPO_DE_OPERACAO() {
        this.headerLote += this.TIPO_DE_OPERACAO;
    }

    private build_TIPO_DE_PAGAMENTO() {
        this.headerLote += this.TIPO_DE_PAGAMENTO;
    }

    private build_FORMA_DE_PAGAMENTO() {
        this.headerLote += this.FORMA_DE_PAGAMENTO;
    }

    private build_LAYOUT_DO_LOTE(version: string) {
        this.headerLote += version;
        this.headerLote += Common.buildCharacters(1, ' ');
    }

    private build_EMPRESA_INSCRICAO() {
        this.headerLote += Common.verifyInscricao(this.INSCRICAO_NUMERO);
    }

    private build_INSCRICAO_NUMERO() {
        this.headerLote += Common.padRight(this.INSCRICAO_NUMERO, ' ', 14);
        this.headerLote += Common.buildCharacters(20, ' ');
    }

    private build_IDENTIFICAÇAO_DO_LANCAMENTO() {

    }

    private build_AGENCIA() {
        this.headerLote += Common.padLeft(this.AGENCIA, '0', 5);
        this.headerLote += Common.buildCharacters(1, ' ');
    }

    private build_CONTA() {
        this.headerLote += Common.padLeft(this.AGENCIA, '0', 12);
        this.headerLote += Common.buildCharacters(1, ' ');
    }

    private build_DAC() {
        this.headerLote += Common.padLeft(this.DAC, '0', 1);
    }

    private build_NOME_DA_EMPRESA() {
        this.headerLote += Common.padRight(this.NOME_DA_EMPRESA, ' ', 30);
    }

    private build_FINALIDADE_DO_LOTE() {
        this.headerLote += Common.padRight(this.FINALIDADE_DO_LOTE, ' ', 30);
    }

    private build_HISTORICO_DE_CC() {
        this.headerLote += Common.padRight(this.HISTORICO_DE_CC, ' ', 10);
    }

    private build_ENDERECO_EMPRESA() {
        this.headerLote += Common.padRight(this.ENDEREÇO_DA_EMPRESA, ' ', 30);
    }

    private build_NUMERO() {
        this.headerLote += Common.padLeft(this.NUMERO, '0', 5);
    }

    private build_COMPLEMENTO() {
        this.headerLote += Common.padRight(this.COMPLEMENTO, ' ', 15);
    }

    private build_CIDADE() {
        this.headerLote += Common.padRight(this.CIDADE, ' ', 20);
    }

    private build_CEP() {
        this.headerLote += Common.padLeft(this.CEP, '0', 8);
    }

    private build_ESTADO() {
        this.headerLote += Common.padRight(this.ESTADO, ' ', 2);
        this.headerLote += Common.buildCharacters(8, ' ');
    }

    private build_OCORRENCIAS() {
        this.headerLote += Common.buildCharacters(10, ' ');
    }




    //Pagamento através de Cheque, OP, DOC, TED, ou crédito em conta corrente
    generateHeaderSegmentoA() {

        this.headerLote = "";
        this.build_CODIGO_DO_BANCO();
        this.build_CODIGO_DO_LOTE();
        this.build_TIPO_DE_REGISTRO();
        this.build_TIPO_DE_OPERACAO();
        this.build_TIPO_DE_PAGAMENTO();
        this.build_FORMA_DE_PAGAMENTO();
        this.build_LAYOUT_DO_LOTE("040");
        this.build_EMPRESA_INSCRICAO();
        this.build_INSCRICAO_NUMERO();
        this.build_IDENTIFICAÇAO_DO_LANCAMENTO();
        this.build_AGENCIA();
        this.build_CONTA();
        this.build_DAC();
        this.build_NOME_DA_EMPRESA();
        this.build_FINALIDADE_DO_LOTE();
        this.build_HISTORICO_DE_CC();
        this.build_ENDERECO_EMPRESA();
        this.build_NUMERO();
        this.build_COMPLEMENTO();
        this.build_CIDADE();
        this.build_CEP();
        this.build_ESTADO();
        this.build_OCORRENCIAS();
        console.log('HEADER SEG A', this.headerLote.length)
        this.headerLote += '\r\n';

        return this.headerLote;
    }

    //Liquidação de títulos (bloquetos) em cobrança no Itaú e em outros bancos
    generateHeaderSegmentoJ() {

        this.headerLote = "";
        this.build_CODIGO_DO_BANCO();
        this.build_CODIGO_DO_LOTE();
        this.build_TIPO_DE_REGISTRO();
        this.build_TIPO_DE_OPERACAO();
        this.build_TIPO_DE_PAGAMENTO();
        this.build_FORMA_DE_PAGAMENTO();
        this.build_LAYOUT_DO_LOTE("030");
        this.build_EMPRESA_INSCRICAO();
        this.build_INSCRICAO_NUMERO();
        this.build_AGENCIA();
        this.build_CONTA();
        this.build_DAC();
        this.build_NOME_DA_EMPRESA();
        this.build_FINALIDADE_DO_LOTE();
        this.build_HISTORICO_DE_CC();
        this.build_ENDERECO_EMPRESA();
        this.build_NUMERO();
        this.build_COMPLEMENTO();
        this.build_CIDADE();
        this.build_CEP();
        this.build_ESTADO();
        this.build_OCORRENCIAS();
        console.log('HEADER SEG J', this.headerLote.length)
        this.headerLote += '\r\n';
        
        return this.headerLote;
    }

    //Pagamento de Concessionárias e Tributos com código de barras
    generateHeaderSegmentoO() {
        this.headerLote = "";
        this.build_CODIGO_DO_BANCO();
        this.build_CODIGO_DO_LOTE();
        this.build_TIPO_DE_REGISTRO();
        this.build_TIPO_DE_OPERACAO();
        this.build_TIPO_DE_PAGAMENTO();
        this.build_FORMA_DE_PAGAMENTO();
        this.build_LAYOUT_DO_LOTE("030");
        this.build_EMPRESA_INSCRICAO();
        this.build_INSCRICAO_NUMERO();
        this.build_IDENTIFICAÇAO_DO_LANCAMENTO();
        this.build_AGENCIA();
        this.build_CONTA();
        this.build_DAC();
        this.build_NOME_DA_EMPRESA();
        this.build_FINALIDADE_DO_LOTE();
        this.build_HISTORICO_DE_CC();
        this.build_ENDERECO_EMPRESA();
        this.build_NUMERO();
        this.build_COMPLEMENTO();
        this.build_CIDADE();
        this.build_CEP();
        this.build_ESTADO();
        this.build_OCORRENCIAS();
        console.log('HEADER SEG O', this.headerLote.length)
        this.headerLote += '\r\n';

        return this.headerLote;
    }

    //Pagamento de Tributos sem código de barras e FGTS
    generateHeaderSegmentoN() {

        this.headerLote = "";
        this.build_CODIGO_DO_BANCO();
        this.build_CODIGO_DO_LOTE();
        this.build_TIPO_DE_REGISTRO();
        this.build_TIPO_DE_OPERACAO();
        this.build_TIPO_DE_PAGAMENTO();
        this.build_FORMA_DE_PAGAMENTO();
        this.build_LAYOUT_DO_LOTE("030");
        this.build_EMPRESA_INSCRICAO();
        this.build_INSCRICAO_NUMERO();
        this.build_IDENTIFICAÇAO_DO_LANCAMENTO();
        this.build_AGENCIA();
        this.build_CONTA();
        this.build_DAC();
        this.build_NOME_DA_EMPRESA();
        this.build_FINALIDADE_DO_LOTE();
        this.build_HISTORICO_DE_CC();
        this.build_ENDERECO_EMPRESA();
        this.build_NUMERO();
        this.build_COMPLEMENTO();
        this.build_CIDADE();
        this.build_CEP();
        this.build_ESTADO();
        this.build_OCORRENCIAS();
        console.log('HEADER SEG N', this.headerLote.length)
        this.headerLote += '\r\n';

        return this.headerLote;
    }
}