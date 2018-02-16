import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment'

import { HttpClient } from '../shared/http-client';
import { ApiCallEnum } from '../shared/enums/api-call-enum';

@Injectable()
export class OmieClienteService {

  constructor(private httpClient: HttpClient) { }

  endPoint: string = "geral/clientes/";

  async findCliente(codigo_cliente_omie: number, codigo_cliente_integracao: string = "") {

    let body = {
      call: "ConsultarCliente",
      app_key: environment.app_key,
      app_secret: environment.app_secret,
      param: [
        {
          codigo_cliente_omie: codigo_cliente_omie,
          codigo_cliente_integracao: codigo_cliente_integracao
        }
      ]
    };

    return await this.httpClient.post(`/${this.endPoint}`, body, ApiCallEnum.Omie);
  }

}
