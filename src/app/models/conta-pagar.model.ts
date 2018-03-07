import { Fornecedor } from "./fornecedor.model";

export class ContaPagar {

    selecionado: boolean;
    data_vencimento: string;
    data_emissao: string;
    status_titulo: string;
    valor_documento: number = 0;
    nome_fornecedor: string;
    cpfCnpj: string;
    codigo_lancamento_omie: number;
    codigo_tipo_documento: string;
    tipoDocumento: any;
    codigo_de_barras: string;
    fornecedor: Fornecedor = new Fornecedor();
    valorAPagar: number = 0;
    desconto: number = 0;
    juros: number = 0;
    multa: number = 0;
    numero_documento_fiscal: string;
    data_previsao: string;
    tipo_de_movimento: string = "000";
    data_vencimentoFiltragem: Date;
    canShow: boolean = true;
}