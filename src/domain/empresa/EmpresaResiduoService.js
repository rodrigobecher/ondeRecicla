export default class EmpresaResiduoService {

    constructor(resource) {
        this._resource = resource('api/empresas/residuos{/id}');

    }

    listaEmpresaResiduo(id){
        return this._resource.get({id})
        .then(res => res.json());
    }

}