const asynchandler = (requesthandler) => {
  (req, res, next) => {
    Promise.resolve(requesthandler(req, res, next)).catch((err) => next(err));
  };
};

export { asynchandler };

// const asynchandler2 = (requesthandler) => async (req,res,next) =>{
//         try{
//             await requesthandler(req,res,next);
//         }catch(err){
//             res.status(500).json({message: err.message});
//             next(err);
//         }
//     }
