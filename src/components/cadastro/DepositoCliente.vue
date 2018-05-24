<template>
    <div>
      <meu-menu :rotas="routes"/>
        <div class = "page-header">
            <h1 class="centralizado">Deposito Cliente</h1>
            <h2 class="centralizado"></h2>
            <h2 v-if="deposito.id" class="centralizado">Alterando</h2>
            <h2 v-if="!deposito.id"class="centralizado">Incluindo</h2>
            <div class="container">
                <form @submit.prevent="grava()">
                <div class="form-group">
                    <label for="cnpj">CNPJ</label>
                    <input class="form-control" id="cnpj" type="number" max="14" required="true" autocomplete="off" v-model="cliente.cpf">
                </div>

                <div class="form-group">
                    <label for="quantidade">Quantidade</label>
                    <input class="form-control" id="quantidade" max="500" type="number" required="true" autocomplete="off" v-model="deposito.quantidade">
                </div>
                <div class="form-group">
                    <select  class="form-control" v-model="selected" id="residuos" name="residuos"  >
                        <option v-for="residuo of residuos" :value="residuo.id">{{residuo.descricao}}</option>
                    </select>
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
import Menu from '../shared/menu/Menu.vue';
   
    export default {

  components: {

    'meu-botao': Botao,
    'meu-menu' : Menu
  },
  data () {
    return {
      
      selected: '',
         residuos:{

          },
          cliente:{

          },
          deposito:{

          },
          empresaResiduo:{

          },
           routes : routes.filter(route => route.menu),
    }
  },
    created() {
        var jsonEmpresa = window.localStorage.getItem('empresa');
        this.empresaResiduo = JSON.parse(jsonEmpresa);
        this.service = new EmpresaResiduoService(this.$resource);
        this.service2 = new DepositoService(this.$resource);
        this.service.listaEmpresaResiduo(this.empresaResiduo.id)
       .then(empresa => {
         console.log(empresa)
         this.residuos = empresa.residuo
       }, err => console.log(err));
       

    },
    methods: {
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
            console.log(this.deposito);
            this.service2.cadastra(this.deposito)
            .then(() => {
                this.deposito = new Deposito();
            }, err => console.log(err));
         }
    }
}
</script>

<style>
 .centralizado {
    text-align: center;
  }
</style>