export default class DepositoService {

    constructor(resource) {
        this._resource = resource('api/deposito{/id}');

    }

    lista(){
        return this._resource.query()
        .then(res => res.json());
    }

    cadastra(deposito){
            return this._resource.save(deposito);
        
    }
    apaga(id){
        return this._resource.delete({ id })
    }
    altera(id){
        return this._resource.get({id})
        .then(res => res.json());
    }
}