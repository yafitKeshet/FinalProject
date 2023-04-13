# External imports
import os
import logging
from datetime import datetime
from uuid import uuid4
import uvicorn as uvicorn
from fastapi import FastAPI, Request


# Internal imports
from lib.rest import course, feed, general, job, login, profile, signup

# Initialize logger
logger = logging.getLogger(__name__)


def prepare_app():
    app = FastAPI()
    app.include_router(course.course_router)
    app.include_router(rest.router)
    app.include_router(rest.router)
    app.include_router(rest.router)
    app.include_router(rest.router)
    app.include_router(rest.router)
    app.include_router(rest.router)
    app.include_router(rest.router)
    return app


app = prepare_app()


@app.middleware("http")
async def middleware_counter(request: Request, call_next):
    resource_name = request.url.path
    http_action = request.method
    request_id = uuid4()
    logger.info(f"Incoming request {request_id})| resource: {resource_name} | HTTP Verb {http_action}")
    start = datetime.now()
    response = await call_next(request)
    end = datetime.now()
    duration = end - start
    logger.debug(f"request {request_id} duration: {duration.microseconds}ms")
    return response


if __name__ == '__main__':
    uvicorn.run(app, host="127.0.0.1", port=8080)
