import pandas as pd
f=pd.read_csv("../data/dados_agregados_limpos.csv") #Imput file
keep_col = ["AtletaID", "ClubeID"] #kept columns
data = f[keep_col]
# sorting by first name 
data.sort_values("AtletaID", inplace = True) 

# dropping ALL duplicte values 
data.drop_duplicates(subset ="AtletaID", 
					keep = 'first', inplace = True) 

grupos = pd.read_csv("../data/times_final.csv")
grupos["ClubeID"] = grupos["ClubeID"].str.replace(" ", "")

final = pd.merge(data, grupos, on='ClubeID', how='inner')

lista = ["AtletaID", "id_grupo_de_pelada"]
final = final[lista]

final.to_csv("../data/participa_de_grupo_de_pelada.csv", index=False) #Output file