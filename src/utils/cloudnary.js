import {v2} from "cloudinary";
import fs from "fs";


cloudinary.config({ 
    cloud_name: process.env.CLOUDNARY_CLOUD_NAME, 
    api_key: process.env.CLOUDNARY_API_KEY, 
    api_secret: process.env.CLOUDNARY_API_SECRET 
  }); 


  const uploadfiles = async (filePath) => {
    try{
        if (!filePath) return null;
        const result = await v2.uploader.upload(filePath,
            {resource_type: "auto"});
        
        console.log(result.url);
        return result
    }catch(error){
        fs.unlinkSync(filePath);
    }
  }




  const uploadResult = await cloudinary.uploader
       .upload(
           'https://res.cloudinary.com/demo/image/upload/getting-started/shoes.jpg', {
               public_id: 'shoes',
           }
       )
       .catch((error) => {
           console.log(error);
       });
    
    console.log(uploadResult);