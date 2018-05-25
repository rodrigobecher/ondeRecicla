<template>
    <div>
      <meu-menu :rotas="routes"/>
        <h1 class="centralizado">Parametrização Pontuacão Empresa</h1>
         <h2 class="centralizado"></h2>
        <h2 v-if="empresaResiduoPontuacao.id" class="centralizado">Alterando</h2>
        <h2 v-if="!empresaResiduoPontuacao.id"class="centralizado">Incluindo</h2>
        <div class="container">
        <form @submit.prevent="grava()">
          <div class="form-group">
              <label for="ponto">Ponto</label>
              <input class="form-control" id="ponto" required="true" autocomplete="off" v-model="empresaResiduoPontuacao.ponto">
          </div>

          <div class="form-group">
              <label for="qtdeCondicao">Quantidade condição</label>
              <input class="form-control" id="qtdeCondicao" required="true" autocomplete="off" v-model="empresaResiduoPontuacao.qtdeCondicao">
          </div>
          <div class="form-group">
              <select class="form-control" v-model="selected" id="residuos" name="residuos"  >
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
</template>

<script>

import {routes} from '../../routesEmpresa';
import Residuo from '../../domain/residuo/Residuo';
import EmpresaResiduoService from '../../domain/empresa/EmpresaResiduoService';
import Botao from '../shared/botao/Botao.vue';
import EmpresaResiduoPontuacao from '../../domain/empresa/EmpresaResiduoPontuacao';
import ResiduoEmpresaService from '../../domain/empresa/ResiduoEmpresaService';
import Empresa from '../../domain/empresa/Empresa';
import Menu from '../shared/menu/Menu.vue';

export default {

  components: {

    'meu-botao': Botao,
    'meu-menu' : Menu
  },
  data () {
    return {
       routes : routes.filter(route => route.menu),
      selected: '',
         residuos:{

          },
          empresaResiduoPontuacao:{

          },
          empresa:{

          },
          empresaResiduo:{

          }
    }
  },
    created() {
        var jsonEmpresa = window.localStorage.getItem('empresa');
        this.empresaResiduo = JSON.parse(jsonEmpresa);
        this.service = new EmpresaResiduoService(this.$resource);
        this.service2 = new ResiduoEmpresaService(this.$resource);
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
            var residuo = new Residuo();
            var empresa = new Empresa();
            residuo.id = this.selected;
            empresa = this.empresaResiduo;
            this.empresaResiduoPontuacao.residuo = residuo;
            this.empresaResiduoPontuacao.empresa = empresa;
            console.log(this.empresaResiduoPontuacao)
            this.service2.cadastra(this.empresaResiduoPontuacao)
          .then(() =>{
            this.empresaResiduoPontuacao = new EmpresaResiduoPontuacao()
            this.selected = '';
            }, err => console.log(err));
         }
    }
}
</script>

<style scoped>

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

 .controle label + input, .controle textarea, .p {
    width: 100%;
    font-size: inherit;
    border-radius: 5px
  }

  .centralizado {
    text-align: center;
  }


</style>