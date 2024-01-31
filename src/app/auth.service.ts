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
    private firestore: AngularFirestore // Adicione a injeção do AngularFirestore
  ) { }

  async uploadAvatarAndSetUserProfile(imageFile: File) {
    const storageRef = firebase.storage().ref();
    const avatarRef = storageRef.child(`Avatar/${Date.now()}_${imageFile.name}`);

    try {
      const snapshot = await avatarRef.put(imageFile);
      const downloadURL = await snapshot.ref.getDownloadURL();
      await this.updateUserProfile(downloadURL);
      console.log('Avatar atualizado com sucesso:', downloadURL);
    } catch (error) {
      console.error('Erro ao atualizar o avatar:', error);
      throw new Error('Falha ao fazer upload e atualizar o avatar.');
    }
  }
  
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
      }).then(() => {
        console.log('Perfil atualizado com sucesso com a nova URL do avatar.');
        // Aqui você pode adicionar lógica adicional após a atualização bem-sucedida.
      }).catch((error) => {
        console.error('Erro ao atualizar o perfil:', error);
      });
    });
  }

  async getCurrentUserProfile(): Promise<{email: string, photoURL: string}> {
    const user = await this.afAuth.currentUser;
    if (!user) {
      throw new Error('No user logged in');
    }
            return {
      email: user.email ?? '',
      photoURL: user.photoURL ?? 'assets/default-avatar.png'
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