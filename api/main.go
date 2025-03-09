package main

import (
	"log"
	"os"

	"roniix/api/config"
	"roniix/api/database"
	"roniix/api/routes"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func main() {
	config.Init()
	database.Migrate()

	route := gin.Default()

	route.Use(cors.New(cors.Config{
		AllowOrigins:     []string{os.Getenv("FRONTEND_URL")},
		AllowMethods:     []string{"GET", "POST", "PATCH", "PUT", "DELETE", "OPTIONS"},
		AllowHeaders:     []string{"Origin", "Content-Type", "Authorization"},
		ExposeHeaders:    []string{"Content-Length"},
		AllowCredentials: true,
	}))

	// Define API routes
	endPoints := route.Group("/v1")
	{
		routes.AuthRouter(endPoints)
		routes.UserRouter(endPoints)
	}

	log.Println("Server is running on :8080")
	route.Run(":8080")
}
