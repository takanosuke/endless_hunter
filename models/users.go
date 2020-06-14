package models

func CreateUser(user User) {
	db.Model(&User{}).NewRecord(user)
	db.Model(&User{}).Create(&user)
}
func DeleteUser(id int) {
	var user User
	db.Model(&User{}).First(&user, id)
	db.Model(&User{}).Delete(&user)
}
func Users() (users []User) {
	db.Model(&User{}).Find(&users)
	return
}
func UserHash(email string) string {
	var user User
	db.Model(&User{}).Where("email=?", email).First(&user)
	return user.Password
}
func CheckEmail(email string) bool {
	var user User
	return db.Model(&User{}).Where("email=?", email).First(&user).RecordNotFound()
}
func UserByEmail(email string) (user User) {
	db.Model(&User{}).Where("email=?", email).First(&user)
	return
}
