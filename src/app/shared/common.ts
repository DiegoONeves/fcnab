
export class Common {

    public static padLeft(value: string, item: string, size: number): string {

        if (value === undefined) {
            value = "";
        }
        value += "";
        value = value.substring(0, size);
        while (value.length < size)
            value = item + value;

        return value;
    }

    public static padRight(value: string, item: string, size: number): string {
        if (value === undefined) {
            value = "";
        }
        value += "";
        value = value.substring(0, size);
        while (value.length < size)
            value = value + item;

        return value;
    }

    public static buildCharacters(size: number, char: string) {
        let returnValue = "";

        for (let i = 0; i < size; i++)
            returnValue += char;

        return returnValue;
    }

    getConfigurationMaskMoney() {
        return { prefix: 'R$ ', thousands: '.', decimal: ',' };
    }

    public static verifyInscricao(value: string) {

        if (!value)
            return "";

        if (value.length === 11)
            return "1";
        else if (value.length === 14) {
            return "2";
        }
    }

    public getTiposDeMovimento() {
        return [
            { "id": "000", "value": "000 - Inclusão de pagamento" },
            { "id": "001", "value": "001 - CPF" },
            { "id": "002", "value": "002 - CNPJ (Completo)" },
            { "id": "003", "value": "003 - CNPJ (Raiz)" },
            { "id": "004", "value": "004 - Inclusão de Demonstrativo de Pagamento/Holerite" },
            { "id": "512", "value": "512 - Alteração do Demonstrativo de Pagamentos/Holerite" },
            { "id": "517", "value": "517 - Alteração de Valor do Pagamento" },
            { "id": "519", "value": "519 - Alteração da Data de Pagamento" },
            { "id": "998", "value": "998 - Exclusão do Demonstrativo de Pagamentos/Holerite" },
            { "id": "999", "value": "999 - Exclusão de pagamento incluído anteriormente" }
        ];
    }

    public getFormasDePagamento() {
        return [
            { "id": "01", value: "01 - CRÉDITO EM CONTA CORRENTE NO ITAÚ" },
            { "id": "02", value: "02 - CHEQUE PAGAMENTO / ADMINISTRATIVO" },
            { "id": "03", value: '03 - DOC "C"' },
            { "id": "05", value: "05 - CRÉDITO EM CONTA POUPANÇA NO ITAÚ" },
            { "id": "06", value: "06 - CRÉDITO EM CONTA CORRENTE DE MESMA TITULARIDADE " },
            { "id": "07", value: '07 - DOC "D"' },
            { "id": "10", value: "10 - ORDEM DE PAGAMENTO À DISPOSIÇÃO " },
            { "id": "13", value: "13 - PAGAMENTO DE CONCESSIONÁRIAS " },
            { "id": "16", value: "16 - DARF NORMAL " },
            { "id": "17", value: "17 - GPS(GUIA DA PREVIDÊNCIA SOCIAL) " },
            { "id": "18", value: "18 - DARF SIMPLES " },
            { "id": "19", value: "19 - IPTU / ISS / OUTROS TRIBUTOS MUNICIPAIS " },
            { "id": "21", value: "21 - DARJ" },
            { "id": "25", value: "25 - IPVA" },
            { "id": "27", value: "27 - DPVAT" },
            { "id": "30", value: "30 - PAGAMENTO DE TÍTULOS EM COBRANÇA NO ITAÚ " },
            { "id": "31", value: "31 - PAGAMENTO DE TÍTULOS EM COBRANÇA EM OUTROS BANCOS " },
            { "id": "32", value: "32 - NOTA FISCAL – LIQUIDAÇÃO ELETRÔNICA " },
            { "id": "35", value: "35 - FGTS – GFIP " },
            { "id": "41", value: "41 - TED – OUTRO TITULAR " },
            { "id": "43", value: "43 - TED – MESMO TITULAR " },
            { "id": "60", value: "60 - CARTÃO SALÁRIO " },
            { "id": "91", value: "91 - GNRE E TRIBUTOS COM CÓDIGO DE BARRAS" }]
    }

    public static formatCpfCnpj(numeroInscricao: string) {
        if (!numeroInscricao)
            return "";

        let result = numeroInscricao.replace(/\./g, '').replace(/-/g, '').replace(/[//"]/g, '');

        return result;
    }

    public getBancos() {
        return [
            { 'name': '001 - Banco do Brasil', 'number': '001' },
            { 'name': '104 - Caixa Econômica Federal', 'number': '104' },
            { 'name': '745 - Citbank', 'number': '745' },
            { 'name': '442 - Banco Safra', 'number': '422' },
            { 'name': '033 - Santander', 'number': '033' },
            { 'name': '237 - Bradesco', 'number': '237' },
            { 'name': '341 - Itaú', 'number': '341' },
            { 'name': '735 - Neon', 'number': '735' },
            { 'name': '212 - Original', 'number': '212' },
            { 'name': '756 - Sicoob', 'number': '756' },
            { 'name': '077 - Banco Inter', 'number': '077' }];
    }

    public getTiposDePagamento() {
        return [{ id: 10, value: "10 - Dividendos" },
        { id: 15, value: "15 - Debêntures" },
        { id: 20, value: "20 - Fornecedores" },
        { id: 22, value: "22 - TRIBUTOS" },
        { id: 30, value: "30 - Salários" },
        { id: 40, value: "40 - Fundos de Investimentos" },
        { id: 50, value: "50 - Sinistros DE Seguros" },
        { id: 60, value: "60 - Despesas Viajante em Trânsito" },
        { id: 80, value: "80 - Representantes Autorizados" },
        { id: 90, value: "90 - Benefícios" },
        { id: 98, value: "98 - Diversos" }];
    }

    public getTiposDeIdentificacaoDeLiquidacao() {
        return [
            { codigo: 1, value: "1 - Identificação por CNPJ do beneficiário" },
            { codigo: 2, value: "2 - Identificação por número de nota fiscal" },
            { codigo: 3, value: "3 - Identificação por CNPJ de Terceiros/Filial" }
        ];
    }

    public static normalizeValues(value: string, beforeComma: number, afterComma) {

        if (value === undefined) {
            let v = beforeComma + afterComma;
            return this.buildCharacters(v, '0');
        }

        let values = value.split('.');
        let result = "";
        result = this.padLeft(values[0], '0', beforeComma);
        result += this.padRight(values[1], '0', afterComma);
        return result;
    }

    public static TiposDocumentosValidos = ["TRA", "BOL", "DOC", "TED", "FAT"]




}