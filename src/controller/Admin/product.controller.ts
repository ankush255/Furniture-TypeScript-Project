import { Request, Response } from "express";
import { IProduct } from "../../interface/product.interface";
import ProductServices from "../../services/product.service";
const productService = new ProductServices();

export const addNewProduct = async (req: Request, res: Response) => {
  try {
    let product = (await productService.getProduct({
      title: req.body.title,
      isDelete: false,
    })) as IProduct;

    if (product) 
      return res.json({ message: "Product is Already Exist...." });

    // Image Store
    let image ="";
    if(req.file) image = req.file.path.replace(/\\/g,"/");

    product = (await productService.addNewProduct({
      ...req.body,
      product_Image:image,
    })) as IProduct;

    res
      .status(201)
      .json({ product, message: "New Product Added Successfully...." });
  } catch (error) {
    console.log(error);
    res.json({ message: "Internal Server Error" });
  }
};

export const getAllProducts = async (req: Request, res: Response) => {
  try {
    let products = (await productService.getAllProducts(
      req.query
    )) as IProduct[];
    res.status(200).json(products);
  } catch (error) {
    console.log(error);
    res.json({ message: "Internal Server Error" });
  }
};


export const updateProduct=async(req:Request,res:Response)=>{
  try {
      const Id = req.params.id as any;
      let product = await productService.getProduct(Id)
      if(!product){
          return res.json({message:"This product in not found."})
      }
      let filepath:any;
      if(req.file){
          filepath = `${req.file.path}`
      };
      product=await productService.updateProduct(Id,{...req.body,product_Image:filepath,isDelete:false});
      res.json({product,message:"Product update success."})
  } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal server error" });
  }
}


export const deleteProduct=async(req:Request,res:Response)=>{
  try {
      const Id = req.params.id as any;
      let product = (await productService.getProduct(Id) as IProduct);
      if(!product){
          return res.json({message:"This product in not found."})
      }
      product = (await productService.updateProduct(Id,{isDelete:true})) as IProduct;
      res.json({product,message:"Product delete success."})
  } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal server error" });
  }
}
