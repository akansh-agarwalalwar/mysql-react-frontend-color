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
            maxWidth: "400px", // Set a maximum width
            maxHeight: "600px", // Set a maximum height
            overflowY: "auto",
          },
        }}
      >
        <h2>Terms And Conditions</h2>
        <p>
          Certainly! Here is a sample of the terms and conditions for a color
          prediction gaming website named "Perfectorse." This document is meant to
          be comprehensive and covers various aspects of user interaction,
          responsibilities, and legal stipulations. It is essential to consult
          with a legal professional to ensure these terms are appropriate for your
          specific business and jurisdiction.
          <br></br>
          <div className="w-full flex justify-center items-center">---</div>
          <p className="font-bold text-xl w-full justify-center items-center flex">
            Terms and Conditions
          </p>
          <br></br>
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
            className="text-white bg-red-100 p-2 mr-2"
            onClick={() => {
              onClose();
              setChecked(false);
            }}
          >
            Reject
          </button>
          <button className="text-white bg-green-100 p-2 ml-2" onClick={onClose}>
            Accept
          </button>
        </div>
        
      </Modal>
    );
  };
  