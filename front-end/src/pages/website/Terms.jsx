import React from "react";
import WebHeader from "../../components/WebHeader";

const Terms = () => {
  return (
    <div className="w-full be-vietnam-pro-regular">
      <div className="w-full  block overflow-y-scroll ">
        <div className="w-full mt-5 flex justify-center">
          <WebHeader />
        </div>
      </div>
      <div className="flex flex-col gap-10 mt-32 items-center">
        {/*1*/}
        <div className="flex flex-col w-[70%] gap-4">
          <h1 className="text-3xl text-gray-700">Terms of Use (“Terms”)</h1>
          <p className="text-gray-500 text-sm">Last updated: May 29th, 2025</p>
          <p className="text-gray-500 text-sm">
            Please read these Terms of Use (“Terms”, “Terms of Use”) carefully
            before using the www.goprospero.com website (the “Service”) operated
            by Poptin (“us”, “we”, or “our”).
          </p>
          <p className="text-gray-500 text-sm">
            Your access to and use of the Service is conditioned on your
            acceptance of and compliance with these Terms. These Terms apply to
            all visitors, users and others who access or use the Service.
          </p>
          <p className="text-gray-500 text-sm">
            By accessing or using the Service you agree to be bound by these
            Terms. If you disagree with any part of the terms then you may not
            access the Service.
          </p>
        </div>

        {/*2*/}
        <div className="flex flex-col w-[70%] gap-4">
          <h1 className="text-xl text-gray-700"> 1. Content</h1>
          <p className="text-gray-500 text-sm">
            We own the intellectual property rights of any and all service
            components that can be protected including the automated content
            created by Prospero.
          </p>
          <p className="text-gray-500 text-sm">
            You agree not to copy, distribute, adapt, reverse engineer any
            aspect of the service. You also agree not to use any
            automated/manual devices/bots/spiders to copy any content from the
            Service.
          </p>
          <p className="text-gray-500 text-sm">
            We are not responsible for any direct, indirect, incidental or
            consequential damages arising out of or relating in any way to your
            use of the service.
          </p>
          <p className="text-gray-500 text-sm">
            Our Service allows you to post, link, store, share and otherwise
            make available certain information, text, graphics, videos, or other
            material (“Content”). You are responsible for the Content that you
            post to the Service, including its legality, reliability, and
            appropriateness.
          </p>
          <p className="text-gray-500 text-sm">
            By posting Content to the Service, you grant us the right and
            license to use, modify, publicly perform, publicly display,
            reproduce, and distribute such Content on and through the Service.
            You retain any and all of your rights to any Content you submit,
            post or display on or through the Service and you are responsible
            for protecting those rights.
          </p>
          <p className="text-gray-500 text-sm">
            You represent and warrant that: (i) the Content is yours (you own
            it) or you have the right to use it and grant us the rights and
            license as provided in these Terms, and (ii) the posting of your
            Content on or through the Service does not violate the privacy
            rights, publicity rights, copyrights, contract rights or any other
            rights of any person.
          </p>
        </div>
        {/*3*/}
        <div className="flex flex-col w-[70%] gap-4">
          <h1 className="text-xl text-gray-700"> 2. Accounts</h1>
          <p className="text-gray-500 text-sm">
            When you create an account with us, you must provide us information
            that is accurate, complete, and current at all times. Failure to do
            so constitutes a breach of the Terms, which may result in immediate
            termination of your account on our Service.
          </p>
          <p className="text-gray-500 text-sm">
            You are responsible for safeguarding the password that you use to
            access the Service and for any activities or actions under your
            password, whether your password is with our Service or a third-party
            service.
          </p>
          <p className="text-gray-500 text-sm">
            You agree not to disclose your password to any third party. You must
            notify us immediately upon becoming aware of any breach of security
            or unauthorized use of your account.
          </p>
          <p className="text-gray-500 text-sm">
            You may not use as a username the name of another person or entity
            or that is not lawfully available for use, a name or trade mark that
            is subject to any rights of another person or entity other than you
            without appropriate authorization, or a name that is otherwise
            offensive, vulgar or obscene.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Terms;
