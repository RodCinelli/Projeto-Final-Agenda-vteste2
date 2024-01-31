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

  async uploadAvatarAndSetUserProfile(imageFile: File): Promise<string> {
    const storageRef = firebase.storage().ref();
    const avatarRef = storageRef.child(`Avatar/${Date.now()}_${imageFile.name}`);

    try {
        const snapshot = await avatarRef.put(imageFile);
        const downloadURL = await snapshot.ref.getDownloadURL();
        await this.updateUserProfile(downloadURL);
        console.log('Avatar atualizado com sucesso:', downloadURL);
        return downloadURL;  // Retorna a URL de download
    } catch (error) {
        console.error('Erro ao atualizar o avatar:', error);
        throw new Error('Falha ao fazer upload e atualizar o avatar.');
    }
  }

  loginWithEmail(email: string, password: string) {
    return this.afAuth.signInWithEmailAndPassword(email, password);
  }

  async registerWithEmail(email: string, password: string, imageFile: File) {
    const credential = await this.afAuth.createUserWithEmailAndPassword(email, password);
    if (credential.user) {
        // Primeiro, faça o upload do avatar
        const downloadURL = await this.uploadAvatarAndSetUserProfile(imageFile);

        // Em seguida, crie o documento do usuário no Firestore com a URL do avatar
        const userRef = this.firestore.doc(`users/${credential.user.uid}`);
        const userData = {
            uid: credential.user.uid,
            email: credential.user.email ?? '',
            photoURL: downloadURL  // Use a URL de download do avatar
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
