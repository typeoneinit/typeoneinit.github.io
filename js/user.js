if (!Cookies.get(COOKIE_USER_HASH)) {
	Cookies.set(COOKIE_USER_HASH, initId());
}


var userId = Cookies.get(COOKIE_USER_HASH);