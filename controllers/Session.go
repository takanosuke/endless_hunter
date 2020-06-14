package controllers

import (
	"github.com/gin-contrib/sessions"
	"github.com/gin-gonic/gin"
	"net/http"
)

type SessionInfo struct {
	UserID interface{}
}

var SignInfo SessionInfo

func SessionCheck() gin.HandlerFunc {
	return func(c *gin.Context) {
		session := sessions.Default(c)
		SignInfo.UserID = session.Get("UserID")
		if SignInfo.UserID == nil {
			c.Redirect(http.StatusMovedPermanently, "/signin")
			c.Abort() // これがないと続けて処理されてしまう
		} else {
			c.Set("UserID", SignInfo.UserID) // ユーザidをセット
			c.Next()
		}
	}
}
func SignIn(c *gin.Context, email string) {
	session := sessions.Default(c)
	session.Set("UserID", email)
	session.Set("UserID", email)
	session.Save()
}
func SignOut(c *gin.Context) {
	session := sessions.Default(c)
	session.Clear()
	session.Save()
	c.HTML(http.StatusOK, "signin.html", gin.H{
		"Email":        "",
		"ErrorMessage": "",
	})
}
