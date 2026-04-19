# HSMZF Website — Next.js

A full Next.js website for the Hadhrat Shaykh Maulana Muhammad Zakariyya Foundation.

---

## 📁 Project Structure

```
hsmzf-nextjs/
├── app/
│   ├── layout.tsx          ← Root layout (nav, footer, fonts)
│   ├── page.tsx            ← Home page
│   ├── globals.css         ← Global styles + CSS variables
│   ├── project/
│   │   └── page.tsx        ← The Project page
│   ├── donate/
│   │   └── page.tsx        ← Donate page
│   ├── contact/
│   │   └── page.tsx        ← Contact page
│   └── privacy/
│       └── page.tsx        ← Privacy Policy page
├── components/
│   ├── Navbar.tsx          ← Navigation bar
│   ├── Footer.tsx          ← Footer
│   └── DonateModal.tsx     ← Donation modal (used across all pages)
├── lib/
│   └── content.ts          ← ⭐ EDIT THIS FILE TO UPDATE WEBSITE CONTENT
├── package.json
├── next.config.js
└── tsconfig.json
```

---

## ✏️ How to Update Content (No Coding Required)

**All website text, phone numbers, donation amounts, and links are in one file:**

```
lib/content.ts
```

Open that file and change any text between the quote marks. For example:

```ts
// Change the phone number:
phone: "(+44) 07450 375304",   ←  just update this

// Change the progress bar:
percent: 38,   ←  change this number (0 to 100)

// Add a new value to the About section:
{ icon: "📚", title: "New Value", desc: "Description here" },
```

Save the file and the website updates automatically on next deploy.

---

## 🚀 Deployment on Hostinger (Node.js)

### Step 1 — Check your Hostinger plan
You need **Hostinger Business** plan or higher to run Node.js.
Go to hPanel → **Node.js** to confirm it's available.

### Step 2 — Upload your project

**Option A: Via Git (recommended)**
1. Push this project to a GitHub repository (free at github.com)
2. In hPanel → **Git** → connect your repository
3. Hostinger will auto-deploy on every push ✅

**Option B: Via File Manager**
1. Run `npm run build` on your local machine first
2. Zip the entire project folder
3. Upload via hPanel → **File Manager** → extract into `public_html` or a subfolder
4. Set the startup file to `server.js` (see Step 4)

### Step 3 — Set up Node.js in hPanel
1. Go to hPanel → **Advanced** → **Node.js**
2. Click **Create Application**
3. Set:
   - **Node.js version**: 18 or 20
   - **Application root**: the folder you uploaded to (e.g. `public_html/hsmzf`)
   - **Application URL**: your domain (e.g. `hsmzf.org`)
   - **Application startup file**: `server.js`

### Step 4 — Create the startup file

Create a file called `server.js` in your project root:

```js
const { createServer } = require('http')
const { parse } = require('url')
const next = require('next')

const app = next({ dev: false })
const handle = app.getRequestHandler()

app.prepare().then(() => {
  createServer((req, res) => {
    const parsedUrl = parse(req.url, true)
    handle(req, res, parsedUrl)
  }).listen(process.env.PORT || 3000, () => {
    console.log('HSMZF site running')
  })
})
```

### Step 5 — Install dependencies & build

In hPanel → **Node.js** → click **Run NPM command** and run:
```
npm install
npm run build
```

### Step 6 — Start the app
Click **Restart** in the Node.js panel. Your site is now live! 🎉

---

## 💻 Running Locally (for development)

```bash
# Install dependencies
npm install

# Start development server (with hot reload)
npm run dev

# Open browser at:
http://localhost:3000
```

---

## 🔁 How to Update the Live Site

### If using Git:
1. Edit `lib/content.ts` (or any other file)
2. Save and push to GitHub:
   ```bash
   git add .
   git commit -m "Update phone number"
   git push
   ```
3. Hostinger auto-deploys ✅

### If using File Manager:
1. Edit `lib/content.ts`
2. Run `npm run build` locally
3. Re-upload and restart Node.js in hPanel

---

## 🌐 Setting Your Domain

1. hPanel → **Domains** → point `hsmzf.org` to your hosting
2. hPanel → **Node.js** → set Application URL to `hsmzf.org`
3. hPanel → **SSL** → enable free SSL certificate

---

## 📞 Support

For help with the website contact: **USP Media Design**
For charity enquiries: Admin@hsmzf.org | (+44) 07450 375304
