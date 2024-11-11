usuario_correto = "admin"
senha_correta = "password123"

max_tentativas = 3

for tentativa in range(1, max_tentativas + 1):
    usuario = input("Digite o nome de usuário: ")
    senha = input("Digite a senha: ")
    
    if usuario == usuario_correto and senha == senha_correta:
        print("Bem-vindo ao sistema!")
        break
    else:
        tentativas_restantes = max_tentativas - tentativa
        if tentativas_restantes > 0:
            print(f"Credenciais incorretas. Você tem {tentativas_restantes} tentativa(s) restante(s).")
        else:
            for _ in range(3):
                print("Acesso bloqueado")
