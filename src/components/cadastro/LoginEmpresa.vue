<template>
    <div class="container">
        <h1 class="centralizado">Loguin Empresa</h1>
        <h2 class="centralizado"></h2>

        <form @submit.prevent="logar()" id="form">
            <div class="controle">
                <label for="email">Email</label>
                <input id="email" required="true" autocomplete="off" v-model="empresa.login">
            </div>

            <div class="controle">
                <label for="senha">Senha</label>
                <input id="senha" type="password" required="true" autocomplete="off" v-model="empresa.senha">
            </div>
            <div class="centralizado">
                <meu-botao rotulo="Entrar" tipo="submit"/>
            </div>
        </form>
    </div>
</template>

<script>
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import Botao from '../shared/botao/Botao.vue'
import EmpresaLoginService from '../../domain/empresa/EmpresaLoginService';
import axios from 'axios';
import Empresa from '../../domain/empresa/Empresa';
    export default {

    data (){
        return {
            empresa:{

            },
            url: 'https://frozen-spire-43188.herokuapp.com'
        }
    },
    components: {

        'meu-botao': Botao
    
    },
    methods:{
            logar(){  
                axios.post(this.url+'/logar', this.empresa)
                .then(resposta => {         
                    this.empresa = resposta.data;
                    if(this.empresa == ""){
                        alert("Usuário inválido!")
                    }else{
                        this.empresa.senha = "";
                        this.empresa.login = "";
                        var jsonAux = JSON.stringify(this.empresa);
                        window.localStorage.setItem('empresa', jsonAux);
                        window.location.href = "http://localhost:8080/residuoEmpresa";
                    }
                }); 
                                            
            },

        },
    created(){
        this.empresa = new Empresa();
        this.service = new EmpresaLoginService(this.$resource);
        var jsonEmpresa = window.localStorage.getItem('empresa');
        if(jsonEmpresa != null){
            this.empresa = JSON.parse(jsonEmpresa);
        }
        if(this.empresa.id != undefined){
            window.location.href = "http://localhost:8080/residuoEmpresa";
        }else{
            
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
    border-radius: 5px;
    float: center;
  }

</style>