<template>
    <div>
      <table class="table">
          <thead>
            <tr>
              <th>Nome</th>
              <th>CNPJ</th>
              <th>Endereco</th>
              <th>Alterar</th>
              <th>Remover</th>
            </tr>
          </thead>  
          <tbody v-for="empresa of empresas">
             <tr>
                    <td>{{empresa.nome}}</td>
                    <td>{{empresa.cnpj}}</td>
                    <td>{{empresa.endereco}}</td>
                    <td><router-link :to="{ name : 'altera', params: { id: empresa.id}}"><meu-botao rotulo="Alterar" tipo="button"/></router-link></td>
                    <td> <meu-botao rotulo="Remover" tipo="button" @botaoAtivado="remove(empresa)"></meu-botao></td>
                </tr>
                
         </tbody>
        </table>
    </div>
</template>

<script>

import Botao from '../botao/Botao.vue';
import EmpresaService from '../../../domain/empresa/EmpresaService';
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
export default {

      components: {

    'meu-botao': Botao
  },
    props:{
       empresas: {
         type: Array,
         required: true
      } 
    },

    data (){
        return{
            visivel: true,
           
        }
        
    },  
    methods:{

        remove(empresa){
            this.$emit('remover', empresa);
        }
    }
     
}
</script>
<style scoped>
</style>