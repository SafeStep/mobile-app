export const diffBetweenLatlong = function (lat1:number, lon1:number, lat2:number, lon2:number): number {
    const R = 6371e3; // metres
    const theta1 = lat1 * Math.PI/180; // φ, λ in radians
    const theta2 = lat2 * Math.PI/180;
    const deltaTheta = (lat2-lat1) * Math.PI/180;
    const deltaLambda = (lon2-lon1) * Math.PI/180;

    const a = Math.sin(deltaTheta/2) * Math.sin(deltaTheta/2) +
            Math.cos(theta1) * Math.cos(theta2) *
            Math.sin(deltaLambda/2) * Math.sin(deltaLambda/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

    const d = R * c; // in metres
    return d
}

export const makeGeoJSON: (data: number[][]) => any = function(data) {

    data.forEach(function(part, index, arr) {
      arr[index] = part.reverse(); // to fix mapbox's criminal ways of long then lat
    });
  
    return {
      "type":"Feature",
      "properties":{},
      "geometry":{
        "type":"LineString",
        "coordinates": data
      }
    }
  };