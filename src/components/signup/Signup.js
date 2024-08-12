import React, { useState, useCallback, useEffect } from "react";
import Axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";
import Modal from "react-modal";

const TermsAndConditions = ({ isOpen, onClose, setChecked }) => {
  if (!isOpen) return null;

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      style={{
        overlay: {
          backgroundColor: "rgba(0, 0, 0, 0.5)",
        },
        content: {
          top: "50%",
          left: "50%",
          right: "auto",
          bottom: "auto",
          marginRight: "-50%",
          transform: "translate(-50%, -50%)",
          backgroundColor: "#fff",
          padding: "20px",
          border: "none",
          borderRadius: "10px",
          boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)",
          maxWidth: "400px",
          maxHeight: "600px", 
          overflowY: "auto",
        },
      }}
    >
      <h2 className="font-bold text-2xl w-full flex justify-center items-center">Terms And Conditions</h2>
      <p>
        Certainly! Here is a sample of the terms and conditions for a Color
        Prediction gaming website named "Perfectorse." This document is meant to
        be comprehensive and covers various aspects of user interaction,
        responsibilities, and legal stipulations. It is essential to consult
        with a legal professional to ensure these terms are appropriate for your
        specific business and jurisdiction.
        <br></br>
        <div className="w-full flex justify-center items-center">---</div>
        <p className="font-bold text-xl"> 1. Introduction</p> Welcome to
        Perfectorse. These terms and conditions outline the rules and
        regulations for the use of Perfectorse's Website, located at
        [www.perfectorse.site]. By accessing this website, we assume you accept
        these terms and conditions. Do not continue to use Perfectorse if you do
        not agree to all of the terms and conditions stated on this page.
        <br></br>
        <p className="font-bold text-xl"> 2. Definitions - </p> *"Website"*
        refers to Perfectorse, accessible at [www.perfectorse.site]. - *"User"*
        refers to anyone who visits or interacts with the website. - *"We",
        "Us", and "Our"* refer to Perfectorse. - *"Game"* refers to the color
        prediction game provided on the website.
        <br></br>
        <p className="font-bold text-xl"> 3. Eligibility </p> To use our
        services, you must be at least 18 years old or the age of majority in
        your jurisdiction. By using our services, you represent and warrant that
        you meet the eligibility requirements.
        <br></br>
        <p className="font-bold text-xl"> 4. Account Registration -</p>
        Users must create an account to participate in the game. - You agree to
        provide accurate and complete information during registration and to
        keep your account information updated. - You are responsible for
        maintaining the confidentiality of your account credentials. - You are
        responsible for all activities that occur under your account.
        <br></br>
        <p className="font-bold text-xl"> 5. Game Rules - </p> The game involves
        predicting the outcome of color choices. - Rules and instructions for
        participation are provided on the game page. - Perfectorse reserves the
        right to change the rules or discontinue the game at any time.
        <br></br>
        <p className="font-bold text-xl"> 6. Payments and Withdrawals -</p>
        Users may need to deposit funds to participate in the game. - Deposits
        and withdrawals are subject to our payment policies. - Perfectorse
        reserves the right to request verification of identity before processing
        withdrawals. - Any winnings are subject to the terms and conditions of
        the game and may be withdrawn in accordance with our withdrawal policy.
        <br></br> <p className="font-bold text-xl">7. User Conduct -</p> Users
        agree not to engage in any activity that is unlawful, abusive, or
        harmful. - Users must not attempt to hack, reverse engineer, or
        interfere with the website's functionality. - Perfectorse reserves the
        right to suspend or terminate accounts that violate these terms.
        <br></br>{" "}
        <p className="font-bold text-xl">8. Intellectual Property -</p>
        All content on Perfectorse, including text, graphics, logos, and
        software, is the property of Perfectorse and is protected by copyright
        and trademark laws. - Users are granted a limited license to access and
        use the website for personal use only. - Users may not reproduce,
        distribute, or create derivative works from the website content without
        our written permission.
        <br></br>
        <p className="font-bold text-xl"> 9. Limitation of Liability -</p>
        Perfectorse is provided on an "as is" and "as available" basis. We make
        no warranties, expressed or implied, and hereby disclaim all other
        warranties, including without limitation, implied warranties or
        conditions of merchantability, fitness for a particular purpose, or
        non-infringement of intellectual property. - Perfectorse, its directors,
        employees, or agents shall not be liable for any damages arising from
        the use of, or inability to use, the website or its services.
        <br></br>
        <p className="font-bold text-xl"> 10. Indemnification </p> Users agree
        to indemnify and hold harmless Perfectorse, its affiliates, and their
        respective officers, directors, employees, and agents from any claims,
        liabilities, damages, losses, and expenses arising from their use of the
        website or violation of these terms.
        <br></br>
        <p className="font-bold text-xl"> 11. Governing Law</p> These terms and
        conditions are governed by and construed in accordance with the laws of
        [Your Jurisdiction], and you irrevocably submit to the exclusive
        jurisdiction of the courts in that location.
        <br></br> <p className="font-bold text-xl">12. Changes to Terms</p>
        Perfectorse reserves the right to modify these terms and conditions at
        any time. Changes will be effective immediately upon posting on the
        website. Continued use of the website after any such changes constitutes
        your acceptance of the new terms.
        <br></br>
        <p className="font-bold text-xl"> 13. Contact Information </p> If you
        have any questions about these terms and conditions, please contact us
        at [your contact information].
        <br></br> <p className="font-bold text-xl">14. Dispute Resolution - </p>{" "}
        Any disputes arising out of or in connection with these terms shall be
        resolved through negotiation in good faith. - If the dispute cannot be
        resolved through negotiation, it shall be referred to and finally
        resolved by arbitration under the rules of [Arbitration Organization],
        which rules are deemed to be incorporated by reference into this clause.
        <br></br> <p className="font-bold text-xl">15. Privacy Policy - </p>{" "}
        Your use of the website is also governed by our Privacy Policy, which is
        incorporated into these terms by reference. - By using Perfectorse, you
        consent to the collection and use of your information as outlined in our
        Privacy Policy.
        <br></br>
        <p className="font-bold text-xl"> 16. Termination - </p> Perfectorse may
        terminate or suspend your account and access to the website immediately,
        without prior notice or liability, if you breach these terms and
        conditions. - Upon termination, your right to use the website will cease
        immediately. If you wish to terminate your account, you may simply
        discontinue using the website.
        <br></br> <p className="font-bold text-xl">17. Severability </p> If any
        provision of these terms and conditions is found to be invalid or
        unenforceable by a court of competent jurisdiction, the remaining
        provisions will remain in full force and effect.
        <br></br>
        <p className="font-bold text-xl"> 18. Entire Agreement </p> These terms
        and conditions constitute the entire agreement between you and
        Perfectorse regarding the use of the website and supersede all prior
        agreements and understandings, whether written or oral, regarding the
        same subject matter.
        <br></br>
        <p className="font-bold text-xl"> 19. Waiver </p> No waiver of any term
        of these terms and conditions shall be deemed a further or continuing
        waiver of such term or any other term, and Perfectorse’s failure to
        assert any right or provision under these terms and conditions shall not
        constitute a waiver of such right or provision.
        <br></br>
        <p className="font-bold text-xl"> 20. Notices </p> Any notices or other
        communications provided by Perfectorse under these terms and conditions,
        including those regarding modifications to these terms and conditions,
        will be given: (i) via email; or (ii) by posting to the website. For
        notices made by email, the date of receipt will be deemed the date on
        which such notice is transmitted.
        <br></br> <p className="font-bold text-xl">21. Assignment </p> You may
        not assign or transfer these terms and conditions, by operation of law
        or otherwise, without Perfectorse's prior written consent. Any attempt
        by you to assign or transfer these terms and conditions, without such
        consent, will be null and of no effect. Perfectorse may assign or
        transfer these terms and conditions, at its sole discretion, without
        restriction. <br></br>
        <div className="w-full flex justify-center items-center">---</div>
        By using Perfectorse, you agree to these terms and conditions. If you do
        not agree, please do not use our website.
        <br></br>
        <div className="w-full flex justify-center items-center">---</div>
        Please review these terms and conditions carefully and ensure that your
        legal team approves them before publishing on your website.
      </p>
      <div className="w-full justify-end items-end flex flex-row">
        <button
          className="text-white bg-red-100 p-2 mr-1 rounded-xl"
          onClick={() => {
            onClose();
            setChecked(false);
          }}
        >
          Reject
        </button>
        <button className="text-white bg-green-100 p-2 ml-1 rounded-xl" onClick={onClose}>
          Accept
        </button>
      </div>
    </Modal>
  );
};

export default function Signup() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [useremail, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [referenceCode, setReferenceCode] = useState("");
  const [registerStatus, setRegisterStatus] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otpStatus, setOtpStatus] = useState("");
  const [checked, setChecked] = useState(false);
  const [isTermsModalOpen, setIsTermsModalOpen] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = () => {
    setChecked(!checked);
  };

  const handleTermsClick = () => {
    setIsTermsModalOpen(true);
  };

  const handleTermsClose = () => {
    setIsTermsModalOpen(false);
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    if (!otp || otpStatus !== "OTP verified successfully") {
      setRegisterStatus("Please verify your OTP first.");
      return;
    }
    try {
      const response = await Axios.post(
        "http://localhost:3001/api/v1/signup",
        {
          username,
          mobileNumber: `+91${mobileNumber}`,
          useremail,
          password,
          referenceCode,
        }
      );
      if (response.data.message === "Registration Successful") {
        setRegisterStatus(response?.data?.message);
        toast.success("Registration Successful");
        navigate("/login");
      } else {
        setRegisterStatus(response?.data?.message);
        toast.error("Registration Failed");
      }
    } catch (error) {
      toast.error("Registration Failed");
    }
  };

  const sendOtp = async () => {
    try {
      const response = await Axios.post(
        "http://localhost:3001/api/v1/sendOtp",
        {
          useremail,
        }
      );
      if (response.data.message === "OTP sent successfully") {
        setOtpSent(true);
        setOtpStatus(response?.data?.message);
        toast.success("OTP Sent");
      } else {
        setOtpStatus(response?.data?.message);
        toast.error("OTP Failed");
      }
    } catch (error) {
      setOtpStatus("Failed to send OTP.");
      toast.error("OTP Failed");
    }
  };

  const verifyOtp = async () => {
    try {
      const response = await Axios.post(
        "http://localhost:3001/api/v1/verifyEmail",
        {
          useremail,
          otp,
        }
      );
      if (response.data.message === "OTP verified successfully") {
        setOtpStatus(response?.data?.message);
        toast.success("OTP Verified");
      } else {
        setOtpStatus(response?.data?.message);
        toast.error("OTP Failed");
      }
    } catch (error) {
      toast.error("Failed to verify OTP");
    }
  };

  const isFormValid = useCallback(() => {
    const newErrors = {};

    if (!username) {
      newErrors.username = "Username is required.";
    }
    if (!useremail) {
      newErrors.useremail = "Email is required.";
    }
    if (!password) {
      newErrors.password = "Password is required.";
    }
    if (password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match.";
    }
    if (!checked) {
      newErrors.terms = "You must agree to the terms and conditions.";
    }

    return newErrors;
  }, [username, useremail, password, confirmPassword, checked]);

  useEffect(() => {
    const errors = isFormValid();
    setErrors(errors);
  }, [isFormValid]);

  const handleEmailChange = (e) => {
    const email = e.target.value;
    const emailRegex = /^[a-zA-Z0-9@.]+$/;
    if (emailRegex.test(email)) {
      setEmail(email);
    } else {
      setEmail("");
    }
  };

  const handlePasswordChange = (e) => {
    const password = e.target.value;
    const passwordRegex = /^[a-zA-Z0-9@.]+$/;
    if (passwordRegex.test(password)) {
      setPassword(password);
    } else {
      setPassword("");
    }
  };

  const handleReferenceChange = (e) => {
    const referenceCode = e.target.value;
    const setReferenceRegex = /^[a-zA-Z]/;
    if (setReferenceRegex.test(referenceCode)) {
      setReferenceCode(referenceCode);
    } else {
      setReferenceCode("");
    }
  };

  const handleUserNameChange = (e) => {
    const username = e.target.value;
    const setUserNameRegex = /^[a-zA-Z0-9@]/;
    if (setUserNameRegex.test(username)) {
      setUsername(username);
    } else {
      setUsername("");
    }
  };

  return (
    <div className="min-h-screen bg-myblue-500 flex justify-center items-center p-4 max-w-md mx-auto">
      <div className="p-8 rounded-lg shadow-lg w-[80%] max-w-md border-2 border-myblue-200 bg-white">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-myblue-200">Sign Up</h1>
        </div>
        <form
          className="space-y-4"
          onSubmit={(e) => {
            if (isFormValid()) {
              handleSignup(e);
            } else {
              e.preventDefault();
            }
          }}
        >
          <div className="flex flex-col">
            <label className="mb-1 text-sm">Username</label>
            <input
              type="text"
              placeholder="Username"
              className="p-1 rounded-md border"
              value={username}
              onChange={handleUserNameChange}
            />
            {errors.username && (
              <p className="text-red-100 text-xs mt-1">{errors.username}</p>
            )}
          </div>
          <div className="flex flex-col">
            <label className="mb-1 text-sm">Mobile Number</label>
            <input
              type="number"
              placeholder="Mobile Number"
              className="p-1 rounded-md border border-gray-300"
              value={mobileNumber}
              onChange={(e) => setMobileNumber(e.target.value)}
            />
            {errors.mobileNumber && (
              <p className="text-red-100 text-xs mt-1">{errors.mobileNumber}</p>
            )}
          </div>
          <div className="flex flex-col">
            <label className="mb-1 text-sm">Email</label>
            <div className=" flex items-center">
              <input
                type="email"
                placeholder="Email"
                className="p-1 rounded-md border w-full"
                value={useremail}
                onChange={handleEmailChange}
              />
            </div>
            <button
              className="mt-2 rounded-md transition border-2 border-myblue-200 text-sm p-2"
              onClick={sendOtp}
              disabled={!useremail}
              type="button"
            >
              Send OTP
            </button>
            {errors.useremail && (
              <p className="text-red-100 text-xs mt-1">{errors.useremail}</p>
            )}
          </div>
          {otpSent && otpStatus !== "OTP verified successfully" && (
            <div className="flex flex-col mt-4">
              <label className="mb-1 text-sm">OTP</label>
              <div className="relative flex items-center">
                <input
                  type="text"
                  placeholder="OTP"
                  className={`p-1 rounded-md border w-full ${
                    otpStatus === "OTP verified successfully"
                      ? "border-green-100"
                      : "border-red-100"
                  }`}
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                />
              </div>
              <button
                className="mt-2 rounded-md transition border-2 border-myblue-200 text-sm p-2"
                onClick={verifyOtp}
                type="button"
              >
                Verify OTP
              </button>
              <div className="mt-2 text-xs">{otpStatus}</div>
            </div>
          )}
          {otpStatus === "OTP verified successfully" && (
            <div className="mt-2 text-xs">{otpStatus}</div>
          )}
          <div className="flex flex-col">
            <label className="mb-1 text-sm">Password</label>
            <input
              type="password"
              placeholder="Password"
              className="p-1 rounded-md border"
              value={password}
              onChange={handlePasswordChange}
            />
            {errors.password && (
              <p className="text-red-100 text-xs mt-1">{errors.password}</p>
            )}
          </div>
          <div className="flex flex-col">
            <label className="mb-1 text-sm">Confirm Password</label>
            <input
              type="password"
              placeholder="Confirm Password"
              className="p-1 rounded-md border"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            {errors.confirmPassword && (
              <p className="text-red-100 text-xs mt-1">
                {errors.confirmPassword}
              </p>
            )}
          </div>
          <div className="flex flex-col">
            <label className="mb-1 text-sm">Referral</label>
            <input
              type="text"
              placeholder="Reference Code"
              className="p-1 rounded-md border"
              value={referenceCode}
              onChange={handleReferenceChange}
            />
          </div>
          <div className="">
            <label className="flex flex-row items-center">
              <input
                type="checkbox"
                checked={checked}
                onChange={handleChange}
              />
              <p className="ml-2">
                I agree{" "}
                <span
                  className="underline cursor-pointer"
                  onClick={handleTermsClick}
                >
                  Terms And Conditions
                </span>
              </p>
            </label>
            {errors.terms && (
              <p className="text-red-100 text-xs mt-1">{errors.terms}</p>
            )}
          </div>
          <div className="mt-6">
            <button
              type="submit"
              className="w-full p-3 bg-myblue-200 text-white rounded-md font-bold"
              disabled={!isFormValid() || !checked}
            >
              Sign Up
            </button>
          </div>
        </form>
        <div className="text-center mt-4">
          <p className="text-xs">
            Already have an account?{" "}
            <Link to="/login" className="underline text-xs">
              Login here
            </Link>
          </p>
        </div>
      </div>
      <div className="text-center mt-4">
        {registerStatus && (
          <p className="text-xs text-red-100">{registerStatus}</p>
        )}
      </div>
      <TermsAndConditions
        isOpen={isTermsModalOpen}
        onClose={handleTermsClose}
        setChecked={setChecked}
      />
    </div>
  );
}
