export const isMobile =
    navigator.userAgent.match(
        /iPhone|iPod|Android|Windows CE|BlackBerry|Symbian|Windows Phone|webOS|Opera Mini|Opera Mobi|POLARIS|IEMobile|lgtelecom|nokia|SonyEricsson/i,
    ) != null || navigator.userAgent.match(/LG|SAMSUNG|Samsung/) !== null;

export const isIos = /iPhone|iPad|iPod/i.test(navigator.userAgent);
