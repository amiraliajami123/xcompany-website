
"use strict";

document.addEventListener("DOMContentLoaded", () => {
  const languageButton = document.getElementById("languageButton");
  const menuButton = document.getElementById("menuButton");
  const navigation = document.getElementById("navigation");
  const supportForm = document.getElementById("supportForm");
  const formMessage = document.getElementById("formMessage");
  const year = document.getElementById("year");
  const productSearchInput = document.getElementById("productSearchInput");
  const productSearchClear = document.getElementById("productSearchClear");
  const productSearchResults = document.getElementById("productSearchResults");

  let currentLanguage = "fa";

  const products = [
    { name: "AmirX Browser", icon: "⌕", category: "app", faCategory: "اپلیکیشن", enCategory: "App", faDescription: "مرورگر اختصاصی برای گشت‌وگذار در وب.", enDescription: "A dedicated browser for exploring the web.", keywords: "browser amirx search مرورگر جستجو" },
    { name: "XTube", icon: "▶", category: "app", faCategory: "ویدیو", enCategory: "Video", faDescription: "پلتفرم ویدیویی برای تماشای محتوا و اشتراک‌گذاری.", enDescription: "A video platform for watching and sharing content.", keywords: "video youtube ویدیو فیلم" , url: "https://amirxvideo.onrender.com" },
    { name: "XMail", icon: "✉", category: "app", faCategory: "در حال توسعه", enCategory: "In Development", faDescription: "ایده‌ای برای سرویس ایمیل اختصاصی X.", enDescription: "An idea for a dedicated X email service.", keywords: "email ایمیل نامه" },
    { name: "X COMBAT", icon: "X", category: "game", faCategory: "بازی", enCategory: "Game", faDescription: "پروژه اکشن X COMPANY در حال توسعه است.", enDescription: "An action game project by X COMPANY, in development.", keywords: "combat shooter action بازی اکشن تیراندازی" },
    { name: "X Company Store", icon: "X", category: "store", faCategory: "فروشگاه", enCategory: "Store", faDescription: "محل معرفی محصولات و دانلودهای رسمی X.", enDescription: "A place for official X products and downloads.", keywords: "store shop فروشگاه دانلود" }
  ];

  function renderProductResults() {
    if (!productSearchResults) return;
    const query = (productSearchInput?.value || "").trim().toLocaleLowerCase();
    const matches = products.filter((product) => {
      const searchable = [product.name, product.keywords, product.faDescription, product.enDescription, product.faCategory, product.enCategory].join(" ").toLocaleLowerCase();
      return !query || searchable.includes(query);
    });

    if (!matches.length) {
      productSearchResults.innerHTML = `<div class="search-empty">${currentLanguage === "fa" ? "محصولی پیدا نشد. نام محصول دیگری را امتحان کن." : "No products found. Try another search."}</div>`;
      return;
    }

    productSearchResults.innerHTML = matches.map((product) => {
      const description = currentLanguage === "fa" ? product.faDescription : product.enDescription;
      const category = currentLanguage === "fa" ? product.faCategory : product.enCategory;
      const action = product.url
        ? `<a class="text-link" href="${product.url}" target="_blank" rel="noopener noreferrer">${currentLanguage === "fa" ? "مشاهده پروژه ↗" : "Visit project ↗"}</a>`
        : `<span class="text-link">${currentLanguage === "fa" ? "اطلاعات محصول" : "Product details"}</span>`;
      return `<article class="product-result"><div class="product-result-art" aria-hidden="true"><span>${product.icon}</span></div><div class="product-result-body"><div class="product-result-meta"><small>${category}</small></div><h3>${product.name}</h3><p>${description}</p>${action}</div></article>`;
    }).join("");
  }

  // نمایش سال جاری
  if (year) {
    year.textContent = new Date().getFullYear();
  }

  // تغییر زبان فارسی و انگلیسی
  function setLanguage(language) {
    currentLanguage = language;

    document.documentElement.lang = language;
    document.documentElement.dir = language === "fa" ? "rtl" : "ltr";
    document.body.classList.toggle("english", language === "en");

    document.querySelectorAll("[data-fa][data-en]").forEach((element) => {
      const text = element.dataset[language];

      if (text !== undefined) {
        element.textContent = text;
      }
    });

    // تغییر متن placeholder ورودی‌ها
    document.querySelectorAll("[data-fa-placeholder][data-en-placeholder]")
      .forEach((element) => {
        const attribute =
          language === "fa" ? "faPlaceholder" : "enPlaceholder";

        element.placeholder = element.dataset[attribute];
      });

    // تنظیم متن دکمه زبان
    if (languageButton) {
      languageButton.textContent = language === "fa" ? "English" : "فارسی";
      languageButton.setAttribute(
        "aria-label",
        language === "fa" ? "Switch to English" : "تغییر به فارسی"
      );
    }

    // بستن منو بعد از تغییر زبان
    if (navigation) {
      navigation.classList.remove("open");
    }

    if (menuButton) {
      menuButton.setAttribute(
        "aria-expanded",
        "false"
      );
    }

    // به‌روزرسانی نتایج جست‌وجو با زبان انتخاب‌شده
    renderProductResults();

    // به‌روزرسانی پیام فرم در صورت وجود
    if (formMessage) {
      formMessage.textContent = "";
    }
  }

  if (languageButton) {
    languageButton.addEventListener("click", () => {
      setLanguage(currentLanguage === "fa" ? "en" : "fa");
    });
  }

  // منوی موبایل
  if (menuButton && navigation) {
    menuButton.setAttribute("aria-expanded", "false");

    menuButton.addEventListener("click", () => {
      const isOpen = navigation.classList.toggle("open");

      menuButton.setAttribute("aria-expanded", String(isOpen));
      menuButton.setAttribute(
        "aria-label",
        isOpen ? "بستن منو" : "باز کردن منو"
      );
    });

    navigation.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        navigation.classList.remove("open");
        menuButton.setAttribute("aria-expanded", "false");
      });
    });
  }

  // فرم پشتیبانی آزمایشی؛ اطلاعات به سرور ارسال نمی‌شود
  if (supportForm && formMessage) {
    supportForm.addEventListener("submit", (event) => {
      event.preventDefault();

      if (!supportForm.checkValidity()) {
        supportForm.reportValidity();
        return;
      }

      formMessage.textContent =
        currentLanguage === "fa"
          ? "فرم آزمایشی با موفقیت بررسی شد؛ هنوز به سرور ارسال نمی‌شود."
          : "Demo form validated successfully; it has not been sent to a server.";

      supportForm.reset();
    });
  }

  if (productSearchInput) {
    productSearchInput.addEventListener("input", renderProductResults);
  }
  if (productSearchClear && productSearchInput) {
    productSearchClear.addEventListener("click", () => {
      productSearchInput.value = "";
      renderProductResults();
      productSearchInput.focus();
    });
  }

  // شروع سایت با زبان فارسی
  setLanguage("fa");
  renderProductResults();
});
