package controllers

import (
	"fmt"
	"log"
	"os"

	"roniix/api/config"
	"roniix/api/dao"
	"roniix/api/models"

	"github.com/aro-wolo/goresp"
	"github.com/aro-wolo/gosend"
	"github.com/gin-gonic/gin"
)

var jwtSecret = []byte("your_secret_key")

func SignOut(ctx *gin.Context) {
	ctx.SetCookie("jwt.token", "", -1, "/", "", false, true)
	goresp.New(ctx).Ok(nil, "")
}

// SignIn handles user login
func SignIn(ctx *gin.Context) {
	var loginData struct {
		Email    string `json:"email"`
		Password string `json:"password"`
	}

	res := goresp.New(ctx)

	if !res.ShouldBind(&loginData) {
		return
	}

	udoa := dao.NewUserDAO()
	user, err := udoa.GetUserByEmail(loginData.Email)
	if err != nil {
		res.Error404("User not found")
		return
	}

	// Verify password
	if !models.CheckPasswordHash(loginData.Password, user.Password) {
		res.Error404("Invalid credentials")
		return
	}

	token, _ := models.GenerateJWT(*user)
	ctx.SetCookie("jwt.token", token, 3600, "/", "", false, true)

	res.Ok(token, "")
}

// VerifyOTP handles OTP verification
func VerifyOTP(ctx *gin.Context) {
	var otpData struct {
		Email string `json:"email"`
		OTP   string `json:"otp"`
	}

	res := goresp.New(ctx)

	if !res.ShouldBind(&otpData) {
		return
	}

	udoa := dao.NewUserDAO()
	user, err := udoa.VerifyOTP(otpData.Email, otpData.OTP)
	if err != nil {
		res.Error404("User not found")
		return
	}

	if user.OTP == "" {
		res.ServerError("Invalid OTP")
		return
	}

	res.Ok(nil, "OTP verified successfully")
}

func ResetPassword(ctx *gin.Context) {
	var resetData struct {
		OTP         string `json:"otp" binding:"required"`
		Email       string `json:"email" binding:"required"`
		NewPassword string `json:"new_password" binding:"required"`
	}
	res := goresp.New(ctx)
	if !res.ShouldBind(&resetData) {
		return
	}

	udoa := dao.NewUserDAO()
	user, err := udoa.VerifyOTP(resetData.Email, resetData.OTP)
	if err != nil {
		res.Error404("User not found")
		return
	}

	if user.OTP == "" {
		res.Error404("User not found")
		return
	}

	err = udoa.UpdatePassword(*user, resetData.NewPassword)
	if err != nil {
		res.ServerError(err.Error())
		return
	}

	res.Ok(nil, "Password reset successful")
}

// SendOTP handles sending OTP to user's email
func SendOTP(c *gin.Context) {
	var request struct {
		Email string `json:"email" binding:"required,email"`
	}

	res := goresp.New(c)
	// Validate the request payload.
	if err := c.ShouldBind(&request); err != nil {
		res.BadRequest(err.Error())
		return
	}

	otp, err := dao.NewUserDAO().SaveOTP(request.Email)
	if err != nil {
		res.Error404(err.Error())
		return
	}
	template, err := gosend.ParseTemplate("templates/auth/forget-pwd-otp.html")
	if err != nil {
		res.ServerError(err.Error())
	}
	tokenMailTemplate := struct {
		Email     string
		Subject   string
		Token     string
		ResetLink string
	}{
		Email:     request.Email,
		Subject:   "Reset Password with OTP",
		Token:     otp,
		ResetLink: os.Getenv("FRONTEND_URL") + "/auth/verify/" + request.Email + "/" + otp,
	}
	fmt.Println("otp :", otp)
	mailBody, err := template.RenderTemplate(tokenMailTemplate)
	if err != nil {
		log.Fatalf("Failed to render template: %v", err)
	}

	err = gosend.Now(
		*config.SMTPConfig, gosend.Recipients{
			To: []string{request.Email},
		},
		tokenMailTemplate.Subject,
		mailBody,
	)
	if err != nil {
		log.Fatalln(err)
	}

	res.Ok(nil, "OTP sent successfully")
}
