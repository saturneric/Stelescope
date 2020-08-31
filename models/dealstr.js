function dealuser (req,res) {
	// body...
	var ifpass = true;
         if (req.body.password.length > 12) {
	      	req.session.err = '输入口令过长, 口令应小于12个字符';
            ifpass = false;
            return ifpass;

	      }
          if (req.body.password.length < 6) {
	      	 req.session.err = '输入口令过短, 口令应包括6个以上的字符';
	      	 ifpass = false;
             return ifpass;
         
	      }
	   
         if (req.body.password != req.body.passwordrepeat) {
	         req.session.err = '两次输入的口令不一致';
	         ifpass = false;
	         return ifpass;
         }
     //console.log("message: ",req.body.undername);
         if (req.body.undername.length = 0) {
	         req.session.err = '昵称不能为空';
	         ifpass = false;
	         return ifpass;
         }
}
exports.user = dealuser;