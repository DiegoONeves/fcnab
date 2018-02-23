import { Component, OnInit } from '@angular/core';
import { OmieContaPagarService } from '../../../services/omie-conta-pagar.service';
import { ContasPagarSearch } from '../../../models/contas-pagar-search.model';
import { ContaPagar } from '../../../models/conta-pagar.model';
import * as ptLocale from 'date-fns/locale/pt';
import { RemessaPagamentoCnabService } from '../../../services/remessa-pagamento-cnab.service';
import { FornecedorService } from '../../../services/fornecedor.service';
import { Fornecedor } from '../../../models/fornecedor.model';
import { Common } from '../../../shared/common';
import { ConfigurationHeader } from '../../../models/configuration-header.model';

@Component({
  selector: 'app-contas-pagar',
  templateUrl: './contas-pagar.component.html',
  styleUrls: ['./contas-pagar.component.css']
})
export class ContasPagarComponent implements OnInit {

  configurationHeader: ConfigurationHeader = new ConfigurationHeader();
  commonHelper: Common = new Common();
  contasPagarSearch: ContasPagarSearch = new ContasPagarSearch();
  contasAPagar = new Array<ContaPagar>();

  constructor(private omieContaPagarService: OmieContaPagarService,
    private remessaPagamentoCnabService: RemessaPagamentoCnabService,
    private fornecedorService: FornecedorService) { }

  async ngOnInit() {

  }

  isCanGenerateRemessa() {
    return this.contasAPagar.filter(x => x.selecionado).length == 0;
  }

  selecAll(value: any) {
    let isChecked = value.target.checked;
    for (let conta of this.contasAPagar)
      conta.selecionado = isChecked;
  }

  async searchContasAPagar(page: number) {

    this.contasPagarSearch.page = page;

    this.contasAPagar = await this.omieContaPagarService.search(this.contasPagarSearch);

    for (let c of this.contasAPagar) {
      this.fornecedorService.getByCpfCnpj(Common.formatCpfCnpj(c.cpfCnpj)).subscribe(x => {
        if (x.length > 0) {
          c.fornecedor.nome = x[0].nome;
          c.fornecedor.cpfCnpj = Common.formatCpfCnpj(x[0].cpfCnpj);
          c.fornecedor.banco = x[0].banco;
          c.fornecedor.agencia = x[0].agencia;
          c.fornecedor.conta = x[0].conta;
          c.fornecedor.digitoConta = x[0].digitoConta;
        }

      });
    }
    console.log('contas a pagar', this.contasAPagar);
  }

  generateRemessa() {
    let file = this.remessaPagamentoCnabService.generateRemessa(this.contasAPagar.filter(x => x.selecionado), this.configurationHeader);
    this.expFile(file);
  }



  saveTextAsFile(data, filename) {
    if (!data) {
      console.error('Console.save: No data')
      return;
    }

    if (!filename) filename = 'console.json'

    var blob = new Blob([data], { type: 'text/plain' }),
      e = document.createEvent('MouseEvents'),
      a = document.createElement('a')
    // FOR IE:

    if (window.navigator && window.navigator.msSaveOrOpenBlob) {
      window.navigator.msSaveOrOpenBlob(blob, filename);
    }
    else {
      var e = document.createEvent('MouseEvents'),
        a = document.createElement('a');

      a.download = filename;
      a.href = window.URL.createObjectURL(blob);
      a.dataset.downloadurl = ['text/plain', a.download, a.href].join(':');
      e.initEvent('click', true, false);
      a.dispatchEvent(e);
    }
  }


  expFile(fileText: string) {
    var fileName = "CNAB.txt"
    this.saveTextAsFile(fileText, fileName);
  }


}
