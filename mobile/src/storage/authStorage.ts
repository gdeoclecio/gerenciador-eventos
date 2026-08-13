import AsyncStorage from "@react-native-async-storage/async-storage";

const TOKEN_KEY = "token";
const EMAIL_KEY = "email_salvo";
const SENHA_KEY = "senha_salva";

export async function salvarToken(token: string) {
  await AsyncStorage.setItem(TOKEN_KEY, token);
}

export async function obterToken() {
  return AsyncStorage.getItem(TOKEN_KEY);
}

export async function removerToken() {
  await AsyncStorage.removeItem(TOKEN_KEY);
}
export async function salvarCredenciais(email: string, senha: string) {
  await AsyncStorage.setItem(EMAIL_KEY, email);
  await AsyncStorage.setItem(SENHA_KEY, senha);
}

export async function obterCredenciais() {
  const email = await AsyncStorage.getItem(EMAIL_KEY);
  const senha = await AsyncStorage.getItem(SENHA_KEY);

  return { email, senha };
}

export async function removerCredenciais() {
  await AsyncStorage.removeItem(EMAIL_KEY);
  await AsyncStorage.removeItem(SENHA_KEY);
}