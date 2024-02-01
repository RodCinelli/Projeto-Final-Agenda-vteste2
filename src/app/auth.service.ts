import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import firebase from 'firebase/compat/app';
import { Observable } from 'rxjs';
import { EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // Adicione o EventEmitter
  public userBecamePremium = new EventEmitter<void>();

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
      const downloadURL = await this.uploadAvatarAndSetUserProfile(imageFile);
  
      const userData = {
        uid: credential.user.uid,
        email: credential.user.email ?? '',
        photoURL: downloadURL,
        accountType: 'free' // Define como 'free' por padrão
      };
  
      const userRef = this.firestore.doc(`users/${credential.user.uid}`);
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
    const user = await this.afAuth.currentUser;
    if (user) {
      const userDocRef = this.firestore.doc(`users/${user.uid}`).get();
      const userDocSnapshot = await userDocRef.toPromise();
      if (userDocSnapshot && userDocSnapshot.exists) {
        const userData = userDocSnapshot.data() as any; // Assuma que userData é um tipo 'any' por enquanto
        return {
          ...userData,
          email: user.email ?? '',
          photoURL: user.photoURL ?? 'assets/default-avatar.png',
          accountType: userData?.accountType ?? 'free' // Use o operador de encadeamento opcional
        };
      } else {
        throw new Error('Documento do usuário não encontrado');
      }
    } else {
      throw new Error('Nenhum usuário logado');
    }
  }

  isLoggedIn(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.checkAuthState().subscribe(user => {
        if (user) {
          resolve(true);
        } else {
          resolve(false);
        }
      }, reject);
    });
  }

  async upgradeToPremium() {
    const user = await this.afAuth.currentUser;
    if (user) {
      const userRef = this.firestore.doc(`users/${user.uid}`);
      await userRef.update({ accountType: 'premium' });

      // Emita o evento quando o usuário se tornar premium
      this.userBecamePremium.emit();
    }
  }
}
