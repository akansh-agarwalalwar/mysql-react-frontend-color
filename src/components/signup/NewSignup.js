import React, { useState, useCallback, useEffect } from "react";
import Axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";
import { MdOutlineEmail } from "react-icons/md";
import { FaKey } from "react-icons/fa";
import Button from "../button/Button";
import { FaRegUser, FaPhoneAlt } from "react-icons/fa";
import { VscReferences } from "react-icons/vsc";
import Modal from "react-modal";
import { useLocation } from 'react-router-dom';
import background from "../../images/background.png";

const TermsAndConditions = ({ isOpen, onClose, setChecked }) => {
  if (!isOpen) return null;

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      style={{
        overlay: {
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          padding:'20px'
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
      <h2 className="font-bold text-2xl w-full flex justify-center items-center">
        Terms And Conditions
      </h2>
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
        <button
          className="text-white bg-green-100 p-2 ml-1 rounded-xl"
          onClick={onClose}
        >
          Accept
        </button>
      </div>
    </Modal>
  );
};
function NewLogin() {
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
  const [error, setErrors] = useState({});
  const [sendOtpText, setSendOtpText] = useState("Send OTP");
  const location = useLocation();
  const [referralCode, setReferralCode] = useState('');
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const code = params.get('referral');
    if (code) {
      setReferralCode(code);
    }
  }, [location]);
  const handleChange = () => {
    setChecked(!checked);
  };

  const handleTermsClick = () => {
    setIsTermsModalOpen(true);
  };

  const handleTermsClose = () => {
    setIsTermsModalOpen(false);
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
    // if (!referralCode) {
    //   newErrors.referralCode = "Referral Code is required.";
    // }
  
    return newErrors;
  }, [username, useremail, password, confirmPassword, checked, referralCode]);
  
  const handleSignup = async (e) => {
    e.preventDefault();
    if (!otp || otpStatus !== "OTP verified successfully") {
      toast.error("Please verify your OTP first.");
      return;
    }
    if (!referralCode) {
      toast.error("Referral Code is required.");
      return;
    }
    try {
      const response = await Axios.post("http://api.perfectorse.site/api/v1/signup", {
        username,
        mobileNumber: mobileNumber ? `+91${mobileNumber}` : null,
        useremail,
        password,
        referralCode,
      });
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
    setSendOtpText("Sending...");
    try {
      const response = await Axios.post(
        "http://api.perfectorse.site/api/v1/sendOtp",
        {
          useremail,
        }
      );
      if (response.data.message === "OTP sent successfully") {
        setOtpSent(true);
        setOtpStatus(response?.data?.message);
        setSendOtpText("Sent");
        toast.success("OTP Sent");
      } else {
        setOtpStatus(response?.data?.message);
        setSendOtpText("Send OTP");
        toast.error("OTP Failed");
      }
    } catch (error) {
      setOtpStatus("Failed to send OTP.");
      setSendOtpText("Send OTP");
      toast.error("OTP Failed");
    }
  };

  const verifyOtp = async () => {
    try {
      const response = await Axios.post(
        "http://api.perfectorse.site/api/v1/verifyEmail",
        {
          useremail,
          otp,
        }
      );
      if (response.data.message === "OTP verified successfully") {
        setOtpStatus(response?.data?.message);
        toast.success("OTP Verified Successfully");
      } else {
        setOtpStatus(response?.data?.message);
        toast.error("OTP Verification Failed");
      }
    } catch (error) {
      toast.error("Failed to verify OTP");
    }
  };

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
    const referralCode = e.target.value;
    const setReferenceRegex = /^[a-zA-Z]/;
    if (setReferenceRegex.test(referralCode)) {
      setReferralCode(referralCode);
    } else {
      setReferralCode("");
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
    <div className="min-h-screen bg-myblue-800 flex p-4"
    style={{
      backgroundImage: `url(${background})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
    }}>
      <div className="flex flex-col w-full max-w-md mx-auto items-center">
        <img
          src={require("../../images/mylogo.jpg")}
          height={180}
          width={180}
          className="rounded-xl mt-10"
        />
        <div className="flex flex-col items-center w-full mt-4">
          <p className="text-xl font-semibold">Register Now</p>
        </div>
        <form className="w-full">
          <div className="flex flex-row items-center w-full mt-4 bg-white rounded-full h-14 border-black border-2">
            <div className="bg-green-100 flex rounded-full justify-center items-center h-10 w-10 ml-2">
              <FaRegUser className="text-white" size={22} />
            </div>
            <input
              type="text"
              placeholder="Username"
              className="p-2 border-none focus:outline-none w-[80%] bg-transparent"
              value={username}
              onChange={handleUserNameChange}
            />
          </div>
          <div className="flex flex-row items-center w-full mt-4 bg-white rounded-full h-14 border-black border-2">
            <div className="bg-blue-200 flex rounded-full justify-center items-center h-10 w-10 ml-2">
              <FaPhoneAlt className="text-white" size={18} />
            </div>
            <input
              type="number"
              placeholder="Mobile Number"
              className="p-2 border-none focus:outline-none w-[80%] bg-transparent"
              value={mobileNumber}
              onChange={(e) => setMobileNumber(e.target.value)}
            />
          </div>

          <div className="flex flex-row items-center w-full mt-4 bg-white rounded-full h-14 border-black border-2">
            <div className="bg-red-100 flex rounded-full justify-center items-center h-10 w-10 ml-2">
              <MdOutlineEmail className="text-white" size={22} />
            </div>
            <input
              type="email"
              placeholder="Email"
              className="p-2 border-none focus:outline-none w-[80%] bg-transparent"
              value={useremail}
              onChange={handleEmailChange}
            />
          </div>
          <button
            className="mt-2 rounded-full  w-full transition border-2 border-myblue-200 text-sm p-2 bg-myblue-200 text-white"
            onClick={sendOtp}
            disabled={!useremail}
            type="button"
          >
            {sendOtpText}
          </button>
          {otpSent && otpStatus !== "OTP verified successfully" && (
            <div className="flex flex-col mt-4 p-4 bg-white rounded-lg shadow-md">
              <label className="mb-1 text-sm font-semibold">OTP</label>
              <input
                type="text"
                placeholder="Enter OTP"
                className={`p-2 rounded-md border w-full ${
                  otpStatus === "OTP verified successfully"
                    ? "border-green-100"
                    : "border-red-100"
                }`}
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
              />
              <button
                className="mt-2 rounded-full transition border-2 text-sm p-2 bg-myblue-200 text-white hover:bg-myblue-300"
                onClick={verifyOtp}
                type="button"
              >
                Verify OTP
              </button>
              <div className="mt-2 text-xs text-center text-gray-600">
                {otpStatus}
              </div>
            </div>
          )}
          {otpStatus === "OTP verified successfully" && (
            <div className="mt-2 text-xs text-center text-green-100">
              {otpStatus}
            </div>
          )}
          <div className="flex flex-row items-center w-full mt-4 bg-white rounded-full h-14 border-black border-2">
            <div className="bg-brown-100 flex rounded-full justify-center items-center h-10 w-10 ml-2">
              <FaKey className="text-white" size={20} />
            </div>
            <input
              type="password"
              placeholder="Password"
              className="p-2 border-none focus:outline-none w-[80%] bg-transparent"
              value={password}
              onChange={handlePasswordChange}
            />
          </div>
          <div className="flex flex-row items-center w-full mt-4 bg-white rounded-full h-14 border-black border-2">
            <div className="bg-brown-100 flex rounded-full justify-center items-center h-10 w-10 ml-2">
              <FaKey className="text-white" size={20} />
            </div>
            <input
              type="password"
              placeholder="Confirm Password"
              className="p-2 border-none focus:outline-none w-[80%] bg-transparent"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          {error.confirmPassword && (
            <div className="text-red-100 text-sm ml-2">
              {error.confirmPassword}
            </div>
          )}

          <div className="flex flex-row items-center w-full mt-4 bg-white rounded-full h-14 border-black border-2">
            <div className="bg-purple-100 flex rounded-full justify-center items-center h-10 w-10 ml-2">
              <VscReferences className="text-white" size={20} />
            </div>
            <input
              type="text"
              placeholder="Enter Referral Code (Optional)"
              className="p-2 border-none focus:outline-none w-[80%] bg-transparent"
              value={referralCode}
              onChange={handleReferenceChange}
            />
          </div>
          <div className="flex flex-row items-center w-full ml-2 mt-2">
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
          </div>

          <div className="w-full mt-4">
            <Button text="Register" onClick={handleSignup} />
          </div>
          <div className="text-center mt-4">
            <span className="text-sm">Already have an account? </span>
            <Link to="/login" className="text-myblue-200 font-semibold text-sm">
              Login
            </Link>
          </div>
        </form>
        <div className="text-center mt-4">
          {registerStatus && (
            <p className="text-xs text-red-100">{registerStatus}</p>
          )}
        </div>
      </div>

      <TermsAndConditions
        isOpen={isTermsModalOpen}
        onClose={handleTermsClose}
        setChecked={setChecked}
      />
    </div>
  );
}

export default NewLogin;
