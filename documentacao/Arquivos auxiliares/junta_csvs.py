import pandas as pd
import csv
import os
from datetime import datetime, timedelta

grupos = pd.read_csv("../data/times_final.csv")
#times = grupos["id_grupo_de_pelada"]

lista = ["nome", "id_grupo_de_pelada"]
new_f = grupos[lista]
new_f.to_csv("../data/grupo_pelada_temp.csv", index=False) #Output file

# current date and time
now = datetime.now()
timestamp1 = datetime.timestamp(now)
timestamp2 = datetime.timestamp(datetime.now() + timedelta(seconds=3600))

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

        for row in reader:
            row.append("Campo do " + row[0])
            row.append(4.50)
            row.append(timestamp1)
            row.append(timestamp2)
            row.append(row[1])
            all.append(row)

        writer.writerows(all)

with open('../data/pelada.csv','a') as fd: #Mexer nisso pra adicionar as linhas atuais *8
    for linha in all:
        fd.write(",".join(map(str, linha))+"\n")
        fd.write(",".join(map(str, linha))+"\n")
        fd.write(",".join(map(str, linha))+"\n")
        fd.write(",".join(map(str, linha))+"\n")
        fd.write(",".join(map(str, linha))+"\n")
        fd.write(",".join(map(str, linha))+"\n")
        fd.write(",".join(map(str, linha))+"\n")

os.remove("../data/grupo_pelada_temp.csv")

f=pd.read_csv("../data/pelada.csv") #Imput file
keep_col = ["lugar", "preco", "inicio", "fim", "id_grupo_de_pelada"] #kept columns
data = f[keep_col]
data.sort_values("id_grupo_de_pelada", inplace = True) 
data.to_csv("../data/pelada.csv", index=False)