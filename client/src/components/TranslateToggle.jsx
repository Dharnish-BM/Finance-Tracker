import React, { useEffect, useRef, useState } from "react";

function TranslateToggle() {
  const [open, setOpen] = useState(false);
  const [initialized, setInitialized] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    if (!open) return;

    const initFunctionName = "googleTranslateElementInit";

    const initWidget = () => {
      if (!containerRef.current) return;
      if (window.google && window.google.translate && !initialized) {
        // eslint-disable-next-line no-new
        new window.google.translate.TranslateElement(
          {
            pageLanguage: "en",
            autoDisplay: true,
            layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
          },
          containerRef.current.id
        );
        setInitialized(true);
      }
    };

    if (!window[initFunctionName]) {
      window[initFunctionName] = function () {
        initWidget();
      };
    }

    const existingScript = document.getElementById("google-translate-script");
    if (existingScript) {
      if (window.google && window.google.translate) {
        initWidget();
      }
    } else {
      const script = document.createElement("script");
      script.id = "google-translate-script";
      script.src =
        "https://translate.google.com/translate_a/element.js?cb=" + initFunctionName;
      script.async = true;
      document.body.appendChild(script);
    }

    const start = Date.now();
    const interval = setInterval(() => {
      if (window.google && window.google.translate) {
        initWidget();
        clearInterval(interval);
      } else if (Date.now() - start > 3000) {
        clearInterval(interval);
      }
    }, 100);

    return () => clearInterval(interval);
  }, [open, initialized]);

  useEffect(() => {
    const onClickOutside = (e) => {
      if (!open) return;
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        const trigger = document.getElementById("gt_trigger_button");
        if (trigger && trigger.contains(e.target)) return;
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, [open]);

  return (
    <div className="relative ml-3 flex items-center">
      <style>{`
        .goog-te-banner-frame.skiptranslate { display: none !important; }
        body { top: 0px !important; }
        #gt_widget_container .goog-logo-link { display: none !important; }
        #gt_widget_container .goog-te-gadget { font-size: 0 !important; }
        #gt_widget_container .goog-te-gadget span { display: none !important; }
        #gt_widget_container select.goog-te-combo {
          background: #ffffff;
          color: #111827;
          border: 1px solid #e5e7eb;
          border-radius: 0.5rem;
          padding: 0.375rem 2rem 0.375rem 0.75rem;
          appearance: none;
          font-size: 0.875rem;
        }
        #gt_widget_container { position: relative; }
        #gt_widget_container:after {
          content: "";
          position: absolute; right: 0.5rem; top: 50%; transform: translateY(-50%);
          border-left: 5px solid transparent; border-right: 5px solid transparent; border-top: 6px solid #6b7280;
          pointer-events: none;
        }
      `}</style>

      <button
        id="gt_trigger_button"
        onClick={() => setOpen((v) => !v)}
        className="p-2 rounded-full bg-white/20 hover:bg-white/30 text-white transition shadow-md"
        aria-label="Translate"
        title="Translate"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
          <path d="M12 4v3h8v10h-8v3h11V4H12z"/>
          <path d="M5 6h7v2H9.59c.35.56.76 1.09 1.22 1.6.46.51.99.98 1.58 1.4-.24.3-.5.59-.78.85-.28.27-.58.52-.9.76-.64-.49-1.22-1.05-1.75-1.68-.53-.63-.99-1.3-1.38-2H5V8zm0 4h2.23c.29.54.64 1.08 1.04 1.62.4.54.87 1.07 1.4 1.58-.35.2-.72.39-1.12.55-.4.17-.82.31-1.26.42-.41-.83-.78-1.7-1.1-2.62H5v-1.55z"/>
        </svg>
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-56 bg-white text-gray-800 rounded-lg shadow-lg p-3 z-50">
          <div id="gt_widget_container" ref={containerRef} style={{ minHeight: 36 }} />
          {!initialized && (
            <div className="text-sm text-gray-500 py-2">Loading translator…</div>
          )}
        </div>
      )}
    </div>
  );
}

export default TranslateToggle;


