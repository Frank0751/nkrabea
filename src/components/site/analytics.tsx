import Script from "next/script";

/**
 * Microsoft Clarity, koombei-studio-skill Part 8's analytics for every client
 * site.
 *
 * Off until NEXT_PUBLIC_CLARITY_PROJECT_ID is set in Vercel. Clarity records
 * sessions and sets cookies, and Ghana's Data Protection Act, 2012 (Act 843)
 * expects the people whose data is collected to be told, so a short privacy
 * notice should go live on the same day the id does.
 *
 * lazyOnload keeps it out of the critical path entirely: it loads after
 * everything else on the page, so it cannot cost the hero a millisecond. The
 * id is validated before it is written into the snippet, so a malformed
 * variable cannot inject script.
 */
const CLARITY_ID = (process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID ?? "").trim();

export function Analytics() {
  if (!/^[a-z0-9]{6,20}$/i.test(CLARITY_ID)) return null;

  return (
    <Script id="microsoft-clarity" strategy="lazyOnload">
      {`(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);})(window,document,"clarity","script","${CLARITY_ID}");`}
    </Script>
  );
}
