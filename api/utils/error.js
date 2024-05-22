export const errorHandler =(statusCode,message)=>{   //middleware and errorhandling
    const error=new Error()
    error.statusCode=statusCode
    error.message=message
    return error;
}