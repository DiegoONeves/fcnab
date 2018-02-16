import { Component, OnInit } from '@angular/core';
import { OmieContaPagarService } from '../../../services/omie-conta-pagar.service';
import { ContasPagarSearch } from '../../../models/contas-pagar-search.model';
import { ContaPagar } from '../../../models/conta-pagar.model';
import * as ptLocale from 'date-fns/locale/pt';
import { RemessaPagamentoCnabService } from '../../../services/remessa-pagamento-cnab.service';

@Component({
  selector: 'app-contas-pagar',
  templateUrl: './contas-pagar.component.html',
  styleUrls: ['./contas-pagar.component.css']
})
export class ContasPagarComponent implements OnInit {

  contasPagarSearch: ContasPagarSearch = new ContasPagarSearch();
  contasAPagar = new Array<ContaPagar>();
  contasAPagarParaGerarRemessa = new Array<ContaPagar>();
  checkboxValue: boolean = false;
  options: any = {
    minYear: 1970,
    maxYear: 2030,
    displayFormat: 'DD/MM/YYYY',
    barTitleFormat: 'MMMM YYYY',
    firstCalendarDay: 0, // 0 - Sunday, 1 - Monday
    locale: ptLocale,
    // minDate: new Date(Date.now()), // Minimal selectable date
    // maxDate: new Date(Date.now()),  // Maximal selectable date
    barTitleIfEmpty: 'Selecione uma data'
  };

  constructor(private omieContaPagarService: OmieContaPagarService,
    private remessaPagamentoCnabService: RemessaPagamentoCnabService) { }

  async ngOnInit() {

  }

  addContaToRemessa(contaPagar: ContaPagar, value: any) {

    let isChecked = value.target.checked;
    if (isChecked) {
      this.contasAPagarParaGerarRemessa.push(contaPagar);
    } else {
      this.contasAPagarParaGerarRemessa = this.contasAPagarParaGerarRemessa.filter(x => x.codigo_lancamento_omie !== contaPagar.codigo_lancamento_omie);
    }

  }

  async searchContasAPagar(page: number) {

    this.contasPagarSearch.page = page;

    this.contasAPagar = await this.omieContaPagarService.search(this.contasPagarSearch);
    console.log(this.contasAPagar);
  }

  generateRemessa() {
    this.remessaPagamentoCnabService.generateRemessa(null);
  }

}
