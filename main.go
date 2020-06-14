package main

import (
	"encoding/json"
	"endless_hunter/controllers"
	"endless_hunter/models"
	"github.com/gin-contrib/sessions"
	"github.com/gin-contrib/sessions/cookie"
	"github.com/gin-gonic/gin"
	"html/template"
	"io/ioutil"
	"strconv"
)

type Config struct {
	Db     DbConfig     `json:"db"`
	Server ServerConfig `json:"server"`
}

type ServerConfig struct {
	Port int `json:"port"`
}

type DbConfig struct {
	Dialect  string `json:"dialect"`
	User     string `json:"user"`
	Pass     string `json:"pass"`
	Protocol string `json:"protocol"`
	Name     string `json:"name"`
}

func main() {
	file, err := ioutil.ReadFile("config.json")
	if err != nil {
		panic(err)
	}
	var config Config
	json.Unmarshal(file, &config)
	models.InitDB(
		config.Db.Dialect,
		config.Db.User,
		config.Db.Pass,
		config.Db.Protocol,
		config.Db.Name,
	)
	defer models.CloseDB()
	router := gin.Default()
	router.SetFuncMap(template.FuncMap{
		"add": func(a, b int) int { return a + b },
	})
	router.Static("/assets", "./assets")
	router.LoadHTMLGlob("./views/*")
	store := cookie.NewStore([]byte("secret"))
	router.Use(sessions.Sessions("mysession", store))
	router.GET("/signin", controllers.GetSignIn)
	router.POST("/signin", controllers.PostSignIn)
	router.GET("/signup", controllers.NewUser)
	router.POST("/signup", controllers.CreateUser)

	v1 := router.Group("/")
	// v1.Use(controllers.SessionCheck())
	{
		v1.GET("", controllers.Game)
		v1.GET("/manual", controllers.Manual)
		v1.GET("/ranking", controllers.Ranking)
		v1.POST("/registerScore", controllers.RegisterScore)
		v1.POST("/signout", controllers.SignOut)
	}
	router.Run(":" + strconv.Itoa(config.Server.Port))
}
