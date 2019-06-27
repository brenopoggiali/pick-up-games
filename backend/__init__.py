import io
import os
import json
import sqlite3
import functools
import pandas as pd

from flask import (Flask, g, render_template, flash, redirect, url_for, abort, jsonify, request, session)

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
    return '<h1>Welcome to the backend! </h1>'

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

@app.route('/grupos/')
def get_grupos(id_current_user = 38162):
  # ATENÇÃO, PEGAR DO ID DEPOIS
  conn = sqlite3.connect('instance/backend.sqlite')
  query = pd.read_sql("SELECT Grupo_de_pelada.nome, Grupo_de_pelada.descricao " +
                       "FROM Pessoa NATURAL JOIN Participa_grupo_pelada NATURAL JOIN Grupo_de_pelada " +
                       "WHERE Pessoa.id_pessoa = " + str(id_current_user) + ";", conn)
  result = query.to_json(orient='records')
  return result

@app.route('/grupo/<id_grupo_de_pelada>')
def get_grupo(id_grupo_de_pelada):
  conn = sqlite3.connect('instance/backend.sqlite')
  query = pd.read_sql("SELECT lugar, preco, inicio, fim " +
                       "FROM Grupo_de_pelada NATURAL JOIN Pelada " +
                       "WHERE id_grupo_de_pelada = " + str(id_grupo_de_pelada) +
                       " ORDER BY inicio;", conn)
  result = query.to_json(orient='records')
  return result

@app.route('/dashboard/')
def get_recent_peladas(id_current_user = 38162):
  # ATENÇÃO, PEGAR DO ID DEPOIS
  conn = sqlite3.connect('instance/backend.sqlite')
  query = pd.read_sql("SELECT Grupo_de_Pelada.nome, lugar, inicio " +
                         "FROM Jogador NATURAL JOIN Pelada NATURAL JOIN Grupo_de_Pelada " +
                         "WHERE id_pelada in (SELECT id_pelada FROM Jogador NATURAL JOIN Pessoa WHERE id_pessoa = '" + str(id_current_user) + "') " +
                         "GROUP BY id_pelada " +
                         "ORDER BY inicio DESC;", conn)
  result = query.to_json(orient='records')
  return result


#### AGUARDANDO AJUDA DA GABI ####

# @app.route('/vaquinhas/')
# def get_vaquinhas(id_current_user = 38162):
#   # ATENÇÃO, PEGAR DO ID DEPOIS
#   conn = sqlite3.connect('instance/backend.sqlite')
#   query = pd.read_sql("FAZER DEPOIS;", conn)
#   result = query.to_json(orient='records')
#   return result

# @app.route('/vaquinha/<id_vaquinha>')
# def get_vaquinha(id_vaquinha):
#   # ATENÇÃO, PEGAR DO ID DEPOIS
#   id_vaquinha = 2
#   conn = sqlite3.connect('instance/backend.sqlite')
#   query = pd.read_sql("SELECT nome_pessoa, valor_pago " +
#                        "FROM Vaquinha_Coletiva_Pessoa NATURAL JOIN Pessoa " +
#                        "WHERE id_vaquinha_coletiva = " + str(id_vaquinha) + " "
#                        "ORDER BY nome_pessoa;", conn)
#   result = query.to_json(orient='records')
#   return result
