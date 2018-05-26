<template>

  <div>
    <meu-menu :rotas="routes"/>
    <h1 class="centralizado">Cadastro Residuo</h1>
    <h2 class="centralizado"></h2>
    <h2 v-if="residuo.id" class="centralizado">Alterando</h2>
    <h2 v-if="!residuo.id"class="centralizado">Incluindo</h2>
    <div class="container">
      <form @submit.prevent="grava()" id="form">
        <div class="form-group">
          <label for="descricao">Descrição</label>
          <input class="form-control" id="descricao" required="true" autocomplete="off" v-model="residuo.descricao">
        </div>

        <div class="form-group">
          <label for="unimed">Unidade de medida</label>
          <input class="form-control" id="unimed" required="true" autocomplete="off" v-model="residuo.unimed">
        </div>
        <div class="div-select">
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
  </div>
</template>

<script>
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import Botao from '../shared/botao/Botao.vue';
import Residuo from '../../domain/residuo/Residuo';
import Categoria from '../../domain/categoria/Categoria';
import ResiduoService from '../../domain/residuo/ResiduoService';
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
          residuo: new Residuo(),
          categorias: {

          },
          id: this.$route.params.id,
          routes : routes.filter(route => route.menu)
      }
  },

  methods: {

       grava() {
          var categoria = new Categoria();
          categoria = this.categorias[(document.getElementById("categoria").value -1)]
          this.residuo.categoria = categoria;
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
  .div-select {
    width:250px;  /* Tamanho final do select */
    overflow:hidden; /* Esconde o conteúdo que passar do tamanho especificado */
  }
  
  .div-select select {
      background: url(http://www.webcis.com.br/images/imagens-noticias/select/ico-seta-select.gif) no-repeat #354880;  /* Imagem de fundo (Seta) */
      background-position: 205px center;  /*Posição da imagem do background*/
      width: 270px; /* Tamanho do select, maior que o tamanho da div "div-select" */
      height:48px; /* altura do select, importante para que tenha a mesma altura em todo os navegadores */
      font-family:Arial, Helvetica, sans-serif; /* Fonte do Select */
      font-size:18px; /* Tamanho da Fonte */
      padding:13px 20px 13px 12px; /* Configurações de padding para posicionar o texto no campo */
      color:#fff; /* Cor da Fonte */
      text-indent: 0.01px; /* Remove seta padrão do FireFox */
      text-overflow: "";  /* Remove seta padrão do FireFox */     
  
  }
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