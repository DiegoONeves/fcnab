import { HeaderLote } from "./header-lote.model";
import { TrailerLote } from "./trailer-lote.model";
import { Detalhe } from "./detalhe-lote.model";

export class Lote {
    header: HeaderLote = new HeaderLote();
    detalhes: Detalhe[] = new Array<Detalhe>();
    trailer: TrailerLote = new TrailerLote();
}