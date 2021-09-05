import { ConsoleLogger } from "@aws-amplify/core";

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


export class Point {
  long: number;
  lat: number;
  constructor(long: number,lat: number) {
      this.long = long;
      this.lat = lat;
  };

  calculateDirection(destination: Point) {
      return new DirectionVector(destination.long-this.long, destination.lat-this.lat)
  }

  distanceTo(destination: Point) {
    console.log("calcing distance between lat longs")
    return diffBetweenLatlong(this.lat, this.long, destination.lat, destination.long)
  }
}

class DirectionVector {
  x: number;
  y: number;
  constructor(xDirection: number, yDirection: number) {
      this.x = xDirection;
      this.y = yDirection;
  }

  perpendicular() {
      return new DirectionVector(this.y, -this.x)
  }

  magnitude() {
      return Math.sqrt((this.x*this.x)+(this.y*this.y))
  }

  normalise() {
      let magnitude = this.magnitude()
      this.x /= magnitude
      this.y /= magnitude

      return this
  }
}

class Vector {
  point: Point
  direction: DirectionVector
  constructor(point: Point, direction: DirectionVector) {
      this.point = point;
      this.direction = direction;
  }
}

const intersects = (point1: Point, point2: Point, point3: Point, point4: Point): Point => {
    // Check if none of the lines are of length 0
    if ((point1.long === point2.long && point1.lat === point2.lat) || (point3.long === point4.long && point3.lat === point4.lat)) {
      throw "no intersection found"
    }

    const denominator = ((point4.lat - point3.lat) * (point2.long - point1.long) - (point4.long - point3.long) * (point2.lat - point1.lat))

    // Lines are parallel
    if (denominator === 0) {
      throw "no intersection found"
    }

    let ua = ((point4.long - point3.long) * (point1.lat - point3.lat) - (point4.lat - point3.lat) * (point1.long - point3.long)) / denominator
    let ub = ((point2.long - point1.long) * (point1.lat - point3.lat) - (point2.lat - point1.lat) * (point1.long - point3.long)) / denominator

    // is the intersection along the segments
    if (ua < 0 || ua > 1 || ub < 0 || ub > 1) {
      throw "no intersection found"
    }

    // Return a object with the x and y coordinates of the intersection
    let x = point1.long + ua * (point2.long - point1.long)
    let y = point1.lat + ua * (point2.lat - point1.lat)

    return new Point(x,y)

};

export const calcIntersections = (userLocation: Point, path: Point[], rangeRadius: number, intersectionCheckLength: number): boolean => {
  for (let i = 0; i < path.length-1; i++) {

      const direction = path[i].calculateDirection(path[i+1]).normalise()
      const perpendicular = direction.perpendicular();

      const endPoint = new Point(userLocation.long+(perpendicular.x * intersectionCheckLength), userLocation.lat+(perpendicular.y * intersectionCheckLength))  // range radius will be huge here and not represent meters
      const startPoint = new Point(userLocation.long-(perpendicular.x * intersectionCheckLength), userLocation.lat-(perpendicular.y * intersectionCheckLength))

      try {
        if (intersects(startPoint, endPoint, path[i], path[i+1])) {
          return true;
        } // TODO check the length of the intersection and make the radius for checking the size of the range at the equator (the largest possible gap in lat long for x meters) e.g. if 10m get lat long of 10m at equator and use as intersection range
        // then after use the distanceTo function to get more precise value taking into consideration lat long
      }
      catch {}  // no intersection found with normals
      // see if the ends of the line are within distance

      const distanceToStart = userLocation.distanceTo(path[i])
      if (distanceToStart <= rangeRadius) {
        console.log("close to start of point")
        return true;
      }

      const distanceToEnd = userLocation.distanceTo(path[i+1])
      if (distanceToEnd <= rangeRadius) {
        console.log("close to end of point")
        return true;
      }
  }
  console.log("no intersections found");
  return false; // all lines were checked and none were close enough
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