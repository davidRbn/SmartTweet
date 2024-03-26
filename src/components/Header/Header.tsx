import React, { useContext } from "react";
import { Disclosure } from "@headlessui/react";
import Button from "../Button/Button";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";
import BurgerMenu from "../BurgerMenu/BurgerMenu";
import Credit from "../credit/Credit";

// const navigation = [
//   { name: "Dashboard", href: "#", current: true },
//   { name: "Team", href: "#", current: false },
//   { name: "Projects", href: "#", current: false },
//   { name: "Calendar", href: "#", current: false },
// ];

type ToggleSigninSignup = "SIGNIN" | "SIGNUP" | "LOGIN";

type HeaderProps = {
  toggleSigninSignup: ToggleSigninSignup;
  setToggleSigninSignup: React.Dispatch<
    React.SetStateAction<ToggleSigninSignup>
  >;
};

const Header = ({ toggleSigninSignup, setToggleSigninSignup }: HeaderProps) => {
  const naviguate = useNavigate();
  const { user } = useContext(AuthContext);

  return (
    <Disclosure as="nav" className="bg-gray-800">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <div
                  onClick={() => naviguate("/")}
                  className="flex flex-shrink-0 items-center text-xl font-extrabold text-neutral-100 cursor-pointer"
                >
                  SmartTweet
                </div>
                {/* <div className="hidden sm:ml-6 sm:block">
                  <div className="flex space-x-4">
                    {navigation.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        className={classNames(
                          item.current
                            ? "bg-gray-900 text-white"
                            : "text-gray-300 hover:bg-gray-700 hover:text-white",
                          "rounded-md px-3 py-2 text-sm font-medium"
                        )}
                        aria-current={item.current ? "page" : undefined}
                      >
                        {item.name}
                      </a>
                    ))}
                  </div>
                </div> */}
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                {/* <Menu as="div" className="relative ml-3">
                  <div>
                    <Menu.Button className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                      <span className="absolute -inset-1.5" />
                      <span className="sr-only">Open user menu</span>
                      <img
                        className="h-8 w-8 rounded-full"
                        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                        alt=""
                      />
                    </Menu.Button>
                  </div>
                   <ListMenu /> 
                </Menu> */}
                {!user ? (
                  <Button
                    onCustomClick={() => {
                      setToggleSigninSignup(
                        toggleSigninSignup === "LOGIN"
                          ? "SIGNIN"
                          : toggleSigninSignup === "SIGNIN"
                          ? "SIGNUP"
                          : toggleSigninSignup === "SIGNUP"
                          ? "SIGNIN"
                          : "LOGIN"
                      );
                      naviguate("/login");
                    }}
                  >
                    {toggleSigninSignup === "LOGIN"
                      ? "Login"
                      : toggleSigninSignup === "SIGNIN"
                      ? "Sign up"
                      : "Sign in"}
                  </Button>
                ) : (
                  <>
                    <Credit />
                    <BurgerMenu />
                  </>
                )}
              </div>
            </div>
          </div>

          {/* <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2">
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as="a"
                  href={item.href}
                  className={classNames(
                    item.current
                      ? "bg-gray-900 text-white"
                      : "text-gray-300 hover:bg-gray-700 hover:text-white",
                    "block rounded-md px-3 py-2 text-base font-medium"
                  )}
                  aria-current={item.current ? "page" : undefined}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
            </div>
          </Disclosure.Panel> */}
        </>
      )}
    </Disclosure>
  );
};

export default Header;
