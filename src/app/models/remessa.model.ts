import { Common } from "../shared/common";
import { HeaderRemessa } from "./header-remessa.model";
import { TrailerRemessa } from "./trailer-remessa.model";
import { Lote } from "./lote.model";

export class Remessa {
    header: HeaderRemessa = new HeaderRemessa();
    lotes: Lote[] = new Array<Lote>();
    trailer: TrailerRemessa = new TrailerRemessa();

}




