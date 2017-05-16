let FB = require('fb');
let $ = global.$

FB.options({version: 'v2.9'})

class FbApi{
  constructor(access_token){
    FB.setAccessToken(access_token)
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
        let resultFn = this.getReultFn(this.onAudienceDetails.bind(this))
        FB.api(`${audience.id}?fields=targeting`, resultFn)
      }) 
    }
  }
  onAudienceDetails(res){
    this.callback(res.targeting)
  }

  getReultFn(callback){
    return (res) => {
      if(!res || res.error){
        console.error(!res ? 'error occurred' : res.error)
        return
      }
      callback(res)
    }
  }
}

module.exports = FbApi