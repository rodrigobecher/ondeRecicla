<template>

  <div>
    <h1 class="centralizado">Cadastro Residuo</h1>
    <h2 class="centralizado"></h2>
    <h2 v-if="residuo.id" class="centralizado">Alterando</h2>
    <h2 v-if="!residuo.id"class="centralizado">Incluindo</h2>
    <form @submit.prevent="grava()" id="form">
      <div class="controle">
        <label for="descricao">Descrição</label>
        <input id="descricao" autocomplete="off" v-model="residuo.descricao">
      </div>

      <div class="controle">
        <label for="unimed">Unidade de medida</label>
        <input id="unimed" autocomplete="off" v-model="residuo.unimed">
      </div>
      <div class="controle">
          <select id="categoria" name="categoria"  >
            <option v-for="categoria of categorias" :value="categoria.id">{{categoria.descricao}}</option>
          </select>
      </div>
    
      <div class="centralizado">
        <meu-botao rotulo="GRAVAR" tipo="submit"/>
        <router-link :to="{ name: 'home' }"><meu-botao rotulo="VOLTAR" tipo="button"/></router-link>
      </div>

    </form>
  </div>
</template>

<script>

import Botao from '../shared/botao/Botao.vue';
import Residuo from '../../domain/residuo/Residuo';
import Categoria from '../../domain/categoria/Categoria';
import ResiduoService from '../../domain/residuo/ResiduoService';
import CategoriaService from '../../domain/categoria/CategoriaService';

export default {

  components: {

    'meu-botao': Botao
  },

  data(){
      return {
          residuo: new Residuo(),
          categorias: {

          },
          id: this.$route.params.id
      }
  },

  methods: {

       grava() {
          var categoria = new Categoria();
          categoria = this.categorias[(document.getElementById("categoria").value -1)]
          this.residuo.categoria = categoria;
          console.log(this.residuo);
          this.service.cadastra(this.residuo)
          .then(() =>{
            if(this.id) this.$router.push({ name: 'home'}); // Direciona para Home
            this.residuo = new Residuo()}, err => console.log(err));
         
        },
  },    
  created() {
    
    this.service = new ResiduoService(this.$resource);
    this.service2 = new CategoriaService(this.$resource);
    if(this.id){
        this.service.altera(this.id)
        .then(residuo => this.residuo = residuo, err => console.log(err));
        
     }else{
       this.service2.lista()
       .then(categorias => this.categorias = categorias, err => console.log(err));
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