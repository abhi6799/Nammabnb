"use client";

import { useCallback, useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

import useLoginModal from "../hooks/UseLoginModel";
import useRegisterModal from "../hooks/UseRegisterModel";
import useRentModal from "../hooks/UseRentModal";
import { SafeUser } from "@/app/types";
import MenuItem from "./MenuItem";
import Avatar from "../Avatar";

import { useTranslation } from "react-i18next";
import { Suspense } from "react";
import LocaleContext from "@/app/LocaleContext";
import i18n from "@/app/i18n";

interface UserMenuProps {
  currentUser?: SafeUser | null;
}

const UserMenu: React.FC<UserMenuProps> = ({ currentUser }) => {
  const router = useRouter();
  const { t } = useTranslation();
  const loginModal = useLoginModal();
  const registerModal = useRegisterModal();
  const rentModal = useRentModal();

  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = useCallback(() => {
    setIsOpen((value) => !value);
  }, []);

  const onRent = useCallback(() => {
    if (!currentUser) {
      return loginModal.onOpen();
    }

    rentModal.onOpen();
  }, [loginModal, rentModal, currentUser]);

  const [locale, setLocale] = useState(i18n.language);
  i18n.on("languageChanged", (lng: any) => setLocale(i18n.language));
  const handleChange = (event: any) => {
    i18n.changeLanguage(event.target.value);
  };
  return (
    <div className="relative">
      <div className="flex flex-row items-center gap-3">
        <LocaleContext.Provider value={{ locale, setLocale }}>
          <div
            onClick={onRent}
            className="
            hidden
            md:block
            text-sm 
            font-semibold 
            py-3 
            px-4 
            rounded-full 
            hover:bg-neutral-100 
            transition 
            cursor-pointer
          "
          >
            {t("Nammabnb your home")}
          </div>
          <div>
            <select value={locale} onChange={handleChange}>
              <option value="en">English</option>
              <option value="fr">French</option>
              <option value="sp">Spanish</option>
            </select>
          </div>
          <div
            onClick={toggleOpen}
            className="
          p-4
          md:py-1
          md:px-2
          border-[1px] 
          border-neutral-200 
          flex 
          flex-row 
          items-center 
          gap-3 
          rounded-full 
          cursor-pointer 
          hover:shadow-md 
          transition
          "
          >
            <AiOutlineMenu />
            <div className="hidden md:block">
              <Avatar src={currentUser?.image} />
            </div>
          </div>
        </LocaleContext.Provider>
      </div>
      {isOpen && (
        <div
          className="
            absolute 
            rounded-xl 
            shadow-md
            w-[40vw]
            md:w-3/4 
            bg-white 
            overflow-hidden 
            right-0 
            top-12 
            text-sm
          "
        >
          <div className="flex flex-col cursor-pointer">
            {currentUser ? (
              <>
                <MenuItem
                  label={t("My trips")}
                  onClick={() => router.push("/trips")}
                />
                <MenuItem
                  label={t("My favorites")}
                  onClick={() => router.push("/favorites")}
                />
                <MenuItem
                  label={t("My reservations")}
                  onClick={() => router.push("/reservations")}
                />
                <MenuItem
                  label={t("My properties")}
                  onClick={() => router.push("/properties")}
                />
                <MenuItem label={t("Nammabnb your home")} onClick={rentModal.onOpen} />
                <hr />
                <MenuItem label={t("Logout")} onClick={() => signOut()} />
              </>
            ) : (
              <>
                <MenuItem label={t("Login")} onClick={loginModal.onOpen} isLabelBold />
                <MenuItem label={t("Sign up")} onClick={registerModal.onOpen} />
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserMenu;