import { Component, OnInit } from '@angular/core';
import { collection, Firestore, getDocs, deleteDoc, doc } from '@angular/fire/firestore';
import { getStorage, ref, listAll, Storage, getDownloadURL } from '@angular/fire/storage';

@Component({
  selector: 'app-delete-produtos',
  templateUrl: './delete-produtos.page.html',
  styleUrls: ['./delete-produtos.page.scss'],
})
export class DeleteProdutosPage implements OnInit {
  isToastOpen = false;
  produtos:any = []
  constructor(private storage:Storage, private firestore:Firestore) { }
  ngOnInit() {
    this.listarBanco()
  }
  async listarBanco() {
    const querySnapshot = await getDocs(collection(this.firestore, "Produtos"));
    querySnapshot.forEach((doc) => {
      console.log(`${doc.id} => ${doc.data()['nome']}`);
      this.produtos = [...this.produtos, { id: doc.id, nome: doc.data()['nome'], descricao: doc.data()['descricao'], preco: doc.data()['preco'], qtd: doc.data()['qtd'], image: doc.data()['image'] }]
    });
  }

  mensagem(isOpen: boolean){
    this.isToastOpen = isOpen;
  }

  async DeletarItem(isOpen: boolean, id:string){
    await deleteDoc(doc(this.firestore, "Produtos", id));
    this.mensagem(isOpen)
    setTimeout(() => {
      this.produtos=[]
      this.listarBanco()
    }, 2000);
  }
  
}

