# Backend Guide 
##Instruction to Run Backend side
* Make sure your computer contains python 3.8 (with pip)
* Clone the Repo. Make sure you're aligned with master
* Run from the **BE repo root**: 
    > pip install -r requirements.txt
* After setup the requirements, Run:
   > python3 main.py

### And thats it. Your BE side is good to go.

### Some Guidelines: 
- In order to invoke the BE, you should invoke your local host, port 8080, using Postman (or something similar).
- Do it as following: 
> http://localhost:8080/THE_ENDPOINT_YOU_DESIRE

### Notice:
In order to check the swagger API, one should check the following path, while running the server:
> http://localhost:8080/docs


### Notice 2: 
In order to create working env, you'll need to create .env file with the following params: 
SENDER_EMAIL = EMAIL_ADDRESS
SENDER_APP_PASSWORD = APP_PASSWORD