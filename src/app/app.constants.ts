export const constants = {

  // Current app version
  APP_VERSION : '1.2.0',

  // Stage API Url
  API_URL : 'https://skatespot-showcase-api.herokuapp.com/api/v1',
  // Dev API URL
  // API_URL : 'http://localhost:3000/api/v1',

  // OpenWeather API
  WEATHER_API : '6f4bcf0296cc16a2674726002e7504d5',
  // OpenWeather URL
  WEATHER_URL : 'http://api.openweathermap.org/data/2.5/weather?',

  // Firebase config
  FIREBASE : {
    API_KEY : 'AIzaSyDZTyJ5IxG_E_tlfwnKrAHbm6FVpb9VG0Q',
    AUTH_DOMAIN : 'skatespot-lite.firebaseapp.com',
    DATABASE_URL : 'https://skatespot-lite.firebaseio.com',
    PROJECT_ID : 'skatespot-lite',
    STORAGE_BUCKET : 'skatespot-lite.appspot.com',
    MESSAGING_SENDER_ID: '1018588074755'
  },

  // Analytics tracker ID
  TRACKER_ID : 'UA-108370057-1',

  // Page ID's for analytics
  FAVORITES_PAGE_ID : 'Favorites Screen',
  SPOT_PAGE_ID : 'Spot Screen - ',

  // Event ID's for analytics
  ADD_FAVORITE_EVENT : 'User added favorite - ',
  REMOVE_FAVORITE_EVENT : 'User removed favorite - '
  // This is for logging these as google analytic events, rather than as screens
  // FAVORITES_EVENT : {
  //   CATEGORY : 'Favorites',
  //   ADD : 'Added',
  //   REMOVE : 'Removed'
  // }

};
