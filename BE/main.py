# External imports
import os
import logging
from datetime import datetime
from uuid import uuid4
import uvicorn as uvicorn
from fastapi import FastAPI, Request
from starlette.middleware.cors import CORSMiddleware

# Internal imports
from lib.rest import course, feed, general, job, login, profile, signup, forum
from dotenv import load_dotenv

# Load variables from .env file
load_dotenv()



# Initialize logger
logger = logging.getLogger(__name__)


def prepare_app():
    app = FastAPI()
    app.include_router(course.router)
    app.include_router(feed.router)
    app.include_router(general.router)
    app.include_router(job.router)
    app.include_router(login.router)
    app.include_router(profile.router)
    app.include_router(signup.router)
    app.include_router(forum.router)

    return app

logging.basicConfig(level=logging.DEBUG)


app = prepare_app()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)



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
