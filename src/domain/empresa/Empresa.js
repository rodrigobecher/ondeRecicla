export default class Empresa{

    constructor(id, nome, endereco, cnpj, login, senha, residuo, url){
        this.id = id;
        this.nome = nome;
        this.endereco = endereco;
        this.cnpj = cnpj;
        this.login = login;
        this.senha = senha;
        this.url = url;
        this.residuo = [];
    }
}