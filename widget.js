var coffeeWidget =
    coffeeWidget ||
    (function () {
        let style = '';
        let html = '';
        let background = '';
        let color = '';
        let svg = '';
        let text = '';
        let name = '';
        return {
            init: function (pText, pBackground, pColor, pName) {
                background = pBackground;
                color = pColor;
                text = pText;
                name = pName;
                style =
                    'svg{width:24px!important;height:24px!important;} path{fill: [color];} a.support-button{padding:16px 24px;background-color: [background]!important;display:flex!important;align-items:center;border-radius:16px!important;gap:8px!important;} span.support-text{color:[color]!important;font-size: 16px!important; font-weight:600; text-decoration:none!important;font-family: "SUIT", sans-serif;}';
                style = '<style>' + style + '</style>';
                html =
                    '<link href="https://cdn.jsdelivr.net/gh/sunn-us/SUIT/fonts/static/woff2/SUIT.css" rel="stylesheet">';
                svg =
                    '<svg width="320" height="320" viewBox="0 0 320 320" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0_2_10)"><path d="M91.97 -9.76515e-06L75.78 37.35H51.71V70.94H60.92L70.35 130.69H55.62L75.1 240.42L87.59 240.27L100.15 320H219.06L219.89 314.69L231.61 240.26L243.49 240.41L262.92 130.68H248.85L258.22 70.93H268.33V37.34H242.76L226.51 -0.0100098L91.97 -9.76515e-06ZM99.01 10.73H219.58L229.83 34.48H88.68L99.01 10.73ZM62.35 48.03H257.6V60.31H62.35V48.03ZM68.39 141.36H250.22L234.54 229.59L159.18 228.8L84.07 229.59L68.39 141.36Z" fill="#111111"/><path d="M131.5 213.6L93.4 193.6V188.8L131.5 168.8V175.5L101 191.2L131.5 206.9V213.6ZM138.175 226.2L172.175 145.3L177.675 148.1L143.675 229L138.175 226.2ZM222.516 193.6L184.416 213.6V206.9L214.916 191.2L184.416 175.5V168.8L222.516 188.8V193.6Z" fill="#111111"/></g><defs><clipPath id="clip0_2_10"><rect width="320" height="320" fill="white"/></clipPath></defs></svg>';
                html +=
                    '<a title="coffee-hanzan" class="support-button" href="https://coffee-hanzan.com/[name]" target="_blank">' +
                    svg +
                    '<span class="support-text">[text]</span></a>';
            },
            draw: function () {
                document.writeln(
                    style
                        .replaceAll('[background]', background)
                        .replaceAll('[color]', color) +
                        html.replace('[text]', text).replace('[name]', name),
                );
            },
        };
    })();
