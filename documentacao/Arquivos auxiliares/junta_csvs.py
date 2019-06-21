import pandas as pd
import csv
import os
from datetime import datetime, timedelta

#data = pd.read_csv("../data/dados_agregados_limpos.csv")

with open('../data/dados_agregados_limpos.csv','r') as csvinput:
    with open('../data/scouts.csv', 'w') as csvoutput:
        writer = csv.writer(csvoutput, lineterminator='\n')
        reader = csv.reader(csvinput)

        all = []
        row = next(reader)
        row.append("id_pelada")
        all.append(row)

        for row in reader:
            toAppend = ''
            if(row[5] == "Atlético-GO"):
                toAppend = 336
            elif(row[5] == "Atlético-MG"):
                toAppend = 192
            elif(row[5] == "Atlético-PR"):
                toAppend = 248
            elif(row[5] == "Avaí"):
                toAppend = 272
            elif(row[5] == "Bahia"):
                toAppend = 142
            elif(row[5] == "Botafogo"):
                toAppend = 128
            elif(row[5] == "Chapecoense"):
                toAppend = 280
            elif(row[5] == "Corinthians"):
                toAppend = 136
            elif(row[5] == "Coritiba"):
                toAppend = 256
            elif(row[5] == "Cruzeiro"):
                toAppend = 200
            elif(row[5] == "Figueirense"):
                toAppend = 288
            elif(row[5] == "Flamengo"):
                toAppend = 120
            elif(row[5] == "Fluminense"):
                toAppend = 152
            elif(row[5] == "Grêmio"):
                toAppend = 208
            elif(row[5] == "Internacional"):
                toAppend = 216
            elif(row[5] == "Palmeiras"):
                toAppend = 168
            elif(row[5] == "Ponte Preta"):
                toAppend = 264
            elif(row[5] == "Santa Cruz"):
                toAppend = 312
            elif(row[5] == "Santos"):
                toAppend = 184
            elif(row[5] == "São Paulo"):
                toAppend = 176
            elif(row[5] == "Sport"):
                toAppend = 240
            elif(row[5] == "Vasco"):
                toAppend = 160
            else:
                toAppend = 224

            if(row[30] == 2015):
                toAppend += 3
            elif(row[30] == 2016):
                toAppend +=5
            elif(row[30] == 2017):
                toAppend +=7

            if(int(row[27])>19):
                toAppend +=1

            row.append(toAppend)
            all.append(row)

        writer.writerows(all)

f=pd.read_csv("../data/scouts.csv") #Imput file
keep_col = ["A","AtletaID","CA","CV","DD","DP","FC","FD","FF","FS","FT","G","GC","GS","I","PE","PP","Pontos","RB","SG","id_pelada"] #kept columns
data = f[keep_col]
data.to_csv("../data/scouts.csv", index=False)