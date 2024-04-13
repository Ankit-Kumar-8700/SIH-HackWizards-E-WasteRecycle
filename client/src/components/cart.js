import React, { useEffect } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import "./cart.css";
import {useSelector ,useDispatch} from 'react-redux';
import { useNavigate } from 'react-router-dom';


const Card = ({img,price,title,qty,flag,id,handleClick}) => {

      return (
            <Paper sx={{p:2}}>
                <div className='flex gap-4 items-center'>
                    <div className='cart-img-container' onClick={() => handleClick(id)}>
                        <img className='h-[100px] w-[100px] object-cover' src={img} alt="" />
                    </div>
                    <div className='flex flex-col justify-between'>
                        <div><Typography variant='subtitle1'>{title}</Typography></div>
                        <div><Typography variant='subtitle2'>{`${qty} x ₹${price}`}</Typography></div>
                    </div>
                </div>
            </Paper>
        )
}

const Cart = ({title,flag,cart}) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
         dispatch(getTotal());
    },[cart,dispatch]);

    const total = useSelector((state) => state.user.totalPrice);    

    const handleClick = (id) => {
        let tempCart = [...cart];
        let tempPrice = total;
        dispatch(removeFromCart({id}));
          let product = tempCart.find((p) => p._id === id);
          tempCart = tempCart.filter((product) => product._id !== id);
          tempPrice -= product.price;
          dispatch(modifyCart({ products: tempCart, totalPrice: tempPrice }));
    }
    

    const user  = JSON.parse(localStorage.getItem('user'));
    

    const closeCart = (e) => {
            e.preventDefault();
            const el  = document.querySelector('.cart');
            // console.log(el);
            el.classList.remove('showCart');
            el.classList.add('hidecart');
    }

    const procedPayment = async() => {
           alert('payment initialized');
            localStorage.setItem('cart', JSON.stringify(cart));
            localStorage.setItem('totalPrice', total);
            const token = localStorage.getItem('profile');
            const resp = await fetch("https://shopholic-central.vercel.app/api/v1/user/checkout",{
                method:'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization':`Bearer ${token}` 
                  },
                body:JSON.stringify(cart),
            })
            const {url} = await resp.json();
            window.location.assign(`${url}`);
            //if url is success then save cart to db
    }

  return (
    <div className='cart fixed p-12 h-screen gap-2 hidecart ' style = {{transition:"0.4s all ease-in-out"}}>
            <div className='flex justify-between items-center'>
                <h2 >Your {title}</h2>
                <CloseIcon className='cursor-pointer' onClick = {(e) => closeCart(e)} />
            </div>

            <div className='flex flex-col gap-4 overflow-scroll h-[450px]'>
                    {cart && cart.length>0 ?  cart.map(({name,img,price,qty,_id}) => <Card key={_id} img = {img} title={name} price={price} qty={qty} id={_id} handleClick={handleClick}  />)
                    : !user ?  <h2>Sign in to view your cart</h2> 
                    : <h2>Your Cart is empty</h2>
                    }   
            </div>

            <div className='flex flex-col gap-3'>
                        <h4>{`Total : ₹${total}`}</h4>
                        <div className='flex gap-2 justify-start'>
                            {/* <button className='p-2 bg-black rounded-[10px] text-white'>View Cart</button> */}
                            <button className='p-2 bg-black rounded-[10px] text-white cursor-pointer' disabled={cart?.length<=0}  onClick={() => procedPayment()} >Checkout</button>
                        </div>
            </div>

    </div>
  )
}

export default Cart