const express = require("express");
const app = express();


const products = [
    { id: 1, name: "Wireless Mouse", category: "Electronics", price: 799, stock: 25, rating: 4.3 },
    { id: 2, name: "Running Shoes", category: "Footwear", price: 2499, stock: 40, rating: 4.5 },
    { id: 3, name: "Laptop Stand", category: "Accessories", price: 999, stock: 30, rating: 4.2 },
    { id: 4, name: "Smart Watch", category: "Electronics", price: 4999, stock: 12, rating: 4.4 },
    { id: 5, name: "Backpack", category: "Fashion", price: 1599, stock: 50, rating: 4.1 },
    { id: 6, name: "Bluetooth Speaker", category: "Electronics", price: 1999, stock: 20, rating: 4.6 },
    { id: 7, name: "Desk Lamp", category: "Home Decor", price: 699, stock: 35, rating: 4.0 },
    { id: 8, name: "Gaming Keyboard", category: "Electronics", price: 3499, stock: 15, rating: 4.7 },
    { id: 9, name: "Water Bottle", category: "Fitness", price: 299, stock: 100, rating: 4.2 },
    { id: 10, name: "Sunglasses", category: "Fashion", price: 1299, stock: 45, rating: 4.3 },
    { id: 11, name: "Portable Charger", category: "Electronics", price: 1499, stock: 28, rating: 4.5 },
    { id: 12, name: "Yoga Mat", category: "Fitness", price: 899, stock: 60, rating: 4.4 },
    { id: 13, name: "Office Chair", category: "Furniture", price: 5999, stock: 10, rating: 4.6 },
    { id: 14, name: "Wireless Earbuds", category: "Electronics", price: 2999, stock: 22, rating: 4.5 },
    { id: 15, name: "Casual T-Shirt", category: "Fashion", price: 499, stock: 80, rating: 4.1 },
    { id: 16, name: "Cookware Set", category: "Kitchen", price: 3499, stock: 18, rating: 4.3 },
    { id: 17, name: "Digital Camera", category: "Electronics", price: 15999, stock: 8, rating: 4.6 },
    { id: 18, name: "Notebook", category: "Stationery", price: 199, stock: 120, rating: 4.0 },
    { id: 19, name: "LED TV", category: "Electronics", price: 24999, stock: 5, rating: 4.7 },
    { id: 20, name: "Sneakers", category: "Footwear", price: 2999, stock: 35, rating: 4.4 },
    { id: 21, name: "Coffee Maker", category: "Kitchen", price: 4999, stock: 14, rating: 4.5 },
    { id: 22, name: "Headphones", category: "Electronics", price: 1999, stock: 25, rating: 4.3 },
    { id: 23, name: "Winter Jacket", category: "Fashion", price: 3999, stock: 20, rating: 4.4 },
    { id: 24, name: "Table Clock", category: "Home Decor", price: 599, stock: 40, rating: 4.2 },
    { id: 25, name: "Fitness Tracker", category: "Electronics", price: 3499, stock: 18, rating: 4.5 }
];

app.get("/",(req,res)=>{
    res.status(200).send("This server is created by Kuldeep Patel ---------");
});
app.get("/products",(req,res)=>{
    res.status(200).json(products);
})

app.get("/products/:id",(req,res)=>{
    const userId = Number(req.params.id);
    const user = products.find(me => userId == me.id);

    if(!user){
        res.status(404).json({
            Message : "Product Not Found"
        })
    }
    res.status(200).json(user)
});

app.get("/products/category/:categoryName",(req,res)=>{
    const cateParameter = req.params.categoryName;
    const findCategory = products.filter(me => me.category.toLowerCase() === cateParameter.toLowerCase());
    if(findCategory.length == 0){
       res.status(404).json({
        Message : "Product not Found for this category"
       })
    }
    res.status(200).json(findCategory);
})

app.use(express.json());

app.post("/products",(req,res)=>{
    const newProduct = {
        id: products.length + 1,
        name : req.body.name,
        category : req.body.category,
        price : req.body.price,
        stock : req.body.stock,
        rating : req.body.rating
    }

    products.push(newProduct)

    res.status(201).json({
        message: "New product Created",
        newProduct : newProduct
    })
});

app.put("/products/:id",(req,res)=>{
    const prodId = Number(req.params.id);
    const findedProductIndex = products.findIndex(idx => idx.id === prodId);

    if(findedProductIndex == -1){
        res.status(404).json({
            message: "Product not Found"
        })
    }

    products[findedProductIndex] = {
        id: prodId,
        name : req.body.name,
        category : req.body.category,
        price : req.body.price,
        stock : req.body.stock,
        rating : req.body.rating
    }

    res.status(200).json({
        message: "Product data updated",
        data : products[findedProductIndex]
    })
});

app.put("/products/:id/stock",(req,res)=>{
    const prodId = Number(req.params.id);
    const findedProductIndex = products.findIndex(idx=> idx.id === prodId);

    if(findedProductIndex == -1){
        res.status(404).json({
            message: "Product Not Found"
        })
    }

    products[findedProductIndex].stock = req.body.stock;

    res.status(200).json({
        message: "Partially updated by put",
        updated : products[findedProductIndex]
    })
})

app.put("/products/:id/price",(req,res)=>{
    const prodId = Number(req.params.id);
    const findedProductIndex = products.findIndex(idx=> idx.id === prodId);

    if(findedProductIndex == -1){
        res.status(404).json({
            message: "Product Not Found"
        })
    }

    products[findedProductIndex].price = req.body.price;

    res.status(200).json({
        message: "Partially updated by put",
        updated : products[findedProductIndex]
    })
})


app.listen(3000,()=>{
    console.log("server is running at PORT 3000");
})