import loginEmpresa from './components/cadastro/LoginEmpresa.vue';
import residuoEmpresa from './components/cadastro/ResiduoEmpresa.vue';
import deposito from './components/cadastro/DepositoCliente.vue';
import Home from './components/home/Home.vue';
import logout from './components/cadastro/Logout.vue'
import resgataPontuacao from './components/cadastro/ResgataPontuacao.vue';
export const routes = [
    {path: '', name:'home', component: Home, titulo:'Home', menu: true},
    
    {path: '/residuoEmpresa', name:'parametrizacaoEmpresa', component: residuoEmpresa, titulo:'Parametrização', menu: true},
    {path: '/deposito', name:'deposito', component: deposito, titulo:'Depósito', menu: true},
    {path: '/resgataPontuacao',  component: resgataPontuacao, titulo:'Resgatar Pontuação', menu: true},
    
    {path: '*', component: Home, menu: false},
    {path: '*', component: residuoEmpresa, menu: false},
 
];
