### Run application
 - docker-compose up
 
 ### Endpoints
 - http://localhost:5001/api/token
    - Request:
        - Content-Type = application/json
        - Body = {
           	"email": "email@test.fr"
           }
    - Response:
        - {
            "token": "...................."
         }
                     
 - http://localhost:5001/api/justify
    - Request:
        - Authorization = "Bearer your-token"
        - Content-Type = text/plain
        - Body = "put here not justified text"
    - Response:
        - justified text
