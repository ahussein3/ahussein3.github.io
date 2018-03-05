
    const month = new Array();
    month[0] = "Jan";
    month[1] = "Feb";
    month[2] = "Mar";
    month[3] = "Apri";
    month[4] = "May";
    month[5] = "June";
    month[6] = "July";
    month[7] = "Aug";
    month[8] = "Sept";
    month[9] = "Oct";
    month[10] = "Nov";
    month[11] = "Dec";

    let date = new Date;
    let _month = month[date.getMonth()];
    let _date = date.getDate();

    var app = new Vue({
      el: '#app',
      data: {
        _month,
        _date,
        apiKey: "zDq9AGiRTT9NvxAbr",
        apiUrl: "https://www.metaweather.com/api/location/search/",
        // https://www.metaweather.com/api/location/search/?lattlong=36.96,-122.02
        tempData: null,
        woeid: null,
        imgUrl: null,
        proxyurl : "https://cors-anywhere.herokuapp.com/",
        url : "https://example.com",
        classIcon: null,


      },
      methods: {
        fetchtemp: function (lat, lang) {
          const url = `${this.apiUrl}?lattlong=${lat},${lat}`;
          fetch(this.proxyurl+url)
            .then(response => response.json())
            .then(data => {
              this.woeid = data[0].woeid;
              console.log(this.woeid);
              fetch(this.proxyurl+'https://www.metaweather.com/api/location/' + this.woeid)
                .then(response => response.json())
                .then(d => {
                  this.tempData = d;
                  console.log(this.tempData);
                  // temp = Math.round(tempData.consolidated_weather[0].the_temp);
                  // parentTitle = tempData.parent.title;
                  // title = tempData.title;
                  // weatherName = tempData.consolidated_weather[0].weather_state_name;
                  this.imgUrl = "https://www.metaweather.com/static/img/weather/png/64/" + this.tempData.consolidated_weather[0].weather_state_abbr + ".png"
                  // loaded = true;
                })
            })
        },
        err: function error(err) {
          console.warn(`ERROR(${err.code}): ${err.message}`);
        },
        getloc: function (position) {
          console.log(position)
          const lat = position.location.lat;
          const lang = position.location.lng;
          console.log(lat, lang);
          this.fetchtemp(lat, lang);
        },
        init: function () {
          // navigator.geolocation.getCurrentPosition(this.getloc, this.err);


          fetch('https://www.googleapis.com/geolocation/v1/geolocate?key=AIzaSyDSOEDu7QMY_vRcCZOTVH6kcpii88VLezw', {
            method: 'POST',
            // body:JSON.stringify({ coords: { latitude: success.location.lat, longitude: success.location.lng } })
          }).then((res) => res.json())
            .then((data) => this.getloc(data))

        }




      },
      created: function () {
        this.init();

      }


    });
