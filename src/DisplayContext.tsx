import React from "react";

const LanguageContext = React.createContext({ lang: "en" });

const useLanguage = () => {
  const { lang } = React.useContext(LanguageContext);
  return (
    <>
      <p>Your Selected Language : {lang}</p>
    </>
  );
};

export { useLanguage };
