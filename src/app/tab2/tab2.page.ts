import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { CarrinhoService } from '../carrinho.service'; // Ajuste o caminho conforme necessário
import { ProdutoTab2 } from '../models/produtotab2.model';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
})
export class Tab2Page implements OnInit {
  produtosOriginais: ProdutoTab2[] = [
    {
      nome: 'Show Imagine Dragons Rock in Rio',
      imagem: 'assets/produtos/produto1.png',
      preco: 355.00,
      quantidade: 0
    },

    {
      nome: 'Show Ed Sheeram Rock in Rio',
      imagem: 'assets/produtos/produto2.png',
      preco: 300.00,
      quantidade: 0
    },

    {
      nome: 'Show Ivete Sangalo Rock in Rio',
      imagem: 'assets/produtos/produto3.png',
      preco: 250.99,
      quantidade: 0
    },

    {
      nome: 'Show Eric Clapton Jeunesse Arena',
      imagem: 'assets/produtos/produto4.png',
      preco: 229.99,
      quantidade: 0
    },

    {
      nome: 'Show The Calling Latin America Tour',
      imagem: 'assets/produtos/produto5.png',
      preco: 229.90,
      quantidade: 0
    },

    {
      nome: 'Show Bruce Dickinson The Mandrake Project',
      imagem: 'assets/produtos/produto6.png',
      preco: 269.99,
      quantidade: 0
    },

    {
      nome: 'Show Paul McCartney Got Back',
      imagem: 'assets/produtos/produto7.png',
      preco: 300.00,
      quantidade: 0
    },

    {
      nome: 'Peça Dilatados Teatro das Artes',
      imagem: 'assets/produtos/produto9.png',
      preco: 60.90,
      quantidade: 0
    },

    {
      nome: 'Peça o Futuro da Humanidade Teatro Vanucci',
      imagem: 'assets/produtos/produto10.png',
      preco: 40.50,
      quantidade: 0
    },

    {
      nome: 'Peça Comédia a Tapa Teatro Claro',
      imagem: 'assets/produtos/produto11.png',
      preco: 40.00,
      quantidade: 0
    },

    {
      nome: 'Peça Festa da Comédia Carioca Teatro I Love Prio',
      imagem: 'assets/produtos/produto12.png',
      preco: 43.90,
      quantidade: 0
    },

    {
      nome: 'Stand Up Comedy Porta Estreira Teatro Clara Nunes',
      imagem: 'assets/produtos/produto13.png',
      preco: 50.90,
      quantidade: 0
    },

    {
      nome: 'Stand Up Comedy Web Bullying Teatro Clara Nunes',
      imagem: 'assets/produtos/produto14.png',
      preco: 70.90,
      quantidade: 0
    },

    {
      nome: 'Filme Nosso Lar os Mensageiros 2',
      imagem: 'assets/produtos/produto16.png',
      preco: 44.00,
      quantidade: 0
    },

    {
      nome: 'Filme os Mamonas Assassinas',
      imagem: 'assets/produtos/produto17.png',
      preco: 36.00,
      quantidade: 0
    },

    {
      nome: 'Filme Mergulho Noturno',
      imagem: 'assets/produtos/produto19.png',
      preco: 36.00,
      quantidade: 0
    },

    {
      nome: 'Filme Meninas Malvadas',
      imagem: 'assets/produtos/produto20.png',
      preco: 44.00,
      quantidade: 0
    },

    {
      nome: 'Evento Gastrônomico Gastro Beer Rio',
      imagem: 'assets/produtos/produto21.png',
      preco: 20.80,
      quantidade: 0
    },

    {
      nome: 'Evento Gastrônomico Comida de Buteco',
      imagem: 'assets/produtos/produto22.png',
      preco: 35.90,
      quantidade: 0
    },

    {
      nome: 'Festival Gastronômico Macaé Culinária Show',
      imagem: 'assets/produtos/produto23.png',
      preco: 25.00,
      quantidade: 0
    },

    {
      nome: 'Festival Gastronômico Miguel Pereira',
      imagem: 'assets/produtos/produto24.png',
      preco: 23.50,
      quantidade: 0
    },

    {
      nome: 'Carnaval Bloco das Gaúchas 10 anos',
      imagem: 'assets/produtos/produto25.png',
      preco: 40.90,
      quantidade: 0
    },

    {
      nome: 'Carnaval das Artes Marina da Glória',
      imagem: 'assets/produtos/produto26.png',
      preco: 60.00,
      quantidade: 0
    },

    {
      nome: 'Carnaval Privilège Festival',
      imagem: 'assets/produtos/produto27.png',
      preco: 140.99,
      quantidade: 0
    },

    {
      nome: 'Carnaval Esbórnia Rio',
      imagem: 'assets/produtos/produto28.png',
      preco: 69.90,
      quantidade: 0
    },

    {
      nome: 'Carnaval Carna Rildy Jockey Club',
      imagem: 'assets/produtos/produto29.png',
      preco: 120.90,
      quantidade: 0
    },

    {
      nome: 'Carnaval Rio 2024 Sambódromo',
      imagem: 'assets/produtos/produto30.png',
      preco: 547.00,
      quantidade: 0
    },
  ];
  
  produtos: ProdutoTab2[] = [];
  textoPesquisa = '';

  constructor(
    private carrinhoService: CarrinhoService,
    private toastController: ToastController
  ) {}

  ngOnInit() {
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
  
  async adicionarAoCarrinho(produto: ProdutoTab2) {
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
        color: 'warning' // Cor de aviso para indicar que uma ação é necessária
      });
      toast.present();
    }
  }
}