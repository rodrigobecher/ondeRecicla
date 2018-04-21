export default class CategoriaService {

    constructor(resource) {
        this._resource = resource('api/categorias{/id}');
    }

    lista(){
        return this._resource.query()
        .then(res => res.json());
    }

    cadastra(categoria){
        if(categoria.id){
            return this._resource.update(categoria);
        }else{
            return this._resource.save(categoria);
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