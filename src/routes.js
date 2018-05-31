import Cadastro from './components/cadastro/Cadastro.vue';
import CadastroResiduo from './components/cadastro/CadastroResiduos.vue';
import CadastroCategoria from './components/cadastro/CadastroCategoria.vue';
import loginEmpresa from './components/cadastro/LoginEmpresa.vue';
import residuoEmpresa from './components/cadastro/ResiduoEmpresa.vue';
import deposito from './components/cadastro/DepositoCliente.vue';
import resgataPontuacao from './components/cadastro/ResgataPontuacao.vue';
import logout from './components/cadastro/Logout.vue'
import Home from './components/home/Home.vue';
export const routes = [
    {path: '', name:'home', component: Home, titulo:'Home', menu: true},
    {path: '/cadastroEmpresa', name: 'cadastro', component: Cadastro, titulo:'Cadastro', menu: true},
    {path: '/cadastroEmpresa/:id', name: 'altera', component: Cadastro, titulo:'Cadastro', menu: false},
    {path: '/cadastroResiduo', name: 'cadastroResiduo', component: CadastroResiduo, titulo:'Cadastro Resíduo', menu: true},
    {path: '/cadastroResiduo/:id', name: 'alteraResiduo', component: CadastroResiduo, titulo:'Cadastro Resíduo', menu: false},
    {path: '/cadastroCategoria', name: 'cadastroCategoria', component: CadastroCategoria, titulo:'Cadastro Categoria', menu: true},
    {path: '/cadastroCategoria/:id', name: 'alteraCategoria', component: CadastroCategoria, titulo:'Cadastro Categoria', menu: false},
    {path: '/loginEmpresa', name: 'loginEmpresa', component: loginEmpresa, titulo:'Login Empresa', menu: true},
    {path: '/residuoEmpresa', name:'residuoEmpresa', component: residuoEmpresa, titulo:'Parametrização'},
    {path: '/deposito', name:'deposito',  component: deposito, titulo:'Deposito'},
    {path: '/resgataPontuacao',  component: resgataPontuacao, titulo:'Resgatar Pontuação'},
    {path: '/logout', component: logout, titulo:'logout'},
    {path: '*', component: Home, menu: false},
    {path: '*', component: residuoEmpresa, menu: false}
];