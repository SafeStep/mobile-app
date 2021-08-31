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


class Point {
  x: number;
  y: number;
  constructor(x: number,y: number) {
      this.x = x;
      this.y = y;
  };

  calculateDirection(destination: Point) {
      return new DirectionVector(destination.x-this.x, destination.y-this.y)
  }

  distanceTo(destination: Point) {
      return Math.sqrt((this.x-destination.x)**2+(this.y-destination.y)**2);
  }
}

class GeoPoint extends Point {
  distanceTo(destination: GeoPoint) {
    console.log("calcing distance between lat longs")
    return diffBetweenLatlong(this.x, this.y, destination.x, destination.y)
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
    if ((point1.x === point2.x && point1.y === point2.y) || (point3.x === point4.x && point3.y === point4.y)) {
      throw "no intersection found"
    }

    const denominator = ((point4.y - point3.y) * (point2.x - point1.x) - (point4.x - point3.x) * (point2.y - point1.y))

    // Lines are parallel
    if (denominator === 0) {
      throw "no intersection found"
    }

    let ua = ((point4.x - point3.x) * (point1.y - point3.y) - (point4.y - point3.y) * (point1.x - point3.x)) / denominator
    let ub = ((point2.x - point1.x) * (point1.y - point3.y) - (point2.y - point1.y) * (point1.x - point3.x)) / denominator

    // is the intersection along the segments
    if (ua < 0 || ua > 1 || ub < 0 || ub > 1) {
      throw "no intersection found"
    }

    // Return a object with the x and y coordinates of the intersection
    let x = point1.x + ua * (point2.x - point1.x)
    let y = point1.y + ua * (point2.y - point1.y)

    if (point1 instanceof GeoPoint) {
      return new GeoPoint(x, y)
    }

    return new Point(x,y)

};

const calcIntersections = (userLocation: Point, path: Point[], rangeRadius: number) => {
  for (let i = 0; i < path.length-1; i++) {

      const  direction = path[i].calculateDirection(path[i+1]).normalise()
      const  perpendicular = direction.perpendicular();

      const  endPoint = new Point(userLocation.x+(perpendicular.x * rangeRadius), userLocation.y+(perpendicular.y * rangeRadius))  // range radius will be huge here and not represent meters
      const  startPoint = new Point(userLocation.x-(perpendicular.x * rangeRadius), userLocation.y-(perpendicular.y * rangeRadius))

      if (intersects(startPoint, endPoint, path[i], path[i+1])) { // TODO make this get the point of intersection, not a bool (http://paulbourke.net/geometry/pointlineplane/)
          return true;
      } // TODO check the length of the intersection and make the radius for checking the size of the range at the equator (the largest possible gap in lat long for x meters) e.g. if 10m get lat long of 10m at equator and use as intersection range
      // then after use the distanceTo function to get more precise value taking into consideration lat long
      
      // see if the ends of the line are within distance

      const distanceToStart = userLocation.distanceTo(path[i])
      if (distanceToStart <= rangeRadius) {
          return true;
      }

      const distanceToEnd = userLocation.distanceTo(path[i+1])
      if (distanceToEnd <= rangeRadius) {
          return true;
      }
  }

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