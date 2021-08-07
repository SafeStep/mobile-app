import { createServer } from "miragejs"
import { API_URL } from "@env"

export const initMocks = () => {
    createServer({
        routes() {
          this.namespace = API_URL!;  // ! means defo not null
          this.passthrough("https://cognito-idp.eu-west-1.amazonaws.com");

          this.get("/1.0/responsibilities", (schema, request) => // this request is for when a user wants to see their saviours
          [
            {
              "ECID": "6401a649-b38a-4a29-9691-62b89cc9d77b",
              "firstName": "John",
              "email": "John.smith@gmail.com",
              "phone": "7123456789",
              "dialingCode": "44",
              "responsibilities": [
                  {
                      "greenID": request.params.id,
                      "RID": "8e76e90c-8088-40d3-add3-e39c1d4024d8",
                      "status": "accepted"
                  }
              ]
            },
            {
              "ECID": "9e26bb25-a81f-4375-b5f9-4b23971c43e2",
              "firstName": "Sarah",
              "email": "sarah0.white@yahoo.com",
              "responsibilities": [
                  {
                      "greenID": request.params.id,
                      "RID": "5661d7ae-139d-4a05-9eec-acdb4f84d217",
                      "status": "pending"
                  }
              ]
            },
            {
              "ECID": "1a26ss25-b81f-7856-s5g9-4b23972c43w2",
              "firstName": "Ollie",
              "email": "oliver.pugh@yahoo.com",
              "responsibilities": [
                  {
                      "greenID": request.params.id,
                      "RID": "eff0589f-4cbb-4061-b0d0-dda5ea0a7ecd",
                      "status": "pending"
                  }
              ]
            }
          ])
        },
    })   
}