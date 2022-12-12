import * as AWS from 'aws-sdk'

export const DeleteImage = async (carpeta: string, img: string) => {
    const splitimg = img.split('/')
    console.log(img.split('/').pop())
    await new AWS.S3()
        .deleteObject({Bucket: 'mcd-archivos', Key: `${carpeta}/${img.split('/').pop()}`})
        .promise()
        .then((data) => {
            console.log(data)
            return data // For unit tests.
        })
        .catch((err) => {
            console.log(err)
            return err // For unit tests.
        })
}
