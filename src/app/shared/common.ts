export class Common {

    public static padLeft(value: string, item: string, size: number): string {

        if (value === undefined) value = "";

        while (value.length < size)
            value = item + value;

        return value;
    }

    public static padRight(value: string, item: string, size: number): string {
        if (value === undefined) value = "";
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
        return value.length > 11 ? "2" : "1";
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

}