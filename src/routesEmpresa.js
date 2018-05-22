import loginEmpresa from './components/cadastro/loginEmpresa.vue';
import residuoEmpresa from './components/cadastro/ResiduoEmpresa.vue';
import depositoCliente from './components/cadastro/DepositoCliente.vue';
import Home from './components/home/Home.vue';
import logout from './components/cadastro/Logout.vue'
export const routes = [
    {path: '', name:'home', component: Home, titulo:'Home', menu: true},
    {path: '/loginEmpresa', name: 'loginEmpresa', component: loginEmpresa, titulo:'Login Empresa', menu: true},
    {path: '/residuoEmpresa', name:'parametrizacaoEmpresa', component: residuoEmpresa, titulo:'Parametrizacao', menu: true},
    {path: '/depositoCliente', name:'deposito', component: depositoCliente, titulo:'Deposito', menu: true},
    {path: '/logout', component: logout, titulo:'logout', menu: true},
    {path: '*', component: Home, menu: false},
    {path: '*', component: residuoEmpresa, menu: false},
 
];
