# 🟢 Module 01: Installation & Setup Guide

> **Setting up your digital workshop: Node.js, pnpm, Vite, and your first `@alcspower/ui` component.**

---

## 📚 What You'll Learn

Welcome to the hands-on building phase! In this module, we will transform your computer into a modern web development workshop. By the end of this chapter, you will:

- 🛠️ **Install Node.js & pnpm**: Understand why these tools are necessary and install them safely.
- ⚡ **Scaffold a Project with Vite**: Generate a clean, blazing-fast React + TypeScript project in seconds.
- 🔑 **Configure Access to `@alcspower/ui`**: Set up your private `.npmrc` file to pull packages from GitHub Packages.
- 📦 **Install the Core Libraries**: Add `@alcspower/ui` and the `lucide-react` icon library to your project.
- 🎨 **Import Design System Styles**: Connect `@alcspower/ui/styles.css` so buttons and components look gorgeous immediately.
- 🚀 **Run the Development Server**: Start Vite and see your project live in your web browser.
- 🔘 **Render Your First Button**: Write your first real code with `@alcspower/ui` in `App.tsx`.
- 🩺 **Troubleshoot Setup Issues**: Solve token authentication, Node version mismatches, and CSS styling bugs like a pro.

---

## 🧰 What You Will Need

Before opening the terminal, make sure you have:

1. **A Modern Web Browser**: Google Chrome, Mozilla Firefox, Microsoft Edge, or Apple Safari.
2. **Visual Studio Code (VS Code)**: Free to download from [https://code.visualstudio.com/](https://code.visualstudio.com/).
3. **An Internet Connection**: To download the project templates and component packages.

---

## ⚙️ Step 1: Installing Node.js (Version 20+)

### What is Node.js and Why Do We Need It?
Normally, web browsers are the only place JavaScript can run. In 2009, an engineer took Google Chrome's JavaScript engine and created **Node.js**, which allows JavaScript to run directly on your computer's operating system. 

Think of Node.js as the electricity and power tools in your workshop. We need it to run build tools like Vite, manage packages, and bundle our application.

### How to Install Node.js:
1. Open your browser and go to the official website: **[https://nodejs.org/](https://nodejs.org/)**.
2. You will see two green download buttons:
   - **LTS (Long Term Support)**: *Recommended for most users.* Click this one! (It will be version 20 or 22+).
   - **Current**: Latest experimental features (skip this one).
3. Download the installer for your system (Windows `.msi`, macOS `.pkg`, or Linux).
4. Run the installer and accept the standard default settings (keep clicking "Next" and then "Finish").

```
+-------------------------------------------------------------+
|                     OFFICIAL NODE.JS DOWNLOAD               |
|                                                             |
|           [ Download Node.js (LTS) - Recommended ]          |
|                                                             |
|         v20.x.x or v22.x.x LTS (Long Term Support)          |
+-------------------------------------------------------------+
```

### Verify Your Installation
Once the installation finishes, let's verify that your computer recognizes Node.js.

1. Open your terminal:
   - **Windows**: Press `Win + R`, type `powershell` (or `cmd`), and hit Enter.
   - **macOS**: Press `Cmd + Space`, type `Terminal`, and hit Enter.
   - **VS Code**: Open VS Code, press `Ctrl + \`` (backtick) or go to the top menu and select **Terminal > New Terminal**.
2. Type the following command and press Enter:

```bash
node -v
```

You should see an output showing the version number, like this:
```bash
v20.18.0
```
*(As long as the number starts with `v20.` or higher, you are good to go!)*

Also verify that `npm` (Node Package Manager) was installed alongside Node:
```bash
npm -v
```
*(Should output `10.x.x` or similar).*

---

## ⚡ Step 2: Installing pnpm

### What is pnpm and Why is it Better Than npm?
When you download libraries for a project, standard `npm` copies hundreds of megabytes of files into every single project folder on your computer. If you have 5 projects, you store 5 identical copies of React!

**pnpm** (Performant npm) is a modern package manager that uses a smart global store. If three projects use the same package, pnpm shares it on your hard drive. It is:
- **Up to 3x faster** than traditional npm.
- **Saves gigabytes** of disk space.
- Prevents sneaky phantom dependency bugs.

### How to Install pnpm:
Node.js comes with a tool called **Corepack** designed to manage package managers effortlessly. Run this in your terminal:

```bash
# Enable the built-in Corepack tool
corepack enable

# Prepare the latest version of pnpm
corepack prepare pnpm@latest --activate
```

*Alternative method (if Corepack gives a permission warning):*
```bash
npm install -g pnpm
```

### Verify Your pnpm Installation:
Run:
```bash
pnpm -v
```
You should see a version number like `9.12.0` or higher. Excellent!

---

## 🏗️ Step 3: Create Your React Project with Vite

### What is Vite?
In French, *"vite"* means *fast* (pronounced *veet*). 

**Vite** is a modern build tool that creates a lightning-fast local web server. When you make a change in your code and save the file, Vite updates only the changed component in your browser in less than 50 milliseconds! You don't even have to manually refresh the page.

### Generating Your Project:
We are going to create our project folder named `my-contacts` using the official React + TypeScript template.

Run these three commands in your terminal, one by one:

```bash
# 1. Ask Vite to scaffold a new React + TypeScript application
pnpm create vite my-contacts --template react-ts

# 2. Enter into your newly created project folder
cd my-contacts

# 3. Download the base project dependencies
pnpm install
```

Let's understand what just happened:
- `pnpm create vite my-contacts`: Tells Vite to create a new folder named `my-contacts`.
- `--template react-ts`: Specifies that we want React pre-configured with TypeScript.
- `cd my-contacts`: Moves your terminal prompt *inside* that project directory.
- `pnpm install`: Downloads React, TypeScript, and Vite onto your computer.

---

## 🔑 Step 4: Configure Access to `@alcspower/ui`

`@alcspower/ui` is hosted securely on **GitHub Packages**. Because GitHub Packages requires authentication, we need to tell pnpm where to find packages that start with the `@alcspower` prefix and provide an access token.

We do this with a tiny configuration file called `.npmrc` placed right in the root of your `my-contacts` folder.

### Creating the `.npmrc` File:
In your terminal, while still inside the `my-contacts` directory, run:

```bash
# Point all @alcspower packages to GitHub Packages registry
echo '@alcspower:registry=https://npm.pkg.github.com' >> .npmrc

# Provide your GitHub Personal Access Token
echo '//npm.pkg.github.com/:_authToken=YOUR_TOKEN_HERE' >> .npmrc
```

> [!IMPORTANT]
> Replace `YOUR_TOKEN_HERE` with your actual GitHub Personal Access Token (classic or fine-grained) that has `read:packages` permissions.

### What Does the `.npmrc` File Look Like?
If you open `.npmrc` in VS Code, it will contain these two lines:
```ini
@alcspower:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=YOUR_TOKEN_HERE
```

This tells pnpm: *"Whenever the developer asks to install a package starting with `@alcspower`, don't look on the public npm registry; look on `npm.pkg.github.com` using this authentication token."*

---

## 📦 Step 5: Install `@alcspower/ui` & Icons

Now that our `.npmrc` file is in place, we can install the design system library and the industry-standard icon package `lucide-react`:

Run this command in your terminal:

```bash
pnpm add @alcspower/ui lucide-react
```

You will see pnpm download the packages in a matter of seconds:
```text
Progress: resolved 145, reused 142, downloaded 3, added 145, done
Done in 2.4s
```

Congratulations! `@alcspower/ui` is now part of your project!

---

## 🎨 Step 6: Import `@alcspower/ui` Styles

Every modern component library comes with CSS styles that define its colors, animations, borders, and shadows.

To make sure all `@alcspower/ui` components look beautiful and styled, we need to import its stylesheet into the root entry file of our application: `src/main.tsx`.

1. Open your project folder `my-contacts` in VS Code.
2. In the left file explorer sidebar, expand the `src` folder and open `main.tsx`.
3. Add the following import at the top of the file:

```tsx
// src/main.tsx
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

// 🎨 CRITICAL: Import the @alcspower/ui master stylesheet!
// Without this line, components will appear as raw, unstyled HTML.
import '@alcspower/ui/styles.css';

// Import our base CSS styles
import './index.css';

// Import our main application component
import App from './App.tsx';

// Mount our React application into the web browser's root element
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
```

> [!TIP]
> Notice the comment above `import '@alcspower/ui/styles.css';`. Importing styles at the very top of `main.tsx` ensures that every button, card, and dropdown across your entire app receives its styling before anything renders!

---

## 🔘 Step 7: Verify Everything Works in `App.tsx`

Now comes the exciting moment: rendering your very first `@alcspower/ui` component on screen!

1. In VS Code, open `src/App.tsx`.
2. Delete whatever sample code Vite put inside it.
3. Replace the entire contents of `src/App.tsx` with the following clean, commented code:

```tsx
// src/App.tsx
// 1. Import the Button component from the design library
import { Button } from '@alcspower/ui';

// 2. Define our main application component
export default function App() {
  return (
    // We use a clean container with padding and a pleasant background
    <main className="min-h-screen bg-slate-50 p-8 flex flex-col items-center justify-center font-sans text-slate-900">
      <div className="max-w-md w-full bg-white p-6 rounded-xl shadow-md border border-slate-200 text-center space-y-4">
        {/* An encouraging header */}
        <h1 className="text-2xl font-bold text-slate-800">
          Hello, @alcspower/ui! 🎉
        </h1>
        
        <p className="text-sm text-slate-600">
          If you can see the styled button below with rounded corners and nice colors,
          your development workshop is 100% configured correctly!
        </p>

        {/* 3. Render our first @alcspower/ui Button */}
        <div className="pt-2 flex justify-center gap-3">
          <Button 
            variant="primary" 
            size="md"
            onClick={() => alert('Woohoo! Your workshop is ready! 🚀')}
          >
            Click Me!
          </Button>
        </div>
      </div>
    </main>
  );
}
```

---

## 🚀 Step 8: Launch Your Local Development Server

Now, let's start the Vite local development server and admire your work in the browser!

In your terminal (inside the `my-contacts` directory), type:

```bash
pnpm dev
```

You will see output similar to this:

```text
  VITE v6.0.0  ready in 230 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
  ➜  press h + enter to show help
```

### Viewing Your App:
1. Hold `Ctrl` (or `Cmd` on Mac) and click the link `http://localhost:5173/` in your terminal.
2. Or open your web browser manually and type `http://localhost:5173` into the address bar.
3. You will see your card with the headline *"Hello, @alcspower/ui! 🎉"* and a styled blue button!
4. Click the button—an alert will pop up saying *"Woohoo! Your workshop is ready! 🚀"*.

```
+-------------------------------------------------------------+
|  http://localhost:5173/                                     |
+-------------------------------------------------------------+
|                                                             |
|              +-------------------------------+              |
|              |   Hello, @alcspower/ui! 🎉    |              |
|              |                               |              |
|              |   If you can see the styled   |              |
|              |   button below, everything is |              |
|              |   working!                    |              |
|              |                               |              |
|              |         [ Click Me! ]         |              |
|              +-------------------------------+              |
|                                                             |
+-------------------------------------------------------------+
```

---

## 🩺 What Can Go Wrong? (Troubleshooting Guide)

Setting up an environment for the first time is where most beginners encounter hiccups. Here are the top 4 common issues and how to fix them in seconds:

### Issue 1: `401 Unauthorized` or `E401` when running `pnpm add @alcspower/ui`
- **Symptom**: The terminal prints `npm ERR! 401 Unauthorized` or says `Unable to authenticate with GitHub Packages`.
- **Cause**: Either your `.npmrc` file is missing, has a typo in the token, or the GitHub token does not have permission to read packages.
- **Solution**:
  1. Open `.npmrc` in your project root.
  2. Make sure the token on the second line is valid and has `read:packages` checked in GitHub Settings > Developer Settings > Personal Access Tokens.
  3. Ensure there are no spaces around the `=` sign in `_authToken=ghp_xxxx`.

### Issue 2: The Button looks like raw, plain blue underlined text or an ugly gray rectangle
- **Symptom**: The button renders, but it has no rounded corners, no soft background color, or hover effects.
- **Cause**: You forgot to import `@alcspower/ui/styles.css` in `src/main.tsx`.
- **Solution**:
  1. Open `src/main.tsx`.
  2. Verify that `import '@alcspower/ui/styles.css';` is present near the top.
  3. Save the file and check your browser again.

### Issue 3: `Port 5173 is already in use`
- **Symptom**: Vite prints `Port 5173 is in use, trying another one...` and opens on `http://localhost:5174`.
- **Cause**: Another terminal or application is already using port 5173.
- **Solution**: No problem at all! Vite automatically chose port 5174. Just open `http://localhost:5174` in your browser instead.

### Issue 4: `command not found: node` or `command not found: pnpm`
- **Symptom**: The terminal says the command does not exist.
- **Cause**: Your terminal was open while you were installing Node.js, so it hasn't reloaded your system PATH variables yet.
- **Solution**: Completely close your terminal (or VS Code) and reopen it.

---

## 🎯 Mini-Exercise: Experiment With Your Button

Now that your server is running with live hot-reloading, try these 3 quick experiments in `src/App.tsx`:

1. **Change the Variant**:
   Change `variant="primary"` to `variant="destructive"`.  
   Press save (`Ctrl + S`). Notice how the button instantly turns into a sleek warning red without you even refreshing the page!

2. **Add a Second Button**:
   Add a second button right next to it with `variant="outline"`:
   ```tsx
   <Button variant="outline" size="md">
     Cancel
   </Button>
   ```
   Save the file and watch both buttons appear side-by-side.

3. **Try a Loading State**:
   Add the `isLoading` prop to your button:
   ```tsx
   <Button variant="primary" isLoading loadingText="Connecting...">
     Submit
   </Button>
   ```
   Notice how the button automatically shows a smooth spinner and changes its text!

---

---

## 🔑 Deep Dive: How to Generate Your GitHub Personal Access Token

Because `@alcspower/ui` is hosted on GitHub Packages, beginners often ask: *"Where do I get that `YOUR_TOKEN_HERE` token?"*

Here is the exact step-by-step walkthrough to get your token in under 60 seconds:

```
+--------------------------------------------------------------------------+
|                     GENERATING A GITHUB ACCESS TOKEN                     |
+--------------------------------------------------------------------------+
|  1. Log into your account at https://github.com/                         |
|  2. Click your Profile Picture in the top-right corner.                  |
|  3. Click "Settings".                                                    |
|  4. Scroll to the bottom of the left sidebar and click:                  |
|     "Developer settings"                                                 |
|  5. Click "Personal access tokens" -> "Tokens (classic)"                 |
|  6. Click "Generate new token" -> "Generate new token (classic)"         |
|  7. In Note, type: "alcspower packages access"                           |
|  8. Under Scopes, CHECK the box: [x] read:packages                       |
|  9. Click the green "Generate token" button at the bottom.               |
|  10. COPY the token immediately (it looks like: ghp_xxxxxxxxxxxx).       |
|      GitHub will only display it to you once!                            |
+--------------------------------------------------------------------------+
```

Once you have your token:
1. Open your `.npmrc` file.
2. Replace `YOUR_TOKEN_HERE` with your copied `ghp_...` token.
3. Save the file. That's it!

---

## 📄 Understanding Your `package.json` File

When you ran `pnpm create vite` and `pnpm add @alcspower/ui`, Vite and pnpm generated a `package.json` file in your project root. Let's look inside and understand what each section does:

```json
{
  "name": "my-contacts",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc -b && vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "@alcspower/ui": "^0.1.0",
    "lucide-react": "^0.450.0",
    "react": "^19.0.0",
    "react-dom": "^19.0.0"
  },
  "devDependencies": {
    "@types/react": "^19.0.0",
    "@types/react-dom": "^19.0.0",
    "@vitejs/plugin-react": "^4.3.0",
    "typescript": "^5.6.0",
    "vite": "^6.0.0"
  }
}
```

### Key Sections Explained:
- **`scripts`**: These are shortcuts you can run from your terminal:
  - `pnpm dev`: Starts your local development server for live coding.
  - `pnpm build`: Bundles your application into highly optimized HTML, CSS, and JS files ready to publish on the internet.
  - `pnpm preview`: Lets you test your production build locally before deploying.
- **`dependencies`**: The packages your application actually needs to run in the user's browser (React, `@alcspower/ui`, Lucide icons).
- **`devDependencies`**: The tools used only while developing on your computer (TypeScript compiler, Vite build engine). These are not sent to your users.

---

## 🛑 How to Stop and Restart the Vite Dev Server

When you want to stop working or shut down your computer:
1. Go to your terminal where Vite is running.
2. Press `Ctrl + C` (on both Windows and Mac).
3. If Windows asks `Terminate batch job (Y/N)?`, type `Y` and press Enter.

Whenever you want to start working again tomorrow:
1. Open your terminal in the `my-contacts` folder.
2. Run `pnpm dev`.
3. Open `http://localhost:5173` in your browser. You're right back in action!

---

---

## 💻 Beginner Terminal Primer: The 5 Commands You Need to Know

If you have never opened a terminal before, seeing a dark window with a blinking cursor can feel intimidating.

Remember this: **the terminal is simply a text-based conversation with your computer.** Instead of double-clicking a folder icon with your mouse, you type a command and press Enter.

Here are the only 5 commands you will ever need for this entire course:

```
+--------------------------------------------------------------------------+
|                       BEGINNER TERMINAL CHEAT SHEET                      |
+--------------------------------------------------------------------------+
|  Command         | What it means               | Example Usage           |
|------------------|-----------------------------|-------------------------|
|  cd <folder>     | "Change Directory" (enter)  | cd my-contacts          |
|  cd ..           | "Go back" one folder up     | cd ..                   |
|  ls (or dir)     | "List" all files in folder  | ls                      |
|  clear (or cls)  | "Wipe screen clean"         | clear                   |
|  Ctrl + C        | "Stop running server"       | (Stops Vite dev server) |
+--------------------------------------------------------------------------+
```

### Terminal Safety Guarantee:
Running commands like `pnpm create vite` or `pnpm dev` operates **strictly inside the folder you created**. It cannot modify your system files, format your hard drive, or delete your personal photos. You are completely safe to explore!

---

## ✅ Summary

- **Node.js** powers your local development tools, and **pnpm** is your ultra-fast package manager.
- **The terminal** is just a text conversation with your computer; basic commands like `cd`, `ls`, and `Ctrl + C` are all you need.
- **Vite** creates a high-performance local web server that updates in milliseconds when you save files.
- The **`.npmrc`** file authenticates your project with GitHub Packages so you can install `@alcspower/ui`.
- Importing **`@alcspower/ui/styles.css`** in `src/main.tsx` activates the design system's styling tokens.
- Your project is now 100% operational and ready to build real user interfaces!

In the next module, we will explore our first core components: **Buttons**, **Badges**, **Avatars**, and **Cards**, and assemble our very first contact card!

---

### Navigation
| Previous | Home | Next |
| :---: | :---: | :---: |
| [← Module 00: Conceptual Introduction](00-introduction.md) | [Home](README.md) | [Module 02: Your First UI Building Blocks →](02-first-component.md) |


