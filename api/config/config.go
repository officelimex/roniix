package config

import (
	"fmt"
	"log"
	"os"
	"strconv"

	"github.com/aro-wolo/gosend"
	"github.com/joho/godotenv"
	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)

var (
	DB         *gorm.DB
	SMTPConfig *gosend.SMTPConfig
)

func Init() {
	loadEnv()
	connectDB()
	initSMTP()
}
func loadEnv() {
	err := godotenv.Load()
	if err != nil {
		log.Fatal("Error loading .env file")
	}
}

func connectDB() *gorm.DB {
	dsn := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s?charset=utf8mb4&parseTime=True&loc=Local",
		os.Getenv("DB_USER"), os.Getenv("DB_PASS"), os.Getenv("DB_HOST"), os.Getenv("DB_PORT"), os.Getenv("DB_NAME"),
	)
	db, err := gorm.Open(mysql.Open(dsn), &gorm.Config{})
	if err != nil {
		log.Fatal("Failed to connect to database:", err)
	}
	DB = db
	return db
}

func initSMTP() {
	port, err := strconv.Atoi(os.Getenv("SMTP_PORT"))
	if err != nil {
		log.Printf("Invalid SMTP port, using default 587: %v", err)
		port = 587
	}

	SMTPConfig = &gosend.SMTPConfig{
		Username: os.Getenv("SMTP_USERNAME"),
		Password: os.Getenv("SMTP_PASSWORD"),
		Server:   os.Getenv("SMTP_SERVER"),
		Port:     port,
		Mode:     gosend.Debug,
		From:     os.Getenv("SMTP_FROM"),
	}

	if SMTPConfig.Username == "" || SMTPConfig.Password == "" || SMTPConfig.From == "" {
		log.Fatal("Missing required SMTP configuration")
	}
}
