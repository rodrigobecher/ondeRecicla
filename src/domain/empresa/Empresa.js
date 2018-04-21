export default class Empresa{

    constructor(nome, endereco, cnpj, login, senha, residuo){
        
        this.nome = nome;
        this.endereco = endereco;
        this.cnpj = cnpj;
        this.login = login;
        this.senha = senha;
        this.residuo = [];
    }
}