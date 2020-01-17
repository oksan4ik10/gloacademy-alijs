
document.addEventListener('DOMContentLoaded', ()=> { //код, который будет обрабатываться после загрузки DOM

    //получаем форму search
    const search=document.querySelector('.search');
    const cardBtn=document.getElementById('cart');
    const wishlistBtn=document.getElementById('wishlist');
    const goodsWrapper=document.querySelector('.goods-wrapper');
    const cart=document.querySelector('.cart');
    const category=document.querySelector('.category');
    const card=document.querySelector('.card')
    const spinner=document.querySelector('#spinner');

    spinner.style.display='none';

  
    


    //добавление карточек
    const createCardGoods=(id,title,price,img)=>{
        const card=document.createElement('div');
        card.className='card-wrapper col-12 col-md-6 col-lg-4 col-xl-3 pb-3';
        card.innerHTML=`<div class="card" style="display:''">
        <div class="card-img-wrapper">
            <img class="card-img-top" src="${img}" alt="">
            <button class="card-add-wishlist"
            data-goods-id=""${id}></button>
        </div>
        <div class="card-body justify-content-between">
            <a href="#" class="card-title">${title}</a>
            <div class="card-price">${price}</div>
            <div>
                <button class="card-add-cart"
                data-goods-id=""${id}>Добавить в корзину</button>
            </div>
        </div>
    </div>`;
        return card;
    }



 


    // goodsWrapper.append(createCardGoods(1,'Дартс',2000,'archer.jpg'));
    // goodsWrapper.append(createCardGoods(2,'Фламинго',3000,'flamingo.jpg'));
    // goodsWrapper.append(createCardGoods(3,'Носки',5000,'socks.jpg'));


    //открытие корзины
    const openCart=(event)=>{
        cart.style.display='flex';
        event.preventDefault();//закрыть переход по ссылкам
        //закрытие корзины при нажатии клавиши Esc
        document.addEventListener('keyup', closeCart);
    }

    //закрытие корзины (крестик или в другую область или на клавишу Esc)
    const closeCart=(event)=>{
        const target=event.target;      
        if ((target===cart)||(target.className=='cart-close')||(event.code=='Escape')){
            cart.style.display='';
            document.removeEventListener('keyup',closeCart);
        }

        
    }
   


    //формирование списков товаров из БД
    const renderCard=(item)=>{
        spinner.style.display='none';
        goodsWrapper.textContent='';
        item.forEach(({id,title,price,imgMin}) => {
            goodsWrapper.append(createCardGoods(id,title,price,imgMin));
        });
    }

    //рандомные карточки
    const randomSort=(item)=>{
        return item.sort(()=> Math.random()-0.5);
    }

    //пока загружаются данные
    const loader=()=>{
     spinner.style.display='';
    }

     //функция, которая получает товары, на вход подается функция формирования товаров из БД
    const getGoods=(handler,filter,one)=>{
        one();
        //api fetch - делает запрос на сервер и возвращает обратно promise (ожидание/выполнено/не выполнено), .then ожидает promise
       fetch('db/db.json')
            // .then(goods=>console.log(goods))
            .then(response=> response.json())
            .then(filter)
            .then(handler)
            
        }
     
        //выбор товаров из конкретной категории в меню
    const choiseCategory=(event)=>{
        event.preventDefault();
        const target=event.target;
        if (target.classList.contains('category-item')){
            getGoods(renderCard,(goods)=>goods.filter( 
                (item)=>item.category.includes(target.dataset.category)
                ),loader
            )
        };
    }


    
    cardBtn.addEventListener('click',openCart);
    cart.addEventListener('click',closeCart);
    
    category.addEventListener('click',choiseCategory);
    
    
    
    getGoods(renderCard,randomSort,loader);

});