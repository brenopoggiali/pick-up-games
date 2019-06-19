import pandas as pd
f=pd.read_csv("../data/dados_agregados_limpos.csv") #Imput file
keep_col = ["AtletaID", "ClubeID"] #kept columns
data = f[keep_col]
# sorting by first name 
data.sort_values("AtletaID", inplace = True) 

# dropping ALL duplicte values 
data.drop_duplicates(subset ="AtletaID", 
					keep = 'first', inplace = True) 

data["ClubeID"] = data["ClubeID"].str.replace("Atlético-GO", "373")
data["ClubeID"] = data["ClubeID"].str.replace("Atlético-MG", "282")
data["ClubeID"] = data["ClubeID"].str.replace("Atlético-PR", "293")
data["ClubeID"] = data["ClubeID"].str.replace("Avaí", "314")
data["ClubeID"] = data["ClubeID"].str.replace("Bahia", "265")
data["ClubeID"] = data["ClubeID"].str.replace("Botafogo", "263")
data["ClubeID"] = data["ClubeID"].str.replace("Chapecoense", "315")
data["ClubeID"] = data["ClubeID"].str.replace("Corinthians", "264")
data["ClubeID"] = data["ClubeID"].str.replace("Coritiba", "294")
data["ClubeID"] = data["ClubeID"].str.replace("Cruzeiro", "283")
data["ClubeID"] = data["ClubeID"].str.replace("Figueirense", "316")
data["ClubeID"] = data["ClubeID"].str.replace("Flamengo", "262")
data["ClubeID"] = data["ClubeID"].str.replace("Fluminense", "266")
data["ClubeID"] = data["ClubeID"].str.replace("Grêmio", "284")
data["ClubeID"] = data["ClubeID"].str.replace("Internacional", "285")
data["ClubeID"] = data["ClubeID"].str.replace("Palmeiras", "275")
data["ClubeID"] = data["ClubeID"].str.replace("Ponte Preta", "303")
data["ClubeID"] = data["ClubeID"].str.replace("Santa Cruz", "344")
data["ClubeID"] = data["ClubeID"].str.replace("Santos", "277")
data["ClubeID"] = data["ClubeID"].str.replace("São Paulo", "276")
data["ClubeID"] = data["ClubeID"].str.replace("Sport", "292")
data["ClubeID"] = data["ClubeID"].str.replace("Vasco", "267")
data["ClubeID"] = data["ClubeID"].str.replace("Vitória", "287")

data.to_csv("../data/participa_de_grupo_de_pelada.csv", index=False) #Output file