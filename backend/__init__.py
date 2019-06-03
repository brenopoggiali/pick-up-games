import os
import json
import functools

from flask import (Flask, g, render_template, flash, redirect, url_for, abort, jsonify, request, session)

from authlib.client import OAuth2Session
import google.oauth2.credentials
import googleapiclient.discovery

from . import google_auth
###############################################################################################################
#####################################          Finish imports.            #####################################
###############################################################################################################


###############################################################################################################
#####################################          Set globals                #####################################
###############################################################################################################
DEBUG = True

application = app = Flask(__name__)
app.secret_key = os.environ.get("FN_FLASK_SECRET_KEY", default=False)

app.register_blueprint(google_auth.app)

###############################################################################################################
##########################          Initialize database when called                ############################
###############################################################################################################
from . import db
app.config['DATABASE']=os.path.join(app.instance_path, 'backend.sqlite')
db.init_app(app)

###############################################################################################################
#####################################          Set routes                ######################################
###############################################################################################################
@app.route('/')
def index():
    if google_auth.is_logged_in():
        user_info = google_auth.get_user_info()
        return ('<div>You are currently logged in as ' + user_info['given_name'] + '<div><pre>' + \
          json.dumps(user_info, indent=4) + "</pre> <a href=\'/google/logout\'>Logout here</a>")

    return 'You are not currently logged in. <a href=\'/google/login\'>Login with google</a>'
