# WAYU — World Anti-Imperialist Youth Union

Dünya Anti-Emperyalist Gençlik Birliği'nin resmî web sitesi.
İki dilli (İngilizce + Türkçe), statik olarak üretilen, panelden yönetilen bir yayın sitesi.

- **Teknoloji:** [Astro](https://astro.build) + Tailwind CSS 4
- **İçerik yönetimi:** [Decap CMS](https://decapcms.org) — `/admin` adresinden
- **Çıktı:** tamamen statik HTML; sunucu, veritabanı, aylık maliyet yok

---

## 1. Hızlı başlangıç

```bash
npm install
npm run dev          # http://localhost:4321
```

Panelde yerel olarak çalışmak için ikinci bir terminalde:

```bash
npm run cms          # decap-server, http://localhost:4321/admin
```

`npm run cms` çalışırken paneldeki değişiklikler doğrudan bilgisayarınızdaki
dosyalara yazılır — GitHub'a dokunmaz. Yayındaki sitede panel değişiklikleri
depoya commit olarak gider.

| Komut | Ne yapar |
| --- | --- |
| `npm run dev` | Geliştirme sunucusu |
| `npm run build` | `dist/` klasörüne siteyi üretir |
| `npm run preview` | Üretilen siteyi yerelde sunar |
| `npm run check` | Tip ve içerik şeması denetimi |
| `npm run cms` | Panel için yerel arka uç |

---

## 2. Yayın durumu

**Site yayında: https://wayouthunion.netlify.app**

Netlify projesi kuruldu (`wayouthunion`, hesap: tahakucukuygun) ve mevcut
sürüm elle yüklendi. Geriye iki adım kaldı ve **ikisi de Netlify arayüzünden
yapılmalı** — API ile yapılamıyor.

### Kalan adım 1: Depoyu bağla (panel bunsuz çalışmaz)

Netlify → **Site configuration → Build & deploy → Continuous deployment →
Link repository** → GitHub → `Dekadan/WAYU-Website` → dal `main`.

Build komutu `npm run build`, yayın klasörü `dist` (zaten `netlify.toml`'da).

Bu bağlantı olmadan panelden yapılan değişiklikler depoya yazılamaz ve site
kendiliğinden yenilenmez. Bağlandıktan sonra her `main` push'u siteyi otomatik
günceller.

### Kalan adım 2: Panelin girişini aç

1. Netlify → **Identity** → **Enable Identity**
2. **Identity → Services → Git Gateway** → **Enable**
3. **Identity → Registration** → **Invite only**
   (aksi hâlde herkes kayıt olup içerik yazabilir)
4. **Identity → Invite users** ile yazı girecek arkadaşları davet edin
5. Davet bağlantısına tıklayan kişi doğrudan `/admin` panelinde açılır

### Alan adı

Şu an `wayouthunion.netlify.app` üzerinde. Kendi alan adınızı alınca:

1. Netlify → **Domain management** → alan adını ekleyin
2. `astro.config.mjs` içindeki `site` değerini yeni alan adıyla değiştirin —
   ya da Netlify'da `SITE_URL` ortam değişkenini tanımlayın
3. `public/robots.txt` içindeki `Sitemap:` satırını güncelleyin

> `wayouthunion.com` elden çıkmış; şu an o adreste bir kumar sitesi var.
> Geri almayı düşünüyorsanız ayrıca ele almak gerekir.

> **Not:** `wayouthunion.com` alan adı elden çıkmış durumda; şu anda o adreste
> bir kumar sitesi yayın yapıyor. Eski alan adını geri almayı düşünüyorsanız
> bunu ayrıca ele almak gerekir.

### Netlify hesabında yapılan bir ayar değişikliği

Netlify yeni ücretsiz hesaplarda **tüm siteleri giriş arkasına alan** bir koruma
(`site_sso_login`) açık başlatıyor; site bu yüzden herkese 401 döndürüyordu.
Siteyi yayına almak için bu ayar hesap düzeyinde kapatıldı. Sitelerinizi tekrar
gizlemek isterseniz Netlify → **Team settings → Site protection** üzerinden geri
açabilirsiniz.

### Netlify yerine başka bir yer (Cloudflare Pages, Vercel, GitHub Pages)

Site kendiliğinden çalışır (`npm run build`, `dist/` klasörünü yayınlayın).
Yalnızca panelin girişini GitHub'a çevirmeniz gerekir — `public/admin/config.yml`
dosyasının başındaki `backend` bloğunu şununla değiştirin:

```yaml
backend:
  name: github
  repo: Dekadan/WAYU-Website
  branch: main
  base_url: https://<oauth-sunucunuz>
```

GitHub arka ucu bir OAuth aracısı ister; Decap belgelerindeki
[GitHub backend](https://decapcms.org/docs/github-backend/) adımlarını izleyin.
Bu yolda içerik girecek herkesin depoya yazma yetkisi olan bir GitHub hesabı
olması gerekir — bu yüzden Netlify daha pratiktir.

---

## 3. İçerik nasıl girilir

Panel `/admin` adresinde. Altı bölüm var:

| Bölüm | Ne için | Nerede görünür |
| --- | --- | --- |
| **Statements** (Açıklamalar) | WAYU'nun resmî tutumları | `/statements` |
| **Articles** (Yazılar) | İmzalı analiz ve yorum | `/articles` |
| **News** (Haberler) | Kısa haberler | `/news` |
| **Documents** (Ana Belgeler) | Tüzük, bildirge, kongre kararları | `/documents` |
| **Authors** (Yazarlar) | Yazar profilleri | `/authors` |
| **Pages** (Sayfalar) | "WAYU Nedir" ve "Bize Katıl" sayfaları | `/about`, `/join` |

### İki dil

Açıklama, yazı, haber, belge ve yazar kayıtlarının **her birinde panelin
üstünde EN / TR sekmeleri** vardır. Bir kaydı iki dilde de doldurduğunuzda aynı
adres hem `/articles/…` hem `/tr/articles/…` altında yayınlanır.

Yalnızca tek dilde yayınlamak tamamen geçerlidir: Türkçe girilmemiş bir yazı
Türkçe listelerde çıkmaz, İngilizce listede çıkar. Sayfalar (About / Join) her
dil için ayrı kayıt olarak listelenir.

### Yayın akışı

Panel **editöryel akış** ile çalışır: kaydettiğiniz içerik önce **taslak**
olur, "Ready" ve ardından "Publish" dediğinizde yayına girer. Yayınlandığı anda
depoya commit gider ve site yeniden üretilir (Netlify'da ~1 dakika).

Bir içeriği yayından kaldırmadan gizlemek için **Draft** kutusunu işaretleyin.

### Alanlar hakkında birkaç not

- **Summary (Özet):** listelerde, arama sonuçlarında ve sosyal medya
  önizlemesinde görünen paragraf. Boş bırakmayın.
- **Image description (Görsel açıklaması):** ekran okuyucu kullanan okurun
  resim yerine duyduğu metin. Görsel eklediyseniz mutlaka doldurun.
- **Pin to homepage (Öne çıkar):** içeriği anasayfanın en üstündeki büyük
  alana sabitler. Aynı anda birden fazla içeriği öne çıkarabilirsiniz;
  en yenisi başa geçer.
- **Author (Yazar):** açılır listeden seçilir. Yazıyı girmeden önce yazarı
  **Authors** bölümünde oluşturun. Bir yazar iki dilde de yazıyorsa profilini
  iki dilde, **aynı dosya adıyla** oluşturun; Türkçe profil yoksa site
  İngilizce profile döner, imza hiçbir zaman boş kalmaz.
- **Order (Sıra) — yalnızca belgelerde:** belgeler tarihe göre değil bu sayıya
  göre sıralanır, küçükten büyüğe. Tüzük 1'dir.

### Görseller

Panelden yüklenen görseller `public/uploads/` klasörüne gider. Yükleme sınırı
yok ama büyük dosyalar siteyi yavaşlatır — fotoğrafları yüklemeden önce
**1600 piksel genişliğe** indirip JPEG olarak kaydetmeniz iyi olur.

---

## 4. Sitedeki mevcut içerik

Site boş değil; **gerçek WAYU materyaliyle** dolduruldu. Hepsi TGB'nin
sitesinden alındı ve her kaydın altında kaynak bağlantısı var:

| Bölüm | İçerik | Tarih |
| --- | --- | --- |
| Açıklamalar | Filistin Gençlik Zirvesi Sonuç Bildirgesi (tam metin) | 19.11.2025 |
| Açıklamalar | Yeni Zelanda saldırısı üzerine açıklama | 16.03.2019 |
| Haberler | Filistin'deki Soykırıma Karşı Uluslararası Gençlik Zirvesi | 19.11.2025 |
| Haberler | İstanbul'daki Uluslararası Antiemperyalist Gençlik Şöleni | 25.05.2026 |
| Haberler | General Kasım Süleymani anısına konferans | 02.01.2021 |
| Haberler | Hindistan çiftçi ayaklanması konferansı | 19.01.2021 |

Hepsi İngilizce ve Türkçe olarak girildi. Metinler kaynaktan birebir ya da
sadık bir çeviriyle aktarıldı — uydurma içerik yok.

**Yazılar ve Yazarlar bölümü kasten boş.** Oraya uluslararası yazarlarınızın
metinleri girecek. Alanların nasıl çalıştığını gösteren birer örnek kayıt
panelde **taslak** olarak duruyor; ilk gerçek yazınızı girdikten sonra silin.

### Görsellerin hakları

Görseller `tgb.gen.tr`den alındı ve `public/uploads/` altında duruyor. TGB bir
WAYU üyesi olduğu ve içerikler WAYU'nun kendi faaliyetleri olduğu için bu makul
görünüyor, **ama kullanım hakkını yine de teyit edin.** Elinizde bu
etkinliklerin orijinal fotoğrafları varsa panelden değiştirin — özellikle
İstanbul şöleni görseli kaynağında düşük çözünürlüklü (398 piksel), yerine
yüksek çözünürlüklü bir kare koymanız iyi olur.

### Ayrıca kontrol edilecekler:

- [ ] `src/lib/site.ts` — iletişim e-postası ve sosyal medya hesapları.
      Buradaki adresler tahmini olarak dolduruldu, **doğrulayın**.
- [ ] `src/content/pages/*/about.md` — kuruluş bilgileri (2014 İstanbul, 23
      örgüt / 12 ülke, 2018 sonrası 40 örgüt / 25 ülke / 6 kıta) açık
      kaynaklardan alındı. Kendi arşivinizle karşılaştırın.
- [ ] `astro.config.mjs` içindeki `site` ve `public/robots.txt` içindeki
      `Sitemap:` — gerçek alan adı.

---

## 5. Depo yapısı

```
src/
├── content/              # Bütün içerik. Panel buraya yazar.
│   ├── statements/{en,tr}/
│   ├── articles/{en,tr}/
│   ├── news/{en,tr}/
│   ├── documents/{en,tr}/
│   ├── authors/{en,tr}/
│   └── pages/{en,tr}/
├── content.config.ts     # İçerik şeması — hangi alan hangi tipte
├── pages/                # Adresler. `/…` İngilizce, `/tr/…` Türkçe
├── views/                # Sayfa gövdeleri (iki dil de aynısını kullanır)
├── layouts/              # Sayfa iskeletleri
├── components/           # Başlık, altbilgi, kart, imza…
├── i18n/ui.ts            # Arayüz metinleri (menü, düğme, etiket)
├── lib/site.ts           # İletişim ve sosyal medya bilgileri
└── styles/global.css     # Renkler, yazı tipleri, makale tipografisi

public/
├── admin/config.yml      # Panelin yapılandırması
└── uploads/              # Panelden yüklenen görseller
```

**Yeni bir arayüz metni** eklemek için `src/i18n/ui.ts` içine iki dilde de
yazın. **Renkleri değiştirmek** için `src/styles/global.css` dosyasının
başındaki değişkenlere bakın — açık ve koyu tema ayrı ayrı tanımlı.

---

## 6. Sitede olanlar

- İki dilli yayın, `hreflang` etiketleriyle (arama motorları için doğru dil)
- Açık / koyu tema, sistem tercihini izler, başlıktaki düğmeyle değiştirilir
- Her dil için ayrı RSS akışı: `/rss.xml` ve `/tr/rss.xml`
- Otomatik `sitemap.xml`
- Sosyal medya önizleme kartları (Open Graph + Twitter)
- Etikete göre süzme (açıklama, yazı ve haber listelerinde)
- Yazar sayfaları — bir yazarın bütün yazıları tek yerde
- Klavyeyle gezinme ve ekran okuyucu desteği
- Telefon, tablet ve masaüstünde tam uyumlu
