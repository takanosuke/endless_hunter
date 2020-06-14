package models

import (
	"fmt"
	"github.com/jinzhu/gorm"
	_ "github.com/jinzhu/gorm/dialects/mysql"
	"log"
	"time"
)

var db *gorm.DB

func InitDB(dialect, user, pass, protocol, name string) {
	connectTemplate := "%s:%s@%s/%s?%s"
	connectParams := "charset=utf8&parseTime=True&loc=Local"
	connect := fmt.Sprintf(connectTemplate, user, pass, protocol, name, connectParams)
	var err error
	for {
		db, err = gorm.Open(dialect, connect)
		if err == nil {
			db.Set("gorm:table_options", "ENGINE = InnoDB")
			db.AutoMigrate(&User{}, &Score{})
			fmt.Println("Connected DB")
			break
		}
		log.Println(err.Error())
		time.Sleep(3 * time.Second)
	}
}

func CloseDB() {
	db.Close()
}

type User struct {
	gorm.Model
	Email    string `gorm:"type:varchar(100);unique_index"`
	Name     string
	Password string `gorm:"size:70"`
}

type Score struct {
	gorm.Model
	Value int
	Name  string
}
