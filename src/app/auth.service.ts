import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import firebase from 'firebase/compat/app';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // Método para verificar o estado de autenticação
  public checkAuthState(): Observable<firebase.User | null> {
    return this.afAuth.authState;
  }

  constructor(
    private afAuth: AngularFireAuth,
    private firestore: AngularFirestore
  ) { }

  async uploadAvatarAndSetUserProfile(imageFile: File) {
    const storageRef = firebase.storage().ref();
    const avatarRef = storageRef.child(`Avatar/${Date.now()}_${imageFile.name}`);
  
    try {
      console.log('Iniciando o upload do avatar...');
      const snapshot = await avatarRef.put(imageFile);
      console.log('Upload do avatar concluído.');
  
      console.log('Obtendo a URL de download do avatar...');
      const downloadURL = await snapshot.ref.getDownloadURL();
      console.log('URL de download do avatar obtida:', downloadURL);
  
      console.log('Atualizando o perfil do usuário com a nova URL do avatar...');
      await this.updateUserProfile(downloadURL);
      console.log('Perfil do usuário atualizado com sucesso.');
  
      console.log('Obtendo o ID do usuário atual...');
      const userId = await this.getCurrentUserId();
      console.log('ID do usuário atual obtido:', userId);
  
      if (userId) {
        console.log('Atualizando o documento do usuário com a nova URL do avatar...');
        const userRef = this.firestore.doc(`users/${userId}`);
        await userRef.update({ photoURL: downloadURL });
        console.log('Documento do usuário atualizado com sucesso.');
      }
    } catch (error) {
      console.error('Erro ao atualizar o avatar:', error);
      throw new Error('Falha ao fazer upload e atualizar o avatar.');
    }
  }
  
  loginWithEmail(email: string, password: string) {
    return this.afAuth.signInWithEmailAndPassword(email, password);
  }

  async registerWithEmail(email: string, password: string) {
    const credential = await this.afAuth.createUserWithEmailAndPassword(email, password);
    if (credential.user) {
      const userRef = this.firestore.doc(`users/${credential.user.uid}`);
      const userData = {
        uid: credential.user.uid,
        email: credential.user.email ?? '',
      };
      await userRef.set(userData, { merge: true });
    }
    return credential;
  }

  loginWithGoogle() {
    return this.afAuth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }

  registerWithGoogle() {
    return this.afAuth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }

  logout() {
    return this.afAuth.signOut();
  }

  async getCurrentUserId(): Promise<string | undefined> {
    const user = await this.afAuth.currentUser;
    return user?.uid;
  }
  
  updateUserProfile(url: string) {
    return this.afAuth.currentUser.then(user => {
      return user?.updateProfile({
        photoURL: url
      }).then(() => {
        console.log('Perfil atualizado com sucesso com a nova URL do avatar.');
      }).catch((error) => {
        console.error('Erro ao atualizar o perfil:', error);
      });
    });
  }

  async getCurrentUserProfile() {
    const user = firebase.auth().currentUser;
    if (user) {
      const userDoc = await firebase.firestore().doc(`users/${user.uid}`).get();
      if (userDoc.exists) {
        const userData = userDoc.data();
        console.log('Dados do usuário:', userData);
        return userData;
      } else {
        throw new Error('Documento do usuário não encontrado');
      }
    } else {
      throw new Error('Nenhum usuário logado');
    }
  }
}