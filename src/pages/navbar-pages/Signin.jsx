/* eslint-disable */

// form validatin is done without a library

import { Header } from "../../components";
import useInput from "../../hooks/use-input";
import { useAuthContext } from "../../context/auth-context";
import { useAttContext } from "../../context/att-context";
import { useNavigate } from "react-router-dom";
import useHttp from "../../hooks/use-http";

//------------------------------------------------------------------------
const Signin = () => {
  console.log("SignIN rungs-----------------");
  const navigate = useNavigate();
  const { loginHandler, userIdHandler } = useAuthContext();
  const { controlAttHandler } = useAttContext();

  // --------------useHttp access ------------------
  // applyData(data) in the custom http hook
  const transportLoginData = (data) => {
    loginHandler(data.idToken);
    navigate("/");
    controlAttHandler("1");
  };
  const { sendRequest: fetchSignin } = useHttp();
  // --------------useHttp access ------------------

  // useInput-------------------------------------------------
  const {
    value: enteredEmail,
    isValid: enteredEmailIsValid,
    hasError: emailHasError,
    valueChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
    reset: resetEmailInput,
  } = useInput((value) => value.trim() !== "");

  const {
    value: enteredPassword1,
    isValid: password_1_isValid,
    hasError: password_1_hasError,
    valueChangeHandler: password_1_changeHanlder,
    inputBlurHandler: password_1_blurHandler,
    reset: resetPassword1,
  } = useInput((value) => value.trim() !== "");
  // useInput-------------------------------------------------

  let formIsValid = false; // due to re-render, this wounld be false everytime

  if (enteredEmailIsValid && password_1_isValid) {
    formIsValid = true;
  }
  //-------------------submitHandler------------------------
  const formSubmitHandler = (event) => {
    event.preventDefault();

    if (!enteredEmailIsValid) {
      return;
    }
    if (!password_1_isValid) {
      return;
    }
    //for both userName and userEmail
    userIdHandler(enteredEmail);

    // use custom http hook to sign in
    fetchSignin(
      {
        url: "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDQ30nAZEBp7X2uJ_xkrk1qXGO6vWBrRbQ",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: {
          email: enteredEmail,
          password: enteredPassword1,
          returnSecureToken: true,
        },
      },
      transportLoginData
    );

    console.log(enteredEmail, enteredPassword1);
    resetEmailInput(); //
    resetPassword1();
  };

  return (
    <>
      <Header category="" title="Sign IN" />
      <div title="container 1" className="flex justify-center flex-wrap">
        <div className="m-2 p-2 md:m-10 md:p-10 bg-emerald-200 rounded-3xl">
          <form onSubmit={formSubmitHandler}>
            {/* id */}
            <div className="p-3">
              <label htmlFor="email" className="font-semibold p-3">
                Email ID
              </label>
              <input
                className="block bg-slate-200 rounded-xl p-2"
                type="email"
                id="email"
                onChange={emailChangeHandler}
                onBlur={emailBlurHandler}
                value={enteredEmail}
              />
            </div>
            {emailHasError && (
              <span className="text-sm text-red-400">
                IEnter a valid email address
              </span>
            )}

            {/* password */}
            <div className="p-3">
              <label htmlFor="password1" className="font-semibold p-3">
                Password
              </label>
              <input
                className="block bg-slate-200 rounded-xl p-2"
                type="password"
                id="password1"
                onChange={password_1_changeHanlder}
                onBlur={password_1_blurHandler}
                value={enteredPassword1}
              />
            </div>
            {password_1_hasError && (
              <span className="text-sm text-red-400">
                password should be matched for the ID
              </span>
            )}

            <div className="p-3">
              <button
                disabled={!formIsValid}
                className="w-32 h-10 bg-emerald-700 rounded-2xl text-white cursor-pointer mb-3 mt-1 disabled:cursor-not-allowed disabled:bg-slate-500"
              >
                SIGN IN
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Signin;
