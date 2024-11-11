produtos = {}
for _ in range(5):
    nome = input("Digite o nome do produto: ")
    preco = float(input("Digite o preço do produto: "))
    produtos[nome] = preco
total = sum(produtos.values())
print(f"Valor total da compra: R${total:.2f}")
