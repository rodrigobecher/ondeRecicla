export default{


    bind(el, binding, vnode) {
        
        let current = 0;
        let retorna = 0;
        el.addEventListener('dblclick', function(){
            let incremento = binding.value || 90;
            let efeito;
            
            if(!binding.arg || binding.arg == 'rotate'){

                if(binding.modifiers.reverse){
                    current -= incremento;    
                }else{
                    current += incremento;    
                }

                efeito = `rotate(${current}deg`;

            } else if(binding.arg == "scale"){
                efeito = `scale(${incremento})`;      
            }

            if(retorna != 0){
                efeito = `scale(${retorna})`;
                retorna =0;
            }else{
                efeito = `scale(${incremento})`;
                retorna =1; 
            }
            
            el.style.transform = efeito;
            
            if(binding.modifiers.animate)el.style.transition = 'transform 0.5s';
            
        })
    }
};