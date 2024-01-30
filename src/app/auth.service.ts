import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import firebase from 'firebase/compat/app';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private afAuth: AngularFireAuth,
    private firestore: AngularFirestore // Adicione a injeção do AngularFirestore
  ) { }

  loginWithEmail(email: string, password: string) {
    return this.afAuth.signInWithEmailAndPassword(email, password);
  }

  registerWithEmail(email: string, password: string) {
    return this.afAuth.createUserWithEmailAndPassword(email, password);
  }

  loginWithGoogle() {
    return this.afAuth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }

  registerWithGoogle() {
    // O método signInWithPopup é usado tanto para login quanto para registro com o Google
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
      });
    });
  }

  async getCurrentUserProfile(): Promise<{email: string, photoURL: string}> {
    const user = await this.afAuth.currentUser;
    if (!user) {
      throw new Error('No user logged in');
    }
    return {
      email: user.email ?? '', // Retorna o e-mail ou uma string vazia se não houver e-mail
      photoURL: user.photoURL ?? 'assets/default-avatar.png' // Retorna a URL do avatar ou a URL padrão
    };
  }

  async saveAvatarUrl(url: string) {
    const userId = await this.getCurrentUserId();
    if (!userId) {
      throw new Error('User not logged in');
    }

    // Salvar a URL do avatar no documento do usuário no Firestore
    return this.firestore.collection('users').doc(userId).update({
      avatarUrl: url
    });
  }

  // ... Outros métodos úteis como verificar status de autenticação
}