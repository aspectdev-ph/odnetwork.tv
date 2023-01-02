"use client";
import Head from "next/head";
import Image from "next/image";
import { Inter } from "@next/font/google";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Page() {
  const router = useRouter();

  const [showPassword, setshowPassword] = useState<boolean>(false);
  const [password, setPassword] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [remember_me, setRemember] = useState<boolean>(false);
  const [isLoading, setisLoading] = useState<boolean>(false);

  const LoginUser = async (event: any) => {
    event.preventDefault();
    setisLoading(true);
    console.log(email);
    if (email == "" || password == "") {
      toast.error("Email/Password is empty . Please provide one");
      setisLoading(false);
    } else {
      let headersList = {
        Accept: "*/*",
        "User-Agent": "Thunder Client (https://www.thunderclient.com)",
        "Content-Type": "application/json",
      };

      let bodyContent = JSON.stringify({
        email: email,
        password: password,
        remember_me: event.target.remember_me.value,
      });
      let response = await fetch("http://localhost:3000/api/login", {
        method: "POST",
        body: bodyContent,
        headers: headersList,
      });

      let data = JSON.parse(await response.text());
      console.log(data);
      if (data.code == 200) {
        window.localStorage.setItem("token_a", data.token);
        toast.success(data.message);
        setTimeout(() => {
          router.push("/feeds");
        }, 5000);
      } else if (data.code == 500) {
        toast.error(data.message);
        setisLoading(false);
      } else if (data.code == 401) {
        toast.error(data.message);
        setisLoading(false);
      }
    }
  };

  return (
    <>
      <Head>
        <title>Login OdNetwork.Tv</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="background flex h-screen w-screen flex-row overflow-x-auto lg:overflow-hidden">
        <section className="h-screen">
          <div className="container  h-full px-6 py-12">
            <div className="g-6 flex h-full flex-wrap items-center justify-center text-gray-800">
              <div className="mb-12 md:mb-0 md:w-8/12 lg:w-6/12">
                <img
                  src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
                  className="w-full"
                  alt="Phone image"
                />
              </div>
              <div className="h-auto rounded-md bg-white p-4 text-black md:w-8/12 lg:ml-20 lg:w-5/12">
                <form onSubmit={LoginUser}>
                  <div className="mt-2 mb-4 h-12 w-full text-2xl font-bold">
                    Login on Od Network Tv
                  </div>
                  <div className="mb-6">
                    <input
                      type="text"
                      className="form-control m-0 block w-full rounded border border-solid border-gray-300 bg-white bg-clip-padding px-4 py-2 text-xl font-normal text-gray-700 transition ease-in-out focus:border-blue-600 focus:bg-white focus:text-gray-700 focus:outline-none"
                      id="email"
                      name="email"
                      placeholder="Email address"
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className="mb-6 flex flex-row">
                    <input
                      type={showPassword ? "text" : "password"}
                      className="form-control m-0 block w-full rounded border border-solid border-gray-300 bg-white bg-clip-padding px-4 py-2 text-xl font-normal text-gray-700 transition ease-in-out focus:border-blue-600 focus:bg-white focus:text-gray-700 focus:outline-none"
                      placeholder="Password"
                      id="password"
                      name="password"
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <Image
                      className="mx-auto my-auto ml-2"
                      onClick={() => setshowPassword(!showPassword)}
                      src={
                        showPassword
                          ? "./images/eye-solid.svg"
                          : "./images/eye-slash-solid.svg"
                      }
                      alt={"View Password"}
                      width={40}
                      height={40}
                    />
                  </div>
                  <div className="mb-6 flex items-center justify-between">
                    <div className="form-group form-check">
                      <input
                        type="checkbox"
                        className="form-check-input float-left mt-1 mr-2 h-4 w-4 cursor-pointer appearance-none rounded-sm border border-gray-300 bg-white bg-contain bg-center bg-no-repeat align-top transition duration-200 checked:border-blue-600 checked:bg-blue-600 focus:outline-none"
                        id="remember_me"
                        name="remember_me"
                        value="true"
                        onChange={(e) => setRemember(e.target.checked)}
                      />
                      <label
                        className="form-check-label inline-block text-gray-800"
                        htmlFor="remember_me"
                      >
                        Remember me
                      </label>
                    </div>
                    <a
                      href="#!"
                      className="text-blue-600 transition duration-200 ease-in-out hover:text-blue-700 focus:text-blue-700 active:text-blue-800"
                    >
                      Forgot password?
                    </a>
                  </div>
                  <button
                    disabled={isLoading ? true : false}
                    type="submit"
                    className="inline-block flex w-full rounded bg-blue-600 px-7 py-3 text-sm font-medium uppercase leading-snug text-white shadow-md transition duration-150 ease-in-out hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg"
                    data-mdb-ripple="true"
                    data-mdb-ripple-color="light"
                  >
                    <div
                      className={
                        isLoading ? "collapse" : "visible" + " mx-auto my-auto"
                      }
                    >
                      <span>Sign in</span>
                    </div>
                    <div
                      className={
                        isLoading
                          ? "visible" + " mx-auto flex flex-row"
                          : "collapse"
                      }
                    >
                      <span className={"my-auto text-center"}>
                        Please wait...
                      </span>
                      <div
                        className="spinner-border inline-block h-8 w-8 animate-spin rounded-full border-4"
                        role="status"
                      >
                        <span className="visually-hidden">Loading...</span>
                      </div>
                    </div>
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}