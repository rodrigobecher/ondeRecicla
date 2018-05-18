export default class EmpresaService {

    constructor(resource) {
        this._resource = resource('api/empresas{/id}');

    }

    lista(){
        return this._resource.query()
        .then(res => res.json());
    }

    cadastra(empresa){
        if(empresa.id){
            return this._resource.update(empresa);
        }else{
            return this._resource.save(empresa);
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