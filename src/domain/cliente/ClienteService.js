export default class ClienteService {

    constructor(resource) {
        this.resource = resource('clientes/pontuacao{/id}');
        this._resource = this.resource;

    }

    busca(cliente){
        return this._resource.save(cliente)
        .then(res => res.json());
    }

    cadastrar(cliente, resource){
        this._resource = resource('clientes/salvar');
        return this._resource.save(cliente)
        .then(res => res.json());
    }
 

}