export const isMobile = () => {
    const userAgent = navigator.userAgent;

    return (
        userAgent.match(
            /iPhone|iPod|Android|Windows CE|BlackBerry|Symbian|Windows Phone|webOS|Opera Mini|Opera Mobi|POLARIS|IEMobile|lgtelecom|nokia|SonyEricsson/i,
        ) != null || userAgent.match(/LG|SAMSUNG|Samsung/) !== null
    );
};
