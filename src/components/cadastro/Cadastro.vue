<template>
 
  <div>
    <meu-menu :rotas="routes"/>
    <h1 class="centralizado">Cadastro Empresa</h1>
    <h2 class="centralizado"></h2>
    
    <div class="container">
      <form @submit.prevent="grava()">
      <div class="form-group">
          <label for="nome">Nome</label>
          <input class="form-control" id="nome" required="true" autocomplete="off" v-model="empresa.nome">
        </div>

        <div class="form-group">
          <label for="endereco">Endereco</label>
          <input class="form-control" id="endereco" required="true" autocomplete="off" v-model="empresa.endereco">
        </div>
      
        <div class="form-group">
          <label for="cnpj">CNPJ</label>
          <input class="form-control" id="cnpj" required="true" autocomplete="off" v-model="empresa.cnpj">
        </div>
        <div class="form-group">
          <label for="url">URL Imagem</label>
          <input class="form-control" id="url" required="true" autocomplete="off" v-model="empresa.url">
        </div>

        <div class="form-group">
          <label for="login">Login</label>
          <input class="form-control" id="login" required="true" autocomplete="off" v-model="empresa.login">
        </div>

        <div class="form-group">
          <label for="senha">Senha</label>
          <input class="form-control" id="senha" required="true" autocomplete="off" v-model="empresa.senha">
        </div>
        <div class="form-group">
          <p>Residuos:</p>
        </div>
          <div class="form-group" v-for="residuo of residuos">               
                <div>        
                  <input class="form-control" type="checkbox" id="residuo" :checked="false" name="residuo" :value="residuo.id">{{residuo.descricao}}        
                </div> 
        </div>
        <div class="centralizado">
          <meu-botao rotulo="GRAVAR" tipo="submit"/>
          <router-link :to="{ name: 'home' }"><meu-botao rotulo="VOLTAR" tipo="button"/></router-link>
        </div>
  
      </form>
    </div>
  </div>
</template>

<script>

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import ImagemResponsiva from '../shared/imagem-responsiva/ImagemResponsiva.vue'
import Botao from '../shared/botao/Botao.vue';
import Empresa from '../../domain/empresa/Empresa';
import EmpresaService from '../../domain/empresa/EmpresaService';
import Residuo from '../../domain/residuo/Residuo';
import {routes} from '../../routes';
import ResiduoService from '../../domain/residuo/ResiduoService';
import Menu from '../shared/menu/Menu.vue';


export default {

  components: {

    'meu-botao': Botao,
    'meu-menu' : Menu
  },

  data(){
      return {
          empresa: new Empresa(),
          residuos:{

          },
          id: this.$route.params.id,
          routes : routes.filter(route => route.menu)
      }
  },

  methods: {

       grava() {
         this.empresa.residuo = [];
         var check = document.getElementsByName("residuo"); 
            for (var i=0;i<check.length;i++){ 
                if (check[i].checked == true){ 
                   this.empresa.residuo[i] = this.residuos[i];
                }  else {
                
                }
            }
          
          this.service.cadastra(this.empresa)
          .then(() =>{
            if(this.id) this.$router.push({ name: 'home'}); // Direciona para Home
            this.empresa = new Empresa()}, err => console.log(err));
         
        },
  },    
  created() {
    
    this.service = new EmpresaService(this.$resource);
    this.service2 = new ResiduoService(this.$resource);
    if(this.id){
        this.service.altera(this.id)
        .then(empresa =>{this.empresa = empresa}, err => console.log(err));
        this.service2.lista()
       .then(residuo => this.residuos = residuo, err => console.log(err));
     }else{
       this.service2.lista()
       .then(residuo => this.residuos = residuo, err => console.log(err));
     }
    }
  
}

</script>
<style scoped>

  .centralizado {
    text-align: center;
  }
  .controle {
    font-size: 1.2em;
    margin-bottom: 20px;

  }
  .controle label {
    display: block;
    font-weight: bold;
  }

 .controle label + input, .controle textarea, .p {
    width: 100%;
    font-size: inherit;
    border-radius: 5px
  }

  .centralizado {
    text-align: center;
  }

</style>