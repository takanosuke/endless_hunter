package controllers

import (
	"github.com/gin-gonic/gin"
	"golang.org/x/crypto/bcrypt"
	"endless_hunter/models"
	"log"
	"net/http"
)

func GetSignIn(c *gin.Context) {
	c.HTML(http.StatusOK, "signin.html", gin.H{
		"Email":        "",
		"ErrorMessage": "",
	})
}

func PostSignIn(c *gin.Context) {
	log.Println("ログイン処理")
	email := c.PostForm("email")
	pw := c.PostForm("pw")
	err := passwordVerify(email, pw)
	if err == nil {
		SignIn(c, email)
		c.Redirect(http.StatusMovedPermanently, "/")
	} else {
		c.HTML(http.StatusOK, "signin.html", gin.H{
			"Email":        email,
			"ErrorMessage": "Not a valid account name or password.",
		})
	}
}

func passwordVerify(email, pw string) error {
	hash := models.UserHash(email)
	return bcrypt.CompareHashAndPassword([]byte(hash), []byte(pw))
}

func passwordHash(pw string) (string, error) {
	hash, err := bcrypt.GenerateFromPassword([]byte(pw), bcrypt.DefaultCost)
	if err != nil {
		return "", err
	}
	return string(hash), err
}
