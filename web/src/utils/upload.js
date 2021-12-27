import COS from 'cos-js-sdk-v5';
import {
    v4 as uuid
} from 'uuid';



// async function getKey() {
//     const value = await fetch('http://82.156.8.254:80/api/key', {
//         headers: {
//             'Content-Type': 'application/json'
//         }
//     });
//     const data = await value.json();
//     return data.data;
// }

// async function getCos(file) {
//     var 
//     var cos = new COS({
//         SecretId: 'SECRETID',
//         SecretKey: 'SECRETKEY',
//     });
//         // const key = await getKey();
//         // _cos = new COS({
//         //     getAuthorization (options, callback) {
//         //         callback({
//         //             TmpSecretId: key.tmpSecretId,
//         //             TmpSecretKey: key.tmpSecretKey,
//         //             SecurityToken: key.sessionToken,
//         //             // 建议返回服务器时间作为签名的开始时间，避免用户浏览器本地时间偏差过大导致签名错误
//         //             StartTime: key.startTime, // 时间戳，单位秒，如：1580000000
//         //             ExpiredTime: key.expiredTime, // 时间戳，单位秒，如：1580000900
//         //         });
//         //     }
//         //   });


//     cos.putObject({
//         Bucket: 'web-130727-1308780874', /* 填入您自己的存储桶，必须字段 */
//         Region: 'ap-beijing',  /* 存储桶所在地域，例如ap-beijing，必须字段 */
//         Key: name,  /* 存储在桶里的对象键（例如1.jpg，a/b/test.txt），必须字段 */
//         Body: file, // 上传文件对象
//         onProgress: function(progressData) {
//             console.log(JSON.stringify(progressData));
//         }
//     }, function(err, data) {
//         if (data) {
//             console.log('存储桶存在');
//         } else if (err.code === 404) {
//             console.log('存储桶不存在');
//         } else if (err.code === 403) {
//             console.log('没有该存储桶读权限');
//         }
//         // console.log(err || data);
//         // resolve(data);
//     });
//     cos.getService(function(err, data) {
//         console.log(err || data);
//     });

// }

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
    // cos.getService(function (err, data) {
    //     console.log(err || data);
    // });
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
        // console.log("err", err);
        // console.log("data", data);
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


    // const cos = await getCos(file);
    // const name = `/images/${uuid()}.jpg`;

    // const value = await new Promise((resolve, reject) => {

    //     cos.putObject({
    //         Bucket: 'web-130727-1308780874', /* 填入您自己的存储桶，必须字段 */
    //         Region: 'ap-beijing',  /* 存储桶所在地域，例如ap-beijing，必须字段 */
    //         Key: name,  /* 存储在桶里的对象键（例如1.jpg，a/b/test.txt），必须字段 */
    //         Body: file, // 上传文件对象
    //         onProgress: function(progressData) {
    //             console.log(JSON.stringify(progressData));
    //         }
    //     }, function(err, data) {
    //         if (data) {
    //             console.log('存储桶存在');
    //         } else if (err.code === 404) {
    //             console.log('存储桶不存在');
    //         } else if (err.code === 403) {
    //             console.log('没有该存储桶读权限');
    //         }
    //         // console.log(err || data);
    //         resolve(data);
    //     });
    //     // cos.putObject({
    //     //     Bucket: 'web-130727-1308780874', /* 必须 */
    //     //     Region: 'ap-beijing',     /* 存储桶所在地域，必须字段 */
    //     //     Key: name,              /* 必须 */
    //     //     StorageClass: 'STANDARD',
    //     //     Body: file, // 上传文件对象
    //     // }, function(err, data) {
    //     //     if (err) {
    //     //         reject(err);
    //     //     }

    //     // });
    // })
    // if (value && value.statusCode === 200) {
    //     return `//${value.Location}`;
    // }
    // console.error(value);
}