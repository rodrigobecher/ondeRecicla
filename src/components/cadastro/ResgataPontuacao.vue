<template>
    <div>
      <meu-menu :rotas="routes"/>
      
     <div class = "page-header">
            <h1 class="centralizado">Resgate de Pontos</h1>
            <h2 class="centralizado"></h2>
            <div class="container">
                <form @submit.prevent="grava()">
                <div class="form-group">
                    <label for="cpf">CPF</label>
                    <input class="form-control" id="cpf" type="number" required="true" autocomplete="off" @blur="busca()" v-model="cliente.cpf">
                    <div v-show="okCpf" class="alert alert-danger" role="alert">
                       {{mensagemCpf}}
                    </div>
                </div>
                 <div  class="alert alert-success" role="alert">
                    <h4 class="alert-heading">Pontuação Existente</h4>
                    <p v-show="mostra">O cliente contém atualmente {{cliente.pontuacao}} Pontos</p>
                    <hr>
                    </div>
                <div class="form-group">
                    <label for="quantidade">Quantidade a debitar</label>
                    <input class="form-control" id="quantidade" max="500" type="number" required="true" autocomplete="off" v-model="quantidade">
                </div>
               
                <div class="centralizado">
                    <meu-botao rotulo="Gravar" tipo="submit"/>
                    <meu-botao rotulo="Sair" tipo="button" @botaoAtivado="sair()"></meu-botao>
                    
                </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import {routes} from '../../routesEmpresa';
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import Botao from '../shared/botao/Botao.vue';
import Cliente from '../../domain/cliente/Cliente';
import Menu from '../shared/menu/Menu.vue';
import clienteService from '../../domain/cliente/ClienteService';

export default {

  components: {

    'meu-botao': Botao,
    'meu-menu' : Menu
  },

    data () {
        return {
        
            mensagemCpf: '',
            mostra: false,
            selected: '',
            quantidade: 0,
            ponto: 0,
            okCpf: false,
                
                cliente:{

                },

            routes : routes.filter(route => route.menu),
        }
    },
    created(){
        this.service = new clienteService(this.$resource);
    },
    methods: {        

        busca(){
            if(this.cliente.cpf > 0){
                this.service.busca(this.cliente)
                    .then(cliente => {
                        if(cliente.id != null){
                        this.cliente = cliente;
                        this.mostra = true;
                        }else{
                            alert("Cliente não encontrado!")
                        }
                    }, err => {
                        console.log(err)
                    });    
                    
            }else{
                alert("Cliente não encontrado!")
            }
        },
         grava() {
            if(this.cliente.id != null){
                this.ponto = this.cliente.pontuacao - this.quantidade;
                console.log(this.ponto);
                this.cliente.pontuacao = this.ponto;
                  this.service.cadastrar(this.cliente, this.$resource)
                .then(cliente => {
                    this.cliente = new Cliente();
                    this.mostra = false; 
                    this.quantidade = 0;
                })
            }else{
                alert("Cliente não encontrado!")
            }
         }
    } 
} 
</script>

<style>
     .centralizado {
    text-align: center;
  }
</style>