module.exports = function() {

	var root = './';
	var bower = root + 'bower_components/';
	var src = root + 'src/';
	var dist = root + 'dist/';
	var srcAssets = src + 'assets/';
	var distAssets = dist + 'assets/';

	var config = {
		src: src,
		dist: dist,
		srcAssets: srcAssets,
		distAssets: distAssets,

		fontsIn: [
			bower + 'font-awesome/fonts/*', 
			bower + 'bootstrap-sass/assets/fonts/bootstrap/*'
		],
		fontsOut: distAssets + 'fonts/',

		assets: [
			srcAssets + '**/*',
			'!' + srcAssets + '{!img,js,scss}/**/*',
			'!' + srcAssets + 'scss/'
		],

		javascript: [
			bower + 'jquery-validation/dist/jquery.validate.js',
			bower + 'bootstrap-sass/assets/javascripts/bootstrap.js',
			bower + 'bootstrap-select/dist/js/bootstrap-select.js',
			bower + 'bootstrap-toggle/js/bootstrap-toggle.js',
			bower + 'fastclick/lib/fastclick.js',
			bower + 'bootstrap-hover-dropdown/bootstrap-hover-dropdown.js',
			srcAssets + 'js/replacetext.js',
			srcAssets + 'js/parallax.js',
			srcAssets + 'js/styleguide.js',
			srcAssets + 'js/app-form-validation.js',
			srcAssets + 'js/app.js'
		],

		picturefill: [
			srcAssets + 'js/pf.intrinsic.min.js',
			srcAssets + 'js/picturefill.min.js'
		],

		modernizr: [
			srcAssets + 'js/modernizr-2.8.3-respond-1.4.2.min.js'
		]
	};
	return config;

};