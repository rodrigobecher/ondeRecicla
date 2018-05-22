<template>

    <nav>
      <ul >
        <li v-for="rota in rotas">
            <router-link :to="rota.path ? rota.path : '/'">{{rota.titulo}}</router-link>
        </li>
               
      </ul>

    </nav>
</template>


<script>
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
export default{
     
     props: {

         usuario: '',
      
        rotas: {
         type: Array,
         required: true
      } 
    }
}
</script>

<style>

nav {
    border-radius: 10px;
    margin-bottom: 50px
}

ul {
    border-radius: 10px;
    list-style-type: none;
    margin: 0;
    padding: 0;
    overflow: hidden;
    background-color: #4CAF50;
}

li {
    border-radius: 10px;
    float: left;
}

li a {
    border-radius: 10px;
    display: block;
    color: white;
    text-align: center;
    padding: 14px 16px;
    text-decoration: none;
}

li a:hover {
    color: white;
    text-decoration: none;
    border-radius: 10px;
    background-color: #4CAF50;
}
</style>