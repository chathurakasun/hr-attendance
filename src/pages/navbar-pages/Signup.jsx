// form validatin is done without library

import { Header } from "../../components";
import { useAuthContext } from "../../context/auth-context";
import useInput from "../../hooks/use-input";
import useHttp from "../../hooks/use-http";
import { useNavigate } from "react-router-dom";
//------------------------------------------------------------------------
const Signup = () => {
  const navigate = useNavigate();
  const { loginHandler, userIdHandler } = useAuthContext();

  // --------------useHttp access ------------------
  // applyData(data) in the custom http hook
  const transportLoginData = (data) => {
    loginHandler(data.idToken);
    navigate("/attendance");
  };
  const { sendRequest: fetchSignup } = useHttp();
  // --------------useHttp access ------------------

  const {
    value: enteredEmail,
    isValid: enteredEmailIsValid,
    hasError: emailHasError,
    valueChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
    reset: resetEmailInput,
  } = useInput((value) => value.includes("@"));

  const {
    value: enteredPassword1,
    isValid: password_1_isValid,
    hasError: password_1_hasError,
    valueChangeHandler: password_1_changeHanlder,
    inputBlurHandler: password_1_blurHandler,
    reset: resetPassword1,
  } = useInput((value) => value.trim() !== "");

  const {
    value: enteredPassword2,
    isValid: password_2_isValid,
    hasError: password_2_hasError,
    valueChangeHandler: password_2_changeHanlder,
    inputBlurHandler: password_2_blurHandler,
    reset: resetPassword2,
  } = useInput((value) => value === enteredPassword1 && value.trim() !== "");

  let formIsValid = false; // due to re-render, this wounld be false

  if (enteredEmailIsValid && password_1_isValid && password_2_isValid) {
    formIsValid = true;
  }
  //----------------------submit-----------------------------
  const formSubmitHandler = (event) => {
    event.preventDefault();

    if (!enteredEmailIsValid) {
      return;
    }
    if (!password_1_isValid) {
      return;
    }
    if (!password_2_isValid) {
      return;
    }
    //for both userName and userEmail
    userIdHandler(enteredEmail);

    // use custom http hook to signup
    fetchSignup(
      {
        url: "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDQ30nAZEBp7X2uJ_xkrk1qXGO6vWBrRbQ",
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

    console.log(enteredEmail, enteredPassword1, enteredPassword2);
    resetEmailInput(); //
    resetPassword1();
    resetPassword2();
  };

  return (
    <>
      <Header category="" title="Register" />
      <div title="container 1" className="flex justify-center flex-wrap">
        <div className="m-2 p-2 md:m-10 md:p-10 bg-emerald-200 rounded-3xl">
          <form onSubmit={formSubmitHandler}>
            {/* email */}
            <div className="p-3">
              <label htmlFor="email" className="font-semibold p-3">
                EMAIL ID
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
                Enter a valid Email address
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
                provide a good password
              </span>
            )}
            {/* confirm password */}
            <div className="p-3">
              <label htmlFor="password2" className="font-semibold p-3">
                Confirm Password
              </label>
              <input
                className="block bg-slate-200 rounded-xl p-2"
                type="password"
                id="password2"
                onChange={password_2_changeHanlder}
                onBlur={password_2_blurHandler}
                value={enteredPassword2}
              />
            </div>
            {password_2_hasError && (
              <span className="text-sm text-red-400">
                password should matched
              </span>
            )}
            <div className="p-3">
              <button
                disabled={!formIsValid}
                className="w-32 h-10 bg-emerald-700 rounded-2xl text-white cursor-pointer mb-3 mt-1 disabled:cursor-not-allowed disabled:bg-slate-500"
              >
                Signup
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Signup;
//---------------------------------------------------------------------
