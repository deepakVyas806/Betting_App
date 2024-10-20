import { product_model } from "../../model/product.model.js"

const get_product = async(req,res)=>{

 try {
      const products = await product_model.find();
      if(!products){
        return res.status(500).json({success:false,message:'there is no product in it'})
      }

      return res.status(200).json({success:true,message:'all products',products})
 } catch (error) {
     console.log(`error in get product ap[i] ${error.message}`)
 }
}


export {get_product}