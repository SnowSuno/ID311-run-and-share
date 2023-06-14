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

  static fromNaver (latLng: naver.maps.LatLng) {
    return new Geolocation(latLng.lat(), latLng.lng());
  };

  toFirestore () {
    return new GeoPoint(this.latitude, this.longitude);
  }

  toNaver () {
    return new naver.maps.LatLng(this.latitude, this.longitude);
  }

  equals (other: Geolocation) {
    return this.latitude === other.latitude && this.longitude ===
      other.longitude;
  }

  get rad () {
    return {
      latitude: this.latitude * Math.PI / 180,
      longitude: this.longitude * Math.PI / 180,
    };
  }

  delta(other: Geolocation) {
    if (this.equals(other)) return 0;

    const R = 6371e3;
    const deltaPhi = (other.latitude - this.latitude) * Math.PI / 180;
    const deltaLambda = (other.longitude - this.longitude) * Math.PI / 180;

    const a = Math.sin(deltaPhi / 2) * Math.sin(deltaPhi / 2) +
      Math.cos(this.rad.latitude) * Math.cos(other.rad.latitude) * Math.sin(deltaLambda / 2) *
      Math.sin(deltaLambda / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; //in metres

  }
}
