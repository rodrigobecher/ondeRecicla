export default class EmpresaLoginService {

    constructor(resource) {
        this._resource = resource('/logar');

    }
    logar(empresa){
        return this._resource.save(empresa);
    }
}