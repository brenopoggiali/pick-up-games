CREATE TABLE Pessoa (
  id_pessoa INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
  email VARCHAR(255) NOT NULL,
    nome_pessoa VARCHAR(255) NOT NULL
);

CREATE TABLE Pelada (
  id_pelada INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
  lugar VARCHAR(255),
  preco REAL(11),
  horario TIMESTAMP
);

CREATE TABLE Jogador(
  id_pessoa INTEGER NOT NULL,
  id_pelada INTEGER NOT NULL,
  Participou BIT NOT NULL,
  Pontos NUMERIC(5,2) NOT NULL,
  Partida       INTEGER,
    Mando         BIT  NOT NULL,
    Titular       BIT,
    Substituido   BIT  NOT NULL,
    TempoJogado   NUMERIC(19,16),
  Nota          NUMERIC(3,1),
  FS            INTEGER  NOT NULL,
  PE            INTEGER  NOT NULL,
  A             INTEGER  NOT NULL,
  FT            INTEGER  NOT NULL,
  FD            INTEGER  NOT NULL,
  FF            INTEGER  NOT NULL,
  G             INTEGER  NOT NULL,
  I             INTEGER  NOT NULL,
  PP            INTEGER  NOT NULL,
  RB            INTEGER  NOT NULL,
  FC            INTEGER  NOT NULL,
  GC            INTEGER  NOT NULL,
  CA            INTEGER  NOT NULL,
  CV            BIT  NOT NULL,
  SG            INTEGER  NOT NULL,
  DD            INTEGER  NOT NULL,
  DP            INTEGER  NOT NULL,
  GS            INTEGER  NOT NULL,
  CONSTRAINT PK_Jogador PRIMARY KEY (id_pessoa, id_pelada),
  FOREIGN KEY (id_pessoa) REFERENCES Pessoa,
  FOREIGN KEY (id_pelada) REFERENCES Pelada

);

CREATE TABLE Grupo_de_Pelada(
  id_grupo_de_pelada INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
  nome VARCHAR(255) NOT NULL,
  descricao VARCHAR(255),
  id_adm INTEGER(11) NOT NULL,
  FOREIGN KEY (id_adm) REFERENCES Pessoa

);

CREATE TABLE Vaquinha(
  id_vaquinha INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
  motivo VARCHAR(255),
  id_grupo_de_pelada INTEGER(11) NOT NULL,
  FOREIGN KEY (id_grupo_de_pelada) REFERENCES Grupo_de_Pelada
);

CREATE TABLE Vaquinha_Coletiva(
  id_vaquinha_coletiva INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
  valor_total REAL(11) NOT NULL
);

CREATE TABLE Vaquinha_Coletiva_Pessoa(
  id_vaquinha_coletiva INTEGER NOT NULL,
  id_pessoa INTEGER NOT NULL,
  valor_pago REAL(11) NOT NULL,
  data TIMESTAMP,
  CONSTRAINT PK_Vaquinha_Coletiva_Pessoa PRIMARY KEY (id_vaquinha_coletiva, id_pessoa),
  FOREIGN KEY (id_vaquinha_coletiva) REFERENCES Vaquinha_Coletiva,
  FOREIGN KEY (id_pessoa) REFERENCES Pessoa
);

CREATE TABLE Vaquinha_Individual(
  id_vaquinha_individual INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
  pergunta_personalizada VARCHAR(255),
  valor REAL(11) NOT NULL
);

CREATE TABLE Vaquinha_Individual_Pessoa(
  id_vaquinha_individual INTEGER NOT NULL,
  id_pessoa INTEGER NOT NULL,
  resposta VARCHAR(255),
  CONSTRAINT PK_Vaquinha_Individual_Pessoa PRIMARY KEY (id_vaquinha_individual, id_pessoa),
  FOREIGN KEY (id_vaquinha_individual) REFERENCES Vaquinha_Individual,
  FOREIGN KEY (id_pessoa) REFERENCES Pessoa
);
