import { Routes } from "@angular/router";

import { ContasPagarComponent } from './views/contas-pagar/contas-pagar/contas-pagar.component';
import { FornecedoresComponent } from "./views/fornecedores/fornecedores.component";

export const AppRoutes: Routes = [
    {
        path: 'contas-pagar',
        component: ContasPagarComponent
    },
    {
        path: 'fornecedores',
        component: FornecedoresComponent
    }
];