package config

import (
	"fmt"
	"log"
	"os"
	"strconv"

	"github.com/aro-wolo/gosend"
	"github.com/joho/godotenv"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

type Environment int

const (
	Debug Environment = iota
	Live
)

var (
	DB         *gorm.DB
	SMTPConfig *gosend.SMTPConfig
	Secret     []byte
	Mode       Environment
)

// Init initializes all configurations
func Init() {
	loadEnv()
	connectDB()
	initSMTP()
}

// loadEnv loads environment variables from .env file
func loadEnv() {
	if err := godotenv.Load(); err != nil {
		log.Fatal("Error loading .env file")
	}

	Secret = []byte(getEnv("JWT_SECRET"))
	modeInt, err := strconv.Atoi(getEnv("MODE"))
	if err != nil || (modeInt != 0 && modeInt != 1) {
		log.Fatalf("Invalid MODE value: %s. Expected 0 (Debug) or 1 (Live)", getEnv("MODE"))
	}
	Mode = Environment(modeInt)
}

// connectDB establishes a connection to PostgreSQL
func connectDB() {
	port, _ := strconv.Atoi(getEnv("DB_PORT"))
	password := os.Getenv("DB_PASS")
	passwordPart := ""
	if password != "" {
		passwordPart = fmt.Sprintf("password=%s ", password)
	}

	dsn := fmt.Sprintf("host=%s port=%d user=%s %sdbname=%s sslmode=disable",
		getEnv("DB_HOST"), port, getEnv("DB_USER"), passwordPart, getEnv("DB_NAME"),
	)

	db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})
	if err != nil {
		log.Fatal("Failed to connect to database:", err)
	}

	DB = db
}

// initSMTP initializes SMTP configuration
func initSMTP() {
	port, err := strconv.Atoi(os.Getenv("SMTP_PORT"))
	if err != nil {
		log.Printf("Invalid SMTP port, using default 587: %v", err)
		port = 587
	}

	SMTPConfig = &gosend.SMTPConfig{
		Username: getEnv("SMTP_USERNAME"),
		Password: getEnv("SMTP_PASSWORD"),
		Server:   getEnv("SMTP_SERVER"),
		Port:     port,
		Mode:     gosend.Debug,
		From:     getEnv("SMTP_FROM"),
	}

	if SMTPConfig.Username == "" || SMTPConfig.Password == "" || SMTPConfig.From == "" {
		log.Fatal("Missing required SMTP configuration")
	}
}

// getEnv safely retrieves an environment variable
func getEnv(key string) string {
	value := os.Getenv(key)
	if value == "" {
		log.Fatalf("Environment variable %s is not set", key)
	}
	return value
}
