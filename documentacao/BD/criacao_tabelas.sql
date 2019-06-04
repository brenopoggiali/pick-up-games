CREATE TABLE Pessoa (
	id_pessoa INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
	email VARCHAR(255) NOT NULL,
    nome_pessoa VARCHAR(255) NOT NULL
);

CREATE TABLE Pelada (
	id_pelada INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
	lugar VARCHAR(255),
	preco REAL(11),
	inicio TIMESTAMP,
	fim TIMESTAMP,
	id_grupo_de_pelada INTEGER NOT NULL, /*GRUPO DA PELADA E REFERÊNCIAS ADICIONADAS*/
	FOREIGN KEY (id_grupo_de_pelada) REFERENCES Grupo_de_Pelada 
);

CREATE TABLE Jogador(
	id_pessoa INTEGER NOT NULL,
	id_pelada INTEGER NOT NULL,
	/*Removi a coluna participou, pois se a pessoa possui uma linha nessa
	tabela, para uma determinada pelada, significa que participou, caso
	contrário não participou*/
	Pontos NUMERIC(5,2) NOT NULL,
	Partida       INTEGER,
   	/*mando removido */
   	Titular       BIT,
   	Substituido   BIT  NOT NULL,
   	/*TempoJogado removido */
	Nota          NUMERIC(3,1),
	FS            INTEGER,
	PE            INTEGER,
	A             INTEGER,
	FT            INTEGER,
	FD            INTEGER,
	FF            INTEGER,
	G             INTEGER  NOT NULL,
	I             INTEGER,
	PP            INTEGER,
	RB            INTEGER,
	FC            INTEGER,
	GC            INTEGER  NOT NULL,
	CA            INTEGER,
	CV            BIT,
	SG            BIT, /*Alterado de integer pra bit*/
	DD            INTEGER,
	DP            INTEGER,
	GS            INTEGER,
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

CREATE TABLE Participa_grupo_pelada( /*TABELA CRIADA*/
	id_grupo_de_pelada INTEGER NOT NULL,
	id_pessoa INTEGER NOT NULL,
	CONSTRAINT PK_pessoa_grupo_pelada PRIMARY KEY (id_pessoa, id_grupo_de_pelada),
	FOREIGN KEY (id_pessoa) REFERENCES Pessoa,
	FOREIGN KEY (id_grupo_de_pelada) REFERENCES Grupo_de_Pelada
	
);

CREATE TABLE Vaquinha(
	id_vaquinha INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
	motivo VARCHAR(255),
	id_grupo_de_pelada INTEGER(11) NOT NULL,
	prazo TIMESTAMP, 
	FOREIGN KEY (id_grupo_de_pelada) REFERENCES Grupo_de_Pelada
);

CREATE TABLE Vaquinha_Coletiva(
	id_vaquinha_coletiva INTEGER NOT NULL PRIMARY KEY, /*REMOVI AUTOINCREMENT */
	valor_total REAL(11) NOT NULL,
	FOREIGN KEY (id_vaquinha_coletiva) REFERENCES Vaquinha /*RESTRIÇÃO ADICIONADA, DEVE HERDAR AS CARACTERÍSTICAS DE VAQUINHA */
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
	id_vaquinha_individual INTEGER NOT NULL PRIMARY KEY,/*REMOVI AUTOINCREMENT */
	pergunta_personalizada VARCHAR(255),
	valor REAL(11) NOT NULL,
	FOREIGN KEY (id_vaquinha_individual) REFERENCES Vaquinha /*RESTRIÇÃO ADICIONADA, DEVE HERDAR AS CARACTERÍSTICAS DE VAQUINHA */
);

CREATE TABLE Vaquinha_Individual_Pessoa(
	id_vaquinha_individual INTEGER NOT NULL,
	id_pessoa INTEGER NOT NULL,
	resposta VARCHAR(255),
	CONSTRAINT PK_Vaquinha_Individual_Pessoa PRIMARY KEY (id_vaquinha_individual, id_pessoa),
	FOREIGN KEY (id_vaquinha_individual) REFERENCES Vaquinha_Individual,
	FOREIGN KEY (id_pessoa) REFERENCES Pessoa
);


