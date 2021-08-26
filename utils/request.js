import config from './config'
export default (url,data={},method="GET")=>{
	return new Promise((reslove,reject)=>{
		uni.request({
			url:config.host + url,
			data,
			method,
			success: (res) => {
				reslove(res)
			},fail: (err) => {
				reject(err)
			}
		})
	})
}
