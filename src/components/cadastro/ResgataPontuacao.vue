<template>
    <div>
      <meu-menu :rotas="routes"/>
      
     <div class = "page-header">
            <h1 class="centralizado">Resgate de Pontos</h1>
            <h2 class="centralizado"></h2>
            <div class="container">
                <div v-show="mostrarErro1" class="alert alert-danger alert-dismissible">
                        <button @click="fechar()" class="close" data-dismiss="alert" aria-label="close">&times;</button>
                        <strong>Error!</strong> {{erro}}
                </div>
                <div>
                    <b-modal ref="myModalRef" hide-footer title="Alerta">
                    <div class="d-block text-center">
                         <div v-show="mostrarErro2" class="alert alert-danger alert-dismissible">
                        <strong>Error!</strong> {{erro}}
                     </div>
                    </div>
                    <b-btn class="mt-3" variant="outline-danger" block @click="sim()">Sim</b-btn>
                    <b-btn class="mt-3" variant="outline-danger" block @click="nao()">Não</b-btn>
                    </b-modal>
                </div>                 
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
                    <p v-show="mostra">O cliente contém a seguinte pontuação {{cliente.pontuacao}} </p>
                    <hr>
                    </div>               
                <div class="alert alert-success">
                    <div class="container">
                        <h1 class="display-4">Valores monetários</h1>
                        <p class="lead">Selecione a pontuação correspondente para valorizar o ponto</p>
                        <div class="form-group">
                            <div class="alinhadoDireita">                                
                                <p>{{ponto1}} Pontos</p>
                                <label for="one" class="label label-default">{{valor1}} R$</label>
                                <div class="col-md-9">
                                    <input type="radio" id="one" value=5 v-model="valor">
                                </div>
                            </div>
                        </div>
                        <div class="form-group">
                            <div class="alinhadoDireita">
                                <p>{{ponto2}} Pontos</p>
                                <label for="inteira" class="label label-default">{{valor2}} R$</label>
                                <div class="col-md-9">
                                    <input type="radio" id="two" value=10 v-model="valor">
                                </div>
                            </div>
                        </div>
                        <div class="form-group">
                            <div class="alinhadoDireita">
                                <p>{{ponto3}} Pontos</p>
                                <label for="inteira" class="label label-default">{{valor3}}R$</label>
                                <div class="col-md-9">
                                    <input type="radio" id="thre" value=15 v-model="valor">
                                </div>
                            </div>
                        </div>
                        <br>
                        <br>
                        <br>
                        <br>
                        
                    </div>
                </div>
                <div class="form-group">
                    <div class="centralizado">
                        <div class="posicao">
                        <meu-botao rotulo="Gravar" tipo="submit"/>
                        <meu-botao rotulo="Sair" tipo="button" @botaoAtivado="sair()"></meu-botao>
                        </div>
                    </div>
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
            valor: 0,
            ponto1: 10,
            ponto2: 20,
            ponto3: 30,
            valor1: 5,
            valor2: 10,
            valor3: 15,
            mensagemCpf: '',
            mostra: false,
            selected: '',
            ponto: 0,
            erro: '',
            naograva: false,
            gravar: false,
            mostrarErro1: false,
            mostrarErro2: false,
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
        sair(){
         this.$router.push({ name: 'loginEmpresa'});
        },
        busca(){
            if(this.cliente.cpf > 0){
                this.service.busca(this.cliente)
                    .then(cliente => {
                        if(cliente.id != null){
                        this.cliente = cliente;
                        this.cliente.valor = cliente.valor;
                        this.mostra = true;
                        }else{
                            this.mostrarErro1 =true;
                           this.erro = "Cliente não encontrado" 
                        }
                    }, err => {
                        console.log(err)
                    });    
                    
            }else{
                this.mostrarErro1 =true;
               this.erro = "Cliente não encontrado" 
            }
        },

        fechar(){
            this.mostrarErro1 = false;
        },

        nao(){
            this.$refs.myModalRef.hide()
            this.mostrarErro1 = false;
            this.mostrarErro2 = false;

        },
        sim(){
            this.$refs.myModalRef.hide()
            this.naograva = true;
            this.mostrarErro1 = false;
            this.mostrarErro2 = false;
            this.gravar = true;
            this.grava()

        },
        
         grava() {
            this.naograva = true;
            if(this.cliente.id != null ){
                if(this.cliente.pontuacao >= this.ponto1 && this.cliente.pontuacao >= this.ponto2 && this.cliente.pontuacao >= this.ponto3){
                    this.cliente.valor = this.cliente.valor + 15;                 
                }else if(this.cliente.pontuacao >= this.ponto1 && this.cliente.pontuacao >= this.ponto2) {
                    this.cliente.valor = this.cliente.valor + 10;
                }else if(this.cliente.pontuacao >= this.ponto1){
                     this.cliente.valor = this.cliente.valor + 5;
                }
                 if(!this.gravar && this.valor != 15){
                     if(this.cliente.pontuacao >= this.ponto1 || this.cliente.pontuacao >= this.ponto2){
                    this.erro = "Tem certeza que deseja resgatar um valor menor que a pontuação disponível?"
                    this.mostrarErro2=true;
                     this.$refs.myModalRef.show()
                    this.naograva = false
                     }
                 }
                if(this.naograva){
                    if(this.cliente.valor != 0){
                        if(this.valor == 15){
                            this.ponto = 30;
                        }else if(this.valor == 10){
                            this.ponto = 20;
                        }else if(this.valor == 5){
                            this.ponto = 10;
                        }
                        this.cliente.pontuacao = this.cliente.pontuacao - this.ponto;       
                        this.service.cadastrar(this.cliente, this.$resource)
                        .then(cliente => {
                            this.cliente.cpf = "";
                            this.mostra = false; 
                            this.quantidade = 0;
                    })
                    }else{
                        this.mostrarErro1 =true;
                    this.erro = "A quantidade de pontos não foi atingida" 
                        
                    //alert("A quantidade de pontos não foi atingida")    
                    }                  
                }else{
                     return
                }
            }else{
                this.mostrarErro1 =true;
                this.erro = "Cliente não encontrado" 
            }
         }
    } 
} 
</script>

<style>
     .centralizado {
    text-align: center;
    
  }
  .alinhadoDireita{
      float: left;
      margin-left: 20px;
      position: relative;
      text-align: center
  }
  .posicao{
     margin-top: 90px;
      
  }
  .alinhadoEsquerda{
      float: right;
  }
  .distancia{
      float: left;
      
  }
</style>