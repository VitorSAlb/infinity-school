import json

def carregar_tarefas():
    try:
        with open('tarefas.json', 'r') as arquivo:
            return json.load(arquivo)
    except FileNotFoundError:
        return []

def salvar_tarefas(tarefas):
    with open('tarefas.json', 'w') as arquivo:
        json.dump(tarefas, arquivo, indent=4)

def adicionar_tarefa(tarefas):
    nome = input("Digite o nome da tarefa: ")
    descricao = input("Digite a descrição da tarefa: ")
    prioridade = input("Digite a prioridade (Alta, Média, Baixa): ")
    categoria = input("Digite a categoria: ")
    tarefa = {
        "nome": nome,
        "descricao": descricao,
        "prioridade": prioridade,
        "categoria": categoria,
        "concluida": False
    }
    tarefas.append(tarefa)
    salvar_tarefas(tarefas)
    print("Tarefa adicionada com sucesso.")

def listar_tarefas(tarefas):
    if not tarefas:
        print("Nenhuma tarefa encontrada.")
        return
    for idx, tarefa in enumerate(tarefas, 1):
        status = "Concluída" if tarefa["concluida"] else "Pendente"
        print(f"{idx}. {tarefa['nome']} - {tarefa['descricao']} | Prioridade: {tarefa['prioridade']} | Categoria: {tarefa['categoria']} | Status: {status}")

def marcar_concluida(tarefas):
    listar_tarefas(tarefas)
    if not tarefas:
        return
    try:
        numero = int(input("Digite o número da tarefa a ser marcada como concluída: "))
        if 1 <= numero <= len(tarefas):
            tarefas[numero - 1]["concluida"] = True
            salvar_tarefas(tarefas)
            print("Tarefa marcada como concluída.")
        else:
            print("Número de tarefa inválido.")
    except ValueError:
        print("Entrada inválida.")

def exibir_por_prioridade(tarefas):
    prioridade = input("Digite a prioridade para filtrar (Alta, Média, Baixa): ")
    filtradas = [t for t in tarefas if t["prioridade"].lower() == prioridade.lower()]
    if not filtradas:
        print(f"Nenhuma tarefa encontrada com prioridade {prioridade}.")
        return
    for tarefa in filtradas:
        status = "Concluída" if tarefa["concluida"] else "Pendente"
        print(f"{tarefa['nome']} - {tarefa['descricao']} | Categoria: {tarefa['categoria']} | Status: {status}")

def exibir_por_categoria(tarefas):
    categoria = input("Digite a categoria para filtrar: ")
    filtradas = [t for t in tarefas if t["categoria"].lower() == categoria.lower()]
    if not filtradas:
        print(f"Nenhuma tarefa encontrada na categoria {categoria}.")
        return
    for tarefa in filtradas:
        status = "Concluída" if tarefa["concluida"] else "Pendente"
        print(f"{tarefa['nome']} - {tarefa['descricao']} | Prioridade: {tarefa['prioridade']} | Status: {status}")

def excluir_tarefa(tarefas):
    listar_tarefas(tarefas)
    if not tarefas:
        return
    try:
        numero = int(input("Digite o número da tarefa a ser excluída: "))
        if 1 <= numero <= len(tarefas):
            tarefas.pop(numero - 1)
            salvar_tarefas(tarefas)
            print("Tarefa excluída com sucesso.")
        else:
            print("Número de tarefa inválido.")
    except ValueError:
        print("Entrada inválida.")

def menu():
    tarefas = carregar_tarefas()
    while True:
        print("\n--- Gerenciador de Tarefas ---")
        print("1. Adicionar Tarefa")
        print("2. Listar Tarefas")
        print("3. Marcar Tarefa como Concluída")
        print("4. Exibir Tarefas por Prioridade")
        print("5. Exibir Tarefas por Categoria")
        print("6. Excluir Tarefa")
        print("7. Sair")
        escolha = input("Escolha uma opção: ")
        if escolha == '1':
            adicionar_tarefa(tarefas)
        elif escolha == '2':
            listar_tarefas(tarefas)
        elif escolha == '3':
            marcar_concluida(tarefas)
        elif escolha == '4':
            exibir_por_prioridade(tarefas)
        elif escolha == '5':
            exibir_por_categoria(tarefas)
        elif escolha == '6':
            excluir_tarefa(tarefas)
        elif escolha == '7':
            print("Saindo do Gerenciador de Tarefas. Até logo!")
            break
        else:
            print("Opção inválida. Tente novamente.")

if __name__ == "__main__":
    menu()
