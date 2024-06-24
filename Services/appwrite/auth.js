import conf from "../../src/conf/conf";
import { Client, Account, ID } from "appwrite";

export class AuthService {
  client = new Client();
  account;
  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl) // Your API Endpoint
      .setProject(conf.appwriteProjectId);
      this.account = new Account(this.client)
  }

  async createAccount({email,password,name}){
    try {
       const userAccount = await this.create(ID.unique(),email,password,name);
       if(userAccount){
        // call login method
        return this.login({email,password})
       }else{
        return userAccount;
       }
    } catch (error) {
        throw error
    }
  }

  async login ({email,password}){
    try {
       return  await this.account.createEmailPasswordSession(email,password);
    } catch (error) {
        throw error
    }
  }

  async getCurrentUser(){
    try {
        return this.account.get()
    } catch (error) {
        throw error
    }
    return null;
  }

  async logout (){
    try {
        await this.client.account.deleteSession();
    } catch (error) {
        throw error
    }
  }

}

const authService = new AuthService();

export default authService;
