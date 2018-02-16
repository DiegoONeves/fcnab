export class ContasPagarSearch {
    beginDate: Date = new Date();
    endDate: Date = new Date();
    page: number
    limit: number = 10;
    totalItems: number = 0;
    totalPages: number;
}