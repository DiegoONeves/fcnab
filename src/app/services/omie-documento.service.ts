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

}
