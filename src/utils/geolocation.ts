import { GeoPoint } from "firebase/firestore";

export class Geolocation {
  latitude: number;
  longitude: number;

  private constructor (latitude: number, longitude: number) {
    this.latitude = latitude;
    this.longitude = longitude;
  }

  static fromCoordinates (coords: GeolocationCoordinates) {
    return new Geolocation(coords.latitude, coords.longitude);
  }

  static fromFirestore (geoPoint: GeoPoint) {
    return new Geolocation(geoPoint.latitude, geoPoint.longitude);
  }

  static fromNaver(latLng: naver.maps.LatLng) {
    return new Geolocation(latLng.lat(), latLng.lng());
  };

  toFirestore () {
    return new GeoPoint(this.latitude, this.longitude);
  }

  toNaver() {
    return new naver.maps.LatLng(this.latitude, this.longitude);
  }
}
