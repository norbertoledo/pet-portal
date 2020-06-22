export default function customDownloadUrl(originalDownloadUrl){
    const indexChar = originalDownloadUrl.indexOf('?');
    const baseUrl = originalDownloadUrl.slice(0,indexChar);
    const metaUrl = originalDownloadUrl.slice(indexChar);
    const imageUrl = `${baseUrl}_image${metaUrl}`;
    const thumbUrl = `${baseUrl}_thumb${metaUrl}`;

    return {
        imageUrl,
        thumbUrl
    }

}