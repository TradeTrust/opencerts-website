import React, { FunctionComponent } from "react";
import { Helmet } from "react-helmet";
import { Page } from "../components/Layout/Page";

export const TermsOfUsePage: FunctionComponent = () => {
  const textCSS = "mb-4 ml-8 break-word";
  const subtextCSS = "mb-4 ml-16 break-word";
  return (
    <>
      <Helmet>
        <meta name="terms of use" content="Terms Of Use" />
        <meta property="og:terms of use" content="Terms Of Use" />
        <meta property="og:title" content="TradeTrust - Terms Of Use" />
        <meta property="og:url" content={`${window.location.origin}/terms-of-use`} />
        <title>TradeTrust - Terms Of Use</title>
      </Helmet>
      <Page title="Terms Of Use">
        <div className="bg-white drop-shadow-lg rounded-xl h-full w-full px-6 py-4 mt-4">
          <h4>1. General</h4>
          <p className={textCSS}>
            1.1. These Terms of Use govern your access to and use of our website and the services provided on our
            website, including any and all applications (whether as software or as a website or otherwise), their
            contents, push notifications and all other accompanying materials as identified in the Schedule below
            (collectively, the “<strong>Service</strong>”).
          </p>
          <p className={textCSS}>
            1.2. The Service is provided to you by the Infocomm Media Development Authority of Singapore (&quot;
            <strong>IMDA</strong>&quot;).
          </p>
          <p className={textCSS}>
            1.3. By accessing or using any part of the Service, you unconditionally agree and accept to be legally bound
            by these Terms of Use and any amendments thereto from time to time. IMDA reserves the right to change these
            Terms of Use at its sole discretion and at any time.
            <strong>
              You should read the Terms of Use carefully each time you access or use any part of the Service as such
              access or use will constitute your agreement to the Terms of Use and any amendments to it.
            </strong>
          </p>
          <p className={textCSS}>1.4. If you do not agree to these Terms of Use, you must not use the Service.</p>
          <p className={textCSS}>
            1.5. All terms and conditions of use of IMDA&apos;s website (available at{" "}
            <a href="https://www.imda.gov.sg/terms-of-use" target="_blank" rel="noopener noreferrer">
              www.imda.gov.sg/terms-of-use
            </a>
            ) shall apply mutatis mutandis to this website.
          </p>
          <h4>2. Nature of the Service</h4>
          <p className={textCSS}>2.1. Please see the Schedule for more information and terms concerning the Service.</p>
          <h4>3. Licence Terms and Restrictions</h4>
          <p className={textCSS}>
            3.1. The Service, including the materials made available on or through the Service, is owned by, licensed
            to, managed or controlled by IMDA. Please see clause 4 (Third Party Materials) for more information.
          </p>
          <p className={textCSS}>
            3.2. Subject to these Terms of Use, IMDA grants to you a non-exclusive and non-transferable right to access
            and use the Service for personal or internal purposes only, and only for such use permitted by the functions
            of the Service. You shall not, amongst other things, modify, reverse-engineer, decompile, adapt, publish,
            redistribute or sublicense the Service or any part of the Service without the prior written consent of IMDA
            or the respective third-party owners. You also shall not use the Service in violation of any applicable laws
            or agreements that you have with any third parties. All express or implied rights to the Service not
            specifically granted herein are expressly reserved to IMDA.
          </p>
          <p className={textCSS}>3.3. IMDA reserves the right to:</p>
          <p className={subtextCSS}>3.3.1. Update or modify the Service from time to time;</p>
          <p className={subtextCSS}>
            3.3.2. Deny or restrict access to or use of the Service by any particular person without ascribing any
            reasons whatsoever; and
          </p>
          <p className={subtextCSS}>
            3.3.3. Discontinue the Service at any time without notice or liability to you whatsoever, whereupon all
            rights granted to you hereunder shall also terminate forthwith. You shall further upon notice from IMDA
            return or destroy all copies of the Service or materials therein that you may have downloaded.
          </p>
          <p className={textCSS}>
            3.4. You will not interfere or attempt to interfere with the proper working of the Service or otherwise do
            anything that imposes an unreasonable or disproportionately large load on IMDA&apos;s servers
          </p>
          <h4>4. Third Party Materials</h4>
          <p className={textCSS}>
            4.1. The Service may require, enable or facilitate access to or use of software or services of a third party
            (“<strong>Third Party</strong>”). In such an event, there may be terms of use of the third party software or
            service (the “<strong>Third Party Terms</strong>”). IMDA may be required under or as a result of the Third
            Party Terms to notify you of certain terms that apply to you (either directly as an end user, or as a party
            whose acts or omissions could cause IMDA to breach the Third Party Terms) when you use the Services. An
            example of Third Party Terms may be open source software terms or standard form terms of the distribution
            platform from which you obtain any part of the Service (e.g. Google Play Store or Apple App Store terms)
            which bind IMDA as a developer or user of the distribution platform (the “
            <strong>Distribution Terms</strong>”). Information on the Third Party Terms are embedded in the Service,
            already accounted for in these Terms of Use, publicly available (e.g. the Distribution Terms) or otherwise
            listed in the Schedule herein. For the avoidance of doubt, insofar as this Clause 4 relates to the
            Distribution Terms, the relevant Distribution Terms are the terms of the specific platform from which you
            obtained a copy of the software or application that is part of the Service. For example, if you obtained the
            said copy from the Google Play Store, then the relevant terms are Google&apos;s Distribution Terms.
          </p>
          <p className={textCSS}>
            4.2. It is your responsibility to check and read the most up-to-date versions of the Third Party Terms and
            you are deemed to have notice of the same. In particular, you are deemed to have notice of the Third Party
            Terms that IMDA (under the Third Party Terms) is required to notify you, and you unconditionally agree to be
            bound by all the obligations in the Third Party Terms which are applicable to you as the end user.
          </p>
          <p className={textCSS}>
            4.3. If the Third Party Terms require you to enter into an agreement directly with the Third Party, then you
            unconditionally agree to enter into such agreement, and in any event, to be legally bound by the Third Party
            Terms. For the avoidance of doubt:
          </p>
          <p className={subtextCSS}>
            4.3.1. some Third Party Terms (particularly open-source terms) permit either a direct licence to you from
            the Third Party or a sublicence from IMDA to you. In such cases, your licence is a direct licence from the
            Third Party to you; and
          </p>
          <p className={subtextCSS}>
            4.3.2. the terms of your agreement with the relevant Third Party will govern your use of the relevant third
            party software or service.
          </p>
          <p className={textCSS}>
            4.4. If the Third Party Terms expressly or impliedly require IMDA to incorporate certain terms in these
            Terms of Use (inclusive of terms which impose any minimum or maximum standards herein, and/or terms
            described in Clause 4.5 below), such terms are deemed to have been so incorporated (the “
            <strong>Incorporated Terms</strong>”). Examples of Incorporated Terms include provisions which require IMDA
            to give you notice of certain rights and liabilities or require IMDA to ensure that you acknowledge certain
            matters. Similarly, if the Third Party Terms expressly or impliedly require these Terms of Use to be altered
            such that the Third Party Terms are complied with, the parties herein agree that the Terms of Use shall be
            deemed to be so altered but only to the extent necessary for compliance.
          </p>
          <p className={textCSS}>
            4.5. Some Third Party Terms grant the Third Party, or require IMDA to grant the Third Party, direct rights
            of enforcement of these Terms of Use as a third party beneficiary, against you. Such Third Party Terms are
            deemed to have been incorporated into these Terms of Use as Incorporated Terms, and you hereby agree to
            grant such Third Party, such direct rights of enforcement against you.
          </p>
          <p className={textCSS}>
            4.6. Notwithstanding Clause 4.4 nothing in the Third Party Terms increases the liability of IMDA beyond that
            stated in Clause 6.
          </p>
          <h4>5. Your Consent to Access Functions of Your Device</h4>
          <p className={textCSS}>
            5.1. Use of the Service may require you to allow access by the Service to certain functions of your device,
            such as push notifications, the obtaining and/or sharing of your location, or the collection of data from
            you in connection with the Service. Your use of the Service shall constitute your consent to the access by
            the Service of such functions of your device as may be reasonably required by the Service.
          </p>
          <h4>6. Disclaimers and Indemnity</h4>
          <p className={textCSS}>
            6.1. The Service is provided on an &quot;as is&quot; and “as available” basis without warranties of any
            kind. To the fullest extent permitted by law, IMDA does not make any representations or warranties of any
            kind whatsoever in relation to the Service and hereby disclaims all express, implied and/or statutory
            warranties of any kind to you or any third party, whether arising from usage or custom or trade or by
            operation of law or otherwise, including but not limited to any representations or warranties:
          </p>
          <p className={subtextCSS}>
            6.1.1. as to the accuracy, completeness, correctness, currency, timeliness, reliability, availability,
            interoperability, security, non-infringement, title, merchantability, quality or fitness for any particular
            purpose of the Service; and/or
          </p>
          <p className={subtextCSS}>
            6.1.2. that the Service or any functions associated therewith will be uninterrupted or error-free, or that
            defects will be corrected or that the Service, website and the server are and will be free of all viruses
            and/or other malicious, destructive or corrupting code, programme or macro.
          </p>
          <p className={textCSS}>
            6.2. IMDA shall also not be liable to you or any third party for any damage or loss of any kind whatsoever
            and howsoever caused, including but not limited to any direct or indirect, special or consequential damages,
            loss of income, revenue or profits, lost or damaged data, or damage to your computer, software or any other
            property, whether arising directly or indirectly from &ndash;
          </p>
          <p className={subtextCSS}>6.2.1. your access to or use of the Service, or any part thereof;</p>
          <p className={subtextCSS}>
            6.2.2. any loss of access to our use of the Service or any part of the Service, howsoever caused;
          </p>
          <p className={subtextCSS}>
            6.2.3. any inaccuracy or incompleteness in, or errors or omissions in the transmission of, the Service;
          </p>
          <p className={subtextCSS}>
            6.2.4. any delay or interruption in the transmission of the Service, whether caused by delay or interruption
            in transmission over the internet or otherwise; or
          </p>
          <p className={subtextCSS}>
            6.2.5. any decision made or action taken by you or any third party in reliance upon the Service, regardless
            of whether IMDA has been advised of the possibility of such damage or loss.
          </p>
          <p className={textCSS}>
            6.3. Without prejudice and in addition to the foregoing, insofar as the Service facilitates or requires the
            provision, use or functioning of, or is provided in conjunction with, other products, software, materials
            and/or services not provided by IMDA, IMDA makes no representation or warranty in relation to such products,
            software, materials and/or services (including without limitation any representation or warranties as to
            timeliness, reliability, availability, interoperability, quality, fitness for purpose, non-infringement,
            suitability or accuracy).
          </p>
          <p className={textCSS}>
            6.4. You shall not rely on any part of the Service to claim or assert any form of legitimate expectation
            against IMDA, whether or not arising out of or in connection with IMDA&apos;s roles and functions as a
            public authority.
          </p>
          <p className={textCSS}>
            6.5. You agree to defend and indemnify and keep IMDA and its officers, employees, agents and contractors
            harmless against all liabilities, losses, damages, costs or expenses (including legal costs on an indemnity
            basis) howsoever arising out of or in connection with your access or use of the Service (including third
            party software or services) or your non-compliance with the Terms of Use, Third Party Terms or Incorporated
            Terms, whether or not you had been advised or informed of the nature or extent of such liabilities, losses,
            damages, costs or expenses.
          </p>
          <h4>7. Hyperlinks</h4>
          <p className={textCSS}>
            7.1. Insofar as the Service provides a hyperlink to material not maintained or controlled by IMDA, IMDA
            shall not be responsible for the content of the hyperlinked material and shall not be liable for any damages
            or loss arising from access to the hyperlinked material. Use of the hyperlinks and access to such
            hyperlinked materials are entirely at your own risk. The hyperlinks are provided merely as a convenience to
            you and do not imply endorsement by, association or affiliation with IMDA of the contents of or provider of
            the hyperlinked materials.
          </p>
          <p className={textCSS}>
            7.2. Caching and hyperlinking to, and the framing of, any part of the Service is prohibited save where you
            have obtained IMDA&apos;s prior written consent. Such consent may be subject to any conditions as may be
            determined by IMDA in its sole discretion. If you hyperlink to or frame any part of the Service, that shall
            constitute your acceptance of these Terms of Use and all amendments thereto. If you do not accept these
            Terms of Use as may be amended from time to time, you must immediately discontinue linking to or framing of
            any part of the Service.
          </p>
          <p className={textCSS}>7.3. IMDA reserves all rights:</p>
          <p className={subtextCSS}>
            7.3.1. to disable any links to, or frames of, any materials which are unauthorised (including without
            limitation materials which imply endorsement by or association or affiliation with IMDA, materials
            containing inappropriate, profane, defamatory, infringing, obscene, indecent or unlawful topics, names, or
            information that violates any written law, any applicable intellectual property, proprietary, privacy or
            publicity rights); and
          </p>
          <p className={subtextCSS}>
            7.3.2. to disclaim responsibility and/or liability for materials that link to or frame any part of the
            Service
          </p>
          <h4>8. Privacy Policy</h4>
          <p className={textCSS}>
            8.1. You also agree to the terms of the Privacy Policy for the Service as may be amended from time to time.
            The Privacy Policy will form part of these Terms of Use.
          </p>
          <h4>9. Rights of Third Parties</h4>
          <p className={textCSS}>
            9.1. Subject to the rights of the Third Party set out in Clause 4.5, a person who is not a party to this
            Terms of Use shall have no right under the Contract (Rights of Third Parties) Act or otherwise to enforce
            any of its terms.
          </p>
          <h4>10. Assignment</h4>
          <p className={textCSS}>
            10.1. You may not assign or sub-contract this Terms of Use without the prior written consent of IMDA.
          </p>
          <p className={textCSS}>
            10.2. IMDA may assign, novate, transfer, or sub-contract the rights and liabilities in respect of the
            Service and this Terms of Use, without notifying you and without further reference to you. Your acceptance
            of this Terms of Use shall also constitute your consent to such assignment, novation, transfer or
            sub-contract
          </p>
          <h4>11. Governing Law and Dispute Resolution</h4>
          <p className={textCSS}>
            11.1. These Terms of Use shall be governed and construed in accordance with laws of Singapore.
          </p>
          <p className={textCSS}>
            11.2. Subject to clause 11.3, any dispute arising out of or in connection with these Terms of Use, including
            any question regarding its existence, validity or termination, shall be referred to and finally resolved in
            the Courts of the Republic of Singapore and the parties hereby submit to the exclusive jurisdiction of the
            Courts of the Republic of Singapore.
          </p>
          <p className={textCSS}>
            11.3. IMDA may, at its sole discretion, refer any dispute referred to in clause 11.2 above to arbitration
            administered by the Singapore International Arbitration Centre (&quot;<strong>SIAC</strong>&quot;) in
            Singapore in accordance with the Arbitration Rules of the SIAC (&quot;<strong>SIAC Rules</strong>&quot;) for
            the time being in force, which rules are deemed to be incorporated by reference in this clause. Further:
          </p>
          <p className={subtextCSS}>11.3.1. The seat of the arbitration shall be Singapore.</p>
          <p className={subtextCSS}>11.3.2. The tribunal shall consist of one (1) arbitrator.</p>
          <p className={subtextCSS}>11.3.3. The language of the arbitration shall be English.</p>
          <p className={subtextCSS}>
            11.3.4. All information, pleadings, documents, evidence and all matters relating to the arbitration shall be
            confidential.
          </p>
          <p className={subtextCSS}>
            11.3.5. Where IMDA is the defendant or respondent, it shall be given at least 30 days before the
            commencement of any legal action against it to elect to exercise the right herein to have the dispute
            submitted to arbitration. This right to elect shall not prejudice IMDA&apos;s right to a limitation defence
            and the period to exercise the right shall not be abridged by reason of any accrual of a limitation defence
            in favour of IMDA during the said period.
          </p>
          <p className={textCSS}>
            This version of the Terms of Use is dated <strong>06-Sep-2022</strong>.
          </p>
          <h2>Schedule</h2>
          <h4>12. Name of Service</h4>
          <p className={textCSS}>12.1. TradeTrust</p>
          <h4>13. Nature of Service and Special Terms</h4>
          <p className={textCSS}>
            13.1. Developed and pioneered by the Infocomm Media Development Authority (IMDA), TradeTrust was designed to
            address the challenges of paper-based international trade. TradeTrust is a set of international standards
            and frameworks supported by open-source software that utilises blockchain-powered technology to digitalise
            the end-to-end processing of trade documents to ensure that documents issued can be verified in terms of
            their source and authenticity. Through a holistic framework made of four key components &ndash; legal
            harmonisation, accreditation structure, standards development and open-source software &ndash; TradeTrust
            seeks to make digitalised trade robust, legally recognisable, and inclusive for all stakeholders in the
            ecosystem, resulting in faster, simpler and more secure trade processes
          </p>
          <p className={textCSS}>13.2. To use the Service, you will need to upload a document onto the site.</p>
          <p className={textCSS}>
            13.3. IMDA is NOT responsible for the fulfilment and response of third party blockchain network, or of the
            functioning of any third party software or technology (such as Ethereum and Polygon).
          </p>
          <p className={textCSS}>
            13.4. Please note that separate terms (and not these Terms of Use) may govern the relationship between you
            and the document issuer/verifier/presenter, or any person accessing or providing a copy of the relevant
            document. For the avoidance of doubt, IMDA is not responsible for the contents of the document or the legal
            acceptability of the document. IMDA makes no representations or warranties concerning the powers or
            authority of the document issuer/verifier/presenter.
          </p>
          <h4>14. Third party software/services</h4>
          <p className={textCSS}>
            14.1.{" "}
            <a href="https://policies.google.com/technologies/partner-sites" target="_blank" rel="noopener noreferrer">
              Google Analytics
            </a>
          </p>
          <p className={textCSS}>14.2. WoGAA</p>
          <p className={textCSS}>
            14.3.{" "}
            <a href="https://www.netlify.com/tos/" target="_blank" rel="noopener noreferrer">
              Netlify
            </a>
          </p>
          <p className={textCSS}>
            14.4.{" "}
            <a href="static/common/credits.pdf" target="_blank" rel="noopener noreferrer">
              List of open source software
            </a>
          </p>
        </div>
      </Page>
    </>
  );
};
