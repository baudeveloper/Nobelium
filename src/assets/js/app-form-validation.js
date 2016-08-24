$(document).ready(function() {

	// Set default jQuery.validate settings
	$.validator.setDefaults({
    highlight: function(element) {
      $(element).closest('.form-group').addClass('has-error');
    },
    unhighlight: function(element) {
      $(element).closest('.form-group').removeClass('has-error');
    },
    errorContainer: $('#errorContainer'),
    errorLabelContainer: $('#errorContainer ul'),
    wrapper: 'li'
  });

	// Validate 1.0 Login
	$('#login-form').validate({
		rules: {
			userID : "required",
			userPassword: "required"
		},
		messages: {
			userID : "Enter your UserID",
			userPassword: "Enter your Password"
		}
   });

	// Validate 3.0 Forgot Password
	$('#forgot-password').validate({
		rules: {
			userID : "required",
			userEmail : {
				required: true,
				email:true
			},
		},
		messages: {
			userID : "Enter your UserID",
			userEmail : {
				required: "Your Email Address is required",
			}
		}
   });

	// Validate 4.0 Expired Password
	$('#expired-password').validate({
		rules: {
			userID : "required",
			oldPassword : "required",
			newPassword : "required",
			newPasswordConfirm: {
				required: true,
				equalTo: "#newPassword"
			}
		},
		messages: {
			userID : "Enter your UserID",
			oldPassword : "Your current password is required",
			newPassword : "A new password is required",
			newPasswordConfirm : {
				required: "Confirm new password is required",
				equalTo: "Must be same as New Password"
			}
		}
   });

	// Validate 5.0 MFA Question Setup
	$('#mfa-question-setup').validate({
		rules: {
			chQuestionA : "required",
			chResponseA: "required",
			chQuestionB : "required",
			chResponseB: "required",
			chQuestionC : "required",
			chResponseC: "required",
			preferredEmail : {
				required: true,
				email:true
			},
			preferredEmailConfirm: {
				required: true,
				email:true,
				equalTo: "#preferredEmail"
			}
		},
		messages: {
			chQuestionA : "Select a Question for Question A",
			chResponseA : "Type a Response for Question A",
			chQuestionB : "Select a Question for Question B",
			chResponseB : "Type a Response for Question B",
			chQuestionC : "Select a Question for Question C",
			chResponseC : "Type a Response for Question C",
			preferredEmail : "Your Email Address is required",
			preferredEmailConfirm: {
				required: "Confirm Email Address is required",
				equalTo: "Must be same as email entered"
			}
		}
   });

	// Validate 6.0 Dealership Selection
	$('#dealership-selection').validate({
		rules: {
			dealership : "required",
		},
		messages: {
			userID : "Please Select Dealership",
		}
   });

	// Validate 8.0 Challenge Question
	$('#challenge-question').validate({
		rules: {
			chQuestion : "required",
			chResponse : "required"
		},
		messages: {
			chQuestion : "Plese select a Question to Answer",
			chResponse : "Please provide and answer to Challenge Question Selected"
		}
   });

	// Validate 8.2 Request Token Input
	$('#token-submit, #invalid-token').validate({
		rules: {
			tokenCode : "required"
		},
		messages: {
			tokenCode : "Plese enter Token Code"
		}
   });

// end document ready
});