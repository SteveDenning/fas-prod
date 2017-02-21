 require(["designer/form/form"], function(FormViewModel) { 
 	var viewModel = new FormViewModel( 
 		"form_78bb1e64c271456f9b25f7ff1d07639e",
 	 "msg_78bb1e64c271456f9b25f7ff1d07639e", 0, "",
 	 {
		"elementId":"00000000-0000-0000-0000-000549772346",
		"domainName":"farnboroughautomotiveservices.com",
		"orionId":"d4c9652d-b425-11e4-85c5-14feb5d40b65",
		"resellerId":1,"gemSubmit":"true",
		"subject":"farnboroughautomotiveservices.com Contact Us: Form Submission",
		"emailHashList":"info@farnboroughautomotiveservices.com",
		"mailerUrl":"https://sitesupport-v7.websitetonight.com/api/CustomFormMailer/Submit",
		"websiteId":"00000000-0000-0000-0000-000549769071",
		"gemSubmitUrl":"//apps.api.godaddy.com/v1/apps/madmimi/v1/subscriber",
		"errorTitle":"Try Again",
		"sendErrorMessage":"Unknown error occurred. Please try again.",
		"tooManyRequestsErrorTitle":"Whoa, slow down",
		"tooManyRequestsErrorMessage":"We're working feverishly to process your request. Please wait a few seconds and try again."
	 } );
  viewModel.init();
}); 