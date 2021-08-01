const mongoose = require('mongoose');;
const Image = require(__dirname + '/../Schema/Image.js');

class DAO{

    static async post_image(img_obj){
           try{
          const image = await Image.create(img_obj);
          
          if(image){
            return image;
          }
            
          throw new Error("error fetching data")
          }catch(err){
                return {error : err.message};
          }

    }

    static async get_image(img_obj){
          
          try{
          const image = await Image.findOne(img_obj);
          
          if(image){
            return image;
          }
          throw new Error("error fetching data")
          }catch(err){
                return {error : err.message};
          }


    }

}

module.exports = DAO;