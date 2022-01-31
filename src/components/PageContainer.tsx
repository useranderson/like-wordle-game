import React from "react";
import Head from "next/head";

const PageContainer: React.FC = ({ children }) => {
  return (
    <div className="bg-neutral-900 w-full h-full">
      <Head>
        <title>LIKE WORDLE</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Mitr&display=swap"
          rel="stylesheet"
        ></link>
      </Head>
      {children}
    </div>
  );
};

export default PageContainer;
