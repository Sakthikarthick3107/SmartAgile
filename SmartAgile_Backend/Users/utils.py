from django.core.mail import send_mail
import secrets
from django.conf import settings

base_url = 'http://127.0.0.1:8000/users'

def generate_password_reset_otp():
    return ''.join([str(secrets.choice('0123456789')) for i in range(6)])

def send_password_reset_email(user, uid, token):

    # unique_token = os.urandom(32).hex()

    otp = generate_password_reset_otp()
    user.otp = otp

    reset_link = f"{base_url}/auth/password_reset/confirm/otp/{uid}/{token}/"

    email_body = f"""   A password reset request has been made for your account\n
    One Time Password for password reset : {otp} \n
    Password reset link : \n    {reset_link}\n 
    If you did not request a password reset, you can safely ignore this mail."""

    send_mail(
        subject="Password Reset Request",
        message=email_body,
        recipient_list=[user.email],
        from_email=settings.EMAIL_HOST_USER
    )

    user.save()