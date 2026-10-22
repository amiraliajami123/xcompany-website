
"use strict";

document.addEventListener("DOMContentLoaded", () => {
  const languageButton = document.getElementById("languageButton");
  const menuButton = document.getElementById("menuButton");
  const navigation = document.getElementById("navigation");
  const supportForm = document.getElementById("supportForm");
  const formMessage = document.getElementById("formMessage");
  const year = document.getElementById("year");

  let currentLanguage = "fa";

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

  // شروع سایت با زبان فارسی
  setLanguage("fa");
});
