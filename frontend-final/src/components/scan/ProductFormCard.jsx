import {useEffect, useState} from "react";

import API from "../../services/api";

function ProductFormCard({product}){


const [form,setForm]=useState({

productName:"",
category:"",
quantity:1,
price:"",
purchaseDate:"",
expiryDate:"",
image:null

});


useEffect(()=>{

if(product){
setForm({

productName: product?.name ?? "",
category:"",
quantity:1,
price: product?.price ?? "",
purchaseDate:"",
expiryDate:"",
image:null



})

}

},[product]);



const handleChange=(e)=>{

setForm({

...form,

[e.target.name]:e.target.value

})

}

const handleSubmit = async () => {

  try {

const formData = new FormData();

formData.append("productName", form.productName);
formData.append("category", form.category);
formData.append("quantity", form.quantity);
formData.append("price", form.price);
formData.append("purchaseDate", form.purchaseDate);
formData.append("expiryDate", form.expiryDate);

if(form.image){
  formData.append("image", form.image);
}

 

    const res = await API.post(
      "/inventory",
      formData,
      {
        headers:{
          "Content-Type":"multipart/form-data"
        }
      }
    );



    console.log(res.data);


// generate notifications
// await API.post("/notifications/check");
const notificationResponse = await API.post("/notifications/check");

console.log(
  "Notification API:",
  notificationResponse.data
);
    alert("Product Added To Inventory");


  } catch(error){
  console.log(error.response?.data || error.message);

  alert(
    error.response?.data?.message || "Failed to add product"
  );
}
  

};
return (

<div className="mt-8 bg-white p-8 rounded-3xl shadow">


<h2 className="text-2xl font-bold">
Add Product Details
</h2>



<input
name="productName"
value={form.productName}
onChange={handleChange}
className="border p-3 w-full mt-4 rounded"
placeholder="Product Name"
/>



<select

name="category"

value={form.category}

onChange={handleChange}

className="border p-3 w-full mt-4 rounded"

>

<option value="">
Select Category
</option>

<option value="Fruits">
Fruits
</option>

<option value="Vegetables">
Vegetables
</option>

<option value="Dairy">
Dairy
</option>

<option value="Snacks">
Snacks
</option>

<option value="Beverages">
Beverages
</option>

<option value="Other">
Other
</option>


</select>



<input

name="quantity"

type="number"

value={form.quantity}

onChange={handleChange}

className="border p-3 w-full mt-4 rounded"

/>



<input

name="price"

value={form.price}

onChange={handleChange}

className="border p-3 w-full mt-4 rounded"

/>


<label className="block mt-4">
  Purchase Date
</label>

<input
  name="purchaseDate"
  type="date"
  value={form.purchaseDate}
  onChange={handleChange}
  className="border p-3 w-full rounded"
/>


<label className="block mt-4">
  Expiry Date
</label>

<input
  name="expiryDate"
  type="date"
  value={form.expiryDate}
  onChange={handleChange}
  className="border p-3 w-full rounded"
/>
<input
type="file"
className="mt-4"
onChange={(e)=>
 setForm({
   ...form,
   image:e.target.files[0]
 })
}
/>

<button
onClick={handleSubmit}
className="mt-6 bg-green-700 text-white px-6 py-3 rounded-xl"
>
Add To Inventory
</button>
</div>


)

}


export default ProductFormCard;