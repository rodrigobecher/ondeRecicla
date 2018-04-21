export default class ResiduoService {

    constructor(resource) {
        this._resource = resource('api/residuos{/id}');
    }

    lista(){
        return this._resource.query()
        .then(res => res.json());
    }

    cadastra(residuo){
        if(residuo.id){
            return this._resource.update(residuo);
        }else{
            return this._resource.save(residuo);
        }
        
    }

    apaga(id){
        return this._resource.delete({ id })
    }
    altera(id){
        return this._resource.get({id})
        .then(res => res.json());
    }
    listaCategoria(){
        this._resource = resource('api/residuos/categoria');
        return this._resource.get()
        .then(res => res.json());
    }
}