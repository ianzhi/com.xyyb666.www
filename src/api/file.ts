import request from "@/utils/request"

export async function upload(data: any, type: string){
    return request
        .post('/wp/v2/media', data, {
            maxRedirects: 10,
            headers: { 'content-type': type }
        })
        .then(res => res.data)
}