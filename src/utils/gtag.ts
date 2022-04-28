export const GA_TRACKING_ID = 'G-NQ6BDLQ9J9';

interface IGtagEvent {
    action: string;
    category: string;
    label: string;
    value?: number;
}

// https://developers.google.com/analytics/devguides/collection/gtagjs/pages
export const pageview = (url: string) => {
    window.gtag('config', GA_TRACKING_ID, {
        page_path: url,
    });
};

// https://developers.google.com/analytics/devguides/collection/gtagjs/events
export const event = ({ action, category, label, value }: IGtagEvent) => {
    window.gtag('event', action, {
        event_category: category,
        event_label: label,
        value: value ?? null,
    });
};
