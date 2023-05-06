import logging
import os
import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText

from dotenv import load_dotenv

# Load variables from .env file
load_dotenv()


class EmailSender:
    def __init__(self):
        self.sender_email = os.environ['SENDER_EMAIL']
        self.sender_app_password = os.environ['SENDER_APP_PASSWORD']
        self.logger = logging.getLogger(__name__)

    def send_email(self, recipient_email: str, subject: str, body: str):
        try:
            # Set up the email
            msg = MIMEMultipart()
            msg['From'] = self.sender_email
            msg['To'] = recipient_email
            msg['Subject'] = subject
            msg.attach(MIMEText(body, 'plain'))

            # Connect to the Gmail server
            server = smtplib.SMTP_SSL('smtp.gmail.com', 465)
            self.logger.debug(f"[{self.send_email.__name__}] Connected to Gmail server successfully")

            # Log in and send the email
            server.login(self.sender_email, self.sender_app_password)
            self.logger.debug(f"[{self.send_email.__name__}] Login to Gmail account")
            server.sendmail(self.sender_email, recipient_email, msg.as_string())
            self.logger.debug(f"[{self.send_email.__name__}] Email successfully sent!")
            server.quit()
        except Exception as e:
            self.logger.debug(f"[{self.send_email.__name__}] Error occurred while sending email:{str(e)}")
