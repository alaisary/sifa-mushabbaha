# الصرف: الصفة المشبّهة مع عائشة الريامية — open-slide deck

Slide deck for **أ. أسماء الحارثية**, الصف الثاني عشر, built with [open-slide](https://www.npmjs.com/package/@open-slide/core).

## Run locally

```sh
npm install
npm run dev
```

Then open <http://localhost:5173/s/sifa-mushabbaha>. On Windows, double-click `▶ تشغيل العرض.bat` instead.

## Deploy (Cloudflare Pages)

```sh
sh deploy/build.sh
npx wrangler pages deploy dist --project-name sifa-mushabbaha
```

## Folders

- `slides/sifa-mushabbaha` — the deck source
- `slides/sifa-mushabbaha-nashat` — نشاط ختامي تفاعلي (click to reveal answers), at `/s/sifa-mushabbaha-nashat`
