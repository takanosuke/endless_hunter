package controllers

import (
	"github.com/gin-gonic/gin"
	"endless_hunter/models"
	"net/http"
	"strconv"
)

func UserList(c *gin.Context) {
	users := models.Users()
	c.HTML(http.StatusOK, "index.html", gin.H{
		"Title": "テストページ",
		"Data":  users,
	})
}

func NewUser(c *gin.Context) {
	c.HTML(http.StatusOK, "signup.html", nil)
}

func CreateUser(c *gin.Context) {
	email := c.PostForm("email")
	name := c.PostForm("name")
	pw := c.PostForm("pw")
	if models.CheckEmail(email) {
		hash, _ := passwordHash(pw)
		user := models.User{
			Email:    email,
			Name:     name,
			Password: hash,
		}
		models.CreateUser(user)
		SignIn(c, email)
		c.Redirect(http.StatusMovedPermanently, "/")
	} else {
		c.HTML(http.StatusOK, "signup.html", gin.H{
			"Email":        "",
			"Name":         name,
			"ErrorMessage": "The Email is already in use.",
		})
	}
}

func DeleteUser(c *gin.Context) {
	id, _ := strconv.Atoi(c.Param("userID"))
	models.DeleteUser(id)
	c.Redirect(http.StatusMovedPermanently, "/")
}
