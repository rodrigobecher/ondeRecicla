<template>
  <div>
    <meu-menu :rotas="routes"/>
    <h1  class="centralizado">{{ titulo }}</h1>
    <p v-show="mensagem" class="centralizado">{{ mensagem }}</p>
     <tabela :empresas="empresas" v-on:remover="remove"/>   
  </div>
</template>

<script>

import Tabela from '../shared/table/Table.vue';
import {routes} from '../../routes';
import Botao from '../shared/botao/Botao.vue';
import transform from '../../directives/Transform';
import EmpresaService from '../../domain/empresa/EmpresaService';
import Menu from '../shared/menu/Menu.vue';
export default {

  components: {
    'tabela': Tabela,
    'meu-botao' : Botao,
    'meu-menu' : Menu
  },

  directives: {

    'meu-transform' : transform
  },
  
    data() {
      return {
        titulo: 'Empresas Onde Coleta',
        empresas:[],
        filtro: '',
        mensagem: '',
         routes : routes.filter(route => route.menu)
        
      }
    },

    methods: {
        remove(empresa) {
            this.service = new EmpresaService(this.$resource);
            console.log(empresa);
            this.service.apaga(empresa.id)
            .then(() => { 
              let indice = this.empresas.indexOf(empresa);
              this.empesas = this.empresas.splice(indice, 1);
              this.mensagem = 'Empresa Removida com Sucesso';
              }, err => {
              console.log(err);
              this.mensagem = 'Não foi possível remover a empresa.';
            });
        },
    },
    
   created(){
      this.service = new EmpresaService(this.$resource);
      this.service.lista()
      .then(empresas => {
        this.empresas = empresas
        console.log(this.empresas)
      }, err => console.log(err)); 
      
    }
    
}
</script>

<style>
  .centralizado {
    text-align: center;
  }
  

  .lista-fotos{
    list-style: none;
  }
  .lista-fotos .lista-fotos-item{
    display: inline-block;
  }
  
  .filtro {
    display: block;
    width: 100%;
  }
</style>
