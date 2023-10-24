var express = require('express');
var router = express.Router();
router.post('/resumefile', multerFn.memoryUpload.single("resumefile"), async (req, res) => {
	if (req.file) {
		let filesizeinMb = parseFloat(parseFloat(req.file.size) / 1000000);
		if (filesizeinMb <= 20) {
			AwsCloud.saveToS3(req.file.buffer, 'cv', req.file.mimetype, 'resume').then((result) => {
				return ResponseManager.onSuccess('file added successfully', result.data, res);
			}).catch((err) => {
				return ResponseManager.onError(err, res);
			});
		} else {
			return ResponseManager.onSuccess('Error! Resume file must be less than 20 mb to upload', {}, res);
		}
	} else {
		return ResponseManager.onSuccess('Error! Invalid file, please upload resume file', {}, res);
	}
});
router.post('/portfoliofile', multerFn.memoryUpload.single("portfoliofile"), async (req, res) => {
	if (req.file) {
		let filesizeinMb = parseFloat(parseFloat(req.file.size) / 1000000);
		if (filesizeinMb <= 20) {
			AwsCloud.saveToS3(req.file.buffer, 'workflow', req.file.mimetype, 'portfolio').then((result) => {
				return ResponseManager.onSuccess('file added successfully', result.data, res);
			}).catch((err) => {
				return ResponseManager.onError(err, res);
			});
		} else {
			return ResponseManager.onSuccess('Error! Portfolio file must be less than 20 mb to upload', {}, res);
		}
	} else {
		return ResponseManager.onSuccess('Error! Invalid file, please upload Portfolio file', {}, res);
	}
});
module.exports = router;
