package models

import (
	"os"
	"time"

	"github.com/golang-jwt/jwt/v5"
)

// GenerateJWT generates a JWT token for a user
func GenerateJWT(user User) (string, error) {
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"id":    user.ID,
		"role":  user.Role,
		"name":  user.Name,
		"email": user.Email,
		"did":   user.DepartmentID,
		"dept":  user.Department.Name,
		"exp":   time.Now().Add(time.Hour * 24).Unix(), // Expires in 24 hours
	})
	jwtSecret := []byte(os.Getenv("JWT_SECRET"))
	tokenString, err := token.SignedString(jwtSecret)
	if err != nil {
		return "", err
	}

	return tokenString, nil
}
