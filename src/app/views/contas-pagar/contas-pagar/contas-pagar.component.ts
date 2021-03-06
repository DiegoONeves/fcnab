import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { OmieContaPagarService } from '../../../services/omie-conta-pagar.service';
import { ContasPagarSearch } from '../../../models/contas-pagar-search.model';
import { ContaPagar } from '../../../models/conta-pagar.model';
import * as ptLocale from 'date-fns/locale/pt';
import { RemessaPagamentoCnabService } from '../../../services/remessa-pagamento-cnab.service';
import { FornecedorService } from '../../../services/fornecedor.service';
import { Fornecedor } from '../../../models/fornecedor.model';
import { Common } from '../../../shared/common';
import { ConfigurationHeader } from '../../../models/configuration-header.model';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { OmieDocumentoService } from '../../../services/omie-documento.service';
import * as moment from 'moment';
import { PreLoadService } from '../../../services/preload.service';

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
  tiposDeDocumento: any;
  constructor(private omieContaPagarService: OmieContaPagarService,
    private remessaPagamentoCnabService: RemessaPagamentoCnabService,
    private fornecedorService: FornecedorService,
    public toastr: ToastsManager,
    private omieDocumentoService: OmieDocumentoService,
    public preLoadService: PreLoadService) { }

  async ngOnInit() {
    this.tiposDeDocumento = await this.omieDocumentoService.getAllTiposDocumento();
  }

  isCanGenerateRemessa() {
    return this.contasAPagar.filter(x => x.selecionado).length === 0;
  }

  selecAll(value: any) {
    let isChecked = value.target.checked;
    for (let conta of this.contasAPagar)
      conta.selecionado = isChecked;
  }

  async searchContasAPagar(page: number) {
    this.preLoadService.show();
    this.contasPagarSearch.page = page;

    this.contasAPagar = await this.omieContaPagarService.search(this.contasPagarSearch);
    this.verifyPagamentosToShow();

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
    this.preLoadService.hide();
    console.log('contas a pagar', this.contasAPagar);

    if (this.contasAPagar.length == 0) {
      this.toastr.warning('Nenhuma conta para este período.', 'Atenção!')
    }
    this.verifyPagamentosToShow();
  }

  generateRemessa() {
    let contasToProcess = this.contasAPagar.filter(x => x.selecionado);
    for (let c of contasToProcess) {
      if (!Common.TiposDocumentosValidos.find(x => x === c.codigo_tipo_documento)) {
        this.toastr.warning("Uma ou mais contas estão com tipo de documento inválido.", "Atenção!")
        return;
      }
    }

    this.preLoadService.show();
    let file = this.remessaPagamentoCnabService.generateRemessa(contasToProcess, this.configurationHeader);
    this.expFile(file);
    this.preLoadService.hide();
    this.toastr.success('Arquivo gerado com sucesso!', 'Sucesso!');
  }



  saveTextAsFile(data, filename) {
    if (!data) {
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
    var fileName = `${moment(new Date()).format("DDMM")}${Common.padRight(Math.round((Math.random() * 100) + 1).toString().substring(0, 2), '0', 2)}.txt`;
    this.saveTextAsFile(fileText, fileName);
  }


  verifyClass(contaPagar: ContaPagar) {
    if (!Common.TiposDocumentosValidos.find(x => x === contaPagar.codigo_tipo_documento))
      return "danger";

    return "";
  }

  verifyPagamentosToShow() {


    for (let x of this.contasAPagar) {

      if (x.codigo_tipo_documento === "BOL") {
        console.log('achou', x.codigo_tipo_documento);
        x.canShow = this.configurationHeader.listSegmentoJ;
      }

      if (x.codigo_tipo_documento === "FAT")
        x.canShow = this.configurationHeader.listSegmentoO;

      if (x.codigo_tipo_documento === "TRA")
        x.canShow = this.configurationHeader.listSegmentoA;
    }

  }

  test() {
    return this.contasAPagar.filter(x => x.canShow);
  }


}
