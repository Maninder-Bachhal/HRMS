from fastapi import Request, HTTPException
from fastapi.responses import JSONResponse
from fastapi.exceptions import RequestValidationError


def register_exception_handlers(app):

    @app.exception_handler(RequestValidationError)
    async def validation_exception_handler(request: Request, exc: RequestValidationError):
        errors = []

        for err in exc.errors():
            field = err["loc"][-1]
            message = err["msg"]
            errors.append(f"{field}: {message}")

        return JSONResponse(
            status_code=422,
            content={
                "message": "Invalid input("+str(errors)+")",
                "errors": errors
            },
        )

    @app.exception_handler(HTTPException)
    async def http_exception_handler(request: Request, exc: HTTPException):
        return JSONResponse(
            status_code=exc.status_code,
            content={
                "message": exc.detail
            },
        )
