package database

import (
	"roniix/api/config"
	"roniix/api/models"
)

func Migrate() {
	config.DB.AutoMigrate(
		&models.Department{},
		&models.User{},
	)
}
