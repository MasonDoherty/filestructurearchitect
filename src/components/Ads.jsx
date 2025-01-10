import React, { useEffect } from "react";

const Ads = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.async = true;
    script.src = "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1980400328758096";
    script.crossOrigin = "anonymous";
    document.body.appendChild(script);

    // Initialize adsbygoogle if not already initialized
    (window.adsbygoogle = window.adsbygoogle || []).push({});
  }, []);

  return (
    <div>
      <h3>Advertisements</h3>
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client="ca-pub-1980400328758096"
        data-ad-slot="1234567890"
        data-ad-format="auto"
        data-full-width-responsive="true"
      ></ins>
    </div>
  );
};

export default Ads;
