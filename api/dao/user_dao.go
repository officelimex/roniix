package dao

import (
	"errors"

	"roniix/api/config"
	"roniix/api/models"
	"roniix/api/utils"

	"golang.org/x/crypto/bcrypt"
	"gorm.io/gorm"
)

type UserDAO struct {
	db *gorm.DB
}

func NewUserDAO() *UserDAO {
	return &UserDAO{
		db: config.DB,
	}
}

func (dao *UserDAO) GetUserByEmail(email string) (*models.User, error) {
	var user models.User
	if err := dao.db.
		Preload("Department").
		Where("email = ?", email).First(&user).Error; err != nil {
		return nil, err
	}
	return &user, nil
}

func (dao *UserDAO) VerifyOTP(email, otp string) (*models.User, error) {
	var user models.User
	if err := dao.db.Where("email = ? AND otp = ?", email, otp).First(&user).Error; err != nil {
		return nil, err
	}
	return &user, nil
}

func (dao *UserDAO) UpdatePassword(u models.User, newPassword string) error {
	hashedPwd, err := bcrypt.GenerateFromPassword([]byte(newPassword), bcrypt.DefaultCost)
	if err != nil {
		return errors.New("failed to hash password")
	}

	if err := dao.db.Model(&models.User{}).
		Where("id = ?", u.ID).
		Updates(map[string]interface{}{
			"password": string(hashedPwd),
			"otp":      "",
		}).Error; err != nil {
		return err
	}

	return nil
}

func (dao *UserDAO) SaveOTP(email string) (string, error) {
	var user models.User
	if err := dao.db.Select("id").Where("email = ?", email).First(&user).Error; err != nil {
		return "", err
	}

	otp := utils.GenerateOTP()

	if err := dao.db.Model(&user).Update("otp", otp).Error; err != nil {
		return "", err
	}

	return otp, nil
}
