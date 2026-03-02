# 🚀 Easy GoDaddy Deployment Guide

Follow these 3 simple steps to get your website live on GoDaddy Shared Hosting.

---

### Step 1: Prepare your files
1.  In your local project folder, run this command:
    ```bash
    npm run build
    ```
2.  Select these **3 items** and put them into a **ZIP file** (name it `upload.zip`):
    *   📁 `dist` (the folder)
    *   📄 `app.js`
    *   📄 `package.json`

---

### Step 2: Upload to GoDaddy
1.  Log in to your **GoDaddy cPanel**.
2.  Open **File Manager**.
3.  Create a folder named `unique-app` (outside of `public_html`).
4.  **Upload** your `upload.zip` into that folder and **Extract** it.

---

### Step 3: Turn it on
1.  In cPanel, search for **"Setup Node.js App"**.
2.  Click **"Create Application"**.
3.  Set **Application root** to: `unique-app`
4.  Set **Application URL** to: `yourdomain.com`
5.  Set **Application startup file** to: `app.js`
6.  Click **"Create"**.
7.  Scroll down and click the big **"Run NPM Install"** button.
8.  Click **"Restart"** at the top.

**🎉 DONE! Your website is now live.**

---

### 💡 Troubleshooting "Easy Fixes"
*   **Site not showing?** Click "Restart" in the Node.js App setup page.
*   **Images missing?** Make sure the `dist` folder was uploaded correctly inside the `unique-app` folder.
*   **Need to update?** Just upload a new `dist` folder and click "Restart".
