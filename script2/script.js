
document.addEventListener('DOMContentLoaded', ()=> { //код, который будет обрабатываться после загрузки DOM

    //получаем форму search
    const search=document.querySelector('.search');
    const cardBtn=document.getElementById('cart');
    const wishlistBtn=document.getElementById('wishlist');

    const goodsWrapper=document.querySelector('.goods-wrapper');
    const cart=document.querySelector('.cart');

    //добавление карточек
    const createCardGoods=(id,title,price,img)=>{
        const card=document.createElement('div');
        card.className='card-wrapper col-12 col-md-6 col-lg-4 col-xl-3 pb-3';
        card.innerHTML=`<div class="card">
        <div class="card-img-wrapper">
            <img class="card-img-top" src="img/temp/${img}" alt="">
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

    goodsWrapper.append(createCardGoods(1,'Дартс',2000,'archer.jpg'));
    goodsWrapper.append(createCardGoods(2,'Фламинго',3000,'flamingo.jpg'));
    goodsWrapper.append(createCardGoods(3,'Носки',5000,'socks.jpg'));


    //открытие корзины
    const openCart=(event)=>{
        cart.style.display='flex';
            event.preventDefault();
    }

    //закрытие корзины (крестик или в другую область)
    const closeCart=(event)=>{
        const target=event.target;      
        if ((target===cart)||(target.className=='cart-close')||(event.code=='Escape')){
            cart.style.display='';
        }
    }
   

    //закрытие корзины при нажатии клавиши Esc
   document.addEventListener('keydown', closeCart);
     
    cardBtn.addEventListener('click',openCart);
    cart.addEventListener('click',closeCart);
    


});