import { Injectable } from '@angular/core';
import { HttpClient } from '../shared/http-client';
import { environment } from '../../environments/environment';
import { ApiCallEnum } from '../shared/enums/api-call-enum';

@Injectable()
export class OmieDocumentoService {

  endPoint: string = "/geral/tiposdoc/";

  constructor(private httpClient: HttpClient) { }

  async getByCodigoTipoDocumento(codigo_tipo_documento: string) {
    let body =
      {
        call: "ConsultarTipoDocumento",
        app_key: environment.app_key,
        app_secret: environment.app_secret,
        param: [
          { codigo: codigo_tipo_documento }
        ]
      }

    return await this.httpClient.post(this.endPoint, body, ApiCallEnum.Omie);
  }

  async getAllTiposDocumento() {
    let body =
      {
        call: "PesquisarTipoDocumento",
        app_key: environment.app_key,
        app_secret: environment.app_secret,
        param: [
          { codigo: "" }
        ]
      }

    let result = await this.httpClient.post(this.endPoint, body, ApiCallEnum.Omie);
    return result.tipo_documento_cadastro;
  }

}
