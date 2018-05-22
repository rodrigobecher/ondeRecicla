import loginEmpresa from './components/cadastro/loginEmpresa.vue';
import residuoEmpresa from './components/cadastro/ResiduoEmpresa.vue';
import deposito from './components/cadastro/DepositoCliente.vue';
import Home from './components/home/Home.vue';
import logout from './components/cadastro/Logout.vue'
export const routes = [
    {path: '', name:'home', component: Home, titulo:'Home', menu: true},
    {path: '/loginEmpresa', name: 'loginEmpresa', component: loginEmpresa, titulo:'Login Empresa', menu: true},
    {path: '/residuoEmpresa', name:'parametrizacaoEmpresa', component: residuoEmpresa, titulo:'Parametrizacao', menu: true},
    {path: '/deposito', name:'deposito', component: deposito, titulo:'Deposito', menu: true},
    {path: '/logout', component: logout, titulo:'logout', menu: true},
    {path: '*', component: Home, menu: false},
    {path: '*', component: residuoEmpresa, menu: false},
 
];
