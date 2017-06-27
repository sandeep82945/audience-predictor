let FB = require('fb');
let $ = global.$

FB.options({version: 'v2.9'})

class FbApi{
  constructor(access_token){
    FB.setAccessToken(access_token)
  }
  getprofile(callback){
    let resultFn = this.getReultFn(callback)
    FB.api('/me', { fields: ['id', 'name', 'picture.width(800).height(800)'] }, resultFn)
  }

  getFBAudiences(callback){
    this.callback = callback
    this.getAdAccountId()
  }

  getAdAccountId(){
    let resultFn = this.getReultFn(this.getAudiences.bind(this))
    FB.api('me/adaccounts', resultFn)
  }

  getAudiences(res){
    if(res.data){
      $.each(res.data, (index, audience) =>{
        let resultFn = this.getReultFn(this.getAudienceDetails.bind(this))
        FB.api(`${audience.id}?fields=saved_audiences`, resultFn)
      })
    }
  }

  getAudienceDetails(res){
    if(res && res.saved_audiences && res.saved_audiences.data){
      let audiences = res.saved_audiences.data
      $.each(audiences, (index, audience) =>{
        let resultFn = this.getReultFn(this.onAudienceDetails.bind(this), audience.name)
        FB.api(`${audience.id}?fields=targeting`, resultFn)
      })
    }
  }
  onAudienceDetails(res, audience_name){
    this.callback(res.targeting, audience_name)
  }

  getReultFn(callback, audience_name){
    return (res) => {
      if(!res || res.error){
        console.error(!res ? 'error occurred' : res.error)
        return
      }
      callback(res, audience_name)
    }
  }
}

module.exports = FbApi
