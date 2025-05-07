# 🏴‍☠️ Pirate Bay — On-Chain Swap Interface

**Pirate Bay** — это интерфейс для свапов токенов внутри Arbitrum, на основе [Squid Router](https://www.squidrouter.com/).

---

## 🧭 Основные функции
- **Он-чейн свапы** через Squid Router (например, ETH → USDT)
- **Проверка баланса и разрешений** (approve) для ERC-20 токенов
- **Интеграция с кошельками** через RainbowKit и Wagmi
- **Реактивное состояние** с Zustand
- **Оптимизация данных** через TanStack Query

---

## 🛠 Технологии
- **React** + **TypeScript** — для интерфейса
- **RainbowKit** + **Wagmi** — для подключения кошельков
- **@0xsquid/sdk** — для он-чейн свапов
- **Zustand** — для управления глобальным состоянием
- **TanStack Query** — для кэширования и оптимизации запросов
- **Vite** — для сборки проекта

---

## 🔧 Установка и запуск

### 1. Клонируйте репозиторий
```bash
git clone https://github.com/fillvinno/Pirate-Bay.git
cd Pirate-Bay
```
### 2. Установите зависимости
```bash
npm install
```

### 3. Получите свой integratorId на [Squid Dashboard](https://squidrouter.typeform.com/integrator-id)
- Замените **integratorId** в squid.ts на свой

### 4. Запуск в dev-режиме
```bash
npm run dev
```

- Откройте http://localhost:5173 в браузере.

### 5. Сборка проекта
```bash
npm run build
```
- Собранный проект будет в папке dist/

---

## 🧪 Использование

- Подключите кошелёк через RainbowKit (MetaMask, WalletConnect и др.)
- Выберите токены
- Введите сумму для свапа
- Нажмите Approve, если токены не одобрены для маршрутизатора
- Нажмите Swap для выполнения транзакции
