import * as AWS from 'aws-sdk'

export const DeleteImage = async (carpeta: string, img: string) => {
    const splitimg = img.split('/')
    await new AWS.S3()
        .deleteObject({Bucket: 'mcd-archivos', Key: `${carpeta}/${img.split('/').pop()}`})
        .promise()
        .then((data) => {
            return data // For unit tests.
        })
        .catch((err) => {
            return err // For unit tests.
        })
}
