import csv

with open('../data/jogadores_final (cópia).csv','r') as csvinput:
    with open('../data/jogadores_final.csv', 'w') as csvoutput:
        writer = csv.writer(csvoutput, lineterminator='\n')
        reader = csv.reader(csvinput)

        all = []
        row = next(reader)
        row.append('email')
        all.append(row)

        for row in reader:
            row.append(row[1].replace(" ", "").lower()+row[0]+"@pelada.com")
            all.append(row)

        writer.writerows(all)