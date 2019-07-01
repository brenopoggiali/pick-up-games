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

@app.route('/login_or_register', methods=['GET', 'POST'])
def login_or_register():
  conn = sqlite3.connect('instance/backend.sqlite')
  c = conn.cursor()

  post = request.get_json()
  nome_pessoa = post.get('name')
  foto = post.get('image')
  email = post.get('email')

  query = pd.read_sql(f"SELECT * FROM Pessoa WHERE Pessoa.email = '{email}';", conn)
  query_list = query.values.tolist()

  if len(query_list):
    return "User already exist"

  c.execute(f"INSERT INTO Pessoa ('nome_pessoa', 'foto', 'email') VALUES ('{nome_pessoa}', '{foto}', '{email}')")
  conn.commit()
  return "Usuário cadastrado no banco!"

@app.route('/peladas/<id_pelada>/jogadores/')
def jogadores_pelada(id_pelada):
  conn = sqlite3.connect('instance/backend.sqlite')
  query = pd.read_sql(f"SELECT id_pessoa, nome_pessoa, Pontos, Nota, G, GC \
                       FROM Jogador NATURAL JOIN Pessoa \
                       WHERE Jogador.id_pelada = {id_pelada} \
                       ORDER BY nome_pessoa;", conn)
  result = query.to_json(orient='records')
  return jsonify()

@app.route('/admin_groups/<id_pessoa>/')
def admin_groups(id_pessoa):
  conn = sqlite3.connect('instance/backend.sqlite')
  query = pd.read_sql(f"SELECT Grupo_de_pelada.nome, Grupo_de_pelada.descricao \
                       FROM Pessoa JOIN Grupo_de_Pelada ON Pessoa.id_pessoa = Grupo_de_Pelada.id_adm \
                       WHERE Pessoa.id_pessoa = {id_pessoa};", conn)
  result = query.to_json(orient='records')
  return result

@app.route('/jogador/<id_pessoa>/peladas/')
def jogador_peladas(id_pessoa):
  conn = sqlite3.connect('instance/backend.sqlite')
  query = pd.read_sql(f"SELECT Grupo_de_pelada.nome, Grupo_de_pelada.descricao \
                       FROM Pessoa NATURAL JOIN Participa_grupo_pelada NATURAL JOIN Grupo_de_pelada \
                       WHERE Pessoa.id_pessoa = {id_pessoa};", conn)
  result = query.to_json(orient='records')
  return result

@app.route('/grupos/')
def get_grupos(id_current_user = 37694):
  # ATENÇÃO, PEGAR DO ID DEPOIS
  conn = sqlite3.connect('instance/backend.sqlite')
  query = pd.read_sql(f"SELECT Grupo_de_pelada.nome, Grupo_de_pelada.descricao \
                       FROM Pessoa NATURAL JOIN Participa_grupo_pelada NATURAL JOIN Grupo_de_pelada \
                       WHERE Pessoa.id_pessoa = {id_current_user};", conn)
  result = query.to_json(orient='records')
  return result

@app.route('/grupo/<id_grupo_de_pelada>')
def get_grupo(id_grupo_de_pelada):
  conn = sqlite3.connect('instance/backend.sqlite')
  query = pd.read_sql(f"SELECT nome_pessoa, avg(Pontos) as Media_Pontos, avg(G) as Media_gols, avg(GC) as Media_gols_contra \
                        FROM Grupo_de_Pelada NATURAL JOIN Pelada NATURAL JOIN Jogador NATURAL JOIN Pessoa \
                        WHERE  id_grupo_de_pelada = {id_grupo_de_pelada} \
                        GROUP BY id_pessoa \
                        ORDER BY nome_pessoa;", conn)
  result = query.to_json(orient='records')
  return result

@app.route('/dashboard/')
def get_recent_peladas(id_current_user = 37694):
  # ATENÇÃO, PEGAR DO ID DEPOIS
  conn = sqlite3.connect('instance/backend.sqlite')
  query = pd.read_sql(f"SELECT Grupo_de_Pelada.nome, lugar, inicio \
                       FROM Jogador NATURAL JOIN Pelada NATURAL JOIN Grupo_de_Pelada \
                       WHERE id_pelada in (SELECT id_pelada FROM Jogador NATURAL JOIN Pessoa WHERE id_pessoa = {id_current_user}) \
                       GROUP BY id_pelada \
                       ORDER BY inicio DESC\
                       LIMIT 50;", conn)
  result = query.to_json(orient='records')
  return result

@app.route('/vaquinhas/')
def get_vaquinhas(id_current_user = 37694):
  # ATENÇÃO, PEGAR DO ID DEPOIS
  data_inicio = '2018-06-04 00:00:00'
  conn = sqlite3.connect('instance/backend.sqlite')
  query = pd.read_sql(f"SELECT id_vaquinha, 'Coletiva' as Tipo, motivo as Nome, Grupo_de_pelada.nome as Grupo , prazo, valor_total as Valor \
                      FROM Vaquinha NATURAL JOIN Vaquinha_Coletiva NATURAL JOIN Grupo_de_Pelada \
                     WHERE id_grupo_de_pelada IN (SELECT id_grupo_de_pelada FROM Participa_grupo_pelada  \
                                                  WHERE id_pessoa =   {id_current_user}  )  \
                       AND prazo >= '  data_inicio  '  \
                       AND id_vaquinha_coletiva = id_vaquinha     \
                     UNION \
                       SELECT id_vaquinha, 'Individual' as Tipo, motivo as Nome, Grupo_de_pelada.nome as Grupo , prazo, valor as Valor  \
                       FROM Vaquinha NATURAL JOIN Vaquinha_Individual NATURAL JOIN Grupo_de_Pelada  \
                       WHERE id_grupo_de_pelada IN (SELECT id_grupo_de_pelada FROM Participa_grupo_pelada WHERE  \
                                                   id_pessoa =   {id_current_user}  ) \
                        AND prazo >= '{data_inicio}' \
                        AND id_vaquinha_individual = id_vaquinha  \
                       ORDER BY prazo;", conn)
  result = query.to_json(orient='records')
  return result

@app.route('/vaquinha/<id_vaquinha>')
def get_vaquinha(id_vaquinha):
  conn = sqlite3.connect('instance/backend.sqlite')
  query = pd.read_sql(f"SELECT id_vaquinha, 'Coletiva' as Tipo, motivo as Nome, Grupo_de_pelada.nome as Grupo , prazo, nome_pessoa, valor_pago as pergunta_ou_valor, valor_total as Valor \
                        FROM Vaquinha JOIN Vaquinha_Coletiva ON id_vaquinha = id_vaquinha_coletiva NATURAL JOIN Vaquinha_Coletiva_Pessoa NATURAL JOIN Grupo_de_Pelada JOIN Participa_grupo_Pelada ON Grupo_de_Pelada.id_grupo_de_pelada = Participa_grupo_Pelada.id_grupo_de_pelada NATURAL JOIN Pessoa \
                        WHERE id_vaquinha = {id_vaquinha} \
                        UNION \
                        SELECT id_vaquinha, 'Individual' as Tipo, motivo as Nome, Grupo_de_pelada.nome as Grupo , prazo, nome_pessoa, pergunta_personalizada as pergunta_ou_valor, valor as Valor \
                        FROM Vaquinha JOIN Vaquinha_Individual ON id_vaquinha = id_vaquinha_individual NATURAL JOIN Vaquinha_Individual_Pessoa NATURAL JOIN Grupo_de_Pelada JOIN Participa_grupo_Pelada ON Grupo_de_Pelada.id_grupo_de_pelada = Participa_grupo_Pelada.id_grupo_de_pelada NATURAL JOIN Pessoa \
                        WHERE id_vaquinha = {id_vaquinha} \
                        GROUP BY Nome, nome_pessoa;", conn)
  result = query.to_json(orient='records')
  return result

@app.route('/historico/grafico1/<category>/<id_adversario>')
def get_graph1(category, id_adversario, id_current_user = 37694):

  conn = sqlite3.connect('instance/backend.sqlite')
  query = pd.read_sql(f"SELECT id_pessoa, strftime('%m/%Y', inicio) as Mes, avg({category}) \
                        FROM Jogador NATURAL JOIN Pessoa NATURAL JOIN Pelada \
                        WHERE  id_pessoa = {id_current_user} OR id_pessoa= {id_adversario}\
                        GROUP BY id_pessoa, strftime('%m/%Y', inicio) \
                        ORDER BY strftime('%Y', inicio), strftime('%m', inicio);", conn)
  labels, series = [], []
  current_user, adversario = [], []
  query_list = query.values.tolist()

  for i in query_list:
    labels.append(i[1])

  labels = list(sorted(set(labels)))

  for month in labels:
    adversario_in_month = 0
    for i in query_list:
      if i[0] == int(id_adversario) and i[1]==month:
        adversario.append(i[2])
        adversario_in_month += 1

    if adversario_in_month == 0:
      adversario.append(0)

    current_user_in_month = 0
    for i in query_list:
      if i[0] == id_current_user and i[1]==month:
        current_user.append(i[2])
        current_user_in_month += 1

    if current_user_in_month == 0:
      current_user.append(0)


  return jsonify(labels=labels, series=[current_user, adversario])

@app.route('/historico/grafico2/<id_grupo_de_pelada>/<category>')
def get_graph2(category, id_grupo_de_pelada, id_current_user = 37694):

  conn = sqlite3.connect('instance/backend.sqlite')
  query = pd.read_sql(f"SELECT id_pessoa, nome_pessoa, sum({category}), \
                        (SELECT sum({category}) FROM Pelada NATURAL JOIN Jogador WHERE id_grupo_de_pelada = {id_grupo_de_pelada}) as Total, \
                        (100.0*sum({category})/(SELECT sum({category}) FROM Pelada NATURAL JOIN Jogador WHERE id_grupo_de_pelada = {id_grupo_de_pelada}) ) as Porcentagem \
                        FROM Jogador NATURAL JOIN Pessoa NATURAL JOIN Pelada \
                        WHERE  id_grupo_de_pelada = {id_grupo_de_pelada} \
                        GROUP BY id_pessoa;", conn)
  query_list = query.values.tolist()
  labels, series, names = [], [], []

  for i in query_list:
    if i[0] == id_current_user:
      labels.append(i[4])
      series.append(i[2])
      names.append(i[1])
      query_list.remove(i)

  for i in query_list:
    labels.append(i[4])
    series.append(i[2])
    names.append(i[1])

  return jsonify(labels=labels, series=series, names=names)

@app.route('/historico/grafico3/<id_pessoa>/<category>/<id_grupo1>/<id_grupo2>')
def get_graph3(id_pessoa, category, id_grupo1, id_grupo2):
  id_pessoa = 38138
  id_grupo1 = 282
  id_grupo2 = 264
  conn = sqlite3.connect('instance/backend.sqlite')
  query = pd.read_sql(f"SELECT nome_pessoa, Nome, AVG({category}) \
                        FROM Pessoa NATURAL JOIN Participa_grupo_pelada NATURAL JOIN Grupo_de_Pelada \
                        NATURAL JOIN Pelada NATURAL JOIN Jogador \
                        WHERE id_pessoa = {id_pessoa} AND (id_grupo_de_pelada = {id_grupo1} OR id_grupo_de_pelada = {id_grupo2}) \
                        GROUP BY id_grupo_de_pelada;", conn)
  query_list = query.values.tolist()
  labels, series = [], []

  for i in query_list:
    labels.append(i[1])
    series.append(i[2])

  return jsonify(labels=labels, series=series)

@app.route('/historico/grafico4/<id_grupo_de_pelada>/<id_pessoa1>/<id_pessoa2>')
def get_graph4(id_grupo_de_pelada, id_pessoa1, id_pessoa2):
  id_pessoa1 = 52950
  id_pessoa2 = 63219
  id_grupo1 = 282
  conn = sqlite3.connect('instance/backend.sqlite')
  query = pd.read_sql(f"SELECT nome_pessoa, Nome, AVG(Pontos), SUM(G), SUM(A), AVG(RB), AVG(FF), AVG(FD), AVG(DD), SUM(CA) \
                        FROM Pessoa NATURAL JOIN Participa_grupo_pelada NATURAL JOIN Grupo_de_Pelada \
                        NATURAL JOIN Pelada NATURAL JOIN Jogador \
                        WHERE id_grupo_de_pelada = {id_grupo_de_pelada} AND (id_pessoa = {id_pessoa1} OR id_pessoa = {id_pessoa2}) \
                        GROUP BY nome_pessoa;", conn)
  labels = ["Média de pontos", "Gols", "Assistências", "Média de roubadas de bola", "Finalizações para fora", "Finalizações defendidas", "Defesas difíceis"]
  query_list = query.values.tolist()
  series, names = [], []

  for i in query_list:
    names.append(i[0])
    series.append([i[2], i[3], i[4], i[5], i[6], i[7], i[8], i[9]])

  return jsonify(labels=labels, series=series, names=names)
