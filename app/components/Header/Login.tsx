"use client";
import { Fragment, useContext, useEffect, useRef, useState } from "react";
import { KeysContext } from "@/app/context/keys-context";
import { X } from "@/app/icons";

const Login = () => {
  const { keys, setKeys } = useContext(KeysContext);
  const [isLightningConnected, setIsLightningConnected] = useState(false);
  const modalRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const shouldReconnect = localStorage.getItem("shouldReconnect");

    const getConnected = async (shouldReconnect: string) => {
      let enabled = false;

      // @ts-ignore
      if (typeof window.nostr === "undefined") {
        return;
      }

      if (shouldReconnect === "true") {
        // @ts-ignore
        const publicKey = await nostr.getPublicKey();
        setKeys({ ...keys, publicKey });
      }

      // @ts-ignore
      if (typeof window.webln === "undefined") {
        return;
      }

      // @ts-ignore
      if (shouldReconnect === "true" && !webln.executing) {
        try {
          // @ts-ignore
          enabled = await window.webln.enable();
          setIsLightningConnected(true);
        } catch (e: any) {
          console.log(e.message);
        }
      }
      return enabled;
    };

    if (shouldReconnect === "true") {
      getConnected(shouldReconnect);
    }
  }, [setKeys]);

  const loginHandler = async () => {
    // @ts-ignore
    if (typeof window.nostr !== "undefined") {
      // @ts-ignore
      const publicKey = await nostr.getPublicKey();
      setKeys({...keys , publicKey });
      localStorage.setItem("shouldReconnect", "true");
    }

    // @ts-ignore
    if (typeof window.webln !== "undefined") {
      // @ts-ignore
      await window.webln.enable();
    }
    console.log("connected ");
    setIsLightningConnected(true);
    modalRef.current?.click();
  };

  return (
    <>
      {isLightningConnected && keys?.publicKey ? (
        <h1>account</h1>
      ) : (
        <Fragment>
          <label htmlFor="my-modal" className="btn btn-outline">
            login
          </label>
          <input type="checkbox" ref={modalRef} id="my-modal" className="modal-toggle" />
          <label htmlFor="my-modal" className="modal cursor-pointer">
            <label className="modal-box relative" htmlFor="">
              <label
                htmlFor="my-modal"
                className="btn btn-ghost btn-sm btn-circle absolute right-2 top-2"
              >
                <X size="14" />
              </label>
              <h3 className="text-xl font-bold mb-4">Login</h3>
              {typeof window !== "undefined" &&
                // @ts-ignore
                typeof window.nostr === "undefined" ? (
                <Fragment>
                  <p className="py-4">
                    Install Alby Extension and setup keys to Login
                  </p>
                  <a
                    href="https://getalby.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-active btn-block"
                  >
                    Get Alby Extension
                  </a>
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href="https://guides.getalby.com/overall-guide/alby-browser-extension/features/nostr"
                    className="link link-neutral text-center block mt-2 font-bold text-sm"
                  >
                    Learn more
                  </a>
                </Fragment>
              ) : (
                <button className="btn btn-outline btn-block" onClick={loginHandler} >
                  {isLightningConnected ? "Connected" : "Login with Extension"}
                </button>
              )}
            </label>
          </label>
        </Fragment>
      )}
    </>
  );
};

export default Login;
