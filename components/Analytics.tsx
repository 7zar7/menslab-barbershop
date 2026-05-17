import Script from "next/script";
import { siteConfig } from "@/lib/siteConfig";

/** GA4 — renders nothing until a Measurement ID is set in siteConfig. */
export default function Analytics() {
  const id = siteConfig.ga4Id;
  if (!id) return null;
  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${id}`}
        strategy="afterInteractive"
      />
      <Script id="ga4-init" strategy="afterInteractive">
        {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${id}',{anonymize_ip:true});`}
      </Script>
    </>
  );
}
