import { createServer } from "miragejs"

export const initMocks = () => {
    createServer({
        routes() {
          this.get(process.env.API_KEY+"/1.0/responsibilities", () => [
            {response: "example response"},
          ])
        },
      })   
}