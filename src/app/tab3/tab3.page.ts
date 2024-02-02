import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { CarrinhoService } from '../carrinho.service';
import { ProdutoTab3 } from '../models/produtotab3.model';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
})
export class Tab3Page implements OnInit {
  user: any; 
  produtosOriginais: ProdutoTab3[] = [
    {
      nome: 'Show Imagine Dragons Rock in Rio',
      imagem: 'assets/produtos/produtodesconto1.png',
      precoOriginal: 355.00, // Preço antes do desconto
      preco: 270.00, // Preço com desconto
      quantidade: 0
    },

    {
      nome: 'Show Paul McCartney Got Back',
      imagem: 'assets/produtos/produtodesconto2.png',
      precoOriginal: 300.00, // Preço antes do desconto
      preco: 250.00, // Preço com desconto
      quantidade: 0
    },

    {
      nome: 'Show Ivete Sangalo Rock in Rio',
      imagem: 'assets/produtos/produtodesconto3.png',
      precoOriginal: 250.99, // Preço antes do desconto
      preco: 180.00, // Preço com desconto
      quantidade: 0
    },

    {
      nome: 'Show Eric Clapton Jeunesse Arena',
      imagem: 'assets/produtos/produtodesconto4.png',
      precoOriginal: 229.99, // Preço antes do desconto
      preco: 170.90, // Preço com desconto
      quantidade: 0
    },

    {
      nome: 'Peça Dilatados Teatro das Artes',
      imagem: 'assets/produtos/produtodesconto5.png',
      precoOriginal: 60.90, // Preço antes do desconto
      preco: 40.90, // Preço com desconto
      quantidade: 0
    },

    {
      nome: 'Peça Comédia a Tapa Teatro Claro',
      imagem: 'assets/produtos/produtodesconto6.png',
      precoOriginal: 40.00, // Preço antes do desconto
      preco: 35.00, // Preço com desconto
      quantidade: 0
    },

    {
      nome: 'Peça Festa da Comédia Carioca Teatro I Love Prio',
      imagem: 'assets/produtos/produtodesconto7.png',
      precoOriginal: 43.90, // Preço antes do desconto
      preco: 33.90, // Preço com desconto
      quantidade: 0
    },

    {
      nome: 'Stand Up Comedy Web Bullying Teatro Clara Nunes',
      imagem: 'assets/produtos/produtodesconto8.png',
      precoOriginal: 70.90, // Preço antes do desconto
      preco: 55.90, // Preço com desconto
      quantidade: 0
    },

    {
      nome: 'Filme Nosso Lar os Mensageiros 2',
      imagem: 'assets/produtos/produtodesconto9.png',
      precoOriginal: 44.00, // Preço antes do desconto
      preco: 22.00, // Preço com desconto
      quantidade: 0
    },

    {
      nome: 'Filme os Mamonas Assassinas',
      imagem: 'assets/produtos/produtodesconto10.png',
      precoOriginal: 36.00, // Preço antes do desconto
      preco: 18.00, // Preço com desconto
      quantidade: 0
    },

    {
      nome: 'Filme Meninas Malvadas',
      imagem: 'assets/produtos/produtodesconto11.png',
      precoOriginal: 44.00, // Preço antes do desconto
      preco: 22.00, // Preço com desconto
      quantidade: 0
    },

    {
      nome: 'Evento Gastrônomico Gastro Beer Rio',
      imagem: 'assets/produtos/produtodesconto12.png',
      precoOriginal: 20.80, // Preço antes do desconto
      preco: 15.80, // Preço com desconto
      quantidade: 0
    },

    {
      nome: 'Festival Gastronômico Macaé Culinária Show',
      imagem: 'assets/produtos/produtodesconto13.png',
      precoOriginal: 25.00, // Preço antes do desconto
      preco: 17.00, // Preço com desconto
      quantidade: 0
    },

    {
      nome: 'Carnaval Bloco das Gaúchas 10 anos',
      imagem: 'assets/produtos/produtodesconto14.png',
      precoOriginal: 40.90, // Preço antes do desconto
      preco: 32.90, // Preço com desconto
      quantidade: 0
    },

    {
      nome: 'Carnaval Privilège Festival',
      imagem: 'assets/produtos/produtodesconto15.png',
      precoOriginal: 140.99, // Preço antes do desconto
      preco: 100.99, // Preço com desconto
      quantidade: 0
    },

    {
      nome: 'Carnaval Rio 2024 Sambódromo',
      imagem: 'assets/produtos/produtodesconto16.png',
      precoOriginal: 547.00, // Preço antes do desconto
      preco: 340.00, // Preço com desconto
      quantidade: 0
    },
  ];

  produtos: ProdutoTab3[] = [];
  textoPesquisa = '';

  constructor(
    private carrinhoService: CarrinhoService,
    private toastController: ToastController,
    private authService: AuthService // Injete o serviço de autenticação aqui
  ) {}

  ngOnInit() {
    this.loadProducts();
    this.authService.userBecamePremium.subscribe(() => {
      this.loadUserProfile();
    });
    this.loadUserProfile(); // Mova esta linha para aqui
  }
  
  async loadUserProfile() {
    if (await this.authService.isLoggedIn()) {
      try {
        this.user = await this.authService.getCurrentUserProfile();
        console.log('User after getCurrentUserProfile:', this.user);
      } catch (error) {
        console.error('Erro ao obter perfil do usuário', error);
      }
    } else {
      console.log('Nenhum usuário logado');
    }
  }
  
  loadProducts() {
    this.produtos = [...this.produtosOriginais];
  }

  incrementarProduto(index: number) {
    this.produtos[index].quantidade++;
  }

  decrementarProduto(index: number) {
    if (this.produtos[index].quantidade > 0) {
      this.produtos[index].quantidade--;
    }
  }

  async adicionarAoCarrinho(produto: ProdutoTab3) {
    if (!this.user) {
      console.log('User is undefined');
    } else {
      console.log('User:', this.user);
      console.log('Account type:', this.user.accountType);
    }
  
    // Verifique se this.user não é undefined antes de tentar acessar this.user.accountType
    if (this.user && this.user.accountType !== 'premium') {
      const toast = await this.toastController.create({
        message: 'Apenas usuários premium podem adicionar itens com desconto ao carrinho.',
        duration: 2000,
        position: 'top',
        color: 'warning'
      });
      toast.present();
      return;
    }
  
    if (produto.quantidade > 0) {
      this.carrinhoService.adicionarAoCarrinho(produto);
      const toast = await this.toastController.create({
        message: 'Item adicionado ao carrinho!',
        duration: 2000,
        position: 'top',
        color: 'success'
      });
      toast.present();
    } else {
      const toast = await this.toastController.create({
        message: 'Selecione ao menos uma quantidade antes de adicionar ao carrinho',
        duration: 2000,
        position: 'top',
        color: 'warning'
      });
      toast.present();
    }
  }

  calcularDesconto(produto: ProdutoTab3): string {
    const desconto = ((produto.precoOriginal - produto.preco) / produto.precoOriginal) * 100;
    return `${desconto.toFixed(0)}% OFF`; // Arredonda o percentual e adiciona a string 'OFF'
  }

  pesquisar() {
    if (this.textoPesquisa.trim().length === 0) {
      this.mostrarMensagemVazio();
      this.produtos = [...this.produtosOriginais];
    } else {
      this.produtos = this.produtosOriginais.filter(produto => produto.nome.toLowerCase().includes(this.textoPesquisa.toLowerCase()));
    }
  }
  
  async mostrarMensagemVazio() {
    const toast = await this.toastController.create({
      message: 'O campo de busca está vazio',
      duration: 2000,
      position: 'top',
      color: 'warning'
    });
    toast.present();
  }
}
