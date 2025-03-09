package controllers

import (
	"roniix/api/dao"

	"github.com/aro-wolo/goresp"
	"github.com/gin-gonic/gin"
)

func GetUserInfo(c *gin.Context) {
	email := c.GetString("user_email") 
	userDAO := dao.NewUserDAO()
	user, err := userDAO.GetUserByEmail(email)
	if err != nil {
		goresp.New(c).Error404("User not found")
		return
	}
	goresp.New(c).Ok(user, "User information retrieved successfully")
}
