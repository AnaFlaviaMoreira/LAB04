/**
 * SISTEMA DE GERENCIAMENTO DE BIBLIOTECA
 * Arquivo: index.ts
 */

// 1. Classe Livro
class Livro {
    // Propriedades com modificadores de acesso explícitos
    public codigo: number;
    public titulo: string;
    public autor: string;
    public disponivel: boolean;

    // Construtor para inicializar as propriedades
    constructor(codigo: number, titulo: string, autor: string, disponivel: boolean = true) {
        this.codigo = codigo;
        this.titulo = titulo;
        this.autor = autor;
        this.disponivel = disponivel;
    }
}

// 2. Classe Biblioteca
class Biblioteca {
    // Propriedade privada para encapsular a lista de livros
    private acervo: Livro[];

    constructor() {
        // Inicializa o acervo como um array vazio
        this.acervo = [];
    }

    // Método para adicionar um novo livro ao acervo
    public adicionarLivro(livro: Livro): void {
        this.acervo.push(livro);
        console.log(`[SUCESSO] Livro "${livro.titulo}" adicionado ao acervo.`);
    }

    // Método para registrar o empréstimo
    public registrarEmprestimo(codigo: number): void {
        const livroEncontrado = this.acervo.find((livro) => livro.codigo === codigo);

        // Tratamento de erro 1: Livro não existe
        if (!livroEncontrado) {
            console.error(`[ERRO] Tentativa de empréstimo falhou. Livro com código ${codigo} não encontrado.`);
            return;
        }

        // Tratamento de erro 2: Livro já está emprestado
        if (!livroEncontrado.disponivel) {
            console.error(`[ERRO] O livro "${livroEncontrado.titulo}" já está emprestado no momento.`);
            return;
        }

        // Marca como indisponível se passar nas validações
        livroEncontrado.disponivel = false;
        console.log(`[SUCESSO] Empréstimo do livro "${livroEncontrado.titulo}" registrado.`);
    }

    // Método para consultar se o livro está disponível
    public consultarDisponibilidade(codigo: number): boolean {
        const livroEncontrado = this.acervo.find((livro) => livro.codigo === codigo);

        // Tratamento de erro: Livro não existe
        if (!livroEncontrado) {
            console.error(`[ERRO] Consulta falhou. Livro com código ${codigo} não encontrado.`);
            return false;
        }

        return livroEncontrado.disponivel;
    }
}

// 3. Funções para testar o sistema
function testarSistema(): void {
    console.log("=== INICIANDO SISTEMA DA BIBLIOTECA ===\n");
    
    const biblioteca = new Biblioteca();

    // a) Função/Passo para cadastrar livros (pelo menos 3 instâncias)
    const livro1 = new Livro(101, "O Senhor dos Anéis", "J.R.R. Tolkien");
    const livro2 = new Livro(102, "1984", "George Orwell");
    const livro3 = new Livro(103, "Dom Quixote", "Miguel de Cervantes");

    console.log("--- Cadastrando Livros ---");
    biblioteca.adicionarLivro(livro1);
    biblioteca.adicionarLivro(livro2);
    biblioteca.adicionarLivro(livro3);

    // c) Função/Passo para consultar disponibilidade
    console.log("\n--- Consultando Disponibilidade Inicial ---");
    const disponivelAntes = biblioteca.consultarDisponibilidade(101);
    console.log(`O livro 101 está disponível? ${disponivelAntes ? 'Sim' : 'Não'}`);

    // b) Função/Passo para registrar empréstimo
    console.log("\n--- Realizando Empréstimos ---");
    biblioteca.registrarEmprestimo(101); // Deve ter sucesso
    
    // Testando os tratamentos de erro
    console.log("\n--- Testando Tratamento de Erros ---");
    biblioteca.registrarEmprestimo(101); // Deve dar erro (já emprestado)
    biblioteca.registrarEmprestimo(999); // Deve dar erro (não existe)
    biblioteca.consultarDisponibilidade(999); // Deve dar erro (não existe)

    console.log("\n--- Consultando Disponibilidade Final ---");
    const disponivelDepois = biblioteca.consultarDisponibilidade(101);
    console.log(`O livro 101 está disponível após o empréstimo? ${disponivelDepois ? 'Sim' : 'Não'}`);
}

// Executando os testes
testarSistema();