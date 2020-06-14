package models

func RegisterScore(score Score) {
	db.Model(&Score{}).NewRecord(score)
	db.Model(&Score{}).Create(&score)
}
func ResetScore(id int) {
	var score Score
	db.Model(&Score{}).First(&score, id)
	db.Model(&Score{}).Delete(&score)
}
func Scores() (scores []Score) {
	db.Model(&Score{}).Order("value desc").Order("created_at").Limit(30).Find(&scores)
	return
}
