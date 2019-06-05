# importing pandas package 
import pandas as pd 

# making data frame from csv file 
data = pd.read_csv("times.csv") 

# sorting by first name 
data.sort_values("id_grupo_de_pelada", inplace = True) 

# dropping ALL duplicte values 
data.drop_duplicates(subset ="id_grupo_de_pelada", 
					keep = 'first', inplace = True) 

new_f = data
new_f.to_csv("times_unicos.csv", index=False)