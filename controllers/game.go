package controllers

import (
	"endless_hunter/models"
	"github.com/gin-gonic/gin"
	"net/http"
	"strconv"
)

func Game(c *gin.Context) {
	c.HTML(http.StatusOK, "game.html", gin.H{
		"Title": "Takanosuke's Game",
	})
}
func Manual(c *gin.Context) {
	c.HTML(http.StatusOK, "manual.html", gin.H{
		"Title": "Takanosuke's Game",
	})
}
func Ranking(c *gin.Context) {
	// funcs := template.FuncMap{
	// 	"add": func(a, b int) int { return a + b },
	// }
	scores := models.Scores()
	c.HTML(http.StatusOK, "ranking.html", gin.H{
		"Title": "Takanosuke's Game",
		"Data":  scores,
	})
}
func RegisterScore(c *gin.Context) {
	value, _ := strconv.Atoi(c.PostForm("score"))
	name := c.PostForm("name")
	score := models.Score{
		Value: value,
		Name:  name,
	}
	models.RegisterScore(score)
	c.Redirect(http.StatusMovedPermanently, "/")
}
