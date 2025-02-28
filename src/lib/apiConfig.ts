const isProduction = process.env.NODE_ENV === 'production';

const localApiUrl = 'http://127.0.0.1:8000/api';
const productionApiUrl = '';

const localMediaUrl = 'http://127.0.0.1:8000';
const productionMediaUrl = '';

export const getApiUrl = () => {
    return isProduction ? productionApiUrl : localApiUrl;
};

export const getMediaUrl = () => {
    return isProduction ? productionMediaUrl : localMediaUrl;
};