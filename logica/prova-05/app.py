numero_alunos = int(input("Digite o número de alunos: "))
soma_turma = 0

for _ in range(numero_alunos):
    nome = input("Digite o nome do aluno: ")
    notas = []
    for i in range(1, 4):
        nota = float(input(f"Digite a nota {i} de {nome}: "))
        notas.append(nota)
    media = sum(notas) / 3
    soma_turma += media
    status = "Aprovado" if media >= 7.0 else "Reprovado"
    print(f"\nAluno: {nome}")
    print(f"Notas: {notas[0]}, {notas[1]}, {notas[2]}")
    print(f"Média: {media:.2f}")
    print(f"Status: {status}\n")

media_geral = soma_turma / numero_alunos if numero_alunos > 0 else 0
print(f"Média geral da turma: {media_geral:.2f}")
