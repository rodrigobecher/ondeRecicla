import Cadastro from './components/cadastro/Cadastro.vue';
import CadastroResiduo from './components/cadastro/CadastroResiduos.vue';
import CadastroCategoria from './components/cadastro/CadastroCategoria.vue'
import Home from './components/home/Home.vue';
export const routes = [
    {path: '', name:'home', component: Home, titulo:'Home', menu: true},
    {path: '/cadastroEmpresa', name: 'cadastro', component: Cadastro, titulo:'Cadastro', menu: true},
    {path: '/cadastroEmpresa/:id', name: 'altera', component: Cadastro, titulo:'Cadastro', menu: false},
    {path: '/cadastroResiduo', name: 'cadastroResiduo', component: CadastroResiduo, titulo:'Cadastro Residuo', menu: true},
    {path: '/cadastroResiduo/:id', name: 'alteraResiduo', component: CadastroResiduo, titulo:'Cadastro Residuo', menu: false},
    {path: '/cadastroCategoria', name: 'cadastroCategoria', component: CadastroCategoria, titulo:'Cadastro Categoria', menu: true},
    {path: '/cadastroCategoria/:id', name: 'alteraCategoria', component: CadastroCategoria, titulo:'Cadastro Categoria', menu: false},
    {path: '*', component: Home, menu: false}
];