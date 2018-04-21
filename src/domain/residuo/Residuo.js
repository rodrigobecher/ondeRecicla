import Categoria from "../categoria/Categoria";

export default class Residuo{

    constructor(descricao, unimed, Categoria){
        
        this.descricao = descricao;
        this.unimed = unimed;
        this.categoria = Categoria;
    }
}