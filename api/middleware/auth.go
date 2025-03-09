package middleware

import (
	"fmt"
	"os"

	"github.com/aro-wolo/goresp"
	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt/v5"
)

// Middleware: Verify JWT Token
func AuthMiddleware() gin.HandlerFunc {
	var jwtSecret = []byte(os.Getenv("JWT_SECRET"))

	return func(c *gin.Context) {
		// Get token from cookie
		res := goresp.New(c)
		tokenString, err := c.Cookie("jwt.token")
		if err != nil {
			res.AccessDenied("Unauthorized")
			return
		}

		token, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
			if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
				return nil, fmt.Errorf("unexpected signing method: %v", token.Header["alg"])
			}
			return jwtSecret, nil
		})

		if err != nil || !token.Valid {
			res.AccessDenied(err.Error())
			return
		}

		// Extract claims from token
		claims, ok := token.Claims.(jwt.MapClaims)
		if !ok {
			res.AccessDenied("Invalid token claims")
			return
		}

		role, roleExists := claims["role"].(string)
		name, nameExit := claims["name"].(string)
		id, idExit := claims["id"].(float64)
		did, _ := claims["did"].(float64)
		email, emailEx := claims["email"].(string)
		if !roleExists || !nameExit || !idExit || !emailEx {
			res.AccessDenied("Issue with token")
			return
		}

		c.Set("user_id", uint(id))
		c.Set("user_name", name)
		c.Set("user_email", email)
		c.Set("user_role", role)
		c.Set("user_dept_id", uint(did))

		c.Next()
	}
}
