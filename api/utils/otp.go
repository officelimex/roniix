package utils

import (
	"math/rand"
)

func GenerateOTP() string {
	const digits = "0123456789"
	otp := make([]byte, 5)
	for i := range otp {
		otp[i] = digits[rand.Intn(len(digits))]
	}
	return string(otp)
}
