import React, { useEffect } from "react";
import HeaderHamburger from "./HeaderHamburger";
import HeaderLogo from "./HeaderLogo";
import HeaderAuth from "./HeaderAuth";
import { useLocation } from "react-router-dom";
import { PATHS } from "../../constant/path";

const Header = () => {
  const { pathname } = useLocation();
  const isTransparent = [PATHS.HOME, PATHS.ABOUT].includes(pathname);

  useEffect(() => {
    function setBgHeader(scrollY) {
      let header = $("header");
      if (scrollY > header.height()) {
        header.addClass("--bgwhite");
      } else if (isTransparent) {
        header.removeClass("--bgwhite");
      }
    }
    function scrollBgHeader() {
      let scrollY = $(window).scrollTop();
      if ($(".header").hasClass("--transparent")) {
        setBgHeader(scrollY);
      }
    }

    window.addEventListener("scroll", scrollBgHeader);

    return () => {
      window.removeEventListener("scroll", scrollBgHeader);
    };
  }, [isTransparent]);

  return (
    <header
      className={`header --transparent ${isTransparent ? "" : "--bgwhite"}`}
    >
      <div className="container-fluid">
        <HeaderHamburger />
        <HeaderLogo />
        <HeaderAuth />
      </div>
    </header>
  );
};

export default Header;
