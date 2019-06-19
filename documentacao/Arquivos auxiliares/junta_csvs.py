import pandas as pd
import csv
import os

jogadores = pd.read_csv("../data/jogadores_final.csv")
grupos = pd.read_csv("../data/times_final.csv")

times = grupos["id_grupo_de_pelada"]
pessoas = jogadores["id_pessoa"]

#keep_col = ["id_grupo_de_pelada"]
#new_f = f[keep_col]

new_f = pessoas
new_f.to_csv("../data/jogadores_temp.csv", index=False) #Output file

i = 0
with open('../data/jogadores_temp.csv','r') as csvinput:
    with open('../data/participa_de_grupo_de_pelada.csv', 'w') as csvoutput:
        writer = csv.writer(csvoutput, lineterminator='\n')
        reader = csv.reader(csvinput)

        all = []
        row = next(reader)
        row.append('id_grupo_de_pelada')
        all.append(row)

        for row in reader:
            i = (i + 1) % 43
            row.append(times[i])
            all.append(row)

        writer.writerows(all)

os.remove("../data/jogadores_temp.csv")