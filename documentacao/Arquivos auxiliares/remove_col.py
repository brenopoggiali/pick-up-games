import pandas as pd
f=pd.read_csv("2018/2018_agregados.csv") #Imput file
keep_col = ["atletas.atleta_id","atletas.pontos_num","FC","FD","FF","FS","G","I","RB","CA","PE","A","SG","DD","FT","GS","CV","GC"] #kept columns
new_f = f[keep_col]
new_f.to_csv("scouts2018.csv", index=False) #Output file