import pandas as pd
import csv
import os
from datetime import datetime, timedelta

grupos = pd.read_csv("../data/times_final.csv")
times = grupos["id_grupo_de_pelada"]

new_f = times
new_f.to_csv("../data/grupo_pelada_temp.csv", index=False) #Output file

# current date and time
now = datetime.now()
timestamp1 = datetime.timestamp(now)
timestamp2 = datetime.timestamp(datetime.now() + timedelta(seconds=3600))

with open('../data/grupo_pelada_temp.csv','r') as csvinput:
    with open('../data/pelada.csv', 'w') as csvoutput:
        writer = csv.writer(csvoutput, lineterminator='\n')
        reader = csv.reader(csvinput)

        all = []
        row = next(reader)
        row.append("id_grupo_de_pelada")
        row.append("lugar")
        row.append("preco")
        row.append("inicio")
        row.append("fim")
        all.append(row)

        for row in reader:
            row.append("CEU")
            row.append(4.50)
            row.append(timestamp1)
            row.append(timestamp2)
            all.append(row)

        writer.writerows(all)

os.remove("../data/grupo_pelada_temp.csv")