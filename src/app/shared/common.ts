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

}