import io
import os
import json
import sqlite3
import functools
import pandas as pd

from flask import (Flask, g, render_template, flash, redirect, url_for, abort, jsonify, request, session)

from authlib.client import OAuth2Session
import google.oauth2.credentials
import googleapiclient.discovery

from . import google_auth

from flask_cors import CORS, cross_origin
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
CORS(app)
@app.route('/')
def index():
    if google_auth.is_logged_in():
        user_info = google_auth.get_user_info()
        return ('<div>You are currently logged in as ' + user_info['given_name'] + '<div><pre>' + \
          json.dumps(user_info, indent=4) + "</pre> <a href=\'/google/logout\'>Logout here</a>")

    return 'You are not currently logged in. <a href=\'/google/login\'>Login with google</a>'

@app.route('/peladas/<id_pelada>/jogadores/')
def jogadores_pelada(id_pelada):
  conn = sqlite3.connect('instance/backend.sqlite')
  query = pd.read_sql("SELECT id_pessoa, nome_pessoa, Pontos, Nota, G, GC " +
                       "FROM Jogador NATURAL JOIN Pessoa " +
                       "WHERE Jogador.id_pelada = " + str(id_pelada) + " " +
                       "ORDER BY nome_pessoa;", conn)
  result = query.to_json(orient='records')
  return result

@app.route('/admin_groups/<id_pessoa>/')
def admin_groups(id_pessoa):
  conn = sqlite3.connect('instance/backend.sqlite')
  query = pd.read_sql("SELECT Grupo_de_pelada.nome, Grupo_de_pelada.descricao " +
                       "FROM Pessoa JOIN Grupo_de_Pelada ON Pessoa.id_pessoa = Grupo_de_Pelada.id_adm " + "WHERE Pessoa.id_pessoa = '" +
                        id_pessoa + "';", conn)
  result = query.to_json(orient='records')
  return result

@app.route('/jogador/<id_pessoa>/peladas/')
def jogador_peladas(id_pessoa):
  conn = sqlite3.connect('instance/backend.sqlite')
  query = pd.read_sql("SELECT Grupo_de_pelada.nome, Grupo_de_pelada.descricao " +
                       "FROM Pessoa NATURAL JOIN Participa_grupo_pelada NATURAL JOIN Grupo_de_pelada " + "WHERE Pessoa.id_pessoa = '" + id_pessoa +
                       "';", conn)
  result = query.to_json(orient='records')
  return result

@app.route('/vaquinhas_coletivas/')
def get_vaquinhas():
  conn = sqlite3.connect('instance/backend.sqlite')
  query = pd.read_sql("SELECT * FROM Vaquinha_Coletiva;", conn)
  result = query.to_json(orient='records')
  return result

@app.route('/vaquinha_coletiva/<id_vaquinha_coletiva>/')
def get_vaquinha(id_vaquinha_coletiva):
  conn = sqlite3.connect('instance/backend.sqlite')
  query = pd.read_sql("SELECT nome_pessoa, valor_pago " +
                         "FROM Vaquinha_Coletiva_Pessoa NATURAL JOIN Pessoa " +
                         "WHERE id_vaquinha_coletiva = " + str(id_vaquinha_coletiva) + " "
                         "ORDER BY nome_pessoa;", conn)
  result = query.to_json(orient='records')
  return result
