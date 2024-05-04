Este é o frontend da aplicação, inicializado com [`@react-native-community/cli`](https://github.com/react-native-community/cli).

# Configurações iniciais

> Antes de executar os passos a seguir, verifique se está tudo de acordo com as instruções do [Environment Setup do React Native](https://reactnative.dev/docs/environment-setup) até a parte "Creating a new application".

## Passo 1: Iniciar o Servidor Metro

Para iniciar o _bundler_ que faz o _ship_ do React Native, **Metro**, rode o seguinte comando no diretório frontend do Localearn (Localearn/frontend/):

```bash
# usando npm
npm start

# OU usando Yarn
yarn start
```

## Passo 2: Inicie a Aplicação

Abra um _outro terminal_, vá até o mesmo diretório Localearn/frontend, e rode um dos comandos dependendo do sistema-alvo:

### Para o Android

```bash
# usando npm
npm run android

# OU usando Yarn
yarn android
```

### Para o iOS

```bash
# usando npm
npm run ios

# OU usando Yarn
yarn ios
```

Se tiver configurado emuladores ou simuladores corretamente, então o App deve rodar corretamente. Se tiver conectado a um dispositivo, não se esqueça de configurá-lo ao projeto; para o Android, você pode usar o adb.

```bash
# com este comando, deve aparecer seu device com um Id
adb devices

# quando rodar no android, passe o Id do comando anterior
npx react-native run-android --deviceId=Id_do_device
```

Você também pode rodar diretamente no Android Studio e no Xcode.
