<template>
    <div>
      <meu-menu :rotas="routes"/>
        <div class = "page-header">
            <h1 class="centralizado">Deposito Cliente</h1>
            <h2 class="centralizado"></h2>
            <h2 v-if="deposito.id" class="centralizado">Alterando</h2>
            <h2 v-if="!deposito.id"class="centralizado">Incluindo</h2>            
            <div class="container">
                <div v-show="mostrarErro1" class="alert alert-danger alert-dismissible">
                        <button @click="fechar()" class="close" data-dismiss="alert" aria-label="close">&times;</button>
                        <strong>Error!</strong> {{erro}}
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
                    <h4 class="alert-heading">Cliente</h4>
                    <p>{{clienteNome}}</p>
                    <hr>
                    </div>
                <div class="form-group">
                    <label for="quantidade">Quantidade</label>
                    <input class="form-control" id="quantidade" max="500" type="number" required="true" autocomplete="off" v-model="deposito.quantidade">
                </div>
                <div class="form-group">
                    <select  class="form-control" v-model="selected" id="residuos" name="residuos"  >
                        <option v-for="residuo of residuos" :value="residuo.id">{{residuo.descricao}}</option>
                    </select>
                    <div v-show="okResiduo" class="alert alert-danger" role="alert">
                        {{mensagemResiduo}}
                    </div>
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
import EmpresaResiduoService from '../../domain/empresa/EmpresaResiduoService';
import DepositoService from '../../domain/deposito/DepositoService';
import Empresa from '../../domain/empresa/Empresa';
import Residuo from '../../domain/residuo/Residuo';
import Cliente from '../../domain/cliente/Cliente';
import Deposito from '../../domain/deposito/Deposito';
import clienteService from '../../domain/cliente/ClienteService';
import Menu from '../shared/menu/Menu.vue';
   
    export default {

  components: {

    'meu-botao': Botao,
    'meu-menu' : Menu
  },
  data () {
    return {
      
      mensagemCpf: '',
      mensagemResiduo: '',
      clienteNome:'',
      mostrarErro1: false,
      selected: '',
      okCpf: false,
      okResiduo: false,
         residuos:{

          },
          cliente:{

          },
          deposito:{

          },
          empresaResiduo:{

          },
           routes : routes.filter(route => route.menu),
           erro:''
    }
  },
    created() {
        var jsonEmpresa = window.localStorage.getItem('empresa');
        this.empresaResiduo = JSON.parse(jsonEmpresa);
        this.service = new EmpresaResiduoService(this.$resource);
        this.service2 = new DepositoService(this.$resource);
        this.serviceCliente = new clienteService(this.$resource);
        this.service.listaEmpresaResiduo(this.empresaResiduo.id)
        
       .then(empresa => {
         this.residuos = empresa.residuo
       }, err => console.log(err));
       

    },
    methods: {
        busca(){
            if(this.cliente.cpf > 0){
                this.serviceCliente.busca(this.cliente)
                    .then(cliente => {
                        if(cliente.id != null){
                           this.clienteNome = cliente.nome;
                            console.log(cliente)
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
        sair(){
          window.localStorage.clear();
          this.$router.push({ name: 'loginEmpresa'});
        },
         grava() {
            var cliente = new Cliente();
            var residuo = new Residuo();
            var empresa = new Empresa();
            residuo.id = this.selected;
            this.deposito.residuo = residuo;
            this.deposito.empresa = this.empresaResiduo;
            this.deposito.cliente = this.cliente
            if(residuo.id == ''){
                this.mensagemResiduo = "Escolha um residuo!";
                this.okResiduo = true;
                return
            }else{
                this.okResiduo = false;
                console.log(this.deposito)
                this.service2.cadastra(this.deposito)
                .then(retorno => {
                    if(retorno.data.cliente.id == null){
                        this.mensagemCpf = 'Cliente não existe na base de dados.';
                        this.okCpf = true;
                    }else{
                        console.log(retorno);
                        this.deposito = new Deposito();
                        this.cliente = new Cliente();
                        this.mensagemCpf = '';
                        this.mensagemResiduo = '';
                        this.okCpf = false;
                        this.selected = '';
                    }
                }, err => console.log(err));
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