import os

basedir = os.path.abspath(os.path.dirname(__file__))

class Auth:
  CLIENT_ID = ('763939110671-5fdvscgtkn6veo1j48sc5nfisvv1hlcj'
              '.apps.googleusercontent.com')
  CLIENT_SECRET = '4AVsXRma87DjZbloWjd1xEte'
  REDIRECT_URI = 'https://localhost:5000/gCallback'
  AUTH_URI = 'https://accounts.google.com/o/oauth2/auth'
  TOKEN_URI = 'https://accounts.google.com/o/oauth2/token'
  USER_INFO = 'https://www.googleapis.com/userinfo/v2/me'

class Config:
  APP_NAME = "Pick-up Games"
  SECRET_KEY = os.environ.get("SECRET_KEY")

class DevConfig(Config):
  DEBUG = True
  SQLITE3_DATABASE_URI = 'sqlite:///' + os.path.join(basedir, "backend.db")

class ProdConfig(Config):
  DEBUG = True
  SQLITE3_DATABASE_URI = 'sqlite:///' + os.path.join(basedir, "backend.db")

config = {
  "dev": DevConfig,
  "prod": ProdConfig,
  "default": DevConfig
}
