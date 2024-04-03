import { useTranslation } from "react-i18next";

const Home = () => {
  // the element in this i.e. "home" should exist in "ns" i18n.js file's ns array ↓
  const { t } = useTranslation(["home"]);

  return (
    <div className="container mt-5">
      <h1 className="text-center">{t("home")}</h1>
    </div>
  );
};

export default Home;
