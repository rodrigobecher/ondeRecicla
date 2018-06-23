<template >
    <div>
        <meu-menu :rotas="roteado"/>
    
     <div class="container">
        <div class="card card-container">
            <!-- <img class="profile-img-card" src="//lh3.googleusercontent.com/-6V8xOA6M7BA/AAAAAAAAAAI/AAAAAAAAAAA/rzlHcD0KYwo/photo.jpg?sz=120" alt="" /> -->
            <img id="profile-img" class="profile-img-card" src="https://image.ibb.co/matJX8/logo_amazon.png" />
            <p id="profile-name" class="profile-name-card"></p>
            <form @submit.prevent="logar()" id="form" class="form-signin">
                <span id="reauth-email" class="reauth-email"></span>
                <input type="text" id="email" autocomplete="off" v-model="empresa.login" class="form-control" placeholder="Email" required autofocus>
                <input type="password" id="senha" autocomplete="off" v-model="empresa.senha" class="form-control" placeholder="Senha" required>
                <div id="remember" class="checkbox">
                    
                </div>
                 <meu-botao rotulo="Entrar" tipo="submit"/>
            </form><!-- /form -->
            <a href="#" class="forgot-password">
                Esqueceu a senha?
            </a>
        </div><!-- /card-container -->
    </div><!-- /container -->
    </div>
</template>

<script>
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import Botao from '../shared/botao/Botao.vue'
import EmpresaLoginService from '../../domain/empresa/EmpresaLoginService';
import axios from 'axios';
import Empresa from '../../domain/empresa/Empresa';
import {routes} from '../../routesEmpresa';
import Menu from '../shared/menu/Menu.vue';
    export default {

    data (){
        return {
            empresa:{

            },
            url: 'https://frozen-spire-43188.herokuapp.com',
           // url: 'http://localhost:8081',
            routes : routes.filter(route => route.menu),
            roteado : []
        }
    },
    components: {

        'meu-botao': Botao,
        'meu-menu' : Menu
    
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
                        this.$router.push({ name: 'residuoEmpresa'})
                        
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
            this.roteado = routes;
            
        }else{
             routes.forEach(route => {
                if(route.name == "home"){
                    this.roteado.push(route);
                }
                if(route.name == "loginEmpresa"){
                    this.roteado.push(route);
                }
        });
       
        }

       
        if(this.empresa.id != undefined){
            this.$router.push({ name: 'deposito'})
        }else{
            
        }
    }

    }
</script>

<style scoped>
    .centralizado {
    text-align: center;
  }
  
body, html {
    height: 100%;
    background-repeat: no-repeat;
    background-image: linear-gradient(rgb(104, 145, 162), rgb(12, 97, 33));
}

.fundo {
    background-color: gainsboro
}
.card-container.card {
    max-width: 350px;
    padding: 40px 40px;
}

.btn {
    font-weight: 700;
    height: 36px;
    -moz-user-select: none;
    -webkit-user-select: none;
    user-select: none;
    cursor: default;
}

/*
 * Card component
 */
.card {
    background-color: #e2f0e2;
    /* just in case there no content*/
    padding: 20px 25px 30px;
    margin: 0 auto 25px;
    margin-top: 50px;
    /* shadows and rounded borders */
    -moz-border-radius: 2px;
    -webkit-border-radius: 2px;
    border-radius: 2px;
    -moz-box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
    -webkit-box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
    box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
}

.profile-img-card {
    width: 96px;
    height: 96px;
    margin: 0 auto 10px;
    display: block;
    -moz-border-radius: 50%;
    -webkit-border-radius: 50%;
    border-radius: 50%;
}

/*
 * Form styles
 */
.profile-name-card {
    font-size: 16px;
    font-weight: bold;
    text-align: center;
    margin: 10px 0 0;
    min-height: 1em;
}

.reauth-email {
    display: block;
    color: #404040;
    line-height: 2;
    margin-bottom: 10px;
    font-size: 14px;
    text-align: center;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
}

.form-signin #inputEmail,
.form-signin #inputPassword {
    direction: ltr;
    height: 44px;
    font-size: 16px;
}

.form-signin input[type=email],
.form-signin input[type=password],
.form-signin input[type=text],
.form-signin button {
    width: 100%;
    display: block;
    margin-bottom: 10px;
    z-index: 1;
    position: relative;
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
}

.form-signin .form-control:focus {
    border-color: rgb(104, 145, 162);
    outline: 0;
    -webkit-box-shadow: inset 0 1px 1px rgba(0,0,0,.075),0 0 8px rgb(104, 145, 162);
    box-shadow: inset 0 1px 1px rgba(0,0,0,.075),0 0 8px rgb(104, 145, 162);
}

.btn.btn-signin {
    /*background-color: #4d90fe; */
    background-color: rgb(104, 145, 162);
    /* background-color: linear-gradient(rgb(104, 145, 162), rgb(12, 97, 33));*/
    padding: 0px;
    font-weight: 700;
    font-size: 14px;
    height: 36px;
    -moz-border-radius: 3px;
    -webkit-border-radius: 3px;
    border-radius: 3px;
    border: none;
    -o-transition: all 0.218s;
    -moz-transition: all 0.218s;
    -webkit-transition: all 0.218s;
    transition: all 0.218s;
}

.btn.btn-signin:hover,
.btn.btn-signin:active,
.btn.btn-signin:focus {
    background-color: rgb(12, 97, 33);
}

.forgot-password {
    color: black;
}

.forgot-password:hover,
.forgot-password:active,
.forgot-password:focus{
    color: rgb(12, 97, 33);
}
</style>