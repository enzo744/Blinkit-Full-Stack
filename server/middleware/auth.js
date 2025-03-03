import jwt from "jsonwebtoken";

const auth = async (request, response, next) => {
  try {
    /// ["Bearer","token"]
    const token = request.cookies.accessToken || request?.headers?.authorization?.split(" ")[1] 
    
      if (!token) {
        return response.status(401).json({
            message: "Provide token (non pres token)"
        });
      }

      const decode = jwt.verify(token, process.env.SECRET_KEY_ACCESS_TOKEN);

      console.log("decode", decode);

      if(!decode){
        return response.status(401).json({
            message : "unauthorized access",
            error : true,
            success : false
        })
    }

    request.userId = decode.id

    next();
      
  } catch (error) {
    return response.status(500).json({
      message: "Token scaduto. Effettuare il Login!", //error.message || error,
      error: true,
      success: false,
    });
  }
};

export default auth;
