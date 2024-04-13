import { useEffect, useState } from "react";
import { createPickup } from "../redux/userSlice";
import {useDispatch} from "react-redux";
import {models} from "../constants";


// import Chatbot from "../Components/Chatbot";
// import recycle from '../Components/recycle.png'

const Schedulepick = () => {


  const dispatch = useDispatch();


  const [query,setQuery]=useState("");
  const [itemList,setItemList]=useState([]);
  const [products,setproducts]=useState([]);
 
  useEffect(()=>{
    if(query.length===0) return;
    const filteredItems = models.filter(item => item.model.toLowerCase().startsWith(query.toLowerCase()));
    setItemList(filteredItems);
  },[query])

  const handleItem=((product)=>{
    setQuery("");
    console.log(product);
    const {model} = product;
    const isProduct = products.find((p) => p.model === model);
    if(isProduct){
      isProduct.qty += 1;
    }
    else{ 
      setproducts([...products,{...product,qty : 1}]);
    }
  })
  const deleteItem = (i)=>{
    let newArray = [...products];
    newArray.splice(i, 1);
    setproducts(newArray);
  }

  const subtractvalue=(i)=>{
    let newArray = [...products];
    newArray[i].qty--;
    if(newArray[i].qty===0){
      newArray=deleteItem(i);
      return;
    }
    setproducts(newArray);

  }
  const additem = (i)=>{
    let newArray = [...products];
    newArray[i].qty++;
    setproducts(newArray);
  }



  const handlePickup = (e) => {
      e.preventDefault();
      dispatch(createPickup(products));
      setproducts([]);
  }




  return (
    <div className="bg-gradient-to-r from-secondary to-lightBg  flex-1  relative flex flex-col justify-center items-center">
        <h1>Schedule a pickup</h1>
      <div className=" w-3/4  mx-auto mt-8 p-4">
      <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="flex items-end gap-3 mb-4">
          <div className="relative w-full">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="search">
            Enter Model name
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="search"
            type="text"
            value={query}
            onChange={(e)=>setQuery(e.target.value)}
            placeholder="Enter your model name here"
          />
          <div className={`absolute bg-white border-2 shadow w-full ${query.length>0?"":"hidden"}`}>
            <ul>
              {itemList.map((element,index)=>{
                return <li className={`cursor-pointer p-1 ${index%2===0?"bg-gray-200":"bg-white"}`} key={index} onClick={()=>handleItem(element)}>
                  {element["model"]}
                </li>
              })}
            </ul>
          </div>
          </div>
        </div>

        <div>
          {products.map((product,id)=>{
            return <div key={id} className="flex justify-between my-4 items-center">
              <p>{id+1}.</p>
              <p>{product.model}</p>
              <div className="flex gap-2">
                  <div className="flex gap-1 items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" onClick={()=>{subtractvalue(id)}} class="w-6 h-6 cursor-pointer">
  <path stroke-linecap="round" stroke-linejoin="round" d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
</svg>
                    <span>{product.qty}</span>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" onClick = {()=>{additem(id)}}class="w-6 h-6 cursor-pointer">
  <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
</svg>

                    </div>
                    <button>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" onClick={()=>{deleteItem(id)}} class="w-6 h-6  text-red-700 cursor-pointer">
  <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
</svg>

                    </button>
              </div>
            </div>
          })}
        </div>


        {/* <div className="flex items-center justify-between"> */}
          
          <button
            className="bg-darkGreen hover:bg-secondary text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
            onClick={(e) => handlePickup(e)}
          >
            Submit
          </button>
        {/* </div> */}
      </form>
    </div>
    {/* <Chatbot /> */}
    </div>
  );
};
export default Schedulepick;
