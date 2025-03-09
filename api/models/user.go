package models

import (
	"time"
)

type User struct {
	ID           uint       `gorm:"primarykey"`
	Name         string     `json:"name" gorm:"not null"`
	Email        string     `json:"email" gorm:"unique;not null"`
	Password     string     `json:"-"`
	Role         string     `json:"role" gorm:"default:'user'"`
	Position     string     `json:"position"`
	DepartmentID uint       `json:"-"`
	Department   Department `json:"dept" gorm:"constraint:OnUpdate:CASCADE,OnDelete:SET NULL;"`
	OTP          string     `json:"-" gorm:"size:10"`
	TimeStamp
}

type Department struct {
	ID   uint   `gorm:"primarykey"`
	Name string `json:"name" gorm:"not null"`
	TimeStamp
}

type TimeStamp struct {
	CreatedAt time.Time `json:"-" gorm:"type:timestamp;default:CURRENT_TIMESTAMP"`
	UpdatedAt time.Time `json:"-" gorm:"type:timestamp;default:CURRENT_TIMESTAMP on update CURRENT_TIMESTAMP"`
}
