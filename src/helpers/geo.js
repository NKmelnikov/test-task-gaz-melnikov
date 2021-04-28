import { parse } from "fast-xml-parser";
import regionData from "../data/regions.json";

const geo = {
  longitude: null,
  latitude: null,
  initializeRegion(setState) {
    this.getLongitudeLatitude()
      .then((result) => {
        this.setLongitude(result.longitude);
        this.setLatitude(result.latitude);
      })
      .then((result) => this.fetchGeo(setState))
      .catch((err) => console.error(err));
  },
  fetchGeo(setState) {
    fetch(this.getUrl(this.longitude, this.latitude))
      .then((response) => response.text())
      .then((textResponse) => {
        const obj = parse(textResponse);
        const locationName = obj.ymaps.GeoObjectCollection.featureMember[1].GeoObject.description.split(
          ","
        )[0];
        setState(this.getRegionUuidByName(locationName));
      })
      .catch((error) => {
        console.log(error);
      });
  },
  getLongitudeLatitude() {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve({
            longitude: position.coords.longitude,
            latitude: position.coords.latitude,
          });
        },
        (error) => {
          if (error.code === error.PERMISSION_DENIED) {
            alert(
              "Определение геолокации отключено. Попробуйте установить регион вручную"
            );
          }
          reject(error.message);
        }
      );
    });
  },
  getRegionUuidByName(name) {
    return regionData.data.filter((region) =>
      region.area_names.includes(name)
    )[0].uuid;
  },
  getUrl(longitude, latitude) {
    return `${process.env.REACT_APP_YA_GEO_URL}?apikey=${process.env.REACT_APP_YA_GEO_API_KEY}&geocode=${longitude},${latitude}`;
  },
  setLongitude(value) {
    this.longitude = this.longitude === null ? value : this.longitude;
  },
  setLatitude(value) {
    this.latitude = this.latitude === null ? value : this.latitude;
  },
};

export default geo;
