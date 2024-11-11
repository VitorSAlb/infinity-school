numero_secreto = 7

max_tentativas = 3

tentativas = 0

print("Bem-vindo ao Jogo de Adivinhação!")
print(f"Você tem {max_tentativas} tentativas para adivinhar o número correto.")

while tentativas < max_tentativas:
    try:

        palpite = int(input(f"Tentativa {tentativas + 1}: Digite seu palpite: "))
    except ValueError:
        print("Por favor, insira um número válido.")
        continue 

    tentativas += 1 

    if palpite == numero_secreto:
        print("Parabéns! Você acertou o número!")
        break  
    elif palpite < numero_secreto:
        print("O número secreto é maior. Tente novamente.")
    else:
        print("O número secreto é menor. Tente novamente.")

else:
    print(f"Suas tentativas acabaram. O número secreto era {numero_secreto}. Melhor sorte na próxima vez!")

print("Obrigado por jogar!")
