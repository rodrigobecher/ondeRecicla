export default class ResiduoEmpresaService {

    constructor(resource) {
        this._resource = resource('api/residuoEmpresa{/id}');

    }

    lista(){
        return this._resource.query()
        .then(res => res.json());
    }

    lista(id){
        return this._resource.query()
        .then(res => res.json());
    }

    cadastra(empresaResiduoPontuacao){
        if(empresaResiduoPontuacao.id){
            return this._resource.update(empresaResiduoPontuacao);
        }else{
            return this._resource.save(empresaResiduoPontuacao);
        }
        
    }

    apaga(id){
        return this._resource.delete({ id })
    }
    altera(id){
        return this._resource.get({id})
        .then(res => res.json());
    }
}