import logging
import os
from dotenv import load_dotenv
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from email.mime.base import MIMEBase
from email import encoders
from smtplib import SMTP_SSL

from fastapi import UploadFile, File

# Load the environment variables from .env file
load_dotenv()


class JobEmailSender:
    def __init__(self):
        self.sender_email = os.environ['SENDER_EMAIL']
        self.sender_app_password = os.environ['SENDER_APP_PASSWORD']
        self.logger = logging.getLogger(__name__)

    async def apply_job_by_mail(self, publisher_email: str, user_name: str, cv_file: UploadFile = File(default=None)):
        # Email details
        subject = f"Application with CV - {user_name}"
        body = "Please find attached my CV."

        # SMTP server configuration
        smtp_server = "smtp.gmail.com"
        smtp_port = 465

        try:
            # Create a multipart message object
            message = MIMEMultipart()
            message["From"] = self.sender_email
            message["To"] = publisher_email
            message["Subject"] = subject

            # Add the body of the email
            message.attach(MIMEText(body, "plain"))

            if cv_file.size > 0:
                attachment = MIMEBase("application", "pdf")
                attachment.set_payload(await cv_file.read())
                encoders.encode_base64(attachment)
                attachment.add_header(
                    "Content-Disposition",
                    "attachment",
                    filename=f'CV - {user_name}'
                )
                message.attach(attachment)
            else:
                return False

            # Connect to the SMTP server
            with SMTP_SSL(smtp_server, smtp_port) as server:
                # Login to the sender's email account
                server.login(self.sender_email, self.sender_app_password)

                # Convert the email message to a string
                email_text = message.as_string()

                # Send the email
                server.sendmail(self.sender_email, publisher_email, email_text)

                print("Email sent successfully!")
        except Exception as e:
            print(f"An error occurred while sending the email: {str(e)}")
            return False
