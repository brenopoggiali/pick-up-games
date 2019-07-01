import pandas as pd
import csv
import os
import time
from datetime import datetime, timedelta

grupos = pd.read_csv("../data/times_final.csv")
#times = grupos["id_grupo_de_pelada"]

lista = ["nome", "id_grupo_de_pelada"]
new_f = grupos[lista]
new_f.to_csv("../data/grupo_pelada_temp.csv", index=False) #Output file

# current date and time
now = datetime.now()
timestamp1 = (datetime.now() - timedelta(seconds=31536000))
timestamp2 = (datetime.now() - timedelta(seconds=31536000   ) + timedelta(seconds=3600))

original1 = timestamp1
original2 = timestamp2

all = []
with open('../data/grupo_pelada_temp.csv','r') as csvinput:
    with open('../data/pelada.csv', 'w') as csvoutput:
        writer = csv.writer(csvoutput, lineterminator='\n')
        reader = csv.reader(csvinput)

        row = next(reader)
        row.append("lugar")
        row.append("preco")
        row.append("inicio")
        row.append("fim")
        row.append("id_grupo_de_pelada")
        all.append(row)
        dias = timedelta(seconds = 0)
        for row in reader:
            row.append("Campo do " + row[0])
            row.append(4.50)
            string1 = datetime.fromtimestamp(datetime.timestamp(timestamp1))
            string2 = datetime.fromtimestamp(datetime.timestamp(timestamp2))
            row.append(string1)
            row.append(string2)
            row.append(row[1])
            all.append(row)

        writer.writerows(all)

dias = timedelta(seconds=86400)
with open('../data/pelada.csv','a') as fd:
    for linha in all:
        timestamp1 = original1
        timestamp2 = original2
        fd.write(",".join(map(str, linha))+"\n")
        for i in range(150):
            timestamp1 = (timestamp1 + dias)
            timestamp2 = (timestamp2 + dias)
            string1 = datetime.fromtimestamp(datetime.timestamp(timestamp1))
            string2 = datetime.fromtimestamp(datetime.timestamp(timestamp2))
            linha[4] = string1
            linha[5] = string2
            fd.write(",".join(map(str, linha))+"\n")

os.remove("../data/grupo_pelada_temp.csv")

f=pd.read_csv("../data/pelada.csv") #Imput file
keep_col = ["lugar", "preco", "inicio", "fim", "id_grupo_de_pelada"] #kept columns
data = f[keep_col]
data.sort_values("id_grupo_de_pelada", inplace = True) 
data.to_csv("../data/pelada.csv", index=False)