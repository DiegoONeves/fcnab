import { Common } from "../shared/common";
import { HeaderRemessa } from "./header-remessa.model";
import { TrailerRemessa } from "./trailer-remessa.model";
import { Lote } from "./lote.model";

export class Remessa {
    header: HeaderRemessa = new HeaderRemessa();
    lotes: Lote[] = new Array<Lote>();
    trailer: TrailerRemessa = new TrailerRemessa();

    getLengthLote() {
        return this.lotes.length + 1;
    }

    getQtdRegisters() {

        let qtdLinesLote = 2; // contabiliza header e trailer
        this.lotes.forEach(x => {
            qtdLinesLote += x.detalhes.length + 2; //soma com header e trailer de cada lote.
        });

        return qtdLinesLote;
    }

}




