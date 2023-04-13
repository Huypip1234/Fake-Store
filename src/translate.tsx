import i18n from "i18next";
import { useTranslation, initReactI18next } from "react-i18next";

let language = localStorage.getItem("language");
console.log("no parse" + " " + language);
if (typeof language === "string") {
  language = JSON.parse(language); // ok
}
console.log("parsed" + " " + language);

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: {
        // default
      },
    },
    vn: {
      // Import file json vao cung dc
      translation: {
        Home: "Trang chủ",
        Categories: "Danh mục",
        Contact: "Liên hệ",
        Account: "Tài khoản",
        "Log out": "Đăng xuất",
        Language: "Ngôn ngữ",
        "What are you finding?": "Bạn đang tìm sản phẩm nào?",
        "Sort by ID": "Xếp theo ID",
      },
    },
  },
  lng: language || "en",
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

const Translate = () => {
  const { t } = useTranslation();

  return <div>{t("Hellos")}</div>;
};

export default Translate;
