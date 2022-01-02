import COS from 'cos-js-sdk-v5';
import {
    v4 as uuid
} from 'uuid';

/**
 * 
 * @param {*} file 参数为file对象
 * @return string 返回值为图片的url
 */
export async function uploadFile(file) {
    let Bucket = 'web-130727-1308780874';
    let Region = 'ap-beijing';
    var imgurl;
    var cos = new COS({
        getAuthorization: function (options, callback) {
            var authorization = COS.getAuthorization({
                SecretId: 'AKIDsa3GDvOaU7UbS1JL7crqYDcniMjpfFYa', //这是密钥ID
                SecretKey: 'mIXVDfrnSrzqQkmX2GDtIQHrACyTgdKk', //这是密钥的钥匙（哇，我都不知道怎么说了，总之是在腾讯云对象储存上注册登录后你要申请的东西）
                Method: options.Method,
                Key: options.Key,
                Query: options.Query,
                Headers: options.Headers,
                Expires: 60,

            });
            callback(authorization);
        }
    })
    const name = `/images/${uuid()}.jpg`;
    // 分片上传文件
    cos.putObject({
        Bucket: Bucket,
        Region: Region,
        Key: name,
        Body: file,
        onProgress: function (progressData, callback) {
            logger.log(JSON.stringify(progressData));
        },
    }, function (err, data) {
    });

    cos.getObjectUrl({
        Key: name,
        Bucket: Bucket,
        Sign: false,
        Region: Region,
    }, function (err, data) {
        imgurl = data.Url;
    });
    return imgurl;
}