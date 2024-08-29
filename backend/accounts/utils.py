import random
from django.core.mail import EmailMessage
from .models import User, OnetimePassword
from django.conf import settings

def generateOtp():
    otp=""
    for i in range(6):
        otp += str(random.randint(0, 9))
    return otp


def send_code_to_user(email):
    Subject = "Crafitori Email Verification"
    otp_code = generateOtp()
    user = User.objects.get(email=email)
    site = "Crafitori"
    email_body = f"Hi {user.first_name} thanks for signing up on {site} please verify your email with the one time password {otp_code}"
    from_email = settings.DEFAULT_FROM_EMAIL
    OnetimePassword.objects.create(user=user, code=otp_code)

    d_email = EmailMessage(subject=Subject, body=email_body, from_email=from_email, to=[email])
    d_email.send(fail_silently=True)


def send_normal_email(data):
    email=EmailMessage(
        subject=data['email_subject'],
        body=data['email_body'],
        from_email=settings.EMAIL_HOST_USER,
        to=[data['to_email']]
    )
    email.send()
