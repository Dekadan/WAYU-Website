# WAYU — World Anti-Imperialist Youth Union

Dünya Anti-Emperyalist Gençlik Birliği'nin resmî web sitesi.
İki dilli (İngilizce + Türkçe), statik olarak üretilen, panelden yönetilen bir yayın sitesi.

- **Teknoloji:** [Astro](https://astro.build) + Tailwind CSS 4
- **İçerik yönetimi:** [Sveltia CMS](https://github.com/sveltia/sveltia-cms) (Decap uyumlu) — `/admin` adresinden, GitHub hesabıyla
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

**Site: https://waiyouthunion.com** (önizleme kopyası
https://wayu.bvu-dizin.workers.dev arama motorlarına kapalı)

Site Cloudflare'de, statik dosya olarak yayında (Workers statik dosyaları;
istekler ücretsiz ve sınırsız). Ayar `wrangler.jsonc` dosyasında, yayın
klasörü `dist/`.

`main` dalına gelen her commit'i Cloudflare Workers Builds kendisi derleyip
yayınlar (build `npm run build`, deploy `npx wrangler deploy`). Panelden
kaydedilen yazı da bir commit olduğu için 1-2 dakikada sitede görünür. Elle
yayın gerekirse:

```bash
npm run build
npx wrangler deploy
```

Alan adı `waiyouthunion.com` Türk Ticaret'te kayıtlı; ad sunucuları
Cloudflare'e yönlendirildi, DNS Cloudflare'de. Eski Netlify kopyası
(`wayouthunion.netlify.app`) yerinde duruyor, kapatılabilir.

> `wayouthunion.com` (i'siz) elden çıkmış; şu an o adreste bir kumar sitesi var.

### Panel girişi

Panel: **https://waiyouthunion.com/admin** → **Sign In with GitHub**. Giriş,
Sveltia'nın Cloudflare'de çalışan küçük aracı `wayu-cms-auth` üzerinden olur
(kaynağı `~/Repos/wayu-cms-auth`, GitHub OAuth uygulaması Dekadan
hesabında). Her kayıt depoya commit olarak gider.

Yazar eklemek: kişi ücretsiz bir GitHub hesabı açar; depo sahibi
GitHub → `Dekadan/WAYU-Website` → **Settings → Collaborators → Add people**
ile kullanıcı adını ekler, kişi davet e-postasını kabul eder. Yetki aynı
yerden kaldırılır. Yazar teknik olarak kodu da değiştirebilir; her değişiklik
geçmişte kayıtlı ve geri alınabilir.

### İsim kuralı

Yürütme Kurulu ve diğer sayfalarda Avrupa ve ABD'deki bazı kişilerin adları
yayımlanmaz. Bu bölgelerden bir adı eklemeden önce sorun. Tanıtım
kitapçığının (PDF) bütün üyeleri sayan sürümü bu yüzden sitede yok; herkese
açık bir sürüm hazır olunca `src/lib/site.ts` içindeki `dossier` değerini
doldurun, indirme bağlantıları kendiliğinden geri gelir.

---

## 3. İçerik nasıl girilir

Panel `/admin` adresinde. Yedi bölüm var:

| Bölüm | Ne için | Nerede görünür |
| --- | --- | --- |
| **Statements** (Açıklamalar) | WAYU'nun resmî tutumları | `/statements` |
| **Articles** (Yazılar) | İmzalı analiz ve yorum | `/articles` |
| **News** (Haberler) | Kısa haberler | `/news` |
| **Documents** (Ana Belgeler) | Tüzük, bildirge, kongre kararları | `/documents` |
| **Authors** (Yazarlar) | Yazar profilleri | `/authors` |
| **Pages** (Sayfalar) | "WAYU Nedir" ve "Bize Katıl" sayfaları | `/about`, `/join` |
| **History** (Tarihçe) | Kongre, heyet, webinar ve eylemler; her etkinlik ayrı kayıt | `/history` |

### İki dil

Açıklama, yazı, haber, belge ve yazar kayıtlarının **her birinde panelin
üstünde EN / TR sekmeleri** vardır. Bir kaydı iki dilde de doldurduğunuzda aynı
adres hem `/articles/…` hem `/tr/articles/…` altında yayınlanır.

Yalnızca tek dilde yayınlamak tamamen geçerlidir: Türkçe girilmemiş bir yazı
Türkçe listelerde çıkmaz, İngilizce listede çıkar. Sayfalar (About / Join) her
dil için ayrı kayıt olarak listelenir.

### Yayın akışı

Panelde kaydettiğiniz anda depoya commit gider. Depo Cloudflare'e bağlıysa
site kendiliğinden yeniden üretilir (~1 dakika); bağlı değilse
`npx wrangler deploy` ile yayına çıkar.

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
