package dao

import (
	"roniix/api/config"
	"roniix/api/models"

	"gorm.io/gorm"
)

type AssetDAO struct {
	db *gorm.DB
}

func NewAssetDAO() *AssetDAO {
	return &AssetDAO{config.DB}
}

// GetAllAssets retrieves all assets from the database
func (d *AssetDAO) GetAllAssets() ([]models.Asset, error) {
	var assets []models.Asset
	err := d.db.Find(&assets).Error
	return assets, err
}

// GetAssetByID retrieves a single asset by ID
func (d *AssetDAO) GetAssetByID(id uint) (*models.Asset, error) {
	var asset models.Asset
	err := d.db.First(&asset, id).Error
	return &asset, err
}

func (d *AssetDAO) CreateAsset(asset *models.Asset) error {
	return d.db.Create(asset).Error
}

func (d *AssetDAO) UpdateAsset(asset *models.Asset) error {
	return d.db.Save(asset).Error
}

func (d *AssetDAO) DeleteAsset(id uint) error {
	return d.db.Delete(&models.Asset{}, id).Error
}
