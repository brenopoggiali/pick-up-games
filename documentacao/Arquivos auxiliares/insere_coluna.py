import csv

with open('jogadores_unicos (cópia).csv','r') as csvinput:
    with open('jogadores_final.csv', 'w') as csvoutput:
        writer = csv.writer(csvoutput, lineterminator='\n')
        reader = csv.reader(csvinput)

        all = []
        row = next(reader)
        row.append('email')
        all.append(row)

        for row in reader:
            row.append(row[1].replace(" ", "").lower()+"@pelada.com")
            all.append(row)

        writer.writerows(all)