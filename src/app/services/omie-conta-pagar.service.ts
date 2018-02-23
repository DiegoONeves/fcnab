import { Injectable } from '@angular/core';

import { HttpClient } from '../shared/http-client';
import { ContasPagarSearch } from '../models/contas-pagar-search.model';
import { ApiCallEnum } from '../shared/enums/api-call-enum';
import { environment } from '../../environments/environment.prod';
import { ContaPagar } from '../models/conta-pagar.model';
import * as moment from 'moment';
import { OmieClienteService } from './omie-cliente.service';
import { OmieDocumentoService } from './omie-documento.service';
import { Common } from '../shared/common';

@Injectable()
export class OmieContaPagarService {

  endPoint: string = "/financas/contapagar/";
  constructor(private httpClient: HttpClient,
    private omieClienteService: OmieClienteService,
    private omieDocumentoService: OmieDocumentoService) { }

  async search(contasPagarSearch: ContasPagarSearch) {
    let resultModels = new Array<ContaPagar>();
    let body = {
      call: "ListarContasPagar",
      app_key: environment.app_key,
      app_secret: environment.app_secret,
      param: [
        {
          pagina: contasPagarSearch.page,
          registros_por_pagina: contasPagarSearch.limit,
          apenas_importado_api: "N"
        }
      ]
    };

    let result = await this.httpClient.post(this.endPoint, body, ApiCallEnum.Omie);
    console.log(result);

    for (let r of result.conta_pagar_cadastro) {
      let model = new ContaPagar();
      model.codigo_de_barras = r.codigo_barras_ficha_compensacao;
      model.codigo_lancamento_omie = r.codigo_lancamento_omie;
      model.data_vencimento = r.data_vencimento;
      model.data_emissao = r.data_emissao;
      model.status_titulo = r.status_titulo;
      model.valor_documento = r.valor_documento;
      model.data_previsao = r.data_previsao;
      model.numero_documento_fiscal = r.numero_documento_fiscal;
      model.valorAPagar = r.valor_documento;
      model.tipoDocumento = await this.omieDocumentoService.getByCodigoTipoDocumento(r.codigo_tipo_documento);
      model.codigo_tipo_documento = r.codigo_tipo_documento;
      let fornecedorOmie = await this.omieClienteService.findCliente(parseInt(r.codigo_cliente_fornecedor));
      model.nome_fornecedor = fornecedorOmie.nome_fantasia;
      model.cpfCnpj = Common.formatCpfCnpj(fornecedorOmie.cnpj_cpf);
      resultModels.push(model);
    }

    return resultModels;
  }
}
