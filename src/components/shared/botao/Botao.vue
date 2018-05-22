<template>
    <button @click="disparaAcao()" class="btn btn-success" :class="estiloDoBotao" :type="tipo">{{ rotulo }}</button>
</template>

<script>
    
    import 'bootstrap/dist/css/bootstrap.css'
    import 'bootstrap-vue/dist/bootstrap-vue.css'
export default {
    props:{
        
        tipo: {
            required: true,
            type: String
        },

        rotulo: {

            required: true,
            type: String
        },
        confirmacao: Boolean,

        estilo: String
    },

    methods: {
        disparaAcao(){

            if(this.confirmacao){
                if(confirm('Confirma Operação?')){
                this.$emit('botaoAtivado');
                }
                return;
            }
            this.$emit('botaoAtivado');
            
        }
    },
    computed:{

        estiloDoBotao() {
            
            if(this.estilo == 'padrao' || !this.estilo) return 'botao-padrao';
            if(this.estilo == 'perigo') return 'botao-perigo';
        }
    }
}
</script>

<style scoped>
    .botao {
        display: inline-block;
        padding: 10px;
        border-radius: 3px;
        margin: 10px;
        font-size: 1.2em;
    }

    .botao-perigo {
        background: firebrick;
        color: white;
    }

    .botao-padrao {
        background: #354880;
        color: white;
    }
</style>