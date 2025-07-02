# BreakWise: Your Healthy Break Assistant

<p align="center">
  <img src="./public/icon.png" alt="BreakWise Logo" width="150" height="150" />
</p>

**BreakWise** is a simple and elegant browser extension designed for those who spend a lot of time at the computer. It helps you take care of your health by reminding you to take regular breaks. It's the perfect tool to prevent eye strain, back pain, and maintain productivity throughout the day.

## ✨ Key Features

*   **🧘 Customizable Intervals:** Choose how often you want to be reminded to take a break.
*   **🔔 Smart Notifications:** The extension sends native desktop notifications when it's time to rest.
*   **⏱️ Countdown Timer:** Visually track the time until your next break.
*   **💡 Break Ideas:** Get helpful tips on how to spend your break beneficially.
*   **🎨 Modern & Clean UI:** A pleasant and intuitive design.
*   **🔄 Quick Restart:** An option to quickly restart the timer with the last used settings.

## 🚀 Tech Stack

The project is built on a modern technology stack, ensuring high performance and ease of development.

*   **Vue 3:** A reactive framework for building the user interface.
*   **Vite:** An incredibly fast build tool.
*   **Pinia:** Simple and intuitive state management.
*   **TypeScript:** Strong typing for code reliability.
*   **Tailwind CSS & DaisyUI:** For fast and beautiful component styling.
*   **Lucide Icons:** A set of lightweight and beautiful icons.
*   **pnpm:** A fast and efficient package manager.

## 🛠️ Installation and Setup

To get started with the project on your local machine, follow these steps.

### 1. Prerequisites

*   [Node.js](https://nodejs.org/) (version 18+)
*   [pnpm](https://pnpm.io/installation)

### 2. Installing Dependencies

Clone the repository and install all dependencies using `pnpm`.

```bash
git clone https://github.com/viktornemeta/breakwise.git
cd breakwise
pnpm install
```

### 3. Running in Development Mode

Run the project in development mode. This will allow you to see changes in real-time.

```bash
pnpm dev
```

## 📦 Building the Extension

When you are ready to create the final version of the extension for browser installation, run the build command.

```bash
pnpm build
```

This command will create a `dist` directory in the project root. This is the folder you will use for installation.

## 🌐 Chrome, Brave, Edge

Installing the extension in Chromium-based browsers is very simple.

1.  Open the extensions management page:
    *   In Chrome: `chrome://extensions`
    *   In Brave: `brave://extensions`
    *   In Edge: `edge://extensions`
2.  Enable **"Developer mode"** in the upper right corner.
3.  Click the **"Load unpacked"** button.
4.  In the window that opens, select the `dist` folder you created in the previous step.

🎉 Done! The BreakWise icon will appear in your browser's toolbar.

## ❤️ License

This project is distributed under the MIT License. See the `LICENSE` file for details. 
