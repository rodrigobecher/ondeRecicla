<template>
    <nav>
      <ul>
        <li v-for="rota in rotas">
        <router-link :to="rota.path ? rota.path : '/'">{{rota.titulo}}</router-link>
        </li>
        
      </ul>
  
    </nav>
</template>

<script>

export default{
     
     props: {
      
        rotas: {
         type: Array,
         required: true
      } 
    }
}
</script>

<style>
ul {
    list-style-type: none;
    margin: 0;
    padding: 0;
    overflow: hidden;
    background-color: #4CAF50;
}

li {
    float: left;
}

li a {
    display: block;
    color: white;
    text-align: center;
    padding: 14px 16px;
    text-decoration: none;
}

li a:hover {
    background-color: #4CAF50;
}
</style>