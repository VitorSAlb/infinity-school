inicio = int(input("Digite o número inicial do intervalo: "))
fim = int(input("Digite o número final do intervalo: "))

soma_pares = 0
tem_pares = False

for num in range(inicio, fim + 1):
    if num % 2 == 0:
        soma_pares += num
        tem_pares = True
else:
    if not tem_pares:
        print("Não há números pares no intervalo.")

if tem_pares:
    print(f"A soma dos números pares no intervalo é: {soma_pares}")
