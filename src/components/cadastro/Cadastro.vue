<template>

  <div>
    <h1 class="centralizado">Cadastro Empresa</h1>
    <h2 class="centralizado"></h2>
    <h2 v-if="empresa.id" class="centralizado">Alterando</h2>
    <h2 v-if="!empresa.id"class="centralizado">Incluindo</h2>
    <form @submit.prevent="grava()">
      <div class="controle">
        <label for="nome">Nome</label>
        <input id="nome" autocomplete="off" v-model="empresa.nome">
      </div>

      <div class="controle">
        <label for="endereco">Endereco</label>
        <input id="endereco" autocomplete="off" v-model="empresa.endereco">
      </div>
    
      <div class="controle">
        <label for="cnpj">CNPJ</label>
        <input id="cnpj" autocomplete="off" v-model="empresa.cnpj">
      </div>

      <div class="controle">
        <label for="login">Login</label>
        <input id="login" autocomplete="off" v-model="empresa.login">
      </div>

      <div class="controle">
        <label for="senha">Senha</label>
        <input id="senha" autocomplete="off" v-model="empresa.senha">
      </div>
        <div class="controle" v-for="residuo of residuos">               
              <div>        
                <input type="checkbox" id="residuo" :checked="false" name="residuo" :value="residuo.id">{{residuo.descricao}}        
              </div> 
      </div>
      <div class="centralizado">
        <meu-botao rotulo="GRAVAR" tipo="submit"/>
        <router-link :to="{ name: 'home' }"><meu-botao rotulo="VOLTAR" tipo="button"/></router-link>
      </div>

    </form>
  </div>
</template>

<script>

import ImagemResponsiva from '../shared/imagem-responsiva/ImagemResponsiva.vue'
import Botao from '../shared/botao/Botao.vue';
import Empresa from '../../domain/empresa/Empresa';
import EmpresaService from '../../domain/empresa/EmpresaService';
import Residuo from '../../domain/residuo/Residuo';
import ResiduoService from '../../domain/residuo/ResiduoService';

export default {

  components: {

    'meu-botao': Botao
  },

  data(){
      return {
          empresa: new Empresa(),
          residuos:{

          },
          id: this.$route.params.id
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
          console.log(this.empresa)
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

 .controle label + input, .controle textarea {
    width: 100%;
    font-size: inherit;
    border-radius: 5px
  }

  .centralizado {
    text-align: center;
  }

</style>