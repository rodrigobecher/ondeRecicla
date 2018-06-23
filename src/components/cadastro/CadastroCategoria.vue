<template>

  <div>
    <meu-menu :rotas="routes"/>
    <h1 class="centralizado">Cadastro Categoria</h1>
    <h2 class="centralizado"></h2>
    
    <div class="container">
    <form @submit.prevent="grava()">
      <div class="form-group">
        <label for="descricao">Descrição</label>
        <input class="form-control" id="descricao" autocomplete="off" v-model="categoria.descricao">
      </div>
      <div class="form-group">
        <label for="url">URL Imagem</label>
        <input class="form-control" id="url" autocomplete="off" v-model="categoria.url">
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

import Botao from '../shared/botao/Botao.vue';
import Categoria from '../../domain/categoria/Categoria';
import CategoriaService from '../../domain/categoria/CategoriaService';
import {routes} from '../../routes';
import Menu from '../shared/menu/Menu.vue';
export default {

  components: {

    'meu-botao': Botao,
    'meu-menu' : Menu
  },

  data(){
      return {
          categoria: new Categoria(),
          id: this.$route.params.id,
          routes : routes.filter(route => route.menu)
      }
  },

  methods: {

       grava() {
          this.service.cadastra(this.categoria)
          .then(() =>{
            if(this.id) this.$router.push({ name: 'home'}); // Direciona para Home
            this.categoria = new Categoria()}, err => console.log(err));
         
        },
  },    
  created() {
    
    this.service = new CategoriaService(this.$resource);
    if(this.id){
        this.service.altera(this.id)
        .then(categoria => this.categoria = categoria, err => console.log(err));
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