import logging
import os
import random
import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText

from dotenv import load_dotenv

from lib.utils.db.models.user_temp_password import UserTempPassword
from lib.utils.db.user_db import UserDBSession

# Load variables from .env file
load_dotenv()


class EmailSender:
    RANGE_FIRST = 100_000
    RANGE_LAST = 999_999

    def __init__(self, db_session: UserDBSession):
        self.sender_email = os.environ['SENDER_EMAIL']
        self.sender_app_password = os.environ['SENDER_APP_PASSWORD']
        self.logger = logging.getLogger(__name__)
        self.db_session = db_session

    @staticmethod
    def _generate_temp_password() -> str:
        return str(random.randint(EmailSender.RANGE_FIRST, EmailSender.RANGE_LAST))

    @staticmethod
    def _temporary_password_subject() -> str:
        return "Your temporary password from MTA Website"

    @staticmethod
    def _temporary_password_body(temporary_password: str) -> str :
        return f"Your temporary password is: {temporary_password}"

    def _send_email(self, recipient_email: str) -> str:
        temporary_password = ""

        try:
            temporary_password = self._generate_temp_password()
            # Set up the email
            msg = MIMEMultipart()
            msg['From'] = self.sender_email
            msg['To'] = recipient_email
            msg['Subject'] = self._temporary_password_subject()
            msg.attach(MIMEText(self._temporary_password_body(temporary_password), 'plain'))

            # Connect to the Gmail server
            server = smtplib.SMTP_SSL('smtp.gmail.com', 465)
            self.logger.debug(f"[{self._send_email.__name__}] Connected to Gmail server successfully")

            # Log in and send the email
            server.login(self.sender_email, self.sender_app_password)
            self.logger.debug(f"[{self._send_email.__name__}] Login to Gmail account")
            server.sendmail(self.sender_email, recipient_email, msg.as_string())
            self.logger.debug(f"[{self._send_email.__name__}] Email successfully sent!")
            server.quit()
        except Exception as e:
            self.logger.error(f"[{self._send_email.__name__}] Error occurred while sending email:{str(e)}")
        finally:
            return temporary_password

    def send_mail_to_user(self, user_email: str):
        temp_password = self._send_email(user_email)

        current_user = self.db_session.get_user_temp_password_entry(user_email)
        if current_user:
            # User exists. Need to update the DB temp password
            current_user.temp_password = temp_password
            self.db_session.add(current_user)
        else:
            # User does not exist. Create the table entry
            self.db_session.add(UserTempPassword(user_email=user_email, temp_password=temp_password))
        self.db_session.commit()
