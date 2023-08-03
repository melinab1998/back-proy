const HttpStatus = {
    OK: 200,
    NOT_FOUND: 404,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    INTERNAL_SERVER_ERROR: 500
  };

const ErrorsMessage =  {
    SUCCESS : 'Succcess',
    NOT_FOUND : 'Not Found',
    UNAUTHORIZED: 'Unauthorized',
    FORBIDDEN: 'Forbidden',
    INTERNAL_SERVER_ERROR: 'Internal Server Error'
}

export class HttpResponse {
    Ok(res, data){
        return res.status(HttpStatus.OK).json({
            status: HttpStatus.OK,
            message: ErrorsMessage.SUCCESS,
            data: data
        });
    };

    NotFound(res, data){
        return res.status(HttpStatus.NOT_FOUND).json({
            status: HttpStatus.NOT_FOUND,
            message: ErrorsMessage.NOT_FOUND,
            error: data
        });
    };

    Unauthorized(res, data){
        return res.status(HttpStatus.UNAUTHORIZED).json({
            status: HttpStatus.UNAUTHORIZED,
            message: ErrorsMessage.UNAUTHORIZED,
            error: data
        });
    };

    Forbidden(res, data){
        return res.status(HttpStatus.FORBIDDEN).json({
            status: HttpStatus.FORBIDDEN,
            message: ErrorsMessage.FORBIDDEN,
            error: data
        });
    };

    ServerError(res, data){
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
            status: HttpStatus.INTERNAL_SERVER_ERROR,
            message: ErrorsMessage.INTERNAL_SERVER_ERROR,
            error: data
        });
    };
};