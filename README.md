# 🐉 Wyvern Eye Overlay

Real-time Monster Hunter overlay that displays monster HP, status buildup, rage state and combat damage information.

This project is composed of **two main parts:**

- 🧠 **Backend** → Reads game memory and provides real-time data
- 🎮 **Frontend Overlay** → Displays the data visually on screen

---

# ⚠️ IMPORTANT REQUIREMENT

## ✅ This project ONLY works with **Node.js 16**

If you use Node.js **18 / 20 / 22** the backend **WILL NOT WORK correctly.**

You must install Node 16:

👉 https://nodejs.org/dist/v16.20.2/

After installing, confirm the version:

```bash
node -v
```

Expected result:

```
v16.x.x
```

---

# 📦 Installation (Step by Step)

## 1️⃣ Clone the repository

```bash
git clone https://github.com/VegaKunn/wyvern-eye-overlay.git
cd wyvern-eye-overlay
```

---

## 2️⃣ Install dependencies

```bash
npm install
```

---

## 3️⃣ Run the backend

```bash
node index.js
```

If everything is correct you will see something like:

```
Memory reading started
Waiting for monster data...
```

⚠️ The game must be **running**.

---

## 4️⃣ Run the Overlay (Frontend)

Go to the frontend project folder and run:

```bash
npm run dev
```

Then open in your browser:

```
http://localhost:3000
```

---

# 🎮 Features

- Real-time Monster HP bar
- Status buildup tracking
- Rage state detection
- Damage tracking (Last Hit / Record)
- Boss vs Minion differentiation
- Dark Mode / Light Mode
- Animated HUD cards
- Automatic monster removal when leaving area

---

# 🧠 How it Works

The backend reads the game memory and sends monster data using WebSocket.

The overlay connects to this backend and renders:

- Monster name
- HP percentage
- Status buildup
- Rage timer
- Combat damage information

Everything updates **in real time.**

---

# 🐛 Common Problems

## ❌ Backend does not start

Check Node version:

```bash
node -v
```

It must be **Node 16**

---

## ❌ No monsters appearing

Make sure:

- The game is running
- You are inside a hunt
- The backend is running **before opening the overlay**

---

## ❌ Overlay freezes

Restart:

1. Backend
2. Frontend
3. Game

---

## ☕ Support the Project

If this project helped you and you would like to support its development, you can buy me a coffee ❤️

### 🌎 International Support

Donate using Ko-fi:

👉 https://ko-fi.com/vegakun

Thank you very much for your support 🙏
Your contribution helps keep the project alive and improving.

--

# 🇧🇷 Versão em Português

## 🐉 Wyvern Eye Overlay

Overlay em tempo real para Monster Hunter que mostra:

- Vida do monstro
- Status acumulados
- Estado de Rage
- Informações de dano
- Diferença entre Boss e Minions

O projeto possui **duas partes principais:**

- 🧠 **Backend** → Lê a memória do jogo
- 🎮 **Overlay** → Mostra as informações na tela

---

# ⚠️ REQUISITO MUITO IMPORTANTE

## ✅ O projeto funciona SOMENTE com **Node.js 16**

Se usar Node **18 / 20 / 22** o backend **não irá funcionar corretamente.**

Baixe aqui:

👉 https://nodejs.org/dist/v16.20.2/

Verifique a versão:

```bash
node -v
```

Deve aparecer:

```
v16.x.x
```

---

# 📦 Instalação Passo a Passo

## 1️⃣ Clonar o projeto

```bash
git clone https://github.com/VegaKunn/wyvern-eye-overlay.git
cd wyvern-eye-overlay
```

---

## 2️⃣ Instalar dependências

```bash
npm install
```

---

## 3️⃣ Rodar o backend

```bash
node index.js
```

Você verá algo como:

```
Leitura de memória iniciada
Aguardando dados do monstro...
```

⚠️ O jogo precisa estar aberto.

---

## 4️⃣ Rodar o Overlay

Entre no projeto do frontend e execute:

```bash
npm run dev
```

Abra no navegador:

```
http://localhost:3000
```

---

# 🎮 Funcionalidades

- Barra de vida em tempo real
- Monitoramento de status
- Detecção de Rage
- Sistema de dano (Último Hit / Record)
- Diferenciação entre Boss e Minions
- Tema Dark / Light
- HUD animada
- Remoção automática de monstros fora da área

---

# 🐛 Problemas Comuns

## ❌ Backend não inicia

Verifique a versão do Node:

```bash
node -v
```

Deve ser **Node 16**

---

## ❌ Monstros não aparecem

Verifique:

- O jogo está aberto
- Você está em uma hunt
- O backend foi iniciado **antes do overlay**

---

## ❌ Overlay travou

Reinicie:

1. Backend
2. Overlay
3. Jogo

---

# ⭐ Credits

Overlay and memory reading research by **VegaKunn**

---

# ⚔️ Disclaimer

This project is for **educational and research purposes only.**
Use at your own risk.

## ☕ Apoie o Projeto

Se este projeto te ajudou de alguma forma e você deseja apoiar o desenvolvimento, considere pagar um café ❤️

### 🇧🇷 Doação via PIX

Chave PIX (aleatória):

```
0a4a9dfc-d7c6-48ed-a016-9c821683e859
```

Muito obrigado pelo apoio 🙏
Seu incentivo ajuda a manter o projeto ativo e em constante evolução.
