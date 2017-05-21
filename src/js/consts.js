module.exports = {
  age_groups: [
    {
      id: "15-20",
      minvalue :15,
      maxValue :20,
      displayName: "15-20"
    },
    {
      id: "20-30",
      minvalue :20,
      maxValue :30,
      displayName: "20-30"
    },
    {
      id: "30-40",
      minvalue :30,
      maxValue :40,
      displayName: "30-40"
    },
    {
      id: "40-100",
      minvalue :40,
      maxValue :100,
      displayName: "40-100"
    }
  ],
  interests:[
    {
      name:"Beauty",
      id:"Beauty"
    },
    {
      name:"Photography",
      id:"Photography"
    },
    {
      name:"Photography",
      id:"Photography"
    },
    {
      name:"Cosmetics",
      id:"Cosmetics"
    }
  ],
  facebook: {
    application_id:'615566271976367',
    client_secret:'508f0e61a63298135974ea17d3aa71e4',
    scopes: "public_profile",
    redirect_url: 'https://www.facebook.com/connect/login_success.html'
  },
  genders:{
    0: 'Both',
    1: 'Male',
    2: 'Female' 
  }  

}