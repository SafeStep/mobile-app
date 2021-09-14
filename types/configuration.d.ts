declare module "config" {
  export const api_url: string;
  export const mapbox_url: string;
}

interface Waypoint {
  point: PhysicalLocation;
  id: string;
}
